"use client";

// !Has some bugs open issues page
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  Droppable,
} from "@hello-pangea/dnd";
import { IconGripVertical } from "@tabler/icons-react";
import cx from "clsx";
import { Group, Paper, Stack, Text, Title } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import type { UseListStateHandlers } from "@mantine/hooks";
import classes from "./DndListHandle.module.css";
import { Todo } from "@/helpers/types";

export function DndListHandle({ todos }: { todos: Todo[] }) {
  const [completedTodos, completedTodoshandlers] = useListState(
    todos.filter((todo: Todo) => todo.completed)
  );
  const [inCompleteTodos, inCompleteTodoshandlers] = useListState(
    todos.filter((todo: Todo) => !todo.completed)
  );

  const completedTodosItems = completedTodos.map((item, index) => (
    <Draggable key={item.todo} index={index} draggableId={item.todo}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <IconGripVertical size={18} stroke={1.5} />
          </div>
          <div>
            <p>{item.id}</p>
            <Text>{item.todo?.slice(0, 45)}</Text>
          </div>
        </div>
      )}
    </Draggable>
  ));

  const inCompleteTodosItems = inCompleteTodos.map((item, index) => (
    <Draggable key={item.todo} index={index} draggableId={item?.todo}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <IconGripVertical size={18} stroke={1.5} />
          </div>
          <div>
            <p>{item.id}</p>
            <Text>{item.todo?.slice(0, 45)}</Text>
          </div>
        </div>
      )}
    </Draggable>
  ));

  function moveStuff(
    sourceHandlers: UseListStateHandlers<Todo>,
    destinationHandlers: UseListStateHandlers<Todo>,
    source: DraggableLocation<string>,
    destination: DraggableLocation<string>
  ) {
    destinationHandlers.insert(
      Number(destination?.index),
      (destination.droppableId === "inCompleteList"
        ? completedTodos
        : inCompleteTodos)[Number(source.index)]
    );
    sourceHandlers.remove(source.index, 1);
  }

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        if (!destination) return;
        if (source.droppableId === destination?.droppableId) {
          return completedTodoshandlers.reorder({
            from: source.index,
            to: destination?.index || 0,
          });
        } else {
          if (source.droppableId === "inCompleteList") {
            moveStuff(
              inCompleteTodoshandlers,
              completedTodoshandlers,
              source,
              destination
            );
          } else {
            moveStuff(
              completedTodoshandlers,
              inCompleteTodoshandlers,
              source,
              destination
            );
          }
          // completedTodoshandlers.remove(source.index, 1);
          // inCompleteTodoshandlers.insert(
          //   Number(destination?.index),
          //   completedTodos[Number(destination?.index)]
          // );
        }
      }}
    >
      <Group gap="xl">
        <Paper withBorder p="lg">
          <Stack>
            <Title>Completed</Title>
            <Droppable droppableId="completedList" direction="vertical">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {completedTodosItems}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>{" "}
          </Stack>
        </Paper>

        <Paper withBorder p="lg">
          <Stack>
            <Title>InComplete</Title>
            <Droppable droppableId="inCompleteList" direction="vertical">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {inCompleteTodosItems}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Stack>
        </Paper>
      </Group>
    </DragDropContext>
  );
}
