import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Timeline() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTimeline();
  }, []);

  const loadTimeline = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/history/"
      );

      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const previousStep = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextStep = () => {
    if (currentIndex < events.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container">
          <Sidebar />
          <main className="content">
            <h2>Loading Timeline...</h2>
          </main>
        </div>
      </>
    );
  }

  if (events.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container">
          <Sidebar />
          <main className="content">
            <h2>No Execution History Found</h2>
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

        <Sidebar />

        <main className="content">

          <h1>Execution Timeline</h1>

          <div className="upload-box">

            <h3>
              Step {currentIndex + 1} / {events.length}
            </h3>

            <input
              type="range"
              min="0"
              max={events.length - 1}
              value={currentIndex}
              onChange={(e) =>
                setCurrentIndex(Number(e.target.value))
              }
              style={{
                width: "100%",
                marginTop: "15px",
                marginBottom: "20px",
              }}
            />

            <div className="cards">

              <div className="card">
                <h3>Filename</h3>
                <p>{event.filename}</p>
              </div>

              <div className="card">
                <h3>Variable</h3>
                <p>{event.variable_name}</p>
              </div>

              <div className="card">
                <h3>Line</h3>
                <p>{event.line_number}</p>
              </div>

              <div className="card">
                <h3>Value</h3>
                <p>{event.serialized_value}</p>
              </div>

            </div>

            <br />

            <div className="card">

              <h3>Timestamp</h3>

              <p>{event.timestamp}</p>

            </div>

            <br />

            <button
              onClick={previousStep}
              disabled={currentIndex === 0}
            >
              Previous
            </button>

            <button
              onClick={nextStep}
              disabled={currentIndex === events.length - 1}
              style={{ marginLeft: "15px" }}
            >
              Next
            </button>

          </div>

        </main>

      </div>
    </>
  );
}

export default Timeline;