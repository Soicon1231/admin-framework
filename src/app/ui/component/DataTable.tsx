"use client";

import { useState } from 'react';
import { CSVLink } from 'react-csv';

interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
}

export default function DataTable({ data, columns }: DataTableProps) {
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });
  const [filter, setFilter] = useState<string>('');

  const handleSort = (key: string) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const filteredData = sortedData.filter((item) =>
    Object.values(item).some((val:any) =>
      val.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );

  return (
    <div className="mt-4">
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Filter..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded text-black"
        />
        <CSVLink data={filteredData} filename="table-data.csv" className="bg-blue-500 text-white px-4 py-2 rounded">
          Export CSV
        </CSVLink>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} onClick={() => handleSort(col.key)} className="border p-2 cursor-pointer text-black">
                {col.label} {sortConfig.key === col.key ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, idx) => (
            <tr key={idx} className="border">
              {columns.map((col) => (
                <td key={col.key} className="p-2 text-black">{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}