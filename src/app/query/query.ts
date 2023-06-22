export const toQuery: unique symbol = Symbol();

type Query<V> = [readonly string[], V[]];
type NestedQuery<V> = [readonly string[], (V | ToQuery<V>)[]];
export type ToQuery<V> = { [toQuery]: () => Query<V> };

async function collectAsyncIterator<T>(
  asyncIterator: AsyncIterable<T>
): Promise<T[]> {
  const result = [];
  for await (const row of asyncIterator) {
    result.push(row);
  }
  return result;
}

type QueryElement<V> =
  | { type: "part"; value: string }
  | { type: "bind"; value: V };

function* unnest<V>(
  ...[parts, binds]: NestedQuery<V>
): Generator<QueryElement<V>> {
  yield { type: "part", value: parts[0] };
  for (let i = 0; i < binds.length; i++) {
    const bind = binds[i];
    if (bind && typeof bind === "object" && toQuery in bind) {
      yield* unnest(...bind[toQuery]());
    } else {
      yield { type: "bind", value: bind };
    }
    yield { type: "part", value: parts[i + 1] };
  }
}

function* unnestBinds<V>(...query: NestedQuery<V>) {
  for (const { type, value } of unnest(...query))
    if (type === "bind") yield value;
}

function* unnestParts<V>(...query: NestedQuery<V>) {
  let currentPart = "";
  for (const { type, value } of unnest(...query)) {
    if (type === "bind") {
      yield currentPart;
      currentPart = "";
    } else {
      currentPart += value;
    }
  }
  yield currentPart;
}

export default function makeQuery<V, R>(
  execute: (queryParts: string[], variables: V[]) => AsyncIterator<R>
) {
  return (
    nestedParts: readonly string[],
    ...nestedBinds: (V | ToQuery<V>)[]
  ): AsyncIterable<R> & PromiseLike<R[]> & ToQuery<V> => {
    const parts = Array.from(unnestParts(nestedParts, nestedBinds));
    const binds = Array.from(unnestBinds(nestedParts, nestedBinds));
    return {
      [toQuery]: () => [parts, binds],
      then(resolve, reject) {
        return collectAsyncIterator(this).then(resolve, reject);
      },
      [Symbol.asyncIterator]() {
        return execute(parts, binds);
      },
    };
  };
}
