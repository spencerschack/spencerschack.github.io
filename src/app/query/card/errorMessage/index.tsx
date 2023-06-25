import styles from "./styles.module.css";

export default function ErrorMessage({
  type,
  value,
}: {
  type: "js_error" | "sql_error" | "return_error";
  value: any;
}) {
  let title;
  let description;
  if (value instanceof Error) {
    description = value.name + ": " + value.message;
  } else {
    description = JSON.stringify(value);
  }
  switch (type) {
    case "js_error":
      title = "Javasript Error";
      break;
    case "sql_error":
      title = "SQL Error";
      break;
    case "return_error":
      description = "Return a query to see the results";
      break;
  }
  return (
    <div className={styles.errorContainer}>
      <div className={styles.error}>
        {title && <div className={styles.errorTitle}>{title}</div>}
        {description}
      </div>
    </div>
  );
}
