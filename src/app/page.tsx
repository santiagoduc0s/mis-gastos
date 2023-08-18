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
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
} from "@nextui-org/react";
import UploadFile from "../components/UploadFile";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

import { Board } from "../components/components";
import { useAppDispatch, useAppSelector } from "@/store";
import { setBank, setColumnOrder, setColumns } from "@/store/slices";
import { useState } from "react";
import { Expense } from "@/entities/Expense";
import { Board as BoardType } from "@/shared/types/Board";
import { formatNumber } from "@/helpers/formats";

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      // backgroundColor: [
      //   "rgba(255, 99, 132, 0.2)",
      //   "rgba(54, 162, 235, 0.2)",
      //   "rgba(255, 206, 86, 0.2)",
      //   "rgba(75, 192, 192, 0.2)",
      //   "rgba(153, 102, 255, 0.2)",
      //   "rgba(255, 159, 64, 0.2)",
      // ],
      // borderColor: [
      //   "rgba(255, 99, 132, 1)",
      //   "rgba(54, 162, 235, 1)",
      //   "rgba(255, 206, 86, 1)",
      //   "rgba(75, 192, 192, 1)",
      //   "rgba(153, 102, 255, 1)",
      //   "rgba(255, 159, 64, 1)",
      // ],
      borderWidth: 1,
    },
  ],
};

const initialBoard: BoardType = {
  expenses: {
    "1": new Expense("1", "Test 1", 143),
    "2": new Expense("2", "Test 2", 2345),
    "3": new Expense("3", "Test 3", 33),
    "4": new Expense("4", "Test 4", 45),
    "5": new Expense("5", "Test 5", 566),
    "6": new Expense("6", "Test 6", 66666),
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

function randomColor(opacity = 1) {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function sumExpenses(board: BoardType): { [key: string]: number } {
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
}

function generateId(length = 10) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { bank, board } = useAppSelector((state) => state.board);

  const [value, setValue] = useState("");

  const addColumn = (name: string) => {
    const newColumn = {
      id: generateId(),
      title: name,
      expenseIds: [],
    };

    dispatch(
      setColumns({
        ...board.columns,
        [newColumn.id]: newColumn,
      })
    );

    dispatch(setColumnOrder([...board.columnOrder, newColumn.id]));
  };

  const handleSetValue = (value: string) => {

    if (value.endsWith("\n") && value.trim() !== "") {
      addColumn(value);
      setValue("");
      return;
    }

    setValue(value);
  };

  const valueExp = sumExpenses(board);

  // Genera los colores base aleatorios
  const baseColors = Object.values(valueExp).map(() => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return { r, g, b };
  });

  const dataPie = {
    labels: Object.keys(valueExp).map((id) => board.columns[id].title),
    datasets: [
      {
        label: "# of Votes",
        data: Object.values(valueExp),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 129, 102, 0.2)",
          "rgba(54, 132, 205, 0.2)",
          "rgba(255, 226, 76, 0.2)",
          "rgba(95, 182, 182, 0.2)",
          "rgba(133, 92, 245, 0.2)",
          "rgba(179, 219, 91, 0.2)",
          "rgba(210, 85, 85, 0.2)",
          "rgba(52, 73, 94, 0.2)",
          "rgba(241, 196, 15, 0.2)",
          "rgba(231, 76, 60, 0.2)",
          "rgba(26, 188, 156, 0.2)",
          "rgba(46, 204, 113, 0.2)",
          "rgba(230, 126, 34, 0.2)",
          "rgba(155, 89, 182, 0.2)",
          "rgba(52, 152, 219, 0.2)",
          "rgba(127, 140, 141, 0.2)",
          "rgba(3, 169, 244, 0.2)",
          "rgba(0, 150, 136, 0.2)",
          "rgba(156, 39, 176, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 129, 102, 1)",
          "rgba(54, 132, 205, 1)",
          "rgba(255, 226, 76, 1)",
          "rgba(95, 182, 182, 1)",
          "rgba(133, 92, 245, 1)",
          "rgba(179, 219, 91, 1)",
          "rgba(210, 85, 85, 1)",
          "rgba(52, 73, 94, 1)",
          "rgba(241, 196, 15, 1)",
          "rgba(231, 76, 60, 1)",
          "rgba(26, 188, 156, 1)",
          "rgba(46, 204, 113, 1)",
          "rgba(230, 126, 34, 1)",
          "rgba(155, 89, 182, 1)",
          "rgba(52, 152, 219, 1)",
          "rgba(127, 140, 141, 1)",
          "rgba(3, 169, 244, 1)",
          "rgba(0, 150, 136, 1)",
          "rgba(156, 39, 176, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="my-5 md:container md:mx-auto">
        <Card>
          <CardHeader>
            <div className="text-center">
              <h1 className="text-4xl font-semibold text-center p-6 ">
                Analiza tu estado de cuenta
              </h1>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex justify-between mt-3">
              <div className="w-1/3 pr-2 mb-2">
                <Dropdown>
                  <DropdownTrigger>
                    <Button className="w-full" variant="bordered">
                      {bank.length > 0 ? bank : "Banco"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Action event example"
                    onAction={(key) => dispatch(setBank(key as string))}
                  >
                    <DropdownItem key="Santander">Santander</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="w-2/3 pl-2">
                {bank.length > 0 ? <UploadFile /> : null}
              </div>
            </div>
          </CardBody>
        </Card>

        {Object.keys(board.expenses).length ? (
          <Card className="mt-4">
            <Divider />
            <CardBody>
              <Textarea
                value={value}
                onValueChange={handleSetValue}
                maxRows={1}
                placeholder="Ingresa una nueva columna"
              />
            </CardBody>
          </Card>
        ) : null}
      </div>
      <div className="mx-2 mb-5">
        {Object.keys(board.expenses).length ? (
          <>
            <Board />

            <div className="columns-2 mt-5">
              <Table>
                <TableHeader>
                  {...board.columnOrder.map((col) => {
                    const column = board.columns[col];
                    return (
                      <TableColumn key={`table-${column.title}`}>
                        {column.title}
                      </TableColumn>
                    );
                  })}
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    {...board.columnOrder.map((col) => {
                      const value = valueExp[col];
                      return (
                        <TableCell key={`table-item-${col}`}>
                          {formatNumber(value)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableBody>
              </Table>
              <div>
                <Pie data={dataPie} />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
