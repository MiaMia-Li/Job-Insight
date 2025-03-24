"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogOut, MessageSquare, User } from "lucide-react";
import useUserStore from "@/app/hooks/useUserStore";

interface User {
  id: string | undefined;
  name: string | undefined;
  email?: string | undefined;
  image: string | undefined;
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "danger";
}

const MenuItem = ({
  icon,
  label,
  href,
  onClick,
  variant = "default",
}: MenuItemProps) => {
  const content = (
    <div
      className={`flex w-full gap-2.5 items-center cursor-pointer text-sm ${
        variant === "danger"
          ? "text-destructive hover:text-destructive"
          : "text-foreground"
      }`}>
      {icon}
      {label}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="w-full">
        <DropdownMenuItem className="focus:bg-accent">
          {content}
        </DropdownMenuItem>
      </Link>
    );
  }

  return (
    <DropdownMenuItem asChild onClick={onClick} className="focus:bg-accent">
      {content}
    </DropdownMenuItem>
  );
};

export default function UserMenu() {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
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
  }, [session, setUser]);

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (isLoading) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full border">
          <Avatar className="h-8 w-8 transition-all">
            <AvatarImage
              src={user?.image}
              alt={user?.name || "User avatar"}
              className="object-cover"
            />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user?.name?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {/* <User /> */}
          {/* <span>{user?.name}</span> */}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 p-2 border-border">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-foreground">
              {user?.name}
            </p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2 bg-border" />
        <DropdownMenuGroup>
          <div className="space-y-1">
            <MenuItem
              icon={<MessageSquare className="h-4 w-4" />}
              label="Feedback"
              href="/feedback"
            />
          </div>
        </DropdownMenuGroup>

        <MenuItem
          icon={<LogOut className="h-4 w-4" />}
          label="Sign out"
          onClick={handleSignOut}
          variant="danger"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
