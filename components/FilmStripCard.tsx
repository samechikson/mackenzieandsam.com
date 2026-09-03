'use client';

import React from 'react';
import clsx from 'clsx';

export const FilmStripCard = ({
  children,
  className = '',
  stripeClassName = 'bg-wedding-green',
  align = 'center',
}: {
  children: React.ReactNode;
  className?: string;
  stripeClassName?: string;
  align?: 'center' | 'start';
}) => {
  // Generate notches for the strip effect
  const notches = Array.from({ length: 20 });

  return (
    <div
      className={clsx(
        'relative w-full rounded-3xl bg-wedding-cream flex flex-col overflow-hidden',
        className,
      )}
    >
      {/* Top Strip */}
      <div className="absolute top-0 w-full h-8 flex justify-between px-2 lg:px-8">
        {notches.map((_, i) => (
          <div
            key={`top-${i}`}
            className={clsx('w-[2%] h-600 md:h-200', stripeClassName)}
          />
        ))}
      </div>

      {/* Content */}
      <div className="p-6 w-full flex-1 z-10">
        <div
          className={clsx(
            'h-full w-full bg-wedding-blue rounded-xl p-8 md:p-12 flex flex-col items-center text-center',
            align === 'start' ? 'justify-start' : 'justify-center',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
