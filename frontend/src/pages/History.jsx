import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/history.css";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/history/"
      );

      setHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">

        <Sidebar />

        <main className="content">

          <div className="history-header">
            <h1>Analysis History</h1>
            <p>All uploaded Python files and detected variables</p>
          </div>

          <div className="history-card">

            <div className="table-container">

              <table className="history-table">

                <thead>

                  <tr>
                    <th>#</th>
                    <th>Filename</th>
                    <th>Variable</th>
                    <th>Line</th>
                    <th>Timestamp</th>
                  </tr>

                </thead>

                <tbody>

                  {history.length > 0 ? (

                    history.map((item, index) => (

                      <tr key={item.id}>

                        <td>{index + 1}</td>

                        <td>{item.filename}</td>

                        <td>{item.variable_name}</td>

                        <td>{item.line_number}</td>

                        <td>
                          {new Date(item.timestamp).toLocaleString()}
                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td colSpan="5" className="empty-row">
                        No History Available
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </main>

      </div>
    </>
  );
}

export default History;
