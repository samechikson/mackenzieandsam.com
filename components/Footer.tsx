import { Heart } from 'lucide-react';

import Link from 'next/link';
import { NAV_ITEMS } from '@/lib/constants';

export const Footer = () => {
  return (
    <footer className="w-full py-12 bg-wedding-green text-wedding-cream text-center">
      <div className="flex flex-col items-center gap-8">

        <nav className="flex flex-col md:flex-row gap-6 md:gap-8 mb-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-mono text-lg hover:text-wedding-brown transition-colors uppercase tracking-widest px-4 py-2 rounded-full hover:bg-wedding-paper"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col md:flex-row gap-2 md:gap-8 font-mono uppercase tracking-widest text-base opacity-80">
          <p>May 6th, 2027</p>
          <span className="hidden md:inline">•</span>
          <p>Quinta da Bichinha, Portugal</p>
        </div>
        <p className="font-mono text-sm opacity-60 hover:opacity-100 transition-opacity">
          Made with <Heart className="inline w-4 h-4" /> by Sam & Mackenzie
        </p>
      </div>
    </footer>
  );
};
