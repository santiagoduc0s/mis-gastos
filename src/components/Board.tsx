"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

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
import { useState } from "react";
import { Expense } from "@/entities/entities";
import { Board } from "@/shared/types/types";
import { Column } from "@/components/components";
import { useAppDispatch, useAppSelector } from "@/store";
import { setColumnOrder, setColumns } from "@/store/slices";

const initialBoard: Board = {
  expenses: {
    "1": new Expense("1", "Test 1", 1),
    "2": new Expense("2", "Test 2", 2),
    "3": new Expense("3", "Test 3", 3),
    "4": new Expense("4", "Test 4", 4),
    "5": new Expense("5", "Test 5", 5),
    "6": new Expense("6", "Test 6", 6),
    "7": new Expense("7", "Test 7", 7),
    "8": new Expense("8", "Test 8", 8),
    "9": new Expense("9", "Test 9", 9),
    "10": new Expense("10", "Test 10", 10),
  },
  columns: {
    expenses: {
      id: "expenses",
      title: "Gastos",
      expenseIds: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    supermercado: {
      id: "supermercado",
      title: "Supermercado",
      expenseIds: [],
    },
    viaje: {
      id: "viaje",
      title: "Viaje",
      expenseIds: [],
    },
  },
  columnOrder: ["expenses", "supermercado", "viaje"],
};

export function Board() {
  const dispatch = useAppDispatch();
  const { board } = useAppSelector((state) => state.board);

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) return;

    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    )
      return;

    if (type == "column") {
      const newColumnOrder = Array.from(board.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...board,
        columnOrder: newColumnOrder,
      };

      dispatch(setColumnOrder(newColumnOrder));

      return;
    }

    const sourceColumn = board.columns[source.droppableId];
    const destinationColumn = board.columns[destination.droppableId];

    if (source.droppableId === destination.droppableId) {
      const newExpenseIds = Array.from(sourceColumn.expenseIds);

      // elimino al elemento de la posicion de origin
      newExpenseIds.splice(source.index, 1);

      // inserto el elemento movido en la nueva posicion
      newExpenseIds.splice(destination.index, 0, draggableId);

      // creo la nueva columna con la info actualizada
      const newColumn = { ...sourceColumn, expenseIds: newExpenseIds };

      const newState = {
        ...board,
        columns: {
          ...board.columns,
          [newColumn.id]: newColumn,
        },
      };

      dispatch(
        setColumns({
          ...board.columns,
          [newColumn.id]: newColumn,
        })
      );

      return;
    }

    // elimino al elemento de la posicion de origin
    const sourceExpenseIds = Array.from(sourceColumn.expenseIds);
    sourceExpenseIds.splice(source.index, 1);

    // inserto el elemento movido en la nueva posicion
    const destinationExpenseIds = Array.from(destinationColumn.expenseIds);
    destinationExpenseIds.splice(destination.index, 0, draggableId);

    // creo la nueva columna con la info actualizada
    const newSourceColumn = { ...sourceColumn, expenseIds: sourceExpenseIds };
    const newDestinationColumn = {
      ...destinationColumn,
      expenseIds: destinationExpenseIds,
    };

    const newState = {
      ...board,
      columns: {
        ...board.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      },
    };

    dispatch(
      setColumns({
        ...board.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      })
    );

    return;
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div
        className="w-full"
        style={{
          // display: 'flex',
          // flexDirection: 'row',
          overflowX: "scroll", // <-- Añade overflow-x aquí
          overflowY: "hidden", // <-- Añade overflow-x aquí
        }}
      >
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-full"
              style={{
                display: "flex",
                flexDirection: "row",
                // overflowX: 'scroll',   // <-- Añade overflow-x aquí
                // overflowY: 'hidden',   // <-- Añade overflow-x aquí
              }}
            >
              {board.columnOrder.map((columnId, index) => {
                const column = board.columns[columnId];
                const expenses = column.expenseIds.map(
                  (expenseId) => board.expenses[expenseId]
                );

                return (
                  <Column
                    key={columnId}
                    column={column}
                    expenses={expenses}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
