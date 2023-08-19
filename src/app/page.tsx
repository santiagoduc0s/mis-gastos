"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import {
  Board,
  ColumnInput,
  PieChart,
  SelectBank,
  TableExpenses,
  UploadFile,
} from "@/components";

export default function HomePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const size = "4xl";

  const ModalPie = () => (
    <Modal size={size} isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Gráfica de barras
            </ModalHeader>
            <Divider />
            <ModalBody>
              <div className="flex justify-center">
                <div className="mt-5 w-1/2 pb-5">
                  <PieChart />
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );

  return (
    <>
      <div className="py-5 md:container md:mx-auto">
        <Card>
          <CardHeader>
            <div className="text-center w-full">
              <h1 className="bold text-center font-semibold">Mis Gastos</h1>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex justify-between mt-3">
              <div className="w-1/3 pr-2 mb-2">
                <SelectBank />
              </div>
              <div className="w-2/3 pl-2">
                <UploadFile />
              </div>
            </div>
          </CardBody>
        </Card>
        <div className="mt-4">
          <ColumnInput />
        </div>
        <div className="mt-4">
          <TableExpenses />
          <div className="flex justify-end pt-3">
            <Button key={size} onPress={onOpen}>
              Ver gráfica de barras
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-2 mb-5">
        <Board />
      </div>
      <ModalPie />
    </>
  );
}
