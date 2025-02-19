"use client";

import { DndListHandle } from "@/components/DndListHandle/DndListHandle";
import { Todo } from "@/helpers/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [testData, setTestData] = useState<null | Todo[]>(null);

  useEffect(() => {
    fetch("https://dummyjson.com/test")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTestData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <main>
        <DndListHandle todos={testData} />
      </main>
    </div>
  );
}
