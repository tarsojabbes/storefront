import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Hotjar from "@hotjar/browser"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VTEX Storefront',
  description: 'VTEX Storefront',
}

const siteId = 3842274
const hotjarVersion = 6

Hotjar.init(siteId, hotjarVersion)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
          <body className={inter.className}>{children}</body>
      </html>

  )
}
