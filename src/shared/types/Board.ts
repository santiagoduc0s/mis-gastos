import { Expense } from "@/entities/Expense";
import { Column } from "@/shared/types/types";

export type Board = {
  expenses: {
    [key: string]: Expense;
  };
  columns: {
    [key: string]: Column;
  };
  columnOrder: string[];
};
