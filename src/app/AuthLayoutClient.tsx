"use client";

import { ReactNode, useState, useEffect } from "react";
import Sidebar from "./ui/component/sidenav";
import Header from "./ui/component/Header";
import { useAuth } from "./AuthContext";
import Loading from "./ui/component/Loading";
import { useRouter } from "next/navigation";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true); // Hiện loading khi chưa xác thực
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  if (isLoading) {
    return <Loading message="Loading authentication..." />; // Prevent flash of unauthenticated content
  }

  return isAuthenticated ? (
    <div className="flex h-screen bg-gray-100 contain-content" >
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  ) : (
    children
  );
}
