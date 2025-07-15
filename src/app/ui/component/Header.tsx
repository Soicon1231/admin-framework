"use client";

import { useRouter } from 'next/navigation';
import { useAuth } from '../../AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      <div>
        <span className="mr-4">{user?.email}</span>
        <button
          onClick={() => {
            logout();
            router.push('/login');
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}