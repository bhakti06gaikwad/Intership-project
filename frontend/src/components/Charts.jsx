import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Charts({ stats, result }) {
  const barData = {
    labels: ["Variables", "Uploads", "Events"],
    datasets: [
      {
        label: "Project Statistics",
        data: [
          stats.variables,
          stats.uploads,
          stats.events,
        ],
        backgroundColor: [
          "#2563eb",
          "#10b981",
          "#f59e0b",
        ],
        borderRadius: 10,
      },
    ],
  };

  const pieData = {
    labels: ["Variables", "Functions"],
    datasets: [
      {
        data: [
          result?.variable_count || 0,
          result?.function_count || 0,
        ],
        backgroundColor: [
          "#3b82f6",
          "#ef4444",
        ],
      },
    ],
  };

  return (
    <div className="charts-grid">
      <div className="chart-card">
        <Bar data={barData} />
      </div>

      {result && (
        <div className="chart-card">
          <Pie data={pieData} />
        </div>
      )}
    </div>
  );
}

export default Charts;