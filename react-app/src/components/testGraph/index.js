import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useDispatch } from "react-redux";
import { useState } from "react";
// import { Data } from "./Data";
import { useSelector } from "react-redux";
// import { Data } from "./utilites/data";
// import "./styles.css";
import { BarChart } from "../Graph";
import { useEffect } from "react";
import { getAllInterviewsThunk } from "../../store/interview";
import './app.css'

Chart.register(CategoryScale);

export default function ShowGraph() {
  const dispatch = useDispatch();
  const [showDeclined, setShowDeclined] = useState(false);
  const [showScheduled, setShowScheduled] = useState(true);
  const [showOffered, setShowOffered] = useState(false);
  const currentYear = new Date().getFullYear()
  useEffect(async () => await dispatch(getAllInterviewsThunk()), [dispatch]);
  const graphData = [
    {
      month: "Jan",
      Declined: 0,
      Pending: 0,
      Scheduled: 0,
      Offered: 0
    },
    { month: "Feb", Declined: 0, Pending: 0, Scheduled: 0,
  Offered: 0},
    {
      month: "Mar",
      Declined: 0,
      Pending: 0,
      Scheduled: 0,
      Offered: 0
    },
    { month: "Apr", Declined: 0, Pending: 0, Scheduled: 0, Offered: 0},
    {
      month: "May",
      Declined: 0,
      Pending: 0,
      Scheduled: 0,
      Offered: 0
    },
    { month: "Jun", Declined: 0, Pending: 0, Scheduled: 0, Offered: 0 },
    {
      month: "Jul",
      Declined: 0,
      Pending: 0,
      Scheduled: 0,
      Offered: 0
    },
    { month: "Aug", Declined: 0, Pending: 0, Scheduled: 0, Offered: 0 },
    {
      month: "Sep",
      Declined: 0,
      Pending: 0,
      Scheduled: 0,
      Offered: 0
    },
    { month: "Oct", Declined: 0, Pending: 0, Scheduled: 0, Offered: 0 },
    {
      month: "Nov",
      Declined: 0,
      Pending: 0,
      Scheduled: 0,
      Offered: 0
    },
    { month: "Dec", Declined: 0, Pending: 0, Scheduled: 0, Offered: 0 },
  ];
  let { interview } = useSelector((store) => store);
  interview = Object.values(interview);
 

  // iterate though all the interviews and format them on the basis of month
  
  for (let i = 0; i < interview.length; i++) {
    const dateStr = interview[i].date;
    const date = new Date(dateStr);
    const month = date.toLocaleString("default", { month: "short" });
    const interviewYear = date.getFullYear()
    
    
    for (let j = 0; j < graphData.length; j++) {
      if (month === graphData[j].month  && interviewYear == currentYear) {
        graphData[j][interview[i].status] += 1;
      }
    }
  }

  // for loop to add another key for each month with their total Interviews

  for (let i = 0; i < graphData.length; i++) {
    const totalInterview =
      graphData[i].Pending + graphData[i].Declined + graphData[i].Scheduled+graphData[i].Offered;
    graphData[i]["totalInterviews"] = totalInterview;
  }
  

  const [scheduled, setScheduled] = useState({
    labels: graphData.map((data) => data.month),
    datasets: [
      {
        label: "Pending",
        data: graphData.map((data) => data.Pending),
        barPercentage: 0.25,
        borderRadius: 10,
        categoryPercentage: 0.5,
        // barThickness: 5,
        backgroundColor: [
          "#e9b949",
          "#e9b949",
          //   "purple",
          //   "#f3ba2f",
          //   "#2a71d0"
        ],
        // borderColor: "red",
        // borderWidth: 2
      },
      {
        label: "Total Interviews",
        data: graphData.map((data) => data.totalInterviews),
        // barThickness: 20,
        barPercentage: 0.25,
        categoryPercentage: 0.5,
        borderRadius: 10,
        backgroundColor: [
          "blue",
          "blue",
          //   "#50AF95",
          //   "#f3ba2f",
          //   "#2a71d0"
        ],
        // borderColor: "red",
        // borderWidth: 2
      },
    ],
  });
  const [declined, setDeclined] = useState({
    labels: graphData.map((data) => data.month),
    datasets: [
      {
        label: "Declined ",
        data: graphData.map((data) => data.Declined),
        barPercentage: 0.25,
        borderRadius: 10,
        categoryPercentage: 0.5,
        // barThickness: 5,
        backgroundColor: [
          "red",
          "red",
          //   "purple",
          //   "#f3ba2f",
          //   "#2a71d0"
        ],
        // borderColor: "red",
        // borderWidth: 2
      },
      {
        label: "Total Interviews",
        data: graphData.map((data) => data.totalInterviews),
        // barThickness: 20,
        barPercentage: 0.25,
        categoryPercentage: 0.5,
        borderRadius: 10,
        backgroundColor: [
          "blue",
          "blue",
          //   "#50AF95",
          //   "#f3ba2f",
          //   "#2a71d0"
        ],
        // borderColor: "red",
        // borderWidth: 2
      },
    ],
  });
  const [offered, setOffered] = useState({
    labels: graphData.map((data) => data.month),
    datasets: [
      {
        label: "Offered ",
        data: graphData.map((data) => data.Offered),
        barPercentage: 0.25,
        borderRadius: 10,
        categoryPercentage: 0.5,
        // barThickness: 5,
        backgroundColor: [
          "#5dc847",
          "#5dc847",
          //   "purple",
          //   "#f3ba2f",
          //   "#2a71d0"
        ],
        // borderColor: "red",
        // borderWidth: 2
      },
      {
        label: "Total Interviews",
        data: graphData.map((data) => data.totalInterviews),
        // barThickness: 20,
        barPercentage: 0.25,
        categoryPercentage: 0.5,
        borderRadius: 10,
        backgroundColor: [
          "blue",
          "blue",
          //   "#50AF95",
          //   "#f3ba2f",
          //   "#2a71d0"
        ],
        // borderColor: "red",
        // borderWidth: 2
      },
    ],
  })

  const [chartData, setChartData] = useState(scheduled);

  const handleShowDeclined = () => {
    setShowDeclined(true);
    setShowOffered(false);
    setShowScheduled(false);
    setChartData(declined);
  };
  const handleShowScheduled = () => {
    setShowDeclined(false);
    setShowOffered(false);
    setShowScheduled(true);
    setChartData(scheduled);
  };
  const handleShowOffered = () => {
    setShowDeclined(false);
    setShowOffered(true);
    setShowScheduled(false);
    setChartData(offered)
  };

  return (
    <div className="App">
      <div className="graphs-btns">
        <button
          onClick={handleShowScheduled}
          id={showScheduled ? "graph-selected-pending" : ""}
          className="graphs-btns-scheduled"
        >
          Pending
        </button>
        <button
          onClick={handleShowDeclined}
          id={showDeclined ? "graph-selected-declined" : ""}
          className="graphs-btns-declined"
        >
          Declined
        </button>
        <button
          onClick={handleShowOffered}
          id={showOffered ? "graph-selected-offered" : ""}
          className="graphs-btns-offered"
        >
          Offered
        </button>
      </div>
      { <BarChart chartData={chartData}  />}
    </div>
  );
}
