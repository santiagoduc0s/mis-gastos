"use client";

import { useState } from "react";

import { FilePond } from "react-filepond";
import { ActualFileObject, FilePondFile, FilePondInitialFile } from "filepond";
import "filepond/dist/filepond.min.css";

import Papa from "papaparse";

import { ExpenseMapper } from "@/mappers/mappers";
import { useAppDispatch, useAppSelector } from "@/store";
import { Expense } from "@/entities/Expense";
import { setExpenses } from "@/store/slices";

export default function UploadFile() {
  // const [files, setFiles] = useState([]);
  const [files, setFiles] = useState<FilePondFile[]>([]);


  const dispatch = useAppDispatch();
  const { board } = useAppSelector((state) => state.board);

  const handleUploadFile = (files: FilePondFile[]) => {
    
    setFiles(files);

    if (files.length > 0) {
      const currentFile = files[0].file as File;

      Papa.parse(currentFile, {
        complete: function (result) {
          const data = result.data as Array<Array<string>>;
          // const data = result.data as string[][];

          const rows = data.filter(
            (row) => row.length == 8 && row[4] != "" && parseFloat(row[4])
          );

          const expenses = rows.map((row) =>
            ExpenseMapper.santanderRowToExpenseEntity(row)
          );

          const objExpenses: {
            [key: string]: Expense;
          } = {};
          
          expenses.forEach((e) => (objExpenses[e.id] = e.toObject()));
          
          dispatch(setExpenses(objExpenses));
          console.log(objExpenses);

        },
      });
    }
  };

  return (
    <div className="App">
      <FilePond
        files={files as unknown as (string | FilePondInitialFile | Blob | ActualFileObject)[]}
        // files={files as (string | FilePondInitialFile | Blob | ActualFileObject)[]}
        onupdatefiles={handleUploadFile}
        allowMultiple={false}
        name="files"
        labelIdle='Arrasta tu estado de cuenta o <span class="filepond--label-action">buscalo aquí</span>'
      />
    </div>
  );
}
