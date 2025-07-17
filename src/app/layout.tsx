// src/app/layout.tsx
import "@/app/ui/globals.css";
import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import AuthLayoutClient from "./AuthLayoutClient"; // Client component with HOC

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AuthLayoutClient>{children}</AuthLayoutClient>
        </AuthProvider>
      </body>
    </html>
  );
}