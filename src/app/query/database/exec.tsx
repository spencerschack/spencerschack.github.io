import { Database, QueryExecResult } from "sql.js/dist/sql-asm";
import makeQuery, { ToQuery, toQuery } from "../query";

const query = makeQuery(async function* () {});

type Executor = (q: typeof query) => ToQuery<string | number>;

export default function exec(database: Database, code: string) {
  try {
    const func = new Function("$", code) as Executor;
    const result = func(query);
    if (result && typeof result === "object" && toQuery in result) {
      const [parts, binds] = result[toQuery]();
      try {
        const result = database.exec(parts.join("?"), binds)[0];
        if (!result)
          return { type: "sql_error", value: new Error("No results") } as const;
        return { type: "result", value: result } as const;
      } catch (error) {
        return { type: "sql_error", value: error } as const;
      }
    } else {
      return { type: "return_error", value: result as any } as const;
    }
  } catch (error) {
    return { type: "js_error", value: error } as const;
  }
}
