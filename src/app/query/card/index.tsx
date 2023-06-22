"use client";

import { useEffect, useState } from "react";
import type { Database, QueryExecResult } from "sql.js/dist/sql-asm";
import styles from "./styles.module.css";
import Results from "../results";
import Editor from "../editor";
import exec from "../database/exec";
import classNames from "classnames";

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
  const [results, setResults] = useState<QueryExecResult>(initialResults);
  useEffect(() => {
    if (database) {
      const results = exec(database, code);
      if (results) setResults(results);
    }
  }, [database, code]);
  return (
    <div className={styles.card}>
      <h1 className={styles.title}>QueryX</h1>
      <h2 className={styles.tagline}>
        A Javascript tool for composing and
        <br />
        executing SQL queries
      </h2>
      <div className={styles.editor}>
        <Editor code={code} setCode={setCode} />
        <button
          onClick={() => setLoad(true)}
          disabled={load}
          className={styles.loadContainer}
          {...(database && { "data-database": true })}
        >
          <div className={styles.loadButton}>
            {load
              ? database
                ? "Demo loaded"
                : "Loading..."
              : "Load live demo"}
          </div>
        </button>
      </div>
      <div className={styles.results}>
        <Results results={results} />
      </div>
    </div>
  );
}
