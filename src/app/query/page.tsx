import styles from "./styles.module.css";
import Card from "./card";
import generate from "./database/generate";
import sections from "./sections";
import exec from "./database/exec";
import TOC from "./toc";

const example = `
const orders = interval => $\`
  SELECT name, SUM(quantity * price) AS revenue, COUNT(*) AS SALES
  FROM products JOIN orders USING (product_id)
  GROUP BY name, STRFTIME(\${interval}, date)
\`;
const stats = column => $\`
  ROUND(AVG(\${column})) AS avg_\${column},
  MAX(\${column}) AS max_\${column}
\`;
return $\`
  SELECT name, \${stats($\`revenue\`)}, \${stats($\`sales\`)}
  FROM (\${orders('%Y')})
  GROUP BY name
\`;
`.replace(/^\n|\n$/g, "");

const titles = ["Demo", ...sections.map((section) => section.title)];

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
          <TOC titles={titles} />
        </ol>
        <div className={styles.content}>
          {sections.map((section) => section.default)}
        </div>
      </div>
    </div>
  );
}
