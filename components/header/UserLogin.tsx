import Link from "next/link";
import { Button } from "../ui/button";
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";

const UserLogin = () => {
  const { data: session } = useSession();
  return (
    <>
      {!session?.user?.id ? (
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="font-medium text-sm transition-all duration-300 hover:bg-background/80">
              Sign in
            </Button>
          </Link>
          <Link href="/register">
            <Button
              size="sm"
              className="font-medium text-sm transition-all duration-300 bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </Link>
        </div>
      ) : (
        <UserMenu />
      )}
    </>
  );
};

export default UserLogin;
