'use client'

import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "../globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import PandaHeader from "@/components/Navbar";



const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Insight",
  description: "A blog for simon",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PandaHeader />
          <div className="flex-grow flex-1">{children}</div>

          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
