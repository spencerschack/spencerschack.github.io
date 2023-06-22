import CodeEditor from "react-simple-code-editor";
import styles from "./styles.module.css";
import CodeContainer from "../../code/container";
import CodeContent from "../../code/content";

export interface Props {
  code: string;
  setCode: (code: string) => void;
}

export default function Editor({ code, setCode }: Props) {
  return (
    <div className={styles.editor}>
      <CodeContainer>
        <CodeEditor
          value={code}
          onValueChange={setCode}
          highlight={(code) => (
            <CodeContent language="javascript">{code}</CodeContent>
          )}
          className={styles.textarea}
        />
      </CodeContainer>
    </div>
  );
}
