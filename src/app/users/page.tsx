"use client";

import { useState, useEffect } from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import ChartComponent from '../ui/component/ChartComponent';
import DataTable from '../ui/component/DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ];

  useEffect(() => {
    fetch('/api/auth/users')
      .then((res) => res.json())
      .then((data: User[]) => setUsers(data));
  }, []);

  const barData: ChartData<'bar', number[], string> = {
    labels: ['Admins', 'Users'],
    datasets: [
      {
        label: 'User Roles',
        data: [users.filter(u => u.role === 'admin').length, users.filter(u => u.role === 'user').length],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">User Management</h2>
      <ChartComponent type="bar" data={barData} options={options} />
      <DataTable data={users} columns={columns} />
    </div>
  );
}
