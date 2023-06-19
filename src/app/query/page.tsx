import { ReactNode } from "react";
import Code, { Props as CodeProps } from "../code";
import styles from "./styles.module.css";
import Editor from "./editor";
import introduction from "./sections/introduction";

export default function Query() {
  return (
    <div className={styles.container}>
      <h1>QueryX</h1>
      <h2>A Javascript tool for composing and executing SQL queries</h2>
      <Editor />
      {introduction}
      <p>
        I wanted to create an interface for writing SQL to work like it was part
        of the source code instead of just a string parameter. Similar to JSX
        where building html elements is baked into the language for better
        ergonomics. The end goal was something like this:
      </p>
      <Code language="javascript">{`
const [result] = await query\`SELECT * FROM users WHERE id = \${id}\`;
`}</Code>
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
        immediately, right when it was defined. It would be better if it would
        run only when <code>await</code>ed. This can be accomplished with
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
      <h2>Query Composition</h2>
      <p>
        There was a key feature that was missing: query composition. So far, the
        helper supported interpolating variables, but not other subqueries
        themselves.
      </p>
      <Code language="javascript">{`
// Not (yet) supported
const lastDay = query\`created_at > current_timestamp() - interval '1' day\`;
const results = await query\`SELECT * FROM ads WHERE \${lastDay}\`;
`}</Code>
      <p>
        Nested queries were more difficult to support. There were two things
        that needed to be done to support them: determine a nested query from a
        variable bind and unnesting the nested queries.
      </p>
      <p>
        We can determine a query from other types with a Javascript idiom where
        we use a <code>Symbol</code> to allow conversion of a value into another
        type. This pattern is used by Javascript to implement iteration via{" "}
        <code>Symbol.iterator</code>.
      </p>
      <Code language="javascript" highlight="1,5-7">{`
const toQuery = new Symbol();

const makeQuery = execute => function query(parts, ...binds) {
  return {
    [toQuery]() {
      return [parts, binds];
    },
    then(...args) {
`}</Code>
      <p>
        To unnest the nested query, we have to iterate over the static parts of
        the query and the binds. In addition to flattening the top level and
        nested parts and binds, the first and last parts of each nested query
        must be concatenated to the surrounding parts in the top level query.
      </p>
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
      <h2>Async Iteration</h2>
      <p>
        One final feature I wanted to add as a performance optimization was
        async iteration. When I was developing this tool, I was loading a lot of
        data from the database during jobs, but only needed one record at a
        time.
      </p>
      <Code language="javascript" highlight="1-5,13,15-17">{`
async function collect(iterator) {
  const arr = [];
  for await (const item of iterator) arr.push(item);
  return arr;
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
      <p>
        This also requires a change to the execute function as well, which will
        depend greatly on the database library.
      </p>
      <Code language="javascript">{`
const query = makeQuery((parts, binds) => {
  const result = connection.execute({ sql: parts.join("$"), binds });
  return result.streamRows();
})
`}</Code>
      <h2>Conclusion</h2>
      <p>
        This tool can be a great help for certain scenarios, particularly those
        that are using complex SQL queries, probably doing some kind of data
        analysis. But for more typical transactional workflows, query builders
        or even an ORM can better suited to the task.
      </p>
    </div>
  );
}
