'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RsvpButton } from './RsvpButton';

export const EnvelopeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"] // Start when section enters viewport, end when it leaves
  });

  // Transform scroll progress into animation values
  // Left text: slides in from left as you scroll
  const leftTextX = useTransform(scrollYProgress, [0, 0.3], [-100, 0]);
  const leftTextOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Right text: slides in from right as you scroll
  const rightTextX = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const rightTextOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Bottom text: slides in from bottom as you scroll
  const bottomTextY = useTransform(scrollYProgress, [0.4, 0.7], [100, 0]);
  const bottomTextOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);

  // Card 1 (main invite): slides up more dramatically based on scroll
  const card1Y = useTransform(scrollYProgress, [0, 0.8], [0, -250]);
  const card1X = useTransform(scrollYProgress, [0, 0.8], [100, 200]);
  const card1Rotate = useTransform(scrollYProgress, [0, 0.8], [0, 25]);

  // Card 2 (green): slides up and rotates based on scroll
  const card2Y = useTransform(scrollYProgress, [0, 0.6], [50, -150]);
  const card2X = useTransform(scrollYProgress, [0, 0.9], [100, -20]);
  const card2Rotate = useTransform(scrollYProgress, [0.2, 0.6], [0, -20]);

  // Card 3 (envelope photo 1): slides up and rotates based on scroll
  const card3Y = useTransform(scrollYProgress, [0, 0.9], [20, -130]);
  const card3X = useTransform(scrollYProgress, [0, 0.9], [50, 180]);
  const card3Rotate = useTransform(scrollYProgress, [0.2, 0.6], [5, 15]);

  // Card 4 (envelope photo 2): slides up and rotates based on scroll
  const card4Y = useTransform(scrollYProgress, [0, 0.9], [50, -180]);
  const card4X = useTransform(scrollYProgress, [0, 0.9], [0, -20]);
  const card4Rotate = useTransform(scrollYProgress, [0, 0.6], [0, -5]);

  return (
    <section
      id="invitation"
    >
      <div className="min-h-[90vh] flex flex-row justify-center items-end">
        <div ref={sectionRef} className="overflow-visible flex flex-col gap-30 md:gap-10 lg:flex-row items-center justify-end">
          {/* Left Text */}
          <motion.div
            className="flex-1 flex justify-center md:justify-end px-10 mb-10 md:mb-0"
            style={{ x: leftTextX, opacity: leftTextOpacity }}
          >
            <h2 className="font-script text-6xl md:text-8xl text-wedding-green">you're</h2>
          </motion.div>

          {/* Envelope Container */}
          <div className="relative w-[320px] h-[220px] md:w-[400px] md:h-[280px] flex justify-center mx-4 mt-20 md:mt-0">

            <div className="absolute bottom-0 object-cover"><img src="/images/envelope-back.png" alt="Envelope" /></div>
            {/* Card 2 (Save the Date 2 ) - Starts inside, slides up */}
            <motion.div
              style={{ y: card2Y, rotate: card2Rotate, x: card2X }}
              className="absolute -ml-7 md:ml-0"
            >
              <img src="/images/save-the-date-2.png" alt="Invite Pic" className="w-2/3 object-cover grayscale-[0.3]" />
            </motion.div>
            {/* 4. Card 1 (Save the Date) - Starts inside, slides up */}
            <motion.div
              style={{ y: card1Y, rotate: card1Rotate, x: card1X }}
              className="absolute -ml-7 md:ml-0"
            >
              <img src="/images/save-the-date.png" alt="Invite Pic" className="w-1/2 object-cover grayscale-[0.3]" />
            </motion.div>
            {/* 5. Card 3 (Photo Reel) - Starts inside, slides up */}
            <motion.div
              style={{ y: card3Y, rotate: card3Rotate, x: card3X }}
              className="absolute -ml-7 md:ml-0"
            >
              <img src="/images/envelopephoto1.png" alt="Invite Pic" className="w-2/3 object-cover grayscale-[0.3]" />
            </motion.div>

            {/* Card 4 (Vineyard Photo) - Starts inside, slides up */}
            <motion.div
              style={{ y: card4Y, rotate: card4Rotate, x: card4X }}
              className="absolute -ml-7 md:ml-0"
            >
              <img src="/images/envelopephoto2.png" alt="Invite Pic" className="w-2/3 object-cover grayscale-[0.3]" />
            </motion.div>

            {/* Envelope Front */}
            <div className="absolute bottom-0 object-cover"><img src="/images/envelope-front.png" alt="Envelope" /></div>
          </div>


          {/* Right Text */}
          <motion.div
            className="flex-1 flex justify-center md:justify-start px-10 mt-10 md:mt-0"
            style={{ x: rightTextX, opacity: rightTextOpacity }}
          >
            <h2 className="font-script text-6xl md:text-8xl text-wedding-green">invited</h2>
          </motion.div>
        </div>
      </div>

      {/* Bottom Text */}
      <motion.div
        className="flex-1 flex items-center justify-center px-10 mt-20 mb-50"
        style={{ y: bottomTextY, opacity: bottomTextOpacity }}
      >
        <h2 className="relative font-script text-5xl md:text-7xl text-wedding-green leading-6">
          may <span className="relative text-3xl md:text-5xl font-semibold leading-6 bottom-2">5 th and 6 th, 2027</span>
        </h2>
      </motion.div>

      <div className="flex-1 flex items-center justify-center px-10 mt-20 mb-50">
        <RsvpButton />
      </div>

    </section>
  );
};