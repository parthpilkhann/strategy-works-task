"use client";
import React, { useEffect, useState } from "react";
import { DndListHandle } from "../DndListHandle/DndListHandle";
import { Todo } from "@/helpers/types";

function LargestPageContentful() {
  const [testData, setTestData] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/todos");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTestData(data.todos);
      } catch (error) {
        console.error("Error fetching data:", error);
        setTestData([]); // Set empty array as fallback
      }
    };

    fetchData();
  }, []);
  console.log("WWWWWWWWWw", testData);
  return (
    <div>
      <DndListHandle todos={testData} />
    </div>
  );
}

export default LargestPageContentful;
