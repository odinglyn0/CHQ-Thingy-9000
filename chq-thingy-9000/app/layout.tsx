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
  title: {
    default: "CHQ Thingy 9000",
    template: "%s | CHQ Thingy 9000",
  },
  description:
    "A proxy of a security camera in the CHQ Building, Dublin. Apparently exposing IP cameras to the world with zero auth is normal, so why not.",
  metadataBase: new URL("https://chqthingy.odinglynn.com"),
  applicationName: "CHQ Thingy 9000",
  authors: [{ name: "Odin Glynn", url: "https://odinglynn.com" }],
  creator: "Odin Glynn",
  publisher: "Odin Glynn",
  keywords: [
    "CHQ Thingy 9000",
    "CHQ Building",
    "CHQ Building camera",
    "CHQ",
    "CHQ Camera",
    "North Wall",
    "Dublin 1",
    "CHQ Dublin",
    "Live camera near Liffey",
    "Live camera North Wall Dublin",
    "Dublin live camera",
    "Dublin webcam",
    "AXIS M3006",
    "IP camera",
    "live stream",
    "Docklands",
  ],
  category: "technology",
  alternates: {
    canonical: "https://chqthingy.odinglynn.com",
  },
  openGraph: {
    type: "website",
    siteName: "CHQ Thingy 9000",
    title: "CHQ Thingy 9000",
    description:
      "A proxy of a security camera in the CHQ Building, Dublin. The URL looks cooler than an IP.",
    url: "https://chqthingy.odinglynn.com",
    locale: "en_IE",
  },
  twitter: {
    card: "summary_large_image",
    title: "CHQ Thingy 9000",
    description:
      "A proxy of a security camera in the CHQ Building, Dublin. The URL looks cooler than an IP.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
