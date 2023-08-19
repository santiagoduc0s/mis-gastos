import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Board, Column } from "@/shared/types";
import { Expense } from "@/entities";

type BoardState = {
  bank: string;
  search: string;
  board: Board;
};

const initialBoardTest = {
  expenses: {
    "1": new Expense("1", "Test 1", 143),
    "2": new Expense("2", "Test 2", 234),
    "3": new Expense("3", "Test 3", 33),
    "4": new Expense("4", "Test 4", 45),
    "5": new Expense("5", "Test 5", 566),
    "6": new Expense("6", "Test 6", 666),
    "7": new Expense("7", "Test 7", 73),
    "8": new Expense("8", "Test 8", 83),
    "9": new Expense("9", "Test 9", 922),
    "10": new Expense("10", "Test 10", 102),
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

const initialState: BoardState = {
  bank: "",
  search: "",
  board: {
    expenses: {},
    columns: {
      expenses: {
        id: "expenses",
        title: "Gastos",
        expenseIds: [],
      },
    },
    columnOrder: ["expenses"],
  },
  // board: initialBoardTest,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBank: (state, action: PayloadAction<string>) => {
      state.bank = action.payload;
    },

    setColumnOrder: (state, action: PayloadAction<string[]>) => {
      (state.board as Board).columnOrder = action.payload;
    },

    setColumns: (
      state,
      action: PayloadAction<{
        [key: string]: Column;
      }>
    ) => {
      (state.board as Board).columns = action.payload;
    },

    setExpenses: (
      state,
      action: PayloadAction<{
        [key: string]: Expense;
      }>
    ) => {
      (state.board as Board).expenses = action.payload;
      (state.board as Board).columns.expenses.expenseIds = Object.keys(
        action.payload
      );
    },

    clear: (state, _) => {
      state = initialState;
    },
  },
});

export const { setColumnOrder, setBank, setExpenses, setColumns, clear } =
  boardSlice.actions;
export const { reducer: boardReducer } = boardSlice;

export const getSumExpenses = (board: Board) => {
  const result: { [key: string]: number } = {};

  // Recorrer cada columna
  for (const columnId in board.columns) {
    const column = board.columns[columnId];
    let sum = 0;

    // Recorrer cada expenseId en la columna y sumar su valor
    for (const expenseId of column.expenseIds) {
      const expense = board.expenses[expenseId];
      if (expense) {
        sum += expense.amount;
      }
    }

    result[columnId] = sum;
  }

  return result;
};
