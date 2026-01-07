'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const flowers = [
  { src: '/images/flowers/16.png', alt: 'Flower 16', width: 100, height: 100, className: 'top-10 left-[-50px] md:top-20 md:left-20' },
  { src: '/images/flowers/17.png', alt: 'Flower 17', width: 100, height: 100, className: 'top-1/4 right-[-40px] md:right-32' },
  { src: '/images/flowers/18.png', alt: 'Flower 18', width: 100, height: 100, className: 'top-1/2 left-[-30px] md:left-40' },
  { src: '/images/flowers/19.png', alt: 'Flower 19', width: 100, height: 100, className: 'bottom-1/3 right-[-20px] md:right-20' },
  { src: '/images/flowers/20.png', alt: 'Flower 20', width: 100, height: 100, className: 'bottom-10 left-0 md:left-20' },
];

export const OurStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]); // Much faster move up
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 500]);  // Faster move down
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 250]);

  const transforms = [y1, y2, y3, y4, y1, y2, y3, y4, y1];

  return (
    <section
      id="our-story"
      ref={containerRef}
      className="relative min-h-screen w-full bg-wedding-brown py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center text-wedding-cream flex flex-col gap-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-6 font-mono text-xl md:text-2xl leading-relaxed"
        >
          <p>
            We had our first date at a board game bar in San Francisco. A European boy and a California girl's paths crossed, and we're so glad they did!
          </p>
          <p>
            A few years, one move to Southern California, and a sassy cat named Otis later, we realized we’d built a little life that felt like home.
          </p>
          <p>
            So here we are, ready to make it official (and throw a really good party while we’re at it).
          </p>
          <p>
            Join us in Portugal to celebrate this big moment with our favorite people. We want to tie the knot in the best way possible.
          </p>
          <p>
            Mark your calendars, pack your dancing shoes, and get ready for a trip full of laughter, dancing, memories, and a few happy tears.
          </p>
          <p>
            Saúde!
          </p>
        </motion.div>
      </div>

      {flowers.map((flower, index) => (
        <motion.div
          key={flower.alt + index}
          style={{ y: transforms[index % transforms.length] }}
          className={`absolute ${flower.className} opacity-80 pointer-events-none hidden md:block`}
        >
          <Image
            src={flower.src}
            alt={flower.alt}
            width={flower.width}
            height={flower.height}
            className="object-contain"
          />
        </motion.div>
      ))}

      {/* Mobile visible background elements (simplified or different positioning if needed, keeping simple for now) */}
      {/* Mobile visible background elements */}
      <div className="md:hidden absolute top-10 left-[-40px] opacity-20 pointer-events-none rotate-12">
        <Image src="/images/flowers/16.png" alt="flower" width={150} height={150} />
      </div>
      <div className="md:hidden absolute bottom-20 right-[-40px] opacity-20 pointer-events-none -rotate-12">
        <Image src="/images/flowers/19.png" alt="flower" width={150} height={150} />
      </div>

    </section>
  );
};
