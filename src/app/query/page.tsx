import styles from "./styles.module.css";
import Card from "./card";
import generate from "./database/generate";
import * as background from "./sections/background";
import * as motivation from "./sections/motivation";
import * as experimentation from "./sections/experimentation";
import * as implementation from "./sections/implementation";
import * as composition from "./sections/composition";
import * as asyncIteration from "./sections/asyncIteration";
import * as conclusion from "./sections/conclusion";
import exec from "./database/exec";

const example = `
const newUsers = query\`
  SELECT *
  FROM users
  WHERE join_date > "2021-02-01"
\`;
return query\`
  SELECT *
  FROM orders
  INNER JOIN (\${newUsers}) new_users
    ON orders.user_id = new_users.id
  INNER JOIN products
    ON orders.product_id = products.id
  LIMIT 20
\`;
`.replace(/^\n|\n$/g, "");

const sections = [
  background,
  motivation,
  experimentation,
  implementation,
  composition,
  asyncIteration,
  conclusion,
];

export default async function Query() {
  const database = await generate();
  const initialResults = exec(database, example);
  switch (initialResults.type) {
    case "js_error":
    case "sql_error":
    case "return_error":
      throw initialResults.value;
  }
  return (
    <div className={styles.root}>
      <Card initialResults={initialResults.value} initialCode={example} />
      <div className={styles.container}>
        <ol className={styles.toc}>
          <li>
            <a href="#Demo">Demo</a>
          </li>
          {sections.map((section) => (
            <li key={section.title}>
              <a href={"#" + encodeURIComponent(section.title)}>
                {section.title}
              </a>
            </li>
          ))}
        </ol>
        <div className={styles.content}>
          {sections.map((section) => section.default)}
        </div>
      </div>
    </div>
  );
}
