import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Board, Column } from "@/shared/types/types";
import { Expense } from "@/entities/entities";

type BoardState = {
  bank: string;
  search: string;
  board: Board;
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
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBank: (state, action: PayloadAction<string>) => {
      state.bank = action.payload;
    },
    addColumn: (state, action: PayloadAction<Column>) => {
      // todo
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

      // return { ...state, expenses: action.payload };
    },
  },
});

export const { addColumn, setColumnOrder, setBank, setExpenses, setColumns } =
  boardSlice.actions;
export default boardSlice.reducer;
