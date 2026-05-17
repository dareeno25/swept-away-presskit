import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swept-away-presskit.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | Swept Away - Glitch Studio',
    default: 'Swept Away | CuatroStudio Press Kit',
  },
  description: 'Swept Away is a 2D pixel-art adventure by CuatroStudio. A lost duckling must escape the city sewers and reunite with his mother.',
  keywords: ['Swept Away', 'CuatroStudio', 'press kit', 'indie game', '2D adventure', 'pixel art'],
  authors: [{ name: 'Glitch Studio' }],
  openGraph: {
    type: 'website',
    siteName: 'Swept Away - Glitch Studio',
    title: 'Swept Away |Glitch Studio Press Kit',
    description: 'Swept Away is a 2D pixel-art adventure by CuatroStudio. A lost duckling must escape the city sewers and reunite with his mother.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Swept Away - A 2D pixel-art adventure by CuatroStudio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swept Away | Glitch Studio Press Kit',
    description: 'Swept Away is a 2D pixel-art adventure by CuatroStudio. A lost duckling must escape the city sewers and reunite with his mother.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  )
}
