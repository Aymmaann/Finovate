import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { useState, useEffect } from "react";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const ExpenseCategoryPieChart = ({ todaysData }) => {
  const [expenseCategories, setExpenseCategories] = useState({});

  useEffect(() => {
    if (todaysData?.Expense) {
      const newCategories = todaysData.Expense.reduce((acc, category) => {
        acc[category.name] = category.value; 
        return acc;
      }, {});
      setExpenseCategories(newCategories);
    }
  }, [todaysData]);

  const expenseCategoryData = Object.values(expenseCategories);
  
  const pieData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        data: expenseCategoryData,
        backgroundColor: ["#ff9999", "#66b3ff", "#99ff99", "#ffcc99"],
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Expense Breakdown</h2>
      <Pie data={pieData} />
    </div>
  );
}

export default ExpenseCategoryPieChart;
