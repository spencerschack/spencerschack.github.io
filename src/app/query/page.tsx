import styles from "./styles.module.css";
import Card from "./card";
import generate from "./database/generate";
import background from "./sections/background";
import motivation from "./sections/motivation";
import experimentation from "./sections/experimentation";
import implementation from "./sections/implementation";
import composition from "./sections/composition";
import asyncIteration from "./sections/asyncIteration";
import conclusion from "./sections/conclusion";
import exec from "./database/exec";

const example = `
const newUsers = query\`
  SELECT *
  FROM users
  WHERE join_date > "2021-02-01"
\`;
return query\`
  SELECT
    products.name AS product,
    SUM(orders.quantity * products.price) AS revenue
  FROM orders
  INNER JOIN (\${newUsers}) new_users
    ON orders.user_id = new_users.id
  INNER JOIN products
    ON orders.product_id = products.id
  GROUP BY products.id
  ORDER BY revenue DESC
  LIMIT 20
\`;
`.replace(/^\n|\n$/, "");

export default async function Query() {
  const database = await generate();
  const initialResults = await exec(database, example);
  if (!initialResults) throw "no results";
  return (
    <>
      <Card initialResults={initialResults} initialCode={example} />
      <div className={styles.container}>
        {background}
        {motivation}
        {experimentation}
        {implementation}
        {composition}
        {asyncIteration}
        {conclusion}
      </div>
    </>
  );
}
