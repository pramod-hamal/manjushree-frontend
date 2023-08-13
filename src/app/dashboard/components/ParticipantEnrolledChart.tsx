"use client";

import React from "react";
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

export default function ParticipantEnrolledChart() {
  const data = {
    labels: labels,
    gridLines: false,
    datasets: [
      {
        data: [65, 59, 80, 110, 250, 20, 55, 11, 25, 47, 58, 120],
        backgroundColor: ["#1890FF"],
        borderWidth: 1,
        barThickness: 80,
      },
    ],
  };

  return (
    <div className="p-5 bg-white shadow">
      <span className="text-xl font-semibold py-2">Total Enrolled </span>
      <Bar options={options} data={data} />
    </div>
  );
}

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
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
