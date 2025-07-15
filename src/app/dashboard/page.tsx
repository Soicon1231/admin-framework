import { ChartData, ChartOptions } from 'chart.js';
import ChartComponent from '../ui/component/ChartComponent';

export default function Dashboard() {
  const lineData: ChartData<'line', number[], string> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Users',
        data: [10, 20, 15, 30, 25],
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        fill: true,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <ChartComponent type="line" data={lineData} options={options} />
    </div>
  );
}