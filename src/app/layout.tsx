'use client'

import '@/app/ui/globals.css';
import { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Sidebar from './ui/component/sidenav';
import Header from './ui/component/Header';
import { AuthProvider } from './AuthContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
   const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else if (pathname !== '/login') {
      router.push('/login');
    }
  }, [router]);

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {pathname === '/login' ? (
            children
          ) : (
            <div className="flex h-screen bg-gray-100">
              {isAuthenticated && <Sidebar />}
              <div className="flex-1 flex flex-col">
                {isAuthenticated && <Header />}
                <main className="flex-1 p-6 overflow-auto">{children}</main>
              </div>
            </div>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}