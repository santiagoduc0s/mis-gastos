"use client";

import { useState } from "react";

import { FilePond } from "react-filepond";
import {
  ActualFileObject,
  FilePondErrorDescription,
  FilePondFile,
  FilePondInitialFile,
} from "filepond";
import "filepond/dist/filepond.min.css";

import Papa from "papaparse";

import { ExpenseMapper } from "@/mappers";
import { useAppDispatch, useAppSelector } from "@/store";
import { Expense } from "@/entities/Expense";
import { setExpenses } from "@/store/slices";
import { toast } from "react-toastify";

export function UploadFile() {
  const [files, setFiles] = useState<FilePondFile[]>([]);

  const dispatch = useAppDispatch();
  const { bank } = useAppSelector((state) => state.board);

  const handleUploadFile = (
    error: FilePondErrorDescription | null,
    file: FilePondFile
  ) => {
    if (!bank.length) {
      toast.warn("Debes seleccionar un banco", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        setFiles([]);
      }, 1000)

      return;
    }

    const currentFile = file.file as File;

    Papa.parse(currentFile, {
      complete: function (result) {
        const data = result.data as Array<Array<string>>;
        // const data = result.data as string[][];

        console.log(data);

        let rows: string[][] = [];

        if (bank == 'Santander') {
          rows = data.filter(
            (row) => row.length == 7 && row[4] != "" && parseFloat(row[4])
          );
        }

        const expenses = rows.map((row) =>
          ExpenseMapper.santanderRowToExpenseEntity(row)
        );

        const objExpenses: {
          [key: string]: Expense;
        } = {};

        expenses.forEach((e) => (objExpenses[e.id] = e.toObject()));

        dispatch(setExpenses(objExpenses));
        console.log(objExpenses);

        toast.success('😁 Tus gastos fueron cargados!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      },
    });
  };

  return (
    <div className="App">
      <FilePond
        files={
          files as unknown as (
            | string
            | FilePondInitialFile
            | Blob
            | ActualFileObject
          )[]
        }
        onaddfile={handleUploadFile}
        onupdatefiles={setFiles}
        allowMultiple={false}
        name="files"
        labelIdle='Arrasta tu estado de cuenta o <span class="filepond--label-action">buscalo aquí</span>'
      />
    </div>
  );
}
