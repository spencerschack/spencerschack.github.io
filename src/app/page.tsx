import Image from "next/image";
import { Montserrat } from "next/font/google";
import Glasses from "./glasses";
import styles from "./page.module.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <>
      <Glasses />
      <div className={styles.container}>
        <div className={styles.card + " " + montserrat.className}>
          <h2 className={styles.title}>Zenvas</h2>
          <Image
            src="/images/zenvas.png"
            width={320}
            height={180}
            alt="A screenshot of the zenvas project"
            unoptimized
          />
        </div>
      </div>
    </>
  );
}
