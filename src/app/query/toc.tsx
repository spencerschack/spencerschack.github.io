"use client";

import minBy from "lodash/minBy";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface Props {
  titles: string[];
}

export default function TOC({ titles }: Props) {
  const [intersect, setIntersect] = useState<string>(titles[0]);
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
    for (const title of titles) {
      const element = document.getElementById(encodeURIComponent(title));
      if (!element) continue;
      observer.observe(element);
    }
    return () => observer.disconnect();
  }, [titles]);
  return titles.map((title) => (
    <li key={title}>
      <a
        href={"#" + encodeURIComponent(title)}
        className={
          intersect === encodeURIComponent(title) ? styles.intersect : undefined
        }
      >
        {title}
      </a>
    </li>
  ));
}
