import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

import "../styles/timeline.css";

function Timeline() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/history/")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (events.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container">
      
          <main className="content">
            <h2>No Timeline Available</h2>
          </main>
        </div>
      </>
    );
  }

  const event = events[currentIndex];

  return (
    <>
      <Navbar />

      <div className="container">


        <main className="content">

          <h1>Execution Timeline</h1>

          <div className="timeline-box">

            <div className="timeline-top">

              <h3>
                Step {currentIndex + 1} of {events.length}
              </h3>

              <input
                type="range"
                min="0"
                max={events.length - 1}
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
                onClick={() => setCurrentIndex(currentIndex - 1)}
                disabled={currentIndex === 0}
              >
                ◀ Previous
              </button>

              <button
                onClick={() => setCurrentIndex(currentIndex + 1)}
                disabled={currentIndex === events.length - 1}
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
