// components/TypewriterEffect.jsx
"use client";
import { useState, useEffect } from "react";

export function TypewriterEffect({ text, className }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <p className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </p>
  );
}
