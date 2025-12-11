import React from 'react';
import { Pinyon_Script, Montserrat, Playfair_Display } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import AuthGuard from '../components/AuthGuard';
import { Navigation } from '../components/Navigation';

const pinyonScript = Pinyon_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pinyon',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

// Configure local fonts if needed, but existing CSS handles them via @font-face
// We just need to ensure the Google Fonts are available
// Since CSS refers to them by name, next/font imports might not be automatically picked up by "Montserrat" name 
// unless we use the variable or set the fontFamily in Tailwind config.
// However, the existing CSS uses explicit strings "Montserrat".
// next/font/google works by providing a class or variable that sets the font-family.
// To make "Montserrat" work in CSS relying on system/web fonts, we need to apply the variable OR 
// just use the class on the body, AND update the CSS variables to use the next/font variables.
//
// The existing CSS has: --font-sans: "Garet", "Montserrat", sans-serif;
// We can change this to: --font-sans: "Garet", var(--font-montserrat), sans-serif;

export const metadata = {
  title: 'Mackenzie & Sam',
  description: 'Wedding website for Mackenzie and Sam',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${pinyonScript.variable} ${montserrat.variable} ${playfair.variable}`}>
      <body className="antialiased bg-wedding-cream">
        <AuthGuard>
          <Navigation />
          {children}
        </AuthGuard>
      </body>
    </html>
  );
}
