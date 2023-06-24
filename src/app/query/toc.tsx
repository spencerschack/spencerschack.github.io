"use client";

import minBy from "lodash/minBy";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import sections from "./sections";

const items = [{ title: "Demo" }, ...sections];

export default function TOC() {
  const [intersect, setIntersect] = useState<string>(items[0].title);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries.filter((entry) => entry.isIntersecting);
        const entry = minBy(entering, (entry) => entry.intersectionRect.top);
        if (!entry) return;
        setIntersect(entry.target.id);
      },
      {
        rootMargin: "0 0 -90% 0",
      }
    );
    for (const { title } of items) {
      const element = document.getElementById(encodeURIComponent(title));
      if (!element) continue;
      observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);
  return items.map((item) => (
    <li key={item.title}>
      <a
        href={"#" + encodeURIComponent(item.title)}
        className={
          intersect === encodeURIComponent(item.title)
            ? styles.intersect
            : undefined
        }
      >
        {item.title}
      </a>
    </li>
  ));
}
