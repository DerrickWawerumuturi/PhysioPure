import "../globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
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
        <Header />
        {children}

      </body>
    </html>
  );
}
