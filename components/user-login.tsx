"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { FaGoogle, FaGithub, FaLinkedinIn } from "react-icons/fa";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Login</DialogTitle>
          <DialogDescription>
            Please enter your login information or use a third-party account to
            log in.
          </DialogDescription>
        </DialogHeader>
        {/* <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">密码</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            登录
          </Button>
        </form> */}
        <div className="flex flex-col space-y-2 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => signIn("google")}
            className="w-full">
            <FaGoogle className="mr-2" /> Sign in with Google
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => signIn("github")}
            className="w-full">
            <FaGithub className="mr-2" /> Sign in with GitHub
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => signIn("linkedin")}
            className="w-full">
            <FaLinkedinIn className="mr-2" /> Sign in with LinkedIn
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
