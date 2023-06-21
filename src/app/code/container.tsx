import styles from "./styles.module.css";
import { ReactNode } from "react";

export interface Props {
  children: ReactNode;
  className?: string;
  highlit?: boolean;
}

export default function Container({
  className,
  children,
  highlit = false,
}: Props) {
  return (
    <div
      className={[styles.container, className, highlit ? styles.highlit : null]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
