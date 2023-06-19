import Code from "../../code";

export default (
  <>
    <h2>Background</h2>
    <p>
      Writing SQL queries is often an inevitable part of software development.
      SQL is either written by hand or with the help of query builders. Query
      builders, such as{" "}
      <a href="https://guides.rubyonrails.org/active_record_basics.html">
        ActiveRecord
      </a>{" "}
      or <a href="https://knexjs.org/guide/query-builder.html#knex">Knex</a>,
      are tools that help to create queries through an API native to the
      programming language you&apos;re executing the queries from.
    </p>
    <h2>Motivation</h2>
    <p>Query builders can be very useful when writing simple queries:</p>
    <Code language="javascript">{`
knex('posts').where('category_id', 42).orderBy('created_at');
`}</Code>
    <p>However, this approach does have some downsides:</p>
    <ul>
      <li>
        Every query feature in your target database needs a corresponding query
        builder API. The effort to develop, maintain, and learn how to use the
        query builder is coupled with how many features you want to use.
      </li>
      <li>
        SQL is a standardized, widely-used language that enables developers to
        share their ability to query databases across projects and teams. The
        benefits of the widespread familiarity with SQL is lost when each query
        builder has a unique API.
      </li>
    </ul>
    <h2>Experimenting with a new interface</h2>
    <p>
      Writing queries by hand with strings and variable interpolation is not the
      answer either because of the need to mitigate SQL injestion and correctly
      serialize the variables.
    </p>
    <Code language="javascript">{`
// This is susceptible to SQL injection and wouldn't
// correctly interpolate string literals.
connection.execute(\`SELECT * FROM users WHERE id = \${id}\`);
`}</Code>
    <p>
      Javascript does have a language feature that helps these solves issues.
      Tagged template literals:
    </p>
    <Code language="javascript">{`
query\`SELECT * FROM users WHERE id = \${id} \`;
// is equivalent to
query(["SELECT * FROM users WHERE id = ", ""], [id]);
`}</Code>
  </>
);
