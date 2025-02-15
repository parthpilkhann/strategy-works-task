import styles from "./page.module.css";
import { DndListHandle } from "@/components/DndListHandle/DndListHandle";
import { myTodos } from "@/helpers/content";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <DndListHandle todos={myTodos} />
      </main>
    </div>
  );
}
