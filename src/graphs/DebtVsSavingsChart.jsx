import { PolarArea } from 'react-chartjs-2';

const DebtVsSavingsChart = ({ debt, savings }) => {
  const data = {
    labels: ['Debt', 'Savings'],
    datasets: [
      {
        data: [debt, savings],
        backgroundColor: ['red', 'green'],
      },
    ],
  };

  return <PolarArea data={data} />;
};

export default DebtVsSavingsChart;