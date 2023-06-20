import sqlite from "sql.js/dist/sql-asm";
import styles from "./styles.module.css";
import Editor from "./editor";
import background from "./sections/background";
import motivation from "./sections/motivation";
import experimentation from "./sections/experimentation";
import implementation from "./sections/implementation";
import composition from "./sections/composition";
import asyncIteration from "./sections/asyncIteration";
import conclusion from "./sections/conclusion";

async function generateDatabase() {
  const { Database } = await sqlite();
  const database = new Database();
  // Run a query without reading the results
  database.run("CREATE TABLE users (col1, col2);");
  // Insert two rows: (1,111) and (2,222)
  database.run("INSERT INTO users VALUES (?,?), (?,?)", [1, 111, 2, 222]);
  return database.export();
}

export default async function Query() {
  return (
    <>
      <Editor database={await generateDatabase()} />
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
