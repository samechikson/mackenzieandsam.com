import React from 'react';
import { motion } from 'framer-motion';

export const Travel: React.FC = () => {
  return (
    <div className="flex flex-col w-full bg-wedding-cream">
      {/* SECTION 1: Logistics & Travel Info (Existing) */}
      <div className="min-h-screen flex flex-col md:flex-row">
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

      {/* SECTION 2: Nearby Local Attractions */}
      <div className="w-full py-24 px-6 md:px-12 max-w-[1600px] mx-auto space-y-32">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
        >
            <h2 className="font-script text-6xl md:text-8xl text-wedding-green lowercase mb-10">Nearby Local Attractions</h2>
            <p className="font-serif text-xl md:text-2xl text-wedding-brown max-w-3xl mx-auto leading-relaxed">
              Activities Sam and I did on our first trip to Lisbon in 2023, plus some highly recommended spots we missed.
            </p>
        </motion.div>

        {/* ROW 1: Food & Wine (Image Left) */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2"
            >
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl rotate-[-2deg] hover:rotate-0 transition-all duration-700">
                    <img src="/images/travel/pastel-de-nata.webp" alt="Pastel de Nata" className="w-full h-full object-cover" />
                </div>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-1/2 space-y-8"
            >
                <h3 className="font-script text-5xl text-wedding-green lowercase">A Taste of Lisbon</h3>
                <div className="space-y-8 font-serif text-lg text-wedding-brown leading-loose">
                    <div>
                        <a href="https://tinyurl.com/yc6cs2c2" target="_blank" rel="noopener noreferrer" className="block text-xl font-bold mb-2 hover:text-wedding-green transition-colors decoration-1 underline-offset-4 border-b border-wedding-brown/30 pb-1">
                            Portuguese Food and Wine Tour
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-2 w-4 h-4 text-wedding-green/70 mb-1">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </a>
                        <p>We got to taste cheese, Chouriço, bifana, traditional rices, Port, and Lisbon wines. It was well worth the $, we had amazing guides, and met fun people!</p>
                    </div>
                    <div>
                        <a href="https://www.instagram.com/timeoutmarketlisboa/?hl=en" target="_blank" rel="noopener noreferrer" className="block text-xl font-bold mb-2 hover:text-wedding-green transition-colors decoration-1 underline-offset-4 border-b border-wedding-brown/30 pb-1">
                            Time Out Market
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-2 w-4 h-4 text-wedding-green/70 mb-1">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </a>
                        <p>Taste the iconic pastel de nata pastries and other goodies at this historic market hall.</p>
                    </div>
                </div>
            </motion.div>
        </div>

        {/* ROW 2: Sintra (Image Right) */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24">
             <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2"
            >
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl rotate-[2deg] hover:rotate-0 transition-all duration-700">
                    <img src="/images/travel/sintra.webp" alt="Sintra Pena Palace" className="w-full h-full object-cover" />
                </div>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-1/2 space-y-8 text-right md:text-left" 
            >
                <div className="text-left">
                  <h3 className="font-script text-5xl text-wedding-green lowercase mb-8">Historic sights</h3>
                  <div className="space-y-6 font-serif text-lg text-wedding-brown leading-loose">
                      <div>
                          <a href="https://tinyurl.com/2saxdryt" target="_blank" rel="noopener noreferrer" className="block text-xl font-bold mb-2 hover:text-wedding-green transition-colors border-b border-wedding-brown/30 pb-1">
                              Day Trip to Sintra
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-2 w-4 h-4 text-wedding-green/70 mb-1">
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                  <polyline points="15 3 21 3 21 9"></polyline>
                                  <line x1="10" y1="14" x2="21" y2="3"></line>
                              </svg>
                          </a>
                          <p>Visit the Pena Palace and beautiful surrounding park grounds. It's truly a magical place straight out of a fairytale.</p>
                      </div>
                  </div>
                </div>
            </motion.div>
        </div>

        {/* ROW 3: City Gems (Image Left) */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
             <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2 flex flex-row justify-center"
            >
                <div className="relative w-2/3 rounded-sm overflow-hidden shadow-2xl rotate-[-1deg] hover:rotate-0 transition-all duration-700">
                    <img src="/images/travel/sam-gijinha.webp" alt="Ginjinha in Lisbon" className="w-full h-full object-cover" />
                </div>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-1/2 space-y-8"
            >
                <h3 className="font-script text-5xl text-wedding-green lowercase">City Gems</h3>
                <div className="space-y-8 font-serif text-lg text-wedding-brown leading-loose">
                    <div>
                         <h4 className="text-xl font-bold mb-2">A Ginjinha</h4>
                         <p>Walk to A Ginjinha to shoot the sour cherry liquor Lisbon is known for - only 1.55 euros! <br/><span className="text-sm italic opacity-80">Largo São Domingos 8, 1100-201 Lisboa</span></p>
                    </div>
                    <div>
                         <h4 className="text-xl font-bold mb-2">Tejo Bar</h4>
                         <p>Hangout late into the night at Tejo Bar to hear traditional fado music. Quite possibly the smallest bar I've ever stepped foot into! <br/><span className="text-sm italic opacity-80">Beco do Vigário 1A, Alfama, 1100-613 Lisboa</span></p>
                    </div>
                     <div>
                         <h4 className="text-xl font-bold mb-2">Alfama District</h4>
                         <p>Walk around the Alfama district, Lisbon's oldest neighborhood - explore the São Jorge Castle while you're there.</p>
                    </div>
                </div>
            </motion.div>
        </div>

        {/* ROW 4: Recommended (Image Right) */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24">
             <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2"
            >
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl rotate-[2deg] hover:rotate-0 transition-all duration-700">
                    <img src="/images/travel/sm-sintra.webp" alt="Scenic Lisbon" className="w-full h-full object-cover" />
                </div>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-1/2 space-y-8"
            >
                 <div className="text-left">
                    <h3 className="font-script text-5xl text-wedding-green lowercase mb-8">Things We Missed</h3>
                    <div className="space-y-8 font-serif text-lg text-wedding-brown leading-loose">
                        <div>
                             <h4 className="text-xl font-bold mb-2">Iconic Tram 28</h4>
                             <p>Hop on the iconic Tram 28 with a public transport pass for a scenic tour of the city's hills.</p>
                        </div>
                        <div>
                             <h4 className="text-xl font-bold mb-2">Belém Tower</h4>
                             <p>Visit the Belém Tower, an iconic fortress on the Tagus river that served as a point of embarkation for Portuguese explorers.</p>
                        </div>
                         <div>
                             <h4 className="text-xl font-bold mb-2">Day Trip to Cascais</h4>
                             <p>A 30 min drive from Lisbon. It's a laid-back coastal town with great beaches, good food, and easy access to scenic coastal walks.</p>
                        </div>
                    </div>
                 </div>
            </motion.div>
        </div>

      </div>
    </div>
  );
};
