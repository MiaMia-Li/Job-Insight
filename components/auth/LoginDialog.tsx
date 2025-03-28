// components/auth/login-dialog.tsx
"use client";

import { useAuth } from "@/providers/auth-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import EmailSign from "../header/EmailSign";

export function LoginDialog() {
  const { showLoginDialog, closeLoginDialog } = useAuth();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSignIn = async (provider: "google" | "linkedin") => {
    try {
      setIsLoading(provider);
      await signIn(provider, { callbackUrl: window.location.pathname });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <Dialog open={showLoginDialog} onOpenChange={closeLoginDialog}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent dark:from-primary/90 dark:to-primary/70">
            Welcome Back
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Continue with your preferred platform
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading !== null}
            onClick={() => handleSignIn("google")}
            className={cn(
              "h-11 rounded-lg border-border",
              "bg-background/50 hover:bg-accent/50",
              "hover:border-border/80",
              "dark:border-border/50 dark:bg-background/5",
              "dark:hover:bg-accent/20 dark:hover:border-border/80",
              "transition-all duration-200"
            )}>
            <div className="flex items-center justify-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-sm font-medium">
                {isLoading === "google"
                  ? "Connecting..."
                  : "Continue with Google"}
              </span>
            </div>
          </Button>

          <Button
            type="button"
            variant="outline"
            disabled={isLoading !== null}
            onClick={() => handleSignIn("linkedin")}
            className={cn(
              "h-11 rounded-lg border-border",
              "bg-background/50 hover:bg-accent/50",
              "hover:border-border/80",
              "dark:border-border/50 dark:bg-background/5",
              "dark:hover:bg-accent/20 dark:hover:border-border/80",
              "transition-all duration-200"
            )}>
            <div className="flex items-center justify-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                  fill="#0077B5"
                />
              </svg>
              <span className="text-sm font-medium">
                {isLoading === "linkedin"
                  ? "Connecting..."
                  : "Continue with Linkedin"}
              </span>
            </div>
          </Button>

          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">
              OR Sign in with Email{" "}
            </span>
          </div>
          <EmailSign />

          <p className="text-center text-xs text-muted-foreground mt-4">
            By continuing, you agree to our{" "}
            <button
              onClick={() => window.open("/terms-of-service", "_blank")}
              className="text-primary hover:text-primary/90 dark:text-primary/90 dark:hover:text-primary/80 transition-colors">
              Terms of Service
            </button>{" "}
            and{" "}
            <button
              onClick={() => window.open("/privacy-policy", "_blank")}
              className="text-primary hover:text-primary/90 dark:text-primary/90 dark:hover:text-primary/80 transition-colors">
              Privacy Policy
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
