import type { Metadata } from "next";
import { Satisfy } from 'next/font/google'
import "../globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { Toaster } from "sonner";

const satisfy = Satisfy({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-satisfy'
})

export const metadata: Metadata = {
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
        className={cn('min-h-screen bg-white font-sans antialiased', satisfy.variable)}
      >
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
