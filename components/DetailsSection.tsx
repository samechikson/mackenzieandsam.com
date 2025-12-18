'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { RsvpButton } from './RsvpButton';

export const DetailsSection: React.FC = () => {
  return (
    <section id="details" className="relative w-full overflow-hidden flex flex-col items-center">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-20 pb-4 px-4 gap-12 text-center">

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="relative font-script text-5xl md:text-6xl text-wedding-green leading-6">
            may <span className="relative text-3xl md:text-4xl font-semibold leading-6 bottom-2">5 th and 6 th, 2027</span>
          </h2>
        </motion.div>


        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h3 className="font-mono text-xl md:text-2xl text-wedding-brown">
            Quinta da Bichinha
            <br />
            Portugal
          </h3>
        </motion.div>
        <motion.div
          whileTap={{ scale: 0.95 }}
        >
          <RsvpButton />
        </motion.div>

      </div >

      <motion.div
        className="max-w-md w-full px-4 my-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <Image
          src="/images/home/vineyard.png"
          alt="Vineyard"
          width={800}
          height={600}
          className="w-full h-auto"
          priority
        />
      </motion.div>

    </section >
  );
};