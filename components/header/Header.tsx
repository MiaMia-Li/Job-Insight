"use client";

import Link from "next/link";
import { Menu, FileText, Search, Upload, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeButton from "./ThemeButton";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import UserMenu from "./UserMenu";
import Image from "next/image";

export function Header() {
  const NAV = [
    {
      label: "Upload Resume",
      link: "/resume-upload",
      icon: <Upload className="h-4 w-4 mr-1" />,
    },
    {
      label: "Optimize",
      link: "/resume-optimize",
      icon: <BarChart className="h-4 w-4 mr-1" />,
    },
    {
      label: "Templates",
      link: "/templates",
      icon: <FileText className="h-4 w-4 mr-1" />,
    },
  ];

  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();
  const { data: session } = useSession();

  const headerWidth = useTransform(scrollY, [0, 100], ["100%", "90%"]);
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    theme === "dark"
      ? ["rgba(13, 13, 23, 0)", "rgba(13, 13, 23, 0.97)"]
      : ["rgba(252, 252, 255, 0)", "rgba(252, 252, 255, 0.97)"]
  );
  const headerBlur = useTransform(scrollY, [0, 100], [0, 8]);
  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    [
      "none",
      theme === "dark"
        ? "0 4px 20px -1px rgba(0, 0, 0, 0.4)"
        : "0 4px 20px -1px rgba(0, 0, 0, 0.1)",
    ]
  );
  const headerMargin = useTransform(scrollY, [0, 100], [0, 16]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 0);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <div className="fixed top-0 z-50 w-full flex justify-center">
      <motion.header
        className="w-full transition-all duration-200"
        style={{
          width: headerWidth,
          marginTop: headerMargin,
          backgroundColor: headerBackground,
          backdropFilter: `blur(${headerBlur}px)`,
          boxShadow: headerShadow,
        }}>
        <div
          className={cn(
            "w-full flex h-16 items-center justify-between px-6 rounded-xl transition-all duration-200",
            isScrolled && "bg-background/50"
          )}>
          <div className="flex gap-6 items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/rocket.png" alt="Logo" height={50} width={50} />

              <span className="font-bold text-xl hidden sm:inline-block">
                Insight CV
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV.map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  className="flex items-center text-sm font-medium relative group px-1 py-2">
                  <span className="flex items-center gap-1.5">
                    {/* {item.icon} */}
                    {item.label}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-2 rounded-full border-muted-foreground/20">
              <Search className="h-3.5 w-3.5" />
              <span className="text-xs">Search templates...</span>
              <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>

            {!session?.user?.id ? (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-medium text-sm">
                    Sign in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="font-medium text-sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            ) : (
              <UserMenu />
            )}

            <ThemeButton />

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <div className="rounded-md bg-primary p-1.5 mr-2">
                      <FileText className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="font-bold text-xl">ResumeOptimizer</span>
                  </div>

                  <nav className="flex flex-col gap-1 mb-6">
                    {NAV.map((item) => (
                      <Link
                        key={item.link}
                        href={item.link}
                        className="flex items-center text-sm font-medium transition-colors rounded-md px-3 py-2 hover:bg-muted">
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto">
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between">
                      <ThemeButton />
                      {!session?.user?.id ? (
                        <Link href="/login">
                          <Button size="sm">Sign in</Button>
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>
    </div>
  );
}
