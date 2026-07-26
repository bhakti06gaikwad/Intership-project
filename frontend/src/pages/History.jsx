import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/history/")
      .then((res) => setHistory(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Analysis History</h2>

      <table border="1" cellPadding="10">
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
              <td>{item.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
