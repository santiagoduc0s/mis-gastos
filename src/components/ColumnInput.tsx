import { useAppDispatch, useAppSelector } from "@/store";
import { setColumnOrder, setColumns } from "@/store/slices";
import { Card, CardBody, Divider, Textarea } from "@nextui-org/react";
import { useState } from "react";

function generateId(length = 10) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const ColumnInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const { board } = useAppSelector((state) => state.board);
  
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
  return (
    <Card>
      <CardBody>
        <Textarea
          value={value}
          onValueChange={handleSetValue}
          maxRows={1}
          placeholder="Ingrese una nueva columna"
        />
      </CardBody>
    </Card>
  );
};
