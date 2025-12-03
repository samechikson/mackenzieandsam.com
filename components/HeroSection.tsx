import React from 'react';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden py-20 px-4">
      {/* Top Left Text */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-[10%] left-[5%] md:top-[15%] md:left-[10%] z-10"
      >
        <h1 className="font-script text-5xl md:text-7xl lg:text-8xl text-wedding-green -rotate-6 tracking-wide">
          mackenzie and sam
        </h1>
      </motion.div>

      {/* Center Photo Grid */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="relative z-0 border-8 border-[#5D4037] bg-[#5D4037] shadow-2xl max-w-md md:max-w-lg w-full aspect-square"
      >
        <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-2 bg-[#5D4037] p-1">
          {/* Using local photos from public/images/s+m/ */}
          <img 
            src="public/images/s+m/1.jpg" 
            alt="Mackenzie and Sam 1" 
            className="w-full h-full object-cover grayscale sepia-[.5] hover:sepia-0 transition-all duration-500"
          />
          <img 
            src="images/s+m/2.jpg" 
            alt="Mackenzie and Sam 2" 
            className="w-full h-full object-cover grayscale sepia-[.5] hover:sepia-0 transition-all duration-500"
          />
          <img 
            src="images/s+m/3.jpg" 
            alt="Mackenzie and Sam 3" 
            className="w-full h-full object-cover grayscale sepia-[.5] hover:sepia-0 transition-all duration-500"
          />
          <img 
            src="images/s+m/4.jpg" 
            alt="Mackenzie and Sam 4" 
            className="w-full h-full object-cover grayscale sepia-[.5] hover:sepia-0 transition-all duration-500"
          />
        </div>
      </motion.div>

      {/* Bottom Right Text */}
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        className="absolute bottom-[15%] right-[5%] md:bottom-[20%] md:right-[10%] z-10 text-right"
      >
        <h2 className="font-script text-4xl md:text-6xl lg:text-7xl text-wedding-green -rotate-6 tracking-wide">
          are getting married!
        </h2>
      </motion.div>

       {/* Bottom Center Text */}
       <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
        className="absolute bottom-[5%] md:bottom-[10%] z-10"
      >
        <h3 className="font-script text-3xl md:text-5xl text-wedding-green opacity-80 tracking-widest">
          and...
        </h3>
      </motion.div>
    </section>
  );
};