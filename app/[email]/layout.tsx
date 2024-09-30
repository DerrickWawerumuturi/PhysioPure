import Navbar from "@/components/Navbar";
import "../globals.css";
import { cn } from "@/lib/utils";

import { Toaster } from "sonner";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={cn('min-h-screen bg-white font-sans antialiased')}
      >
        <Toaster
          toastOptions={{
            style: {
              background: "white"
            },
            className: "class"
          }}
        />
        <Navbar />
        {children}

      </body>
    </html>
  );
}
