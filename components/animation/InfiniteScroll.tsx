"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function InfiniteScroll({
  children,
  direction = "left",
  speed = 1,
  pauseOnHover = true,
  showControls = false,
  className = "",
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  showControls?: boolean;
  className?: string;
}) {
  const [duplicateCount] = useState(3);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // 计算滚动步长，方向由props控制
  const getScrollStep = () => {
    return direction === "left" ? speed : -speed;
  };

  useEffect(() => {
    const scroll = () => {
      if (scrollRef.current && !(pauseOnHover && isHovered) && !isPaused) {
        const scrollContainer = scrollRef.current;
        const scrollStep = getScrollStep();

        // 根据方向处理滚动重置
        if (direction === "left") {
          if (
            scrollContainer.scrollLeft >=
            (scrollContainer.scrollWidth - scrollContainer.clientWidth) / 2
          ) {
            scrollContainer.scrollLeft = 0;
          } else {
            scrollContainer.scrollLeft += scrollStep;
          }
        } else {
          if (scrollContainer.scrollLeft <= 0) {
            scrollContainer.scrollLeft =
              (scrollContainer.scrollWidth - scrollContainer.clientWidth) / 2;
          } else {
            scrollContainer.scrollLeft += scrollStep;
          }
        }
      }
    };

    const intervalId = setInterval(scroll, 30);
    return () => clearInterval(intervalId);
  }, [isHovered, isPaused, direction, speed, pauseOnHover]);

  // 手动控制滚动
  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <div
        ref={scrollRef}
        className="flex overflow-x-hidden overflow-y-hidden h-full items-center gap-6 py-4 px-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {Array.from({ length: duplicateCount }).map((_, index) => (
          <div
            key={index}
            className="flex gap-6"
            style={{
              animation: isPaused ? "none" : undefined,
            }}>
            {children}
          </div>
        ))}
      </div>

      {showControls && (
        <>
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 border border-border flex items-center justify-center text-foreground backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background z-20"
            aria-label="Scroll left">
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={() => handleScroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 border border-border flex items-center justify-center text-foreground backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background z-20"
            aria-label="Scroll right">
            <ChevronRight className="h-5 w-5" />
          </button>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="absolute bottom-2 right-2 px-3 py-1 text-xs rounded-full bg-background/80 border border-border flex items-center justify-center text-foreground backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background z-20"
            aria-label={isPaused ? "Resume" : "Pause"}>
            {isPaused ? "Resume" : "Pause"}
          </button>
        </>
      )}
    </div>
  );
}
