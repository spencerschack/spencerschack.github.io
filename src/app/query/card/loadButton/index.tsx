import { useEffect, useState } from "react";
import styles from "./styles.module.css";

function Spinner() {
  const chars = "–\\|/";
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => (index + 1) % chars.length);
    }, 150);
    return () => clearInterval(interval);
  });
  return chars[index];
}

interface Props {
  load: boolean;
  database: boolean;
  setLoad: (load: boolean) => void;
}

export default function LoadButton({ load, database, setLoad }: Props) {
  let icon;
  let text;
  if (load && database) {
    icon = "✔";
  } else if (load && !database) {
    icon = <Spinner />;
    text = "Loading";
  } else {
    icon = ">";
    text = "Load Live Demo";
  }
  return (
    <button
      onClick={() => setLoad(true)}
      disabled={load}
      className={styles.loadContainer}
      {...(database && { "data-database": true })}
    >
      <div className={styles.loadButton}>
        <span className={styles.loadButtonIcon}>{icon}</span> {text}
      </div>
    </button>
  );
}
