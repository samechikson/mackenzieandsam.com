import React from 'react';
import './globals.css';
import AuthGuard from '../components/AuthGuard';
import { Analytics } from "@vercel/analytics/next"

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
    <html lang="en" className="antialiased bg-white">
      <body className="antialiased min-h-screen" style={{ backgroundImage: 'repeating-linear-gradient(90deg, white, white 10px, #e4ecfa 10px, #e4ecfa 20px)' }}>
        <AuthGuard>
          {children}
        </AuthGuard>
        <Analytics />
      </body>
    </html>
  );
}
