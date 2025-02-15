import Image from "next/image";
import styles from "./page.module.css";
import { DndListHandle } from "@/components/DndListHandle/DndListHandle";
import { Group } from "@mantine/core";
import { myTodos } from "@/helpers/content";
import { Todo } from "@/helpers/types";

export default function Home() {
  const completedTodos = myTodos.filter((todo: Todo) => todo.completed);
  const inCompleteTodos = myTodos.filter((todo: Todo) => !todo.completed);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Group gap="xl">
          <DndListHandle todos={completedTodos} />
          <DndListHandle todos={inCompleteTodos} />
        </Group>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
