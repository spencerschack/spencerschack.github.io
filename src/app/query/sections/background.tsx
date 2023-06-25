export const title = "Introduction";

export default (
  <section id={encodeURIComponent(title)}>
    <h2>{title}</h2>
    <p>
      A better API is sometimes the one with fewer features. Often the
      development effort of software is dominated by the long tail of features.
      You can get 80% of the features for 20% of the work...if you can do
      without every last feature.
    </p>
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
