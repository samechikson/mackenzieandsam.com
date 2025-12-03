import React from 'react';
import { motion } from 'framer-motion';

export const EnvelopeSection: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center py-20 overflow-hidden bg-wedding-cream">
      
      {/* Left Text */}
      <motion.div 
        className="flex-1 flex justify-center md:justify-end px-10 mb-10 md:mb-0"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="font-script text-6xl md:text-8xl text-wedding-green">you're</h2>
      </motion.div>

      {/* Envelope Container */}
      <div className="relative w-[300px] h-[220px] md:w-[400px] md:h-[280px] flex justify-center mx-4 mt-20 md:mt-0">
        
        {/* 1. Back of Envelope (Static) */}
        <div className="absolute bottom-0 w-full h-full bg-[#e3d5b8] shadow-lg z-0 rounded-b-md"></div>
        
        {/* 2. Inner Flap (Darker Triangle pointing down) */}
        <div 
            className="absolute top-0 w-full h-full z-0 brightness-90"
            style={{
                 clipPath: 'polygon(0 0, 50% 45%, 100% 0)',
                 background: '#d1c2a3'
            }}
        ></div>

        {/* 3. Card 2 (Green Pattern) - Starts inside, slides up */}
        <motion.div 
          className="absolute left-[10%] w-[80%] h-[140%] bg-[#8F9E56] shadow-md z-10 origin-bottom rounded-sm overflow-hidden"
          initial={{ y: 20, rotate: 0, scale: 0.9 }} // Start hidden inside (y: 20 puts it deep)
          whileInView={{ y: -140, rotate: -8, scale: 0.9 }} // Pop out and rotate
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.3, type: "spring", bounce: 0.3 }}
        >
            <div className="w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <p className="text-white font-sans text-xs text-center opacity-80 tracking-widest">DETAILS<br/>mackenzie & sam</p>
            </div>
        </motion.div>

        {/* 4. Card 1 (Main Invite) - Starts inside, slides up */}
        <motion.div 
          className="absolute left-[7.5%] w-[85%] h-[160%] bg-white shadow-md z-10 flex flex-col items-center p-4 text-center border border-gray-100 rounded-sm"
          initial={{ y: 50 }} // Start hidden inside
          whileInView={{ y: -180 }} // Slide completely out
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
        >
          <div className="w-full flex-1 bg-gray-100 p-1 mt-2 rotate-1 shadow-sm">
             <img src="/images/save-the-date.png" alt="Invite Pic" className="w-full h-full object-cover grayscale-[0.3]" />
          </div>
        </motion.div>

        {/* 5. Front of Envelope (The Pocket) - Z-Index 20 to cover bottom of cards */}
        <div className="absolute bottom-0 w-full h-full z-20 pointer-events-none filter drop-shadow-md">
            <svg viewBox="0 0 100 60" className="w-full h-full" preserveAspectRatio="none">
                <path d="M0,60 L50,35 L100,60 L100,0 L0,0 Z" fill="none" /> {/* Viewbox bounds */}
                <path d="M0,60 L50,30 L100,60 L0,60 Z" fill="#eaddcf" /> {/* Bottom pocket triangle */}
                <path d="M0,60 L0,0 L30,60 Z" fill="#e6d8cc" opacity="0.4" /> {/* Side shadow hint left */}
                <path d="M100,60 L100,0 L70,60 Z" fill="#e6d8cc" opacity="0.4" /> {/* Side shadow hint right */}
            </svg>
        </div>
      </div>

      {/* Right Text */}
      <motion.div 
        className="flex-1 flex justify-center md:justify-start px-10 mt-10 md:mt-0"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="font-script text-6xl md:text-8xl text-wedding-green">invited</h2>
      </motion.div>

    </section>
  );
};