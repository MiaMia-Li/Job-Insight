import { useEffect, useRef, useState } from "react";

type Direction = "left" | "right";

interface InfiniteScrollProps {
  children: React.ReactNode;
  direction?: Direction;
  speed?: number;
}

export default function InfiniteScroll({
  children,
  direction = "left",
  speed = 30,
}: InfiniteScrollProps) {
  const [duplicateCount] = useState(3); // 复制次数，确保无缝滚动
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const scroll = () => {
      if (scrollRef.current && !isHovered) {
        const container = scrollRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (direction === "left") {
          // 向左滚动
          if (container.scrollLeft >= maxScroll / 2) {
            container.scrollLeft = 0;
          } else {
            container.scrollLeft += 1;
          }
        } else {
          // 向右滚动
          if (container.scrollLeft <= 0) {
            container.scrollLeft = maxScroll / 2;
          } else {
            container.scrollLeft -= 1;
          }
        }
      }
    };

    const intervalId = setInterval(scroll, speed);
    return () => clearInterval(intervalId);
  }, [isHovered, direction, speed]);

  return (
    <div
      ref={scrollRef}
      className="flex overflow-hidden gap-6 py-4 px-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {Array.from({ length: duplicateCount }).map((_, index) => (
        <div key={index} className="flex gap-6 animate-scroll">
          {children}
        </div>
      ))}
    </div>
  );
}
