import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Healthbridge - Healthcare Made Accessible',
  description: 'Connect with healthcare professionals instantly. Access your health records securely. Making healthcare accessible today.',
  keywords: 'healthcare, telemedicine, online consultation, health records',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#25D366" />
      </head>
      <body className="bg-gradient-to-br from-blue-50 via-white to-green-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}