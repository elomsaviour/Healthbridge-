import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HealthBridge — Find Pharmacies & Medications Near You in Lagos',
  description:
    'Search verified pharmacies near you in Lagos. Find medications, get directions, call directly or chat on WhatsApp. Free and easy to use.',
  keywords:
    'pharmacy Lagos, find pharmacy Nigeria, buy drugs Lagos, medications near me, HealthBridge',

  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}