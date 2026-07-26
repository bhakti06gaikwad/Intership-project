import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";

function Dashboard() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a Python file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      setResult(response.data);

      alert("Upload Successful!");
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.log(error.response.data);
      }

      alert("Upload Failed!");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar />

        <main className="content">
          <h1>PyChronicle Dashboard</h1>

          <div className="upload-box">
            <h2>Upload Python File</h2>

            <input
              type="file"
              accept=".py"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button onClick={uploadFile}>Analyze</button>
          </div>

          {result && (
            <div className="upload-box">
              <h2>Analysis Result</h2>

              <p>
                <strong>Filename:</strong> {result.filename}
              </p>

              <p>
                <strong>Variables:</strong> {result.variable_count}
              </p>

              <p>
                <strong>Functions:</strong> {result.function_count}
              </p>

              <h3>Variable List</h3>

              <ul>
                {result.variables.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3>Function List</h3>

              <ul>
                {result.functions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="cards">
            <StatsCard
              title="Variables"
              value={result ? result.variable_count : 0}
            />

            <StatsCard
              title="Assignments"
              value={result ? result.variables.length : 0}
            />

            <StatsCard
              title="Functions"
              value={result ? result.function_count : 0}
            />

            <StatsCard
              title="Execution Time"
              value="AST"
            />
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
