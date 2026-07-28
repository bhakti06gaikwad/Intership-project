import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/variables.css";

function Variables() {
  const [history, setHistory] = useState([]);
  const [selectedVariable, setSelectedVariable] = useState("");

  useEffect(() => {
    loadVariables();
  }, []);

  const loadVariables = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/history/"
      );

      setHistory(response.data);

      if (response.data.length > 0) {
        setSelectedVariable(response.data[0].variable_name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const variables = [
    ...new Set(history.map((item) => item.variable_name)),
  ];

  const filteredHistory = history.filter(
    (item) => item.variable_name === selectedVariable
  );

  return (
    <>
      <Navbar />

      <div className="container">

        <Sidebar />

        <main className="content">

          <div className="variable-header">

            <h1>Variable Inspector</h1>

            <p>
              View complete execution history of each detected variable.
            </p>

          </div>

          <div className="variable-card">

            <label>Select Variable</label>

            <select
              value={selectedVariable}
              onChange={(e) =>
                setSelectedVariable(e.target.value)
              }
            >
              {variables.map((variable) => (
                <option key={variable} value={variable}>
                  {variable}
                </option>
              ))}
            </select>

          </div>

          <div className="table-container">

            <table className="variable-table">

              <thead>

                <tr>
                  <th>#</th>
                  <th>Filename</th>
                  <th>Variable</th>
                  <th>Line</th>
                  <th>Value</th>
                  <th>Timestamp</th>
                </tr>

              </thead>

              <tbody>

                {filteredHistory.length > 0 ? (

                  filteredHistory.map((item, index) => (

                    <tr key={item.id}>

                      <td>{index + 1}</td>

                      <td>{item.filename}</td>

                      <td>
                        <span className="badge">
                          {item.variable_name}
                        </span>
                      </td>

                      <td>{item.line_number}</td>

                      <td>{item.serialized_value}</td>

                      <td>
                        {new Date(item.timestamp).toLocaleString()}
                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td colSpan="6" className="empty-row">
                      No Variable Data Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </main>

      </div>
    </>
  );
}

export default Variables;
