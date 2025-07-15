"use client";

import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData, ChartOptions, registerables } from 'chart.js';

ChartJS.register(...registerables);

type ChartType = 'line' | 'bar' | 'pie';

interface ChartComponentProps<T extends ChartType> {
  type: T;
  data: ChartData<T, number[], string>;
  options: ChartOptions<T>;
}

export default function ChartComponent<T extends ChartType>({ type, data, options }: ChartComponentProps<T>) {
  const ChartType = {
    line: Line,
    bar: Bar,
    pie: Pie,
  }[type] as React.ComponentType<{
    data: ChartData<T, number[], string>;    options: ChartOptions<T>;
  }>;

  return <ChartType data={data} options={options} />;
}