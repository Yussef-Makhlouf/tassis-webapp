import "./globals.css";

import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://tasis-al-bina.com'),
  title: {
    default: 'تاسيس البناء| شركة تطوير عقاريه نقدم وحدات عقارية جاهزه',
    template: '%s | تأسيس البناء'
  },
  description: "شركة تأسيس البناء هي شركة رائدة في مجال التطوير العقاري والتأجير في المملكة العربية السعودية. نتميز بتقديم حلول سكنية مبتكرة تلبي احتياجات عملائنا من خلال تطوير وإدارة مجمعات سكنية عصرية بأعلى معايير الجودة. نقدم خدمات متكاملة في تطوير وتأجير الشقق السكنية، مع التركيز على توفير تجربة سكنية استثنائية تجمع بين الراحة والرفاهية والقيمة المستدامة. نلتزم بتقديم خدمات إدارة عقارية احترافية تضمن راحة المستأجرين وحماية استثمارات الملاك.",
  keywords: ['تأسيس البناء', 'مقاولات', 'بناء', 'تشييد', 'استشارات هندسية', 'مشاريع سكنية', 'عقارات', 'مقاول', 'السعودية', 'construction', 'engineering', 'real estate', 'saudi arabia'],
  authors: [{ name: 'Tasis Al Bina' }],
  creator: 'Tasis Al Bina',
  publisher: 'Tasis Al Bina',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: 'en_US',
    title: 'تأسيس البناء | شركة متخصصون في الوحدات السكنيه ',
    description: 'نقدم خدمات البناء والتشييد المتكاملة مع استشارات هندسية احترافية',
    siteName: 'تأسيس البناء',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Tasis Al Bina Construction'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'تأسيس البناء | Tasis Al Bina',
    description: 'شركة رائدة في مجال المقاولات و الوحدات السكنيه',
    images: ['/twitter-image.jpg']
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#20284D',
  manifest: '/manifest.json'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/Group.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="canonical" href="https://www.tasisalbina.com/ar" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="google" content="notranslate" />
        <meta name="application-name" content="Tasis Al Bina" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Tasis Al Bina" />
      </head>
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}
