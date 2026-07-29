import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/history.css";

function History() {

  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

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
      console.log(error);
    }
  };

  const filteredHistory = history.filter((item) =>
    item.filename.toLowerCase().includes(search.toLowerCase()) ||
    item.variable_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="container">

        <Sidebar />

        <main className="content">

          <div className="history-header">

            <h1>Analysis History</h1>

            <p>View all uploaded files and detected variables.</p>

          </div>

          <div className="search-box">

            <input
              type="text"
              placeholder="Search by filename or variable..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              onClick={() => setSearch("")}
            >
              Clear
            </button>

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

                  {filteredHistory.length > 0 ? (

                    filteredHistory.map((item, index) => (

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

                      <td
                        colSpan="5"
                        className="empty-row"
                      >
                        No Record Found
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
