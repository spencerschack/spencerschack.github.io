import Code from "../../code";

export default (
  <>
    <h2>Implementation</h2>
    <p>
      My first step was creating something like{" "}
      <a href="https://github.com/blakeembrey/sql-template-tag">
        sql-template-tag
      </a>{" "}
      using{" "}
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates">
        tagged template literals
      </a>
      . This single line function already completed about 80% of the API.
    </p>
    <Code language="javascript">{`
function query(parts, ...binds) {
  return connection.execute({ sql: parts.join("$"), binds });
}

const [result] = await query\`SELECT * FROM users WHERE id = \${id}\`;
`}</Code>
    <p>
      The first thing I needed to fix was that a query would execute
      immediately, right when it was defined. It would be better if it would run
      only when <code>await</code>ed. This can be accomplished with
      &quot;lazy&quot; promises by creating an object with a <code>then</code>{" "}
      method.
    </p>
    <Code language="javascript" highlight="2-3,6-7">{`
function query(parts, ...binds) {
  return {
    then(...args) {
      return connection
        .execute({ sql: parts.join("$"), binds })
        .then(...args);
    }
`}</Code>
    <p>
      I wanted this tool to be database agnostic so I extracted the execution
      logic:
    </p>
    <Code language="javascript" highlight="1,4,9-11">{`
const makeQuery = execute => function query(parts, ...binds) {
  return {
    then(...args) {
      return execute(parts, binds).then(...args);
    },
  }
}

const query = makeQuery((parts, binds) =>
  connection.execute({ sql: parts.join("$"), binds }),
)
`}</Code>
  </>
);
