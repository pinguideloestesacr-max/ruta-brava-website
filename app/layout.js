import './globals.css';

export const metadata = {
  title: 'Ruta Brava - ATV Rentals & Guided Tours in Santa Teresa',
  description: 'Explore Santa Teresa and Mal País with premium ATV rentals and guided adventure tours. Gas included for tours, luxury shuttles and vehicle rentals coming soon.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
