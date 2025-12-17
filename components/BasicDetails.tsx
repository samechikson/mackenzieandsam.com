'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RsvpButton } from './RsvpButton';

export const BasicDetails: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const FilmStripCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    // Generate notches for the strip effect
    // We create enough to cover wide screens. 
    const notches = Array.from({ length: 20 });

    return (
      <div className={`relative w-full rounded-3xl bg-[#3E2723] flex flex-col ${className} overflow-hidden`}>
        {/* Top Strip */}

        <div className="absolute top-0 w-full h-100 flex justify-between px-8">
          {notches.map((_, i) => (
            <div key={`top-${i}`} className="w-[2%] h-100 bg-[#F0A6CA]" />
          ))}
        </div>

        {/* Content */}
        <div className="p-6 w-full flex-1 z-10">
          <div className="h-full w-full bg-wedding-paper rounded-xl p-8 md:p-12 flex flex-col items-center justify-center text-center">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="w-full py-24 px-4 md:px-8 flex flex-col items-center gap-12 bg-[#8DA9C4] text-[#3E2723]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="w-full max-w-5xl flex flex-col gap-16"
      >
        {/* Header */}
        <motion.h2
          variants={itemVariants}
          className="font-script lowercase text-4xl md:text-6xl text-white text-center tracking-wide"
        >
          ALL THE INFORMATION:
        </motion.h2>

        {/* Section 1: Date & Location */}
        <motion.div variants={itemVariants}>
          <FilmStripCard>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
              {/* Date */}
              <div className="flex flex-col items-center gap-4">
                <h3 className="font-mono text-sm tracking-[0.2em] font-bold uppercase">Date</h3>
                <div className="font-mono text-base uppercase tracking-widest leading-relaxed">
                  May 6th<br />
                  Ceremony
                </div>
              </div>

              {/* Location */}
              <div className="flex flex-col items-center gap-4">
                <h3 className="font-mono text-sm tracking-[0.2em] font-bold uppercase">Location</h3>
                <div className="font-mono text-base uppercase tracking-widest leading-relaxed">
                  Quinta da Bichinha<br />
                  <span className="text-mono">Aldeia Galega da Merceana, Portugal</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <h3 className="font-mono text-sm tracking-[0.2em] font-bold uppercase">Time</h3>
                <div className="font-mono text-base uppercase tracking-widest leading-relaxed">
                  Late afternoon
                </div>
              </div>
            </div>
          </FilmStripCard>
        </motion.div>

        {/* Section 2: Schedule */}
        <motion.div variants={itemVariants}>
          <FilmStripCard>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4">

              {/* Wednesday */}
              <div className="flex flex-col items-center gap-4">
                <h3 className="font-mono text-sm tracking-[0.2em] font-bold uppercase whitespace-nowrap">Wednesday May 5th</h3>
                <p className="font-mono text-sm uppercase tracking-wider max-w-[200px] leading-relaxed">
                  Drop by for a drink and laughs before the big day!
                </p>
              </div>

              {/* Thursday */}
              <div className="flex flex-col items-center gap-4">
                <h3 className="font-mono text-sm tracking-[0.2em] font-bold uppercase whitespace-nowrap">Thursday May 6th</h3>
                <p className="font-mono text-sm uppercase tracking-wider max-w-[200px] leading-relaxed">
                  The Wedding ceremony, dinner, and dancing 'till late
                </p>
              </div>

              {/* Friday */}
              <div className="flex flex-col items-center gap-4">
                <h3 className="font-mono text-sm tracking-[0.2em] font-bold uppercase whitespace-nowrap">Friday May 7th</h3>
                <p className="font-mono text-sm uppercase tracking-wider max-w-[200px] leading-relaxed">
                  Brunch & Goodbyes. Recover, Refuel, and relive the moments.
                </p>
              </div>

            </div>
          </FilmStripCard>
        </motion.div>

        {/* Section 3: Travel Logistics */}
        <motion.div variants={itemVariants}>
          <FilmStripCard>
            <h2 className="font-mono text-xl text-wedding-green uppercase tracking-wider pb-6">
              Travel Logistics
            </h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4">

              {/* Wednesday */}
              <div className="flex flex-col items-center gap-4">
                <h3 className="font-mono text-sm tracking-[0.2em] font-bold uppercase whitespace-nowrap">Passport</h3>
                <p className="font-mono text-sm uppercase tracking-wider max-w-[200px] leading-relaxed">
                  Please ensure you have a valid passport for entry into Portugal.
                </p>
              </div>

              {/* Thursday */}
              <div className="flex flex-col items-center gap-4">
                <h3 className="font-mono text-sm tracking-[0.2em] font-bold uppercase whitespace-nowrap">Flying in</h3>
                <p className="font-mono text-sm uppercase tracking-wider max-w-[200px] leading-relaxed">
                  Lisbon Humberto Delgado Airport (LIS) is the closest major airport.
                </p>
              </div>

              {/* Friday */}
              <div className="flex flex-col items-center gap-4">
                <h3 className="font-mono text-sm tracking-[0.2em] font-bold uppercase whitespace-nowrap">Getting to the Quinta</h3>
                <p className="font-mono text-sm uppercase tracking-wider max-w-[200px] leading-relaxed">
                  <p className="mb-2">Options from Lisbon (45-60 min):</p>
                  <ul className="text-sm space-y-1 opacity-80">
                    <li>• Rental car (recommended)</li>
                    <li>• Private transfer</li>
                    <li>• Taxi/Uber/Bolt</li>
                  </ul>
                </p>
              </div>

            </div>
          </FilmStripCard>
        </motion.div>

        {/* Button */}
        <motion.div variants={itemVariants} className="flex justify-center mt-4">
          <RsvpButton />
        </motion.div>

      </motion.div>
    </section>
  );
};
