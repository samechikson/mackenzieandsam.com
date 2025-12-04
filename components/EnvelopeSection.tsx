import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const EnvelopeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
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
  
  // Card 2 (green): slides up and rotates based on scroll
  const card2Y = useTransform(scrollYProgress, [0.2, 0.6], [20, -140]);
  const card2Rotate = useTransform(scrollYProgress, [0.2, 0.6], [0, -8]);
  const card2X = useTransform(scrollYProgress, [0.2, 0.6], [0, 50]);
  
  // Card 1 (main invite): slides up more dramatically based on scroll
  const card1Y = useTransform(scrollYProgress, [0.3, 0.8], [0, -250]);
  const card1X = useTransform(scrollYProgress, [0.3, 0.8], [0, 50]);
  const card1Rotate = useTransform(scrollYProgress, [0.3, 0.8], [0, 8]);

  console.log(card1Y);

  return (
    <section 
      ref={sectionRef}
      className="min-h-200 flex flex-col md:flex-row items-center justify-center py-20 overflow-hidden bg-wedding-cream"
    >
      
      {/* Left Text */}
      <motion.div 
        className="flex-1 flex justify-center md:justify-end px-10 mb-10 md:mb-0"
        style={{ x: leftTextX, opacity: leftTextOpacity }}
      >
        <h2 className="font-script text-6xl md:text-8xl text-wedding-green">you're</h2>
      </motion.div>

      {/* Envelope Container */}
      <div className="relative w-[300px] h-[220px] md:w-[400px] md:h-[280px] flex justify-center mx-4 mt-20 md:mt-0">
        
        <div className="absolute bottom-0 object-cover"><img src="/images/envelope-back.png" alt="Envelope" /></div>
        

        {/* 4. Card 1 (Save the Date) - Starts inside, slides up */}
        <motion.div 
          style={{ y: card1Y, rotate: card1Rotate, x: card1X }}
        >
          <img src="/images/save-the-date.png" alt="Invite Pic" className="w-full h-full object-cover grayscale-[0.3]" />
        </motion.div>

        {/* Card 2 (Save the Date 2 ) - Starts inside, slides up */}
        {/* <motion.div 
          style={{ y: card2Y, rotate: card2Rotate, x: card2X }}
        >
          <img src="/images/save-the-date.png" alt="Invite Pic" className="w-full h-full object-cover grayscale-[0.3]" />
        </motion.div>
         */}

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

    </section>
  );
};