import React from 'react';
import { motion } from 'framer-motion';

export const Travel: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-wedding-cream">
      {/* Left Side - Image Placeholder */}
      <div className="w-full md:w-1/2 min-h-[50vh] md:h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-sm aspect-3/4 shadow-lg flex items-center justify-center"
        >
             <img src="/images/travel/sm-paris.webp" alt="Sam and mackenzie" className="rounded-lg" />
        </motion.div>
      </div>

      {/* Right Side - Content */}
      <div className="w-full md:w-1/2 min-h-[50vh] md:h-screen relative flex items-center justify-center p-4 md:p-8 overflow-hidden bg-cover bg-[url('/images/travel/lisbon-background.webp')]">
        
        {/* Paper Note */}
        <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 bg-wedding-paper max-w-md w-full p-8 md:p-12 shadow-2xl rotate-1 text-wedding-brown rounded-lg"
        >
            {/* Paperclip */}
            <div className="absolute -top-6 right-8 w-6 overflow-hidden h-20 pointer-events-none opacity-80 mix-blend-multiply">
                 <svg viewBox="0 0 25 50" fill="none" stroke="#777" strokeWidth="2" strokeLinecap="round">
                     <path d="M18 5 v35 a 10 10 0 0 1 -20 0 v-30 a 5 5 0 0 1 10 0 v28" />
                 </svg>
            </div>

            {/* Content */}
            <div className="space-y-10 ">
                
                {/* Header */}
                <div className="text-center mb-8">
                     <h1 className="font-script text-6xl lowercase mb-2">travel</h1>
                </div>

                {/* Venue */}
                <div className="space-y-2">
                    <h2 className="lowercase text-4xl mb-2 font-script">Venue Address</h2>
                    <div className="flex flex-row justify-between align-center">
                      <p className="font-serif leading-relaxed text-lg">
                          Quinta da Bicinha<br />
                          Estr. de Vila Chã<br />
                          2580-413, Portugal
                      </p>
                       <div className="flex flex-row items-center">
                         <a href="https://maps.app.goo.gl/wp6AADZdJU9CZcWv9"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-3 py-1 text-xs bg-wedding-brown text-white rounded-full hover:bg-[#3E2C26] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 font-sans"
                            >
                                View on Google Maps
                            </a>
                       </div>
                    </div>
                </div>

                {/* Flying In */}
                <div className="space-y-2">
                     <h2 className="lowercase text-4xl mb-4 font-script">Flying In</h2>
                     <p className="font-serif leading-relaxed text-base">
                        Lisbon Humberto Delgado Airport (LIS) is the closest major airport.
                     </p>
                     <p className="font-serif leading-relaxed text-base mt-2 text-wedding-green">
                        Passport Reminder: Please check the expiration date on your passport now!
                     </p>
                </div>

                {/* Getting to the Venue */}
                <div className="space-y-2">
                     <h2 className="lowercase text-4xl mb-4 font-script">Getting to the Venue</h2>
                     <p className="font-serif leading-relaxed text-base mb-2">
                        Options from Lisbon:
                     </p>
                     <ul className="font-serif list-disc list-outside ml-4 space-y-1 text-base">
                        <li>Rental car (most flexible for exploring the region)</li>
                        <li>Private transfer (we can help coordinate options closer to the date)</li>
                        <li>Taxi/Uber/Bolt, depending on availability</li>
                     </ul>
                     <p className="font-serif leading-relaxed text-base mt-2">
                        Travel time is typically 45-60 minutes.
                     </p>
                </div>

            </div>
        </motion.div>
      </div>
    </div>
  );
};
