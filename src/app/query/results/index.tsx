"use client";

import { QueryExecResult } from "sql.js";
import styles from "./styles.module.css";

export interface Props {
  results: QueryExecResult;
}

export default function Results({ results }: Props) {
  return (
    <div className={styles.results}>
      <div className={styles.shadow} />
      <table>
        <tbody>
          <tr>
            {results.columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
          {results.values.map((values, index) => (
            <tr key={index}>
              {values.map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
