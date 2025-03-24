"use client";

import Image from "next/image";
import UserMenu from "../user-menu";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

const Header = () => {
  const { setTheme, theme } = useTheme();
  return (
    <header className="w-full h-16 border-b border-gray-200 px-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/pengiun-logo.png" alt="Logo" width={200} height={60} />
      </Link>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          {theme === "dark" ? (
            <SunIcon className="w-5 h-5" />
          ) : (
            <MoonIcon className="w-5 h-5" />
          )}
        </button>
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
