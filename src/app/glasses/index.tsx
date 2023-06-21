"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

function quantile(coordinate: number) {
  return Math.min(2, Math.max(-2, Math.round(coordinate * 4)));
}

export default function Glasses() {
  const [column, setColumn] = useState(0);
  const [row, setRow] = useState(0);
  const element = useRef<HTMLElement | null>(null);
  useEffect(() => {
    window.addEventListener("mousemove", handler);
    function handler(event: MouseEvent) {
      if (!element.current?.offsetParent) return;
      const parentRect = element.current.offsetParent.getBoundingClientRect();
      const x =
        parentRect.left +
        element.current.offsetLeft +
        element.current.clientWidth / 2;
      const y =
        parentRect.top +
        element.current.offsetTop +
        element.current.clientHeight / 2;
      setColumn(quantile((event.pageX - x) / window.innerWidth));
      setRow(quantile((event.pageY - y) / window.innerHeight));
    }
    return () => window.removeEventListener("mousemove", handler);
  });
  return (
    <figure
      ref={element}
      className={styles.glasses}
      style={{
        "--background-position": (row + 2 + Math.abs(column) * 5) / 14,
        "--scale-x": column < 0 ? -1 : 1,
      }}
    ></figure>
  );
}