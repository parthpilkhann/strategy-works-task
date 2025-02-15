"use client";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { IconGripVertical } from "@tabler/icons-react";
import cx from "clsx";
import { Text } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import classes from "./DndListHandle.module.css";
import { Todo } from "@/helpers/types";

export function DndListHandle({ todos }: { todos: Todo[] }) {
  const [state, handlers] = useListState(todos);

  const items = state.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.id.toString()}>
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
            <Text>{item.todo.slice(0, 45)}</Text>
          </div>
        </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
      }
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
