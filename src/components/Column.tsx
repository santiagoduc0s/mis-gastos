import { Expense } from "@/entities/entities";
import { Column as ColumnParam } from "@/shared/types/types";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { ItemColumn } from "@/components/components";

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
        <div style={{ minWidth: 300, maxWidth: 300 }}>
          <Droppable droppableId={column.id} type="expense">
            {(
              provided: DroppableProvided,
              snapshot: DroppableStateSnapshot
            ) => (
              <div
                className={
                  snapshot.isDraggingOver
                    ? "bg-white h-full border-2 rounded-xl border-2 rounded-xl border-sky-300"
                    : "bg-white h-full border-2 rounded-xl"
                }
                {...providedDrag.draggableProps}
                {...providedDrag.dragHandleProps}
                ref={providedDrag.innerRef}
              >
                <div className="text-center py-2 border-b-2">
                  <p className="text-md">{column.title}</p>
                </div>

                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className=" p-3 h-full"
                >
                  {expenses.map((e, index) => (
                    <ItemColumn key={e.id} expense={e} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
