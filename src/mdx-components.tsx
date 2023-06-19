import type { MDXComponents } from "mdx/types";
import Code from "./app/code";

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    ...components,
    pre(rawProps) {
      const props = rawProps as {
        children: {
          props: {
            children: string;
            className?: string;
          };
        };
        className?: string;
        highlight?: string;
      };
      const language = props.children.props.className?.replace("language-", "");
      return (
        <Code
          className={props.className}
          language={language}
          highlight={props.highlight}
        >
          {props.children.props.children}
        </Code>
      );
    },
  };
}
