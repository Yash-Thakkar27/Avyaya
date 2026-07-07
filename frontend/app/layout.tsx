import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  metadataBase: new URL('https://avyaya.com'),
  title: 'Avyaya - Eternal as your love',
  description: 'Luxury jewelry with lab-grown diamonds designed for daily wear with investment value',
  keywords: 'jewelry, diamonds, luxury, rings, earrings, necklaces',
  authors: [{ name: 'Avyaya' }],
  creator: 'Avyaya',
  publisher: 'Avyaya',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://avyaya.com',
    siteName: 'Avyaya',
    title: 'Avyaya - Eternal as your love',
    description: 'Luxury jewelry with lab-grown diamonds designed for daily wear with investment value',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avyaya - Eternal as your love',
    description: 'Luxury jewelry with lab-grown diamonds designed for daily wear with investment value',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body className="font-inter">
        <Providers>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#0F0F0F',
                color: '#F8F6F2',
                fontSize: '14px',
                fontWeight: '500',
              },
              success: {
                iconTheme: {
                  primary: '#D4AF37',
                  secondary: '#F8F6F2',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}