import styles from "./styles.module.css";
import { ReactNode } from "react";

export interface Props {
  children: ReactNode;
  highlit?: boolean;
}

export default function Container({ children, highlit = false }: Props) {
  return (
    <div
      className={[styles.container, highlit ? styles.highlit : null]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
