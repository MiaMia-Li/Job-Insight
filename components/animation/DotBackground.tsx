"use client";

import { useEffect, useRef, useState } from "react";

export function DotPattern({
  color = "bg-primary/10",
  size = 1,
  spacing = 24,
  className = "",
}) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // 计算容器尺寸
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // 计算点阵
  const dotsX = Math.ceil(dimensions.width / spacing);
  const dotsY = Math.ceil(dimensions.height / spacing);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: dotsX * dotsY }).map((_, index) => {
        const x = index % dotsX;
        const y = Math.floor(index / dotsX);

        return (
          <div
            key={index}
            className={`absolute rounded-full ${color}`}
            style={{
              left: `${x * spacing}px`,
              top: `${y * spacing}px`,
              width: `${size}px`,
              height: `${size}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}
    </div>
  );
}

// 包装组件
export function DotBackground({ children, className = "", ...props }) {
  return (
    <div className={`relative ${className}`}>
      <DotPattern {...props} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
