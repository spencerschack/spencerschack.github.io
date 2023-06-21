import Prism, { Grammar, Token as PrismToken } from "prismjs";
import styles from "./styles.module.css";
import normalizeTokens from "./normalizeTokens";

type EnvConfig = {
  code: string;
  grammar: Grammar;
  language: string;
  tokens: (string | PrismToken)[];
};

export interface Props {
  children: string;
  language: "javascript";
  highlight?: string;
  className?: string;
}

function parseHighlight(highlight: string = "") {
  if (highlight === "") return () => false;
  const parts = highlight.split(",");
  const lines = parts.flatMap((part) => {
    if (part.includes("-")) {
      const [min, max] = part.split("-").map(Number);
      return new Array(max - min + 1).fill(0).map((_, index) => index + min);
    } else {
      return Number(part);
    }
  });
  return (line: number) => lines.includes(line);
}

function useTokenize(language: string, code: string) {
  const grammar = Prism.languages[language];
  const config: EnvConfig = {
    code,
    grammar,
    language,
    tokens: [],
  };
  Prism.hooks.run("before-tokenize", config);
  config.tokens = Prism.tokenize(code, grammar);
  Prism.hooks.run("after-tokenize", config);
  return normalizeTokens(config.tokens);
}

export default function Content({ children, language, highlight }: Props) {
  const code = children.replace(/\n$|^\n/g, "");
  const tokens = useTokenize(language, code);
  const isHighlit = parseHighlight(highlight);
  return tokens.map((line, index) => (
    <div
      key={index}
      className={[
        styles.line,
        isHighlit(index + 1) ? styles.highlight : "",
      ].join(" ")}
    >
      {line.map((token, index) => (
        <span
          key={index}
          className={token.types.map((type) => styles[type]).join(" ")}
        >
          {token.content}
        </span>
      ))}
    </div>
  ));
}
