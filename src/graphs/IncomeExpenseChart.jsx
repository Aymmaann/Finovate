import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const IncomeExpenseChart = ({ monthData }) => {
  const filteredData = Object.entries(monthData).filter(([key]) =>
    !key.includes('Month_') && !key.includes('total')
  );

  const labels = filteredData.map(([key]) => key);
  const incomeData = filteredData.map(([_, day]) => day.Income?.Income_total || 0);
  const expenseData = filteredData.map(([_, day]) => day.Expense?.Expense_total || 0);

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        backgroundColor: '#1dadc3',
        borderRadius: 8,
        barThickness: 8,
      },
      {
        label: 'Expense',
        data: expenseData,
        backgroundColor: '#232b43',
        borderRadius: 8,
        barThickness: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#1a1f37',
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
          },
        },
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => tooltipItems[0].label,
          label: (tooltipItem) => {
            const datasetIndex = tooltipItem.datasetIndex;
            const value = tooltipItem.raw;
            const label = tooltipItem.label;
  
            // Format the tooltip based on the dataset
            if (datasetIndex === 0) {
              return `Income: $${value}`;
            } else if (datasetIndex === 1) {
              return `Expense: $${value}`;
            }
            return '';
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#1a1f37',
            font: {
              family: "'Plus Jakarta Sans', sans-serif",
            },
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 100,
            color: '#1a1f37',
            font: {
              family: "'Plus Jakarta Sans', sans-serif",
            },
          },
        },
      },
    }
  };

  return (
    <div className='bg-white mt-4 w-full h-full flex justify-center items-center'>
      <Bar data={data} options={options} className='w-full' />
    </div>
  );
};

export default IncomeExpenseChart;
