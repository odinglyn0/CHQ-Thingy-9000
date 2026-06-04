import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { Inter } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const coolvetica = localFont({
  src: "../public/fonts/coolvetica.woff",
  variable: "--font-coolvetica",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CHQ Thingy 9000",
  description: "Live camera feed for CHQ Thingy 9000.",
  metadataBase: new URL("https://chqthingy.odinglynn.com"),
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn("dark antialiased", inter.variable, coolvetica.variable)}
    >
      <body className="font-sans">{children}</body>
    </html>
  )
}
