// src/app/components/Loading.tsx
"use client";

import { useEffect, useState } from "react";

export default function Loading({ message = "Authenticating..." }: { message?: string }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => setIsVisible(false), 2000); // Fade out after 2s (adjust as needed)
    return () => clearTimeout(fadeOutTimer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative flex items-center justify-center">
        {/* Spinner */}
        <div className="relative w-24 h-24">
          <div className="absolute w-full h-full border-t-4 border-b-4 border-blue-500 rounded-full animate-spin-slow"></div>
          <div className="absolute w-full h-full border-t-4 border-b-4 border-blue-300 rounded-full animate-spin-slower opacity-75"></div>
        </div>

        {/* Text Animation */}
        {isVisible && (
          <div className="absolute text-center mt-8">
            <p className="text-xl text-gray-700 font-semibold animate-fade-in">
              {message.split("").map((char, index) => (
                <span
                  key={index}
                  className="inline-block animate-char-delay"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {char}
                </span>
              ))}
            </p>
            <p className="text-sm text-gray-500 mt-2 animate-pulse-slow">Please wait...</p>
          </div>
        )}
      </div>
    </div>
  );
}