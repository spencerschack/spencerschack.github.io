import { Database, QueryExecResult } from "sql.js/dist/sql-asm";
import makeQuery, { ToQuery, toQuery } from "../query";

const query = makeQuery(async function* () {});

type Executor = (q: typeof query) => ToQuery<string | number>;

export default function exec(database: Database, code: string) {
  const func = new Function("query", code) as Executor;
  const result = func(query);
  if (result && typeof result === "object" && toQuery in result) {
    const [parts, binds] = result[toQuery]();
    const results = database.exec(parts.join("?"), binds);
    return results[0];
  }
}
