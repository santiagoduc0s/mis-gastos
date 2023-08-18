export class Expense {
  constructor(
    public readonly id: string,
    public readonly description: string,
    public readonly amount: number
  ) {
    if (this.amount < 0)
      throw new Error("El valor del amount debe ser mayor a cero");
  }

  toObject() {
    return { ...this };
  }
}
