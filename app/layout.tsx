import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AllOverlays from './components/AllOverlays'
import UserProvider from './context/user'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TikTok',
  description: 'TikTok clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
       <UserProvider>
      <body className={inter.className}>
      <AllOverlays />
        {children}
        </body>
       </UserProvider>
    </html>
  )
}
