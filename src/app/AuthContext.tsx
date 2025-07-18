// src/app/AuthContext.tsx
"use client";

import { jwtDecode } from "jwt-decode";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface User {
  email: string;
  role: string;
  tenantId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  tenantId: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Derive initial state from cookie
  const getTokenFromCookie = () => {
    if (typeof document === "undefined") return null;
    return (
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1] || null
    );
  };

  const getInitialToken = () => {
    const token = getTokenFromCookie();
    return !!token;
  };

  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(getInitialToken);
  const [tenantId, setTenantId] = useState<string | null>(null);
  useEffect(() => {
    const handleCookieChange = () => {
      const token = getTokenFromCookie();
      const authState = !!token;
      setIsAuthenticated(authState);
      if (token) {
        try {
          const decoded = jwtDecode<{ user: User }>(token);
          setUser(decoded.user);
          setIsAuthenticated(true);
          setTenantId(decoded.user.tenantId || null);
        } catch (error: any) {
          console.log("Invalid token:", error);
          setIsAuthenticated(false);
          setUser(null);
          setTenantId(null);
        }
      } else {
        setUser(null);
      }
    };
    handleCookieChange(); // Initial sync
    const interval = setInterval(handleCookieChange, 1000);
    return () => clearInterval(interval);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (data.token) {
      document.cookie = `token=${data.token}; path=/; secure; max-age=3600`;
      const decoded = jwtDecode<{ user: User }>(data.token);
      setUser(decoded.user);
      setIsAuthenticated(true);
      setTenantId(decoded.user.tenantId || null);
      return true;
    }
    return false;
  };

  const logout = () => {
    document.cookie = "token=; path=/; max-age=0";
    setIsAuthenticated(false);
    setUser(null);
    setTenantId(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, tenantId }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
