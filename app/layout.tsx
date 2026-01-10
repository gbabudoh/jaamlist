import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display, Lora, Space_Mono } from 'next/font/google'
import { Providers } from '@/components/providers'
import { LayoutContent } from '@/components/layout-content'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const lora = Lora({ 
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jaamlist - Live Performance from Anywhere',
  description: 'Free and Paid live performances with you always',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable} ${spaceMono.variable} antialiased`}>
      <head>
        <meta name="theme-color" content="#f7e774" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className="min-h-screen pb-20 lg:pb-0">
        <Providers>
          <LayoutContent>
            {children}
          </LayoutContent>
        </Providers>
      </body>
    </html>
  )
}