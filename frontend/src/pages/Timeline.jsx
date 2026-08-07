import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

import "../styles/timeline.css";

function Timeline() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/history/")
      .then((res) => {
        setEvents(res.data);
        setFilteredEvents(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const exportJSON = () => {
    const blob = new Blob(
      [JSON.stringify(filteredEvents, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "timeline.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleSearch = (value) => {
    setSearch(value);

    const keyword = value.toLowerCase();

    const filtered = events.filter((item) => {
      return (
        item.filename.toLowerCase().includes(keyword) ||
        item.variable_name.toLowerCase().includes(keyword)
      );
    });

    setFilteredEvents(filtered);
    setCurrentIndex(0);
  };

  if (filteredEvents.length === 0) {
    return (
      <>
        <Navbar />

        <div className="container">
          <main className="content">
            <h1>Execution Timeline</h1>

            <div className="empty-state">
              <h3>No Timeline Found</h3>
              <p>Try another search or upload a Python file.</p>
            </div>
          </main>
        </div>
      </>
    );
  }

  const event = filteredEvents[currentIndex];

  return (
    <>
      <Navbar />

      <div className="container">
        <main className="content">
          <h1>Execution Timeline</h1>

          <div className="timeline-search">
            <input
              type="text"
              placeholder="Search by filename or variable..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="timeline-box">
            <div className="timeline-top">
              <h3>
                Step {currentIndex + 1} of {filteredEvents.length}
              </h3>

              <button
                className="export-json-btn"
                onClick={exportJSON}
              >
                Export JSON
              </button>

              <input
                type="range"
                min="0"
                max={filteredEvents.length - 1}
                value={currentIndex}
                onChange={(e) =>
                  setCurrentIndex(Number(e.target.value))
                }
              />
            </div>

            <table className="timeline-table">
              <tbody>
                <tr>
                  <th>Filename</th>
                  <td>{event.filename}</td>
                </tr>

                <tr>
                  <th>Variable</th>
                  <td>{event.variable_name}</td>
                </tr>

                <tr>
                  <th>Line Number</th>
                  <td>{event.line_number}</td>
                </tr>

                <tr>
                  <th>Value</th>
                  <td>{event.serialized_value}</td>
                </tr>

                <tr>
                  <th>Timestamp</th>
                  <td>
                    {new Date(event.timestamp).toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="timeline-buttons">
              <button
                onClick={() =>
                  setCurrentIndex(currentIndex - 1)
                }
                disabled={currentIndex === 0}
              >
                ◀ Previous
              </button>

              <button
                onClick={() =>
                  setCurrentIndex(currentIndex + 1)
                }
                disabled={
                  currentIndex ===
                  filteredEvents.length - 1
                }
              >
                Next ▶
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Timeline;
