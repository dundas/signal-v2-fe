import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import NavHeader from '@/components/Nav/NavHeader';
export const dynamic = 'force-dynamic'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Theme>

        <body className={inter.className}>
          <NavHeader />
          {children}

        </body>

      </Theme>
    </html>
  )
}
