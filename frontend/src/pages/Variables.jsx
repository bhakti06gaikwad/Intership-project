import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Variables() {
  const [history, setHistory] = useState([]);
  const [selectedVariable, setSelectedVariable] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/history/"
      );

      setHistory(response.data);

      if (response.data.length > 0) {
        setSelectedVariable(response.data[0].variable_name);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const variables = [
    ...new Set(history.map((item) => item.variable_name)),
  ];

  const filtered = history.filter(
    (item) => item.variable_name === selectedVariable
  );

  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar />

        <main className="content">

          <h1>Variable Inspector</h1>

          <div className="upload-box">
            <h3>Select Variable</h3>

            <select
              value={selectedVariable}
              onChange={(e) =>
                setSelectedVariable(e.target.value)
              }
            >
              {variables.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>

          <div className="table-box">

            <table className="history-table">

              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Filename</th>
                  <th>Variable</th>
                  <th>Line</th>
                  <th>Value</th>
                  <th>Timestamp</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((item, index) => (
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
                      {new Date(
                        item.timestamp
                      ).toLocaleString()}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </main>
      </div>
    </>
  );
}

export default Variables;
