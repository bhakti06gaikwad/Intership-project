import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import CodePreview from "../components/CodePreview";

import "../styles/dashboard.css";
import "../styles/codepreview.css";

function Dashboard() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const [code, setCode] = useState("");
  const [filename, setFilename] = useState("");

  const [stats, setStats] = useState({
    variables: 0,
    uploads: 0,
    events: 0,
    latest_file: "",
    latest_time: "",
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = () => {
    axios
      .get("http://127.0.0.1:8000/api/dashboard/")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => console.log(err));
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a Python file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      const sourceCode = e.target.result;

      setCode(sourceCode);
      setFilename(file.name);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/upload/",
          formData
        );

        setResult(response.data);

        alert("Upload Successful!");

        loadDashboard();
      } catch (error) {
        console.log(error);
        alert("Upload Failed!");
      }
    };

    reader.readAsText(file);
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

            <button onClick={uploadFile}>
              Analyze
            </button>
          </div>

          {result && (
            <div className="result-box">

              <h2>Analysis Result</h2>

              <p>
                <strong>Filename :</strong> {result.filename}
              </p>

              <p>
                <strong>Variables :</strong> {result.variable_count}
              </p>

              <p>
                <strong>Functions :</strong> {result.function_count}
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

          {/* Code Preview */}

          <CodePreview
            filename={filename}
            code={code}
          />

          <div className="cards">

            <StatsCard
              title="Variables"
              value={stats.variables}
            />

            <StatsCard
              title="Uploads"
              value={stats.uploads}
            />

            <StatsCard
              title="Events"
              value={stats.events}
            />

            <StatsCard
              title="Latest File"
              value={stats.latest_file || "-"}
            />

          </div>

          <div className="dashboard-box">

            <h2>Recent Upload</h2>

            <p>
              <strong>Filename :</strong>{" "}
              {stats.latest_file || "No file"}
            </p>

            <p>
              <strong>Uploaded :</strong>{" "}
              {stats.latest_time
                ? new Date(stats.latest_time).toLocaleString()
                : "-"}
            </p>

          </div>

        </main>
      </div>
    </>
  );
}

export default Dashboard;
