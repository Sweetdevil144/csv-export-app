import React, { useState } from "react";
import { CSVLink } from "react-csv";

const DynamicTable = () => {
  const [rows, setRows] = useState([
    { name: "John", age: "25" },
    { name: "Jane", age: "24" },
  ]);

  const addRow = () => {
    setRows([...rows, { name: '', age: '' }]);
  };

  const updateRow = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  return (
    <div>
      <div className="table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  value={row.name}
                  onChange={(e) => updateRow(index, "name", e.target.value)}
                />
              </td>
              <td>
                <input
                  value={row.age}
                  onChange={(e) => updateRow(index, "age", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <button onClick={addRow}>Add Rows</button>
      <CSVLink filename="csoc-data.csv" data={rows}
        className="btn btn-primary" target="_blank">
            Export to CSV
      </CSVLink>
    </div>
  );
};
export default DynamicTable;
