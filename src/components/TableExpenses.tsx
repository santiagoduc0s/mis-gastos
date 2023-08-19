import { formatNumber } from "@/helpers";
import { useAppSelector } from "@/store";
import { getSumExpenses } from "@/store/slices";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

export const TableExpenses: React.FC = () => {
  const { board } = useAppSelector((state) => state.board);

  const valueExp = getSumExpenses(board);

  return (
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
  );
};
