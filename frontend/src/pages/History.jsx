import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/history.css";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/history/")
      .then((res) => setHistory(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">

        <Sidebar />

        <main className="content">

          <h1>Analysis History</h1>

          <div className="history-card">

            <table className="history-table">

              <thead>
                <tr>
                  <th>Filename</th>
                  <th>Variable</th>
                  <th>Line</th>
                  <th>Time</th>
                </tr>
              </thead>

              <tbody>

                {history.map((item) => (

                  <tr key={item.id}>

                    <td>{item.filename}</td>

                    <td>{item.variable_name}</td>

                    <td>{item.line_number}</td>

                    <td>
                      {new Date(item.timestamp).toLocaleString()}
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

export default History;
