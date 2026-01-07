import { Heart } from 'lucide-react';
import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full py-12 bg-wedding-green text-wedding-cream text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col md:flex-row gap-2 md:gap-8 font-mono uppercase tracking-widest text-base">
          <p>May 6th, 2027</p>
          <span className="hidden md:inline">•</span>
          <p>Quinta da Bichinha, Portugal</p>
        </div>
        <p className="font-mono text-sm">Made with <Heart className="inline" /> by Sam & Mackenzie</p>
      </div>
    </footer>
  );
};
