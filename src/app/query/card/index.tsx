"use client";

import { useEffect, useState } from "react";
import type { Database, QueryExecResult } from "sql.js/dist/sql-asm";
import styles from "./styles.module.css";
import Results from "../results";
import Editor from "../editor";
import exec from "../database/exec";
import ErrorMessage from "./errorMessage";
import LoadButton from "./loadButton";

async function loadDatabaseClass(signal: AbortSignal) {
  const mod = await import("sql.js/dist/sql-asm");
  signal.throwIfAborted();
  const { Database } = await mod.default();
  return Database;
}

async function loadDatabaseData(signal: AbortSignal) {
  const response = await fetch("/query/database", { signal });
  signal.throwIfAborted();
  const buffer = await response.arrayBuffer();
  return new Uint8Array(buffer);
}

async function loadDatabase(signal: AbortSignal) {
  const [Database, data] = await Promise.all([
    loadDatabaseClass(signal),
    loadDatabaseData(signal),
  ]);
  signal.throwIfAborted();
  const database = new Database(data);
  signal.addEventListener("abort", () => database.close());
  return database;
}

function useDatabase(load: boolean) {
  const [database, setDatabase] = useState<Database>();
  useEffect(() => {
    if (!load) return;
    const controller = new AbortController();
    (async () => {
      try {
        const database = await loadDatabase(controller.signal);
        controller.signal.throwIfAborted();
        setDatabase(database);
      } catch (e) {}
    })();
    return () => controller.abort();
  }, [load]);
  return database;
}

export interface Props {
  initialResults: QueryExecResult;
  initialCode: string;
}

export default function Card({ initialResults, initialCode }: Props) {
  const [load, setLoad] = useState(false);
  const database = useDatabase(load);
  const [code, setCode] = useState(initialCode);
  const [lastResults, setLastResults] =
    useState<QueryExecResult>(initialResults);
  const [result, setResult] = useState<ReturnType<typeof exec>>({
    type: "result",
    value: initialResults,
  });
  useEffect(() => {
    if (!database) return;
    const result = exec(database, code);
    setResult(result);
    if (result.type === "result") setLastResults(result.value);
  }, [database, code]);
  return (
    <section id="Demo" className={styles.container}>
      <div className={styles.card}>
        <div className={styles.side}>
          <h1 className={styles.title}>QueryX</h1>
          <h2 className={styles.tagline}>
            A Javascript tool for composing and executing SQL queries
          </h2>
        </div>
        <div className={styles.main}>
          <div className={styles.editor}>
            <Editor code={code} setCode={setCode} />
            <LoadButton load={load} database={!!database} setLoad={setLoad} />
          </div>
          <div className={styles.results}>
            {result.type !== "result" && <ErrorMessage {...result} />}
            <Results results={lastResults} />
          </div>
        </div>
      </div>
    </section>
  );
}
