import Header from "@/components/Header"
import "../globals.css"
import { Toaster } from "sonner"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Toaster
          toastOptions={{
            style: {
              background: "white",
              color: "green"
            },
            className: "class"
          }}
          position="top-center"
        />
        <Header />
        {children}

      </body>
    </html>
  )
}
