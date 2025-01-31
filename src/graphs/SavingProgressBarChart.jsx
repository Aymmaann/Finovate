import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SavingsProgressBarChart = ({ savingsData }) => {
  const data = {
    labels: ['Savings', 'Target'],
    datasets: [
      {
        label: 'Savings Progress',
        data: savingsData,
        backgroundColor: ['green', 'grey'],
        borderColor: ['green', 'grey'],
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} />;
};

export default SavingsProgressBarChart
