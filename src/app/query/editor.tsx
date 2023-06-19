"use client";

import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import sqlite3InitModule from "@sqlite.org/sqlite-wasm";

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

const log = (...args) => console.log(...args);
const error = (...args) => console.error(...args);

const start = function (sqlite3) {
  log("Running SQLite3 version", sqlite3.version.libVersion);
  const db = new sqlite3.oo1.DB("/mydb.sqlite3", "ct");
  // Your SQLite code here.
};

log("Loading and initializing SQLite3 module...");
sqlite3InitModule({
  print: log,
  printErr: error,
}).then((sqlite3) => {
  try {
    log("Done initializing. Running demo...");
    start(sqlite3);
  } catch (err) {
    error(err.name, err.message);
  }
});

function run(code: string) {
  const wrapper = `
    (async () => {
      function query(parts, ...binds) {
        return [parts, binds];
      }
      ${code}
    })().then(console.log, console.error);
  `;
  window.eval(wrapper);
}

export default function Editor() {
  return (
    <div>
      <CodeMirror
        value="return query`SELECT * FROM users`;"
        height="200px"
        extensions={[javascript({ jsx: true })]}
        onChange={run}
        theme={theme}
      />
    </div>
  );
}
