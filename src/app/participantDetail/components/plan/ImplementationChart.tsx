import React from "react";
import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Implementations() {
  return (
    <div className="bg-white flex gap-5 p-5 flex-col">
      <div className="flex  items-center justify-between  w-full">
        <span className="text-lg font-semibold">Implementation</span>
        <FlatButton title="update" onClick={() => {}} />
      </div>
      <ImplementationChart />
    </div>
  );
}

const ImplementationChart = () => {
  const labels = ["Core", "Capacity", "Capital"];

  const data = {
    labels: labels,
    gridLines: false,
    datasets: [
      {
        data: [65, 59, 80],
        backgroundColor: ["#D570AD", "#89C052", "#F3B948"],
        borderWidth: 0,
        barThickness: 122,
      },
    ],
  };

  var options = {
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

  return <Bar options={options} data={data} />;
};
