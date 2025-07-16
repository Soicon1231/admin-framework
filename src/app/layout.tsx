"use client";

import "@/app/ui/globals.css";
import { ReactNode } from "react";
import { useState, useEffect } from "react";
import Sidebar from "./ui/component/sidenav";
import Header from "./ui/component/Header";
import { AuthProvider } from "./AuthContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    setIsAuthenticated(!!token);
  }, []);
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {isAuthenticated ? (
            <div className="flex h-screen bg-gray-100">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-6 overflow-auto">{children}</main>
              </div>
            </div>
          ) : (
            children
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
