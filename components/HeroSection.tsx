'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden py-20 px-4">
      {/* Top Left Text */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-[10%] left-[5%]  md:left-[10%] z-10"
      >
        <h1 className="font-script text-5xl md:text-6xl lg:text-8xl text-wedding-green -rotate-6 tracking-wide">
          mackenzie and sam
        </h1>
      </motion.div>

      {/* Center Photo Grid */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="relative z-0 max-w-80 lg:max-w-100 w-full"
      >
        <img src="images/home/kenzsam.gif" alt="Photobooth" className='w-full' />
      </motion.div>

      {/* Bottom Right Text */}
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        className="absolute bottom-[15%] right-[5%] md:bottom-[20%] md:right-[15%] z-10 text-right"
      >
        <h2 className="font-script text-5xl md:text-6xl lg:text-7xl text-wedding-green -rotate-6 tracking-wide">
          are getting married!
        </h2>
      </motion.div>

      {/* Bottom Center Text */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
        className="absolute bottom-2 z-10"
      >
        <h3 className="font-script text-4xl md:text-5xl text-wedding-green tracking-widest">
          and...
        </h3>
      </motion.div>
    </section>
  );
};