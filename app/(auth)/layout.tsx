import "../globals.css"
import { Kolker_Brush } from "next/font/google"

export const kolker = Kolker_Brush({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
})

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
