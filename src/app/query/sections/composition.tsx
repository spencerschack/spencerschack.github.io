import Code from "../../code";
import styles from "../styles.module.css";

export const title = "Query Composition";

export default (
  <section id={encodeURIComponent(title)}>
    <h2>{title}</h2>
    <p>
      There was a key feature that was missing: query composition. So far, the
      helper supported interpolating variables, but not other subqueries
      themselves.
    </p>
    <div className={styles.p}>
      <Code language="javascript">{`
// Not (yet) supported
const lastDay = query\`created_at > current_timestamp() - interval '1' day\`;
const results = await query\`SELECT * FROM ads WHERE \${lastDay}\`;
`}</Code>
    </div>
    <p>
      Nested queries were more difficult to support. There were two things that
      needed to be done to support them: determine a nested query from a
      variable bind and unnesting the nested queries.
    </p>
    <p>
      We can determine a query from other types with a Javascript idiom where we
      use a <code>Symbol</code> to allow conversion of a value into another
      type. This pattern is used by Javascript to implement iteration via{" "}
      <code>Symbol.iterator</code>.
    </p>
    <div className={styles.p}>
      <Code language="javascript" highlight="1,5-7">{`
const toQuery = new Symbol();

const makeQuery = execute => function query(parts, ...binds) {
  return {
    [toQuery]() {
      return [parts, binds];
    },
    then(...args) {
`}</Code>
    </div>
    <p>
      To unnest the nested query, we have to iterate over the static parts of
      the query and the binds. In addition to flattening the top level and
      nested parts and binds, the first and last parts of each nested query must
      be concatenated to the surrounding parts in the top level query.
    </p>
    <div className={styles.p}>
      <Code language="javascript" highlight="3-19,22">{`
const toQuery = new Symbol();

function compile([firstPart, ...nestedParts], nestedBinds) {
  const parts = [firstPart];
  const binds = [];
  nestedBinds.forEach((bind, index) => {
    if (bind && typeof bind === "object" && toQuery in bind) {
      const [nestedParts, nestedBinds] = bind[toQuery]();
      parts[parts.length - 1] += nestedParts[0];
      parts.push(...nestedParts.slice(1));
      parts[parts.length - 1] += nestedParts[index];
      binds.push(...nestedBinds);
    } else {
      parts.push(nestedParts[index]);
      binds.push(bind);
    }
  });
  return [parts, binds];
}

const makeQuery = execute => function query(inParts, ...inBinds) {
  const [parts, binds] = compile(inParts, inBinds);
  return {
`}</Code>
    </div>
  </section>
);
