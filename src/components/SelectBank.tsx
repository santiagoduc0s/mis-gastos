import { useAppDispatch, useAppSelector } from "@/store";
import { setBank } from "@/store/slices";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

export const SelectBank: React.FC = () => {
  const dispatch = useAppDispatch();
  const { bank } = useAppSelector((state) => state.board);

  return (
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
  );
};
