import Code from "../../code";
import styles from "../styles.module.css";

export const title = "Experimentation";

export default (
  <section id={encodeURIComponent(title)}>
    <h2>{title}</h2>
    <p>
      Writing queries by hand with strings and variable interpolation is not the
      answer either because of the need to mitigate SQL injestion and correctly
      serialize the variables.
    </p>
    <div className={styles.p}>
      <Code language="javascript">{`
// This is susceptible to SQL injection and wouldn't
// correctly interpolate string literals.
connection.execute(\`SELECT * FROM users WHERE id = \${id}\`);
`}</Code>
    </div>
    <p>
      Javascript does have a language feature that helps these solves issues.
      Tagged template literals:
    </p>
    <div className={styles.p}>
      <Code language="javascript">{`
query\`SELECT * FROM users WHERE id = \${id} \`;
// is equivalent to
query(["SELECT * FROM users WHERE id = ", ""], [id]);
`}</Code>
    </div>
    <p>
      I wanted to create an interface for writing SQL to work like it was part
      of the source code instead of just a string parameter. Similar to JSX
      where building html elements is baked into the language for better
      ergonomics. The end goal was something like this:
    </p>
    <div className={styles.p}>
      <Code language="javascript">{`
const [result] = await query\`SELECT * FROM users WHERE id = \${id}\`;
`}</Code>
    </div>
  </section>
);
