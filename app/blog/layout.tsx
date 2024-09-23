import { ThemeProvider } from "@/components/theme-provider"
import "../globals.css"
import { Nunito_Sans } from "next/font/google"
import Header from "@/components/Header"

const Nunito = Nunito_Sans({
  weight: ['400', '500', '600', '700'],
  variable: '--font-nunito',
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${Nunito.className}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}

        </ThemeProvider>
      </body>
    </html>
  )
}
