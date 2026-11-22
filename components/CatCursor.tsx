'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Renders a small image of our cat (Otis) that follows just below the
 * regular mouse cursor. Only active on devices with a fine pointer (mouse),
 * so touch devices keep their native behavior.
 */
export const CatCursor: React.FC = () => {
  const catRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Only enable the follower on devices that actually have a mouse.
    if (typeof window === 'undefined') return;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    const cat = catRef.current;
    if (!cat) return;

    const handleMove = (e: MouseEvent) => {
      // Position the cat a little below the cursor, horizontally centered on it.
      cat.style.transform = `translate3d(${e.clientX}px, ${e.clientY + 18}px, 0) translateX(-50%)`;
      cat.style.opacity = '1';
    };

    const handleLeave = () => {
      cat.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <img
      ref={catRef}
      src="/images/otis-cursor.png"
      alt=""
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 72,
        height: 'auto',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0,
        willChange: 'transform',
      }}
    />
  );
};
