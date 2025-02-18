import { DndListHandle } from "@/components/DndListHandle/DndListHandle";
import { myTodos } from "@/helpers/content";

export default function Home() {
  return (
    <div>
      <main>
        <DndListHandle todos={myTodos} />
      </main>
    </div>
  );
}
