import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, MapPin } from 'lucide-react';

const SECTIONS = [
  {
    id: 'intro',
    image: '/images/travel/sm-paris.webp',
    imageAlt: 'Sam and Mackenzie in Paris',
    rotation: 0,
    content: (
      <div className="space-y-10">
        <div className="text-center mb-8">
            <h1 className="font-script text-6xl lowercase mb-2">travel</h1>
        </div>
        
        {/* Venue */}
        <div className="space-y-2">
            <h2 className="lowercase text-4xl mb-2 font-script">Venue Address</h2>
            <div className="flex flex-col gap-4">
                <p className="font-serif leading-relaxed text-lg">
                    Quinta da Bicinha<br />
                    Estr. de Vila Chã<br />
                    2580-413, Portugal
                </p>
                <div>
                <a href="https://maps.app.goo.gl/wp6AADZdJU9CZcWv9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 text-sm bg-wedding-brown text-white rounded-full hover:bg-[#3E2C26] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 font-sans"
                    >
                        <MapPin size={16} className="mr-2" />
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
             <p className="font-serif leading-relaxed text-base mt-2 text-wedding-green font-bold">
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
    )
  },
  {
    id: 'food',
    image: '/images/travel/pastel-de-nata.webp',
    imageAlt: 'Pastel de Nata',
    rotation: -2,
    content: (
        <div className="space-y-8">
            <h3 className="font-script text-5xl text-wedding-green lowercase text-center mb-6">A Taste of Lisbon</h3>
            <div className="space-y-8 font-serif text-lg text-wedding-brown leading-loose">
                <div>
                    <a href="https://tinyurl.com/yc6cs2c2" target="_blank" rel="noopener noreferrer" className="flex items-center text-xl font-bold mb-2 hover:text-wedding-green transition-colors decoration-1 underline-offset-4 border-b border-wedding-brown/30 pb-1">Portuguese Food and Wine Tour <ExternalLink size={18} className="ml-2" /></a>
                    <p>We got to taste cheese, Chouriço, bifana, traditional rices, Port, and Lisbon wines. It was well worth the $, we had amazing guides, and met fun people!</p>
                </div>
                <div>
                    <a href="https://www.instagram.com/timeoutmarketlisboa/?hl=en" target="_blank" rel="noopener noreferrer" className="flex items-center text-xl font-bold mb-2 hover:text-wedding-green transition-colors decoration-1 underline-offset-4 border-b border-wedding-brown/30 pb-1">Time Out Market <ExternalLink size={18} className="ml-2" /></a>
                    <p>Taste the iconic pastel de nata pastries and other goodies at this historic market hall.</p>
                </div>
            </div>
        </div>
    )
  },
  {
    id: 'sintra',
    image: '/images/travel/sintra.webp',
    imageAlt: 'Sintra Pena Palace',
    rotation: 2,
    content: (
        <div className="space-y-8">
            <h3 className="font-script text-5xl text-wedding-green lowercase text-center mb-6">Historic Sights</h3>
            <div className="space-y-6 font-serif text-lg text-wedding-brown leading-loose">
                <div>
                    <a href="https://tinyurl.com/2saxdryt" target="_blank" rel="noopener noreferrer" className="flex items-center text-xl font-bold mb-2 hover:text-wedding-green transition-colors border-b border-wedding-brown/30 pb-1">Day Trip to Sintra <ExternalLink size={18} className="ml-2" /></a>
                    <p>Visit the Pena Palace and beautiful surrounding park grounds. It's truly a magical place straight out of a fairytale.</p>
                </div>
            </div>
        </div>
    )
  },
  {
    id: 'gems',
    image: '/images/travel/sam-gijinha.webp',
    imageAlt: 'Sam drinking Ginjinha',
    rotation: -1,
    content: (
        <div className="space-y-8">
            <h3 className="font-script text-5xl text-wedding-green lowercase text-center mb-6">City Gems</h3>
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
        </div>
    )
  },
  {
    id: 'missed',
    image: '/images/travel/sm-sintra.webp',
    imageAlt: 'Scenic view',
    rotation: 2,
    content: (
        <div className="space-y-8">
            <h3 className="font-script text-5xl text-wedding-green lowercase text-center mb-6">Things We Missed</h3>
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
    )
  }
];

export const Travel: React.FC = () => {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-45% 0px -45% 0px', // Trigger when element is in the middle 10% of viewport
      }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const activeImage = SECTIONS.find((s) => s.id === activeSection) || SECTIONS[0];

  return (
    <div className="flex flex-col md:flex-row w-full bg-wedding-cream">
      {/* SECTION 1: Fixed/Sticky Left Side (Desktop) */}
      <div className="hidden md:flex w-1/2 h-screen sticky top-0 items-center justify-center overflow-hidden bg-wedding-cream p-12 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage.id}
            initial={{ opacity: 0, scale: 0.95, rotate: activeImage.rotation - 3 }}
            animate={{ opacity: 1, scale: 1, rotate: activeImage.rotation }}
            exit={{ opacity: 0, scale: 1.05, rotate: activeImage.rotation + 3 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute max-w-lg w-full  shadow-2xl rounded-sm overflow-hidden border-12 border-white bg-white"
          >
             <img
              src={activeImage.image}
              alt={activeImage.imageAlt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* SECTION 2: Scrolling Right Side */}
      <div className="w-full md:w-1/2 min-h-screen relative">
        <div className="fixed top-0 right-0 w-full md:w-1/2 h-screen z-0 pointer-events-none">
          <img src="/images/travel/lisbon-background.webp" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-wedding-brown/5" />
        </div>
        <div className="flex flex-col items-center gap-44 py-24 px-4 md:px-12 relative z-10">
          {SECTIONS.map((section, index) => (
            <div
              key={section.id}
              id={section.id}
              className="w-full max-w-lg flex flex-col items-center min-h-[50vh] justify-center"
            >
              {/* Mobile Image (Visible only on small screens) */}
              <div className="md:hidden w-full mb-8 relative">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="w-3/4 mx-auto rounded-sm shadow-lg border-8 border-white bg-white rotate-1"
                >
                  <img
                    src={section.image}
                    alt={section.imageAlt}
                    className="w-full h-auto block"
                  />
                </motion.div>
              </div>

              {/* Paper Note */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className={`relative bg-wedding-paper w-full p-8 md:p-12 shadow-xl text-wedding-brown rounded-sm ${
                  index % 2 === 0 ? 'rotate-1' : '-rotate-1'
                }`}
              >
                {/* Paperclip */}
                <div className="absolute -top-6 right-8 w-6 overflow-hidden h-20 pointer-events-none opacity-80 mix-blend-multiply">
                  <svg
                    viewBox="0 0 25 50"
                    fill="none"
                    stroke="#777"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M18 5 v35 a 10 10 0 0 1 -20 0 v-30 a 5 5 0 0 1 10 0 v28" />
                  </svg>
                </div>

                {section.content}
              </motion.div>
            </div>
          ))}

          {/* Bottom spacing */}
          <div className="h-24" />
        </div>
      </div>
    </div>
  );
};
