import { Expense } from "@/entities";

export class ExpenseMapper {
  static santanderRowToExpenseEntity(data: Array<string>): Expense {
    const id = data[1];
    const description = data[2];
    const amount = Math.abs(parseFloat(data[4]));
    return new Expense(id, description, amount);
  }
}
