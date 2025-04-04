"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { GearIcon, PinRightIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { set } from "zod";
import UsernameForm from "./username-form";
import EditUsernameForm from "./edit-username-form";
import PullModel from "./pull-model";
import { useSession, signOut } from "next-auth/react";
import useUserStore from "../app/hooks/useUserStore";

interface User {
  id: string | undefined;
  name: string | undefined;
  email?: string | undefined;
  image: string | undefined;
}

export default function UserSettings() {
  // const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  // const [userInfo, setUserInfo] = useState<UserInfo>();
  // consnt user

  useEffect(() => {
    // const handleStorageChange = () => {
    //   const username = localStorage.getItem("ollama_user");
    //   if (username) {
    //     setName(username);
    //     setIsLoading(false);
    //   }
    // };
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

    // 初始获取
    fetchData();

    // Listen for storage changes
    // window.addEventListener("storage", handleStorageChange);

    // return () => {
    //   window.removeEventListener("storage", handleStorageChange);
    // };
  }, [session]);

  if (!session) {
    return <></>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex justify-start gap-3 w-full h-14 text-base font-normal items-center ">
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
          {/* <div className="text-xs truncate">
            {isLoading ? (
              <Skeleton className="w-20 h-4" />
            ) : (
              user?.name || "Anonymous"
            )}
          </div> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 p-2">
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <PullModel />
        </DropdownMenuItem>
        <Dialog>
          <DialogTrigger className="w-full">
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <div className="flex w-full gap-2 p-1 items-center cursor-pointer">
                <GearIcon className="w-4 h-4" />
                Settings
              </div>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="space-y-4">
              <DialogTitle>Settings</DialogTitle>
              <EditUsernameForm setOpen={setOpen} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog></Dialog>
        <DropdownMenuItem onSelect={(e) => signOut()}>
          <div className="flex w-full gap-2 p-1 items-center cursor-pointer">
            <PinRightIcon className="w-4 h-4" />
            Logout
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
