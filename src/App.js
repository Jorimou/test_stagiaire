import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Papa from "papaparse";
import {
    List,
    Table,
    useTable,
    useImport,
    ImportButton,
} from "@pankod/refine";
function App() {
   // State to store parsed data
   const [parsedData, setParsedData] = useState([]);

   //State to store table Column name
   const [tableRows, setTableRows] = useState([]);
 
   //State to store the values
   const [values, setValues] = useState([]);
   
  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
        console.log(results.data)
      },
    });
    
  };

  return (
    <div>
      {/* File Uploader */}
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      <br />
      <br />
      {/* Table */}
      <table>
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

);
};

interface IPostFile {
title: string;
categoryId: string;
}
interface IPost {
id: string;
title: string;
status: string;
  
  
}

export default App;