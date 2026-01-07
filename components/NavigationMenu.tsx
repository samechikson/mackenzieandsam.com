'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { RsvpButton } from '@/components/RsvpButton';

import { NAV_ITEMS } from '@/lib/constants';

export const NavigationMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleMenu}
        className="fixed top-6 left-6 z-50 p-2 text-wedding-green hover:opacity-80 transition-opacity font-mono text-2xl hover:text-wedding-brown hover:cursor-pointer rounded-full hover:bg-wedding-paper px-4"
        aria-label="Toggle Menu"
      >
        Menu
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-wedding-cream/98 flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-10">
              {NAV_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 + 0.1, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="font-mono text-2xl md:text-5xl text-wedding-green hover:text-wedding-brown transition-colors cursor-pointer block"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: NAV_ITEMS.length * 0.1 + 0.1, duration: 0.5 }}
              className="mt-10"
            >
              <RsvpButton />
            </motion.div>
          </motion.div>
        )}


      </AnimatePresence>
    </>
  );
};
