"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const BackgroundPattern = ({ children }: { children: React.ReactNode }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return <div className="min-h-screen">{children}</div>;

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const strokeColor = currentTheme === "dark" ? "#475569" : "#b0b6bf";

  return (
    <div className="relative min-h-screen">
      {/* SVG Pattern */}
      <div className="fixed inset-0 -z-10">
        <svg
          className="absolute inset-0 w-full h-full transition-opacity"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="gridPattern"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M100 200V.5M.5 .5H200"
                fill="none"
                stroke={strokeColor}
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#gridPattern)"
            style={{
              maskImage: `radial-gradient(circle 150px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(0,0,0,1), rgba(0,0,0,0))`,
              WebkitMaskImage: `radial-gradient(circle 150px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(0,0,0,1), rgba(0,0,0,0))`,
              opacity: currentTheme === "dark" ? 0.9 : 0.9,
            }}
          />
        </svg>
      </div>
      {children}
    </div>
  );
};

export default BackgroundPattern;
