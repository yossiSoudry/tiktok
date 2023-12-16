import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AllOverlays from './components/AllOverlays'
import UserProvider from './context/user'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TikTok',
  description: 'TikTok clone',
  icons: {
    icon: [
      {
        // media: "(prefers-color-scheme: light)",
        url: "/images/icon.png",
        href: "/images/icon.png",
      },
      {
        // media: "(prefers-color-scheme: dark)",
        url: "/images/icon.png",
        href: "/images/icon.png",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
       <UserProvider>
      <body className={`${inter.className}`}>
      <AllOverlays />
        {children}
        </body>
       </UserProvider>
    </html>
  )
}
