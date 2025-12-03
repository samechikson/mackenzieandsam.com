import React from 'react';
import { motion } from 'framer-motion';

export const DetailsSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/id/28/1920/1080" 
          alt="Vineyard Landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F2F0E9] opacity-60 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#F2F0E9] via-transparent to-transparent opacity-100 h-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-start pt-20 px-4 text-center overflow-hidden">
        
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="font-script text-5xl md:text-7xl text-[#5D4037] mb-2">
            may 6, 2027
          </h2>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h3 className="font-script text-3xl md:text-4xl text-[#5D4037] mb-6">
            quinta da bichinha
          </h3>
        </motion.div>
          
        <motion.div
           initial={{ y: 50, opacity: 0 }}
           whileInView={{ y: 0, opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.4 }}
        >
            <p className="font-sans text-lg md:text-xl text-[#3E2C26] mb-8 uppercase tracking-wider font-bold">
              Aldeia Galega da Merceana, Portugal
            </p>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#5D4037", color: "#fff" }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-3 border-2 border-[#5D4037] rounded-full text-[#5D4037] font-sans font-semibold tracking-widest uppercase bg-transparent transition-colors duration-300 backdrop-blur-sm"
              onClick={() => alert("RSVP functionality coming soon!")}
            >
              RSVP
            </motion.button>
        </motion.div>

      </div>
    </section>
  );
};