"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserLogin from "./user-login";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  PlusCircledIcon,
  ExitIcon,
  GearIcon,
  MixIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

import { useSession, signOut } from "next-auth/react";
import useUserStore from "../app/hooks/useUserStore";
import Link from "next/link";

interface User {
  id: string | undefined;
  name: string | undefined;
  email?: string | undefined;
  image: string | undefined;
}

export default function UserMenu() {
  // const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    console.log("--session--cahnge", session);
    const fetchData = () => {
      if (session?.user) {
        setUser({
          name: session.user.name ?? undefined,
          email: session.user.email ?? undefined,
          image: session.user.image ?? undefined,
        } as User);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [session]);

  if (!session) {
    return <UserLogin />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex justify-start gap-3 w-auto h-14 text-base font-normal items-center ">
          <Avatar className="flex justify-start items-center overflow-hidden">
            <AvatarImage
              src={user?.image}
              alt="AI"
              width={4}
              height={4}
              className="object-contain"
            />
            <AvatarFallback>
              {user?.name && user?.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 p-2">
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>
          <Link
            className="flex w-full gap-2 items-center cursor-pointer"
            href="buy-credits">
            <PlusCircledIcon className="w-4 h-4" />
            Buy Credits
          </Link>
        </DropdownMenuItem> */}
        <DropdownMenuItem>
          <Link
            className="flex w-full gap-2 items-center cursor-pointer"
            href="/dashboard">
            <MixIcon className="w-4 h-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            className="flex w-full gap-2 items-center cursor-pointer"
            href="/settings">
            <GearIcon className="w-4 h-4" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={(e) => signOut()}>
          <div className="flex w-full gap-2 items-center cursor-pointer">
            <ExitIcon className="w-4 h-4" />
            Log Out
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
