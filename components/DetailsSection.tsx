'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const DetailsSection: React.FC = () => {
  return (
    <section id="details" className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-20 pb-12 px-4 gap-12 text-center">

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="relative font-script text-5xl md:text-6xl text-wedding-green leading-6">
            may <span className="relative text-3xl md:text-4xl font-semibold leading-6 bottom-2">6, 2027</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >

        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        ><h3 className="font-script text-3xl md:text-5xl text-wedding-green mb-4">
            quinta da bichinha
          </h3>
          <p className="font-script lowercase text-2xl md:text-4xl text-wedding-green mb-8 tracking-wider">
            Aldeia Galega da Merceana, Portugal
          </p>

        </motion.div>
        <motion.a
          whileHover={{ scale: 1.05, backgroundColor: "#5D4037", color: "#fff" }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-3 border-2 border-wedding-brown rounded-full text-wedding-brown font-sans font-semibold tracking-widest uppercase bg-transparent transition-colors duration-300 backdrop-blur-sm cursor-pointer"
          href="/rsvp"
        >
          RSVP
        </motion.a>

      </div>
    </section>
  );
};