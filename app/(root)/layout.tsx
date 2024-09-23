'use client'

import type { Metadata } from "next";
import { Kolker_Brush, Satisfy } from 'next/font/google'
import "../globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

export const satisfy = Satisfy({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-satisfy'
})

const kolker = Kolker_Brush({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-kolker'
})

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
        className={cn('min-h-screen font-sans antialiased', satisfy.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
