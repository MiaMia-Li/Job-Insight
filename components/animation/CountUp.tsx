// components/CountUp.jsx
"use client";
import { useState, useEffect } from "react";

export function CountUp({ start, end, duration, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentCount = Math.floor(progress * (end - start) + start);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrame);
  }, [start, end, duration]);

  return (
    <>
      {prefix}
      {count}
      {suffix}
    </>
  );
}
