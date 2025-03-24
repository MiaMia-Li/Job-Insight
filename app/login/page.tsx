"use client";

import { useState, useEffect } from "react";
import { FileText, CheckCircle, Shield } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import EmailSign from "@/components/header/EmailSign";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl: string };
}) {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleSignIn = async (provider: "google" | "linkedin") => {
    try {
      setIsLoading(provider);
      await signIn(provider, { callbackUrl: searchParams.callbackUrl || "/" });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(null);
    }
  };

  const features = [
    {
      icon: <FileText className="h-5 w-5 text-primary" />,
      title: "Resume Analysis",
      description:
        "Get instant feedback on your resume's strengths and weaknesses",
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
      title: "AI Optimization",
      description:
        "Enhance your resume with AI-powered suggestions tailored to your industry",
    },
    {
      icon: <Shield className="h-5 w-5 text-primary" />,
      title: "ATS Compatibility",
      description:
        "Ensure your resume passes through Applicant Tracking Systems",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-gradient-to-b from-primary/5 via-background to-background flex items-center justify-center p-4">
      <div className="w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Brief Introduction */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}>
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Optimize Your Resume
              <br />
              Land Your Dream Job
            </h1>
            <p className="text-lg text-muted-foreground">
              Our AI-powered platform analyzes your resume, identifies
              improvement opportunities, and helps you stand out to recruiters
              and applicant tracking systems.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}>
                <div className="mt-0.5 bg-primary/10 p-2 rounded-full">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-medium">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <Card className="backdrop-blur-xl bg-card/80 border border-border/50 p-6 rounded-xl shadow-lg overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/80"></div>

            <CardHeader className="text-center space-y-2 pb-4">
              <h2 className="text-2xl font-semibold">
                Welcome to ResumeOptimizer
              </h2>
              <p className="text-muted-foreground">
                Sign in to access personalized resume optimization
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <Button
                type="button"
                variant="outline"
                disabled={isLoading !== null}
                onClick={() => handleSignIn("google")}
                className="w-full h-12 flex items-center justify-center gap-3 border-muted-foreground/20 hover:bg-primary/5 hover:text-primary transition-all duration-300">
                <div className="flex-shrink-0">
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
                </div>
                <span className="font-medium">
                  {isLoading === "google"
                    ? "Connecting..."
                    : "Continue with Google"}
                </span>
              </Button>

              <Button
                type="button"
                variant="outline"
                disabled={isLoading !== null}
                onClick={() => handleSignIn("linkedin")}
                className="w-full h-12 flex items-center justify-center gap-3 border-muted-foreground/20 hover:bg-primary/5 hover:text-primary transition-all duration-300">
                <div className="flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path
                      d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                      fill="#0077B5"
                    />
                  </svg>
                </div>
                <span className="font-medium">
                  {isLoading === "linkedin"
                    ? "Connecting..."
                    : "Continue with LinkedIn"}
                </span>
              </Button>

              <div className="relative my-6">
                <Separator className="bg-border/50" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground font-medium">
                  OR
                </span>
              </div>

              <EmailSign />
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <p className="text-center text-xs text-muted-foreground px-6">
                By continuing, you agree to our{" "}
                <Link
                  href="/terms-of-service"
                  className="text-primary hover:underline font-medium">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="text-primary hover:underline font-medium">
                  Privacy Policy
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
