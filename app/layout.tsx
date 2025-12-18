import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display, Lora, Space_Mono } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

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
    <html lang="en" className={`${playfair.variable} ${lora.variable} ${spaceMono.variable}`}>
      <body>
        <Providers>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}