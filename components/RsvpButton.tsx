'use client';

import React from 'react';

interface RsvpButtonProps {
  className?: string;
}

export const RsvpButton: React.FC<RsvpButtonProps> = ({ className = "" }) => {
  return (
    <div className="text-center">
      <a
        href="https://withjoy.com/sam-and-mackenzie/rsvp"
        target="_blank"
        rel="noopener noreferrer"
        className={`bg-wedding-cream text-[#3E2723] px-14 py-3 rounded-full font-mono text-lg tracking-[0.15em] uppercase border-[5px] border-dashed border-wedding-green transition-transform duration-300 hover:scale-105 inline-flex items-center gap-3 ${className}`}
      >
        RSVP here 💌
      </a>

      <p className="font-mono text-base font-semibold text-wedding-green mt-4">
        Please RSVP by February 1st, 2027
      </p>
    </div>
  );
};
