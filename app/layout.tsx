import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../providers/theme-provider";
import { Toaster } from "../components/ui/sonner";
import SessionWrapper from "../components/session-wrapper";
import { AI } from "./ai";
import { Header } from "@/components/header/Header";
import { DotBackground } from "@/components/animation/DotBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InsightCV",
  description:
    "InsightCV offers professional resume writing, career guidance, and job search assistance to help you stand out in the competitive job market",
  keywords: "resume writing, career coaching, job search assistance",
  openGraph: {
    title: "InsightCV - Your Career Development Partner",
    description:
      "Professional resume writing and career guidance services to help you achieve your career goals.",
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "InsightCV - Professional Resume Writing & Career Guidance",
    description: "Clarify your career path and pave the way to success.",
    images: ["/twitter-image.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <head>
          <link
            rel="icon"
            type="image/png"
            href="/favicon-48x48.png"
            sizes="48x48"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </head>
        <body className={inter.className}>
          <ThemeProvider attribute="class">
            <AI>
              <Header />
              {/* <DotBackground color="bg-foreground/50" spacing={24} size={1}> */}
              {children}
              {/* </DotBackground> */}
              <Toaster />
            </AI>
          </ThemeProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
