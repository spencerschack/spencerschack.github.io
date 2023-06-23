import Code from "../../code";
import styles from "../styles.module.css";

export const title = "Motivation";

export default (
  <section id={encodeURIComponent(title)}>
    <h2>{title}</h2>
    <p>Query builders can be very useful when writing simple queries:</p>
    <div className={styles.p}>
      <Code language="javascript">{`
knex('posts').where('category_id', 42).orderBy('created_at');
`}</Code>
    </div>
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
  </section>
);
