'use client';

import React from 'react';

interface RsvpButtonProps {
  className?: string;
}

export const RsvpButton: React.FC<RsvpButtonProps> = ({ className = "" }) => {
  return (
    <a
      href="/rsvp"
      className={`bg-[#F2F0E9] text-[#3E2723] px-12 py-4 rounded-full font-mono text-sm tracking-[0.2em] uppercase hover:scale-105 transition-transform duration-300 inline-block ${className}`}
    >
      RSVP Now
    </a>
  );
};
