"use client";

import CodeEditor from "react-simple-code-editor";
import { useEffect, useMemo, useRef, useState } from "react";
import initSqlite, { Database, QueryExecResult } from "sql.js/dist/sql-asm";
import styles from "./styles.module.css";
import CodeContainer from "../code/container";
import CodeContent from "../code/content";

async function run(database: Promise<Database>, code: string) {
  let results: QueryExecResult[] = [];
  async function query(parts: string[], ...binds: string[]) {
    results.push(...(await database).exec(parts.join("?"), binds));
  }
  const func = new Function("query", `return (async () => {${code}})()`);
  await func(query);
  return results;
}

function useSqlite(database: Uint8Array) {
  const instance = useRef<Database>();
  const promise = useRef(
    initSqlite().then(
      (sqlite) => (instance.current = new sqlite.Database(database))
    )
  );
  useEffect(() => () => instance.current?.close(), [database]);
  return promise.current;
}

const exampleCode = `
return query\`SELECT * FROM users WHERE col1 = \${1}\`;
`.replace(/\n/, "");

export interface Props {
  database: Uint8Array;
}

export default function Editor({ database }: Props) {
  const sqlite = useSqlite(database);
  const [code, setCode] = useState(exampleCode);
  const [results, setResults] = useState<QueryExecResult[]>([]);
  useEffect(() => {
    run(sqlite, code).then(
      (result) => {
        setResults(result);
      },
      () => {}
    );
  }, [sqlite, code]);
  return (
    <div className={styles.card}>
      <h1 className={styles.title}>QueryX</h1>
      <h2 className={styles.tagline}>
        A Javascript tool for composing and
        <br />
        executing SQL queries
      </h2>
      <div className={styles.editor}>
        <CodeContainer className={styles.codeContainer}>
          <CodeEditor
            value={code}
            onValueChange={setCode}
            highlight={(code) => (
              <CodeContent language="javascript">{code}</CodeContent>
            )}
          />
        </CodeContainer>
      </div>
      <div className={styles.results}>
        {results.map((result, index) => (
          <table key={index}>
            <tbody>
              <tr>
                {result.columns.map((column, index) => (
                  <th key={index}>{column}</th>
                ))}
              </tr>
              {result.values.map((values, index) => (
                <tr key={index}>
                  {values.map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
}
