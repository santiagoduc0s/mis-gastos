import { Expense } from "@/entities";
import { Column as ColumnParam } from "@/shared/types";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { ItemColumn } from "@/components";

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

type ColumnProps = {
  column: ColumnParam;
  expenses: Expense[];
  index: number;
};

export const Column: React.FC<ColumnProps> = ({ column, expenses, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(
        providedDrag: DraggableProvided,
        snapshotDrag: DraggableStateSnapshot,
        rubicDrag: DraggableRubric
      ) => (
        <Droppable droppableId={column.id} type="expense">
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <div
              className={
                snapshot.isDraggingOver
                  ? "bg-white h-full border-2 rounded-xl border-2 rounded-xl border-sky-300"
                  : "bg-white h-full border-2 rounded-xl"
              }
              {...providedDrag.draggableProps}
              ref={providedDrag.innerRef}
            >
              <div style={{ minWidth: 300, maxWidth: 300, minHeight: 200 }}>
                <div
                  {...providedDrag.dragHandleProps}
                  className="text-center py-2 border-b-2"
                >
                  <p className="text-md">{column.title}</p>
                </div>

                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="p-3"
                >
                  {expenses.map((e, index) => (
                    <ItemColumn key={e.id} expense={e} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            </div>
          )}
        </Droppable>
      )}
    </Draggable>
  );
};
