// frontend/src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Campus – Your Social Dining Network',
  description: 'Connect over food. Discover local gems. Build community, one bite at a time.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/logo.svg" />
      </head>
      <body suppressHydrationWarning={true} className="font-body bg-neutral min-h-screen">
        <Header />
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}