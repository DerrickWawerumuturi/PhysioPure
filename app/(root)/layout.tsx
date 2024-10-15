'use client'

import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "../globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'


const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "PhysioPure",
  description: "PhysioPure is dedicated to exploring the science of physiology, offering readers in-depth insights into how the human body functions. From explaining the basics of organ systems to discussing the latest research in the field, the blog aims to make complex biological concepts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={cn('relative h-full min-h-screen font-sans antialiased', inter.className)}
      >
        <ClerkProvider>
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <div className="flex-grow flex-1 min-h-screen">{children}</div>
              <Toaster position="top-center" />
            </ThemeProvider>
          </SessionProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
