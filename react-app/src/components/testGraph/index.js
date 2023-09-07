import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
// import { Data } from "./Data";
import { Data } from "./utilites/data";
// import "./styles.css";
import { BarChart } from "../Graph";

Chart.register(CategoryScale);
 
export default function ShowGraph() {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.month), 
    datasets: [
      {
        label: "Scheduled ",
        data: Data.map((data) => data.declined),
        barPercentage: 0.25,
        borderRadius: 10,
        categoryPercentage: 0.5,
        // barThickness: 5,
        backgroundColor: [
          "blue",
          "blue",
        //   "purple",
        //   "#f3ba2f",
        //   "#2a71d0"
        ],
        // borderColor: "red",
        // borderWidth: 2
      },
      {
        label: "Total Interviews",
        data: Data.map((data) => data.pending),
        // barThickness: 20,
        barPercentage: 0.25,
        categoryPercentage: 0.5,
        borderRadius: 10,
        backgroundColor: [
          "green",
          "green",
        //   "#50AF95",
        //   "#f3ba2f",
        //   "#2a71d0"
        ],
        // borderColor: "red",
        // borderWidth: 2
      }
    ]
  });
 
  return (
    <div className="App">
      <BarChart chartData={chartData} />
    </div>
  );
}