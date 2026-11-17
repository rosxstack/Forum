import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Forum',
  description: 'A private discussion forum',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-gray-900">
        {children}
      </body>
    </html>
  )
}
