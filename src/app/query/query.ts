export const toQuery: unique symbol = Symbol();

type Query<V> = [readonly string[], V[]];
type NestedQuery<V> = [readonly string[], (V | ToQuery<V>)[]];
export type ToQuery<V> = { [toQuery]: () => Query<V> };

async function collectAsyncIterator<T>(
  asyncIterator: AsyncIterable<T>
): Promise<T[]> {
  const result = [];
  for await (const row of asyncIterator) result.push(row);
  return result;
}

function unnest<V>(
  ...[[firstPart, ...nestedParts], nestedBinds]: NestedQuery<V>
): Query<V> {
  const parts = [firstPart];
  const binds: V[] = [];
  nestedBinds.forEach((bind, index) => {
    if (bind && typeof bind === "object" && toQuery in bind) {
      const [bindParts, bindBinds] = bind[toQuery]();
      parts[parts.length - 1] += bindParts[0];
      parts.push(...bindParts.slice(1));
      parts[parts.length - 1] += nestedParts[index];
      binds.push(...bindBinds);
    } else {
      parts.push(nestedParts[index]);
      binds.push(bind);
    }
  });
  return [parts, binds];
}

export default function makeQuery<V, R>(
  execute: (queryParts: readonly string[], variables: V[]) => AsyncIterator<R>
) {
  return (
    nestedParts: readonly string[],
    ...nestedBinds: (V | ToQuery<V>)[]
  ): AsyncIterable<R> & PromiseLike<R[]> & ToQuery<V> => {
    const unnestedQuery = unnest(nestedParts, nestedBinds);
    return {
      [toQuery]: () => unnestedQuery,
      then(resolve, reject) {
        return collectAsyncIterator(this).then(resolve, reject);
      },
      [Symbol.asyncIterator]() {
        return execute(...unnestedQuery);
      },
    };
  };
}
