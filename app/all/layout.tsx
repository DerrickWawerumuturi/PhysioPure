import Navbar from "@/components/Navbar"
import { ThemeProvider } from "@/components/theme-provider"
import "../globals.css"
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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}

          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
