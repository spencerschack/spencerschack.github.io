"use client";

import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import { useEffect, useMemo, useRef, useState } from "react";
import initSqlite, { Database, QueryExecResult } from "sql.js/dist/sql-asm";
import styles from "./styles.module.css";

const theme = createTheme({
  theme: "light",
  settings: {
    background: "#ffffff",
    foreground: "#75baff",
    caret: "#5d00ff",
    selection: "#036dd626",
    selectionMatch: "#036dd626",
    lineHighlight: "#8a91991a",
    gutterBackground: "#fff",
    gutterForeground: "#8a919966",
  },
  styles: [
    { tag: t.comment, color: "#787b8099" },
    { tag: t.variableName, color: "#0080ff" },
    { tag: [t.string, t.special(t.brace)], color: "#5c6166" },
    { tag: t.number, color: "#5c6166" },
    { tag: t.bool, color: "#5c6166" },
    { tag: t.null, color: "#5c6166" },
    { tag: t.keyword, color: "#5c6166" },
    { tag: t.operator, color: "#5c6166" },
    { tag: t.className, color: "#5c6166" },
    { tag: t.definition(t.typeName), color: "#5c6166" },
    { tag: t.typeName, color: "#5c6166" },
    { tag: t.angleBracket, color: "#5c6166" },
    { tag: t.tagName, color: "#5c6166" },
    { tag: t.attributeName, color: "#5c6166" },
  ],
});

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
        <CodeMirror
          value={code}
          height="200px"
          extensions={[javascript({ jsx: true })]}
          onChange={setCode}
          theme="dark"
        />
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
