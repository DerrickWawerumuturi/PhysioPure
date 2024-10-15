import Navbar from "@/components/Navbar"
import "../globals.css"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { ClerkProvider } from "@clerk/nextjs"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
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
        </body>
      </html>
    </ClerkProvider>
  )
}
