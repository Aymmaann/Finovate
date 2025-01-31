import React from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const IncomeExpenseChart = ({ monthData }) => {
  // Filter out 'Month_Income', 'Month_Expense', and 'Month_total' from the data
  const filteredData = Object.entries(monthData).filter(([key, value]) => 
    !key.includes('Month_') && !key.includes('total')
  );

  const incomeData = filteredData.map(([key, day]) => day.Income?.Income_total || 0);
  const expenseData = filteredData.map(([key, day]) => day.Expense?.Expense_total || 0);

  const data = {
    labels: filteredData.map(([key]) => key),
    datasets: [
      {
        label: "Income",
        data: incomeData,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Expense",
        data: expenseData,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default IncomeExpenseChart;
