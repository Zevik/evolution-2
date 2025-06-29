import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'פלטפורמת למידה אינטראקטיבית',
  description: 'פלטפורמה מתקדמת ללמידה אינטראקטיבית עם AI, גמיפיקציה ומעקב התקדמות אישי',
  keywords: 'למידה, חינוך, אינטראקטיבי, AI, גמיפיקציה',
  authors: [{ name: 'Learning Platform Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'פלטפורמת למידה אינטראקטיבית',
    description: 'למד בצורה אינטראקטיבית ומהנה עם AI מתקדם',
    type: 'website',
    locale: 'he_IL',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Providers>
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
} 

