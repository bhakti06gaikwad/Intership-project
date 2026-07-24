import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar />

        <main className="content">
          <h1>Dashboard</h1>

          <div className="upload-box">
            <h3>Upload Python File</h3>

            <input type="file" />

            <button>Analyze</button>
          </div>

          <div className="cards">
            <StatsCard title="Variables" value="0" />
            <StatsCard title="Assignments" value="0" />
            <StatsCard title="Functions" value="0" />
            <StatsCard title="Execution Time" value="0 ms" />
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;