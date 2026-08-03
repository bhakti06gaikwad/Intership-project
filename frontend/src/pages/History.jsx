import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/history.css";

function History() {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/history/"
      );

      setHistory(response.data);
      setFilteredHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);

    const filtered = history.filter((item) => {
      const filename = item.filename?.toLowerCase() || "";
      const variable = item.variable_name?.toLowerCase() || "";
      const line = String(item.line_number || "");
      const keyword = value.toLowerCase();

      return (
        filename.includes(keyword) ||
        variable.includes(keyword) ||
        line.includes(keyword)
      );
    });

    setFilteredHistory(filtered);
  };

  const exportCSV = () => {
    if (filteredHistory.length === 0) {
      alert("No data available to export.");
      return;
    }

    const headers = [
      "Filename",
      "Variable",
      "Line Number",
      "Value",
      "Timestamp",
    ];

    const rows = filteredHistory.map((item) => [
      item.filename,
      item.variable_name,
      item.line_number,
      item.serialized_value,
      new Date(item.timestamp).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "analysis_history.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar />

        <main className="content">
          <h1>Analysis History</h1>

          <div className="history-toolbar">
            <input
              type="text"
              className="search-input"
              placeholder="Search filename, variable or line..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />

            <button
              className="export-btn"
              onClick={exportCSV}
            >
              Export CSV
            </button>
          </div>

          <div className="history-card">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Filename</th>
                  <th>Variable</th>
                  <th>Line</th>
                  <th>Value</th>
                  <th>Timestamp</th>
                </tr>
              </thead>

              <tbody>
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((item) => (
                    <tr key={item.id}>
                      <td>{item.filename}</td>
                      <td>{item.variable_name}</td>
                      <td>{item.line_number}</td>
                      <td>{item.serialized_value}</td>
                      <td>
                        {new Date(
                          item.timestamp
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "center",
                        padding: "20px",
                      }}
                    >
                      No Record Found
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

export default History;
