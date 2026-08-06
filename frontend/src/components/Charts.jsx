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
        borderRadius: 8,
      },
    ],
  };

  const pieData = {
    labels: ["Variables", "Functions"],
    datasets: [
      {
        data: [
          result ? result.variable_count : 0,
          result ? result.function_count : 0,
        ],
        backgroundColor: [
          "#3b82f6",
          "#ef4444",
        ],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Overall Project Statistics",
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Variables vs Functions",
      },
    },
  };

  return (
    <div className="charts-grid">

      <div className="chart-card">
        <Bar
          data={barData}
          options={barOptions}
        />
      </div>

      {result && (
        <div className="chart-card">
          <Pie
            data={pieData}
            options={pieOptions}
          />
        </div>
      )}

    </div>
  );
}

export default Charts;
