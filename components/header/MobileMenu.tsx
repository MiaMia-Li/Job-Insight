"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ThemeButton from "./ThemeButton";
import Link from "next/link";

const NAV = [
  {
    label: "Submit Tool",
    link: "/submit-tool",
  },
  {
    label: "Category",
    link: "/category",
  },
  {
    label: "Directory",
    link: "/directory",
  },
  {
    label: "AI Product Calendar",
    link: "/calendar",
  },
];

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="md:hidden flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[64px] bg-background/95 shadow-md backdrop-blur-md border-t animate-in slide-in-from-top duration-200">
          <nav className="container mx-auto">
            <div className="px-4 py-3 space-y-1.5">
              {NAV.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className={cn(
                    "block px-4 py-2.5 rounded-lg",
                    "text-sm font-medium",
                    "hover:bg-muted",
                    "text-foreground/80 hover:text-foreground",
                    "transition-all duration-200"
                  )}>
                  {item.label}
                </Link>
              ))}

              <div className="mt-3 px-4">
                <ThemeButton />
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
