import { Expense } from "@/entities/entities";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import React from "react";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
  DraggableRubric,
} from "@hello-pangea/dnd";

export const ItemColumn: React.FC<{
  expense: Expense;
  index: number;
}> = ({ expense, index }) => {
  return (
    <Draggable draggableId={expense.id} index={index}>
      {(
        provided: DraggableProvided,
        snapshot: DraggableStateSnapshot,
        rubic: DraggableRubric
      ) => (
        <article
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="pb-2">
            <div
              className={
                snapshot.isDragging
                  ? "bg-white border-2 rounded-xl border-sky-300"
                  : "bg-white border-2 rounded-xl"
              }
            >
              <div className="p-4">
                <p
                // className={snapshot.isDragging ? 'text-white' : ''}
                >
                  {`${expense.description} | `}
                  <b>{`$${expense.amount}`}</b>
                </p>
              </div>
            </div>
          </div>
        </article>
      )}
    </Draggable>
  );
};
