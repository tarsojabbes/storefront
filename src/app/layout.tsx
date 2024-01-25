import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import FaroProvider from './faroProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VTEX Storefront',
  description: 'VTEX Storefront',
}

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
