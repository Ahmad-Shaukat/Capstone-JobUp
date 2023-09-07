import { Bar } from "react-chartjs-2";
import './app.css'
import { useState } from "react";
// import { Data } from "../testGraph/utilites/data";



export const BarChart = ({ chartData }) => {
  const [showDeclined, setShowDeclined] = useState(false)
  const [showScheduled, setShowScheduled] = useState(false)
  const [showOffered, setShowOffered] = useState(false)


  const handleShowDeclined = () => {
    setShowDeclined(true)
    setShowOffered(false)
    setShowScheduled(false)
  }
  const handleShowScheduled = () => {
    setShowDeclined(false)
    setShowOffered(false)
    setShowScheduled(true)
  }
  const handleShowOffered= () => {
    setShowDeclined(false)
    setShowOffered(true)
    setShowScheduled(false)
  }

  return (
    <div className="chart-container">
      

      <div className="graphs-btns">
        <button onClick={handleShowDeclined} id = {showDeclined ? "graph-selected": ""}>Declined</button>
        <button onClick={handleShowOffered} id = {showOffered? "graph-selected": ""}>Offered</button>
        <button onClick={handleShowScheduled} id = {showScheduled? "graph-selected": ""}>Scheduled</button>

      </div>
      <h2 style={{ textAlign: "center" }}>Interview Data for 2023</h2>
      
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: ""
            },
    
            legend: {
              display: true
            },
            respnsive:true
          },
          aspectRatio: 1.5,
          responsive:true
        }}
      />
    </div>
  );
};