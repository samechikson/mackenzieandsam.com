'use client';

import React from 'react';

interface RsvpButtonProps {
  className?: string;
}

export const RsvpButton: React.FC<RsvpButtonProps> = ({ className = "" }) => {
  return (
    <a
      href="https://withjoy.com/sam-and-mackenzie/rsvp"
      target="_blank"
      rel="noopener noreferrer"
      className={`bg-wedding-cream text-[#3E2723] px-14 py-3 rounded-full font-mono text-lg tracking-[0.15em] uppercase border-[5px] border-dashed border-wedding-green transition-transform duration-300 hover:scale-105 inline-flex items-center gap-3 ${className}`}
    >
      Send RSVP 💌
    </a>
  );
};
