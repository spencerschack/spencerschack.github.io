export const title = "Conclusion";

export default (
  <section id={encodeURIComponent(title)}>
    <h2>{title}</h2>
    <p>
      This tool can be a great help for certain scenarios, particularly those
      that are using complex SQL queries, probably doing some kind of data
      analysis. But for more typical transactional workflows, query builders or
      even an ORM can better suited to the task.
    </p>
    <h3>Further Reading:</h3>
    <ul>
      <li>
        <a href="https://github.com/spencerschack/spencerschack.github.io/blob/next/src/app/query/query.ts">
          query.ts
        </a>
        : The full, Typescript version of this tool.
      </li>
      <li>
        <a href="https://martinfowler.com/bliki/MinimalInterface.html">
          MinimalInterface
        </a>
        : What is a &ldquo;minimal interface&rdquo; and why it might be better
        than a &ldquo;humane interface&rdquo;.
      </li>
      <li>
        <a href="https://github.com/blakeembrey/sql-template-tag">
          sql-template-tag
        </a>
        : Another implementation without some features (<code>then</code>able
        result, async iteration). Database agnostic, but supports{" "}
        <code>pg</code> and <code>mysql</code> out of the box.
      </li>
      <li>
        <a href="https://github.com/andywer/squid">squid</a>: Similar features
        to <code>sql-template-tag</code>, but supports static query validations
        via <code>postguard</code>. Only supports Postgres.
      </li>
    </ul>
  </section>
);
