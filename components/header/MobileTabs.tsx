"use client";

import { Calendar, Grid, Home, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  {
    label: "Home",
    link: "/",
    icon: Home,
  },
  {
    label: "Category",
    link: "/category",
    icon: Grid,
  },
  {
    label: "Submit",
    link: "/submit-tool",
    icon: Plus,
  },
  {
    label: "Calendar",
    link: "/calendar",
    icon: Calendar,
  },
];

const MobileTabs = () => {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur-md z-50">
      <nav className="flex items-center justify-around">
        {NAV.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.link;

          return (
            <Link
              key={index}
              href={item.link}
              className={cn(
                "flex flex-col items-center py-2 px-3 min-w-[68px]",
                "text-xs font-medium",
                "transition-colors duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}>
              <Icon
                className={cn(
                  "h-5 w-5 mb-1",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* 为底部导航腾出空间 */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </div>
  );
};

export default MobileTabs;
