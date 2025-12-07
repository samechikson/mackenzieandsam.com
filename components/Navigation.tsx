import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const location = useLocation();
  
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Details', path: '/details' },
    { name: 'Events', path: '/events' },
    { name: 'Travel', path: '/travel' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed top-0 right-0 left-0 z-50 flex justify-end px-6 py-6 pointer-events-none"
    >
      <ul className="pointer-events-auto flex space-x-6 md:space-x-8 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-sm border border-wedding-green/20">
        {links.map((link) => (
          <li key={link.name}>
            <Link 
              to={link.path}
              className={`font-sans transition-colors text-xs md:text-sm uppercase tracking-widest font-bold ${
                location.pathname === link.path ? 'text-wedding-brown' : 'text-wedding-green hover:text-wedding-brown'
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};
