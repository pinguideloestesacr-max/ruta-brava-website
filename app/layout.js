import './globals.css';

export const metadata = {
  title: 'Ruta Brava - ATV Rentals & Guided Tours in Santa Teresa',
  description: 'Explore Santa Teresa and Mal País with premium ATV rentals and guided adventure tours. Gas included for tours, luxury shuttles and vehicle rentals coming soon.',
  keywords: ['ATV rentals', 'guided tours', 'Santa Teresa', 'Mal País', 'adventure', 'Costa Rica', 'Ruta Brava', 'ATV tours', 'jungle trails', 'beach rides'],
  authors: [{ name: 'Ruta Brava' }],
  creator: 'Ruta Brava',
  publisher: 'Ruta Brava',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rutabravagroup.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ruta Brava - ATV Rentals & Guided Tours',
    description: 'Premium ATV rentals and guided adventure tours in Santa Teresa and Mal País, Costa Rica.',
    url: 'https://rutabravagroup.com',
    siteName: 'Ruta Brava',
    images: [
      {
        url: '/images/ruta-brava-atv-river-action.jpg',
        width: 1200,
        height: 630,
        alt: 'Ruta Brava ATV Adventure',
      },
    ],
    locale: 'es_CR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ruta Brava - ATV Rentals & Guided Tours',
    description: 'Premium ATV rentals and guided adventure tours in Santa Teresa and Mal País.',
    images: ['/images/ruta-brava-atv-river-action.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
