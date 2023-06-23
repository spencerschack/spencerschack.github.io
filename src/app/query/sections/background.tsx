export const title = "Background";

export default (
  <section id={encodeURIComponent(title)}>
    <h2>{title}</h2>
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
  </section>
);
