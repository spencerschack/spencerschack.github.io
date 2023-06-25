import Code from "../../code";
import styles from "../styles.module.css";

export const title = "Async Iteration";

export default (
  <section id={encodeURIComponent(title)}>
    <h2>{title}</h2>
    <p>
      One final feature I wanted to add as a performance optimization was async
      iteration. When I was developing this tool, I was loading a lot of data
      from the database during jobs, but only needed one record at a time.
    </p>
    <div className={styles.p}>
      <Code language="javascript" highlight="1-5,13,15-17">{`
async function collect(iterator) {
  const result = [];
  for await (const item of iterator) result.push(item);
  return result;
}

const makeQuery = execute => function query(parts, ...binds) {
  return {
    [toQuery]() {
      return [parts, binds];
    },
    then(...args) {
      return collect(this).then(...args);
    },
    [Symbol.asyncIterator]() {
      return execute(parts, binds);
    },
  }
}
`}</Code>
    </div>
    <p>
      This also requires a change to the execute function as well, which will
      depend greatly on the database library.
    </p>
    <div className={styles.p}>
      <Code language="javascript" highlight="3">{`
const $ = makeQuery((parts, binds) => {
  const result = connection.execute({ sql: parts.join("$"), binds });
  return result.streamRows();
})
`}</Code>
    </div>
  </section>
);
