import React from "react";
import { Pie } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const GraphData = ({ income, expense }) => {
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "# Expense",
        data: [expense, income],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div
         style={{
           display: "flex",
           height: "60px%",
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "40px",
         }}
      >
        <div>
          <h3>Transactions</h3>
          <button className="badge bg-success-light text-primary">Income</button>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <button className="badge bg-success-light text-danger">Expenses</button>
        </div>
        <br></br>
        <Pie data={data} />
      </div>
    </>
  );
};

export default GraphData;