import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', href: '#hero' },
    { name: 'Details', href: '#details' },
    { name: 'Our Story', href: '#story' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      className={`fixed top-0 right-0 left-0 z-50 flex justify-end px-6 py-6 pointer-events-none`}
    >
      <ul className="pointer-events-auto flex space-x-6 md:space-x-8 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-sm border border-[#556B2F]/20">
        {links.map((link) => (
          <li key={link.name}>
            <a 
              href={link.href}
              className="font-sans text-[#556B2F] hover:text-[#5D4037] transition-colors text-xs md:text-sm uppercase tracking-widest font-bold"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};
