"use client";

import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  Droppable,
} from "@hello-pangea/dnd";
import { IconGripVertical, IconTrash } from "@tabler/icons-react";
import cx from "clsx";
import {
  Group,
  Paper,
  Stack,
  Text,
  Title,
  TextInput,
  Button,
  ActionIcon,
} from "@mantine/core";
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

  const [newUser, setNewUser] = useState<{
    title: string;
    description: string;
  }>({
    title: "",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = () => {
    const newTodo: Todo = {
      userId: Math.random(),
      id: Math.random(),
      todo: newUser.title,
      completed: false,
    };

    inCompleteTodoshandlers.append(newTodo);
    setNewUser({ title: "", description: "" });
  };

  const handleDeleteTodo = (id: number, completed: boolean) => {
    if (completed) {
      const index = completedTodos.findIndex((todo) => todo.id === id);
      completedTodoshandlers.remove(index);
    } else {
      const index = inCompleteTodos.findIndex((todo) => todo.id === id);
      inCompleteTodoshandlers.remove(index);
    }
  };

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
          <Group>
            <Text>{item.todo?.slice(0, 45)}</Text>
            <ActionIcon
              color="red"
              onClick={() => handleDeleteTodo(item.id, true)}
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Group>
        </div>
      )}
    </Draggable>
  ));

  const inCompleteTodosItems = inCompleteTodos.map((item, index) => (
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
          <Group>
            <Text>{item.todo?.slice(0, 45)}</Text>
            <ActionIcon
              color="red"
              onClick={() => handleDeleteTodo(item.id, false)}
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Group>
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
            <TextInput
              label="Title"
              placeholder="Enter title"
              name="title"
              value={newUser.title}
              onChange={handleInputChange}
            />
            <TextInput
              label="Description"
              placeholder="Enter description"
              name="description"
              value={newUser.description}
              onChange={handleInputChange}
            />
            <Button onClick={handleAddUser}>Add User</Button>
          </Stack>
        </Paper>
      </Group>
    </DragDropContext>
  );
}
