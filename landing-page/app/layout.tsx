import './globals.css'
import { GeistSans } from 'geist/font/sans'

export const metadata = {
  title: 'Food 404 - Your Health Journey Starts Here',
  description: 'Join our community of food enthusiasts and health-conscious individuals. Track your progress, share your experiences, and grow together.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="antialiased">{children}</body>
    </html>
  )
}

