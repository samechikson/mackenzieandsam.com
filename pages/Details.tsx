import React from 'react';
import { motion } from 'framer-motion';

export const Details: React.FC = () => {
    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            className="w-full min-h-screen pt-24 pb-20 px-4 md:px-8 bg-wedding-cream text-wedding-brown"
        >
            <div className="max-w-4xl mx-auto space-y-16">
                
                {/* Header */}
                <motion.div variants={fadeIn} className="text-center mb-16">
                    <h1 className="font-script text-5xl md:text-7xl text-wedding-brown mb-4">Travel & Stay</h1>
                    <p className="font-sans text-lg md:text-xl tracking-wide uppercase">Portugal Awaits</p>
                </motion.div>

                {/* Venue & Location */}
                <motion.section variants={staggerContainer} className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-wedding-brown/10">
                    <motion.h2 variants={fadeIn} className="font-script text-4xl text-wedding-brown mb-6">The Venue</motion.h2>
                    <motion.div variants={fadeIn} className="space-y-4 font-sans text-lg leading-relaxed">
                        <p className="font-bold text-xl mb-2">Quinta da Bichinha</p>
                        <p>Our celebration takes place at this beautiful estate in the heart of the wine region.</p>
                        <p className="text-wedding-brown/80 italic">Aldeia Galega da Merceana, Alenquer, Portugal</p>
                        <div className="pt-4">
                            <a 
                                href="https://maps.app.goo.gl/YourMapLinkHere" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block px-8 py-3 bg-wedding-brown text-white rounded-full hover:bg-[#3E2C26] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                            >
                                View on Google Maps
                            </a>
                        </div>
                    </motion.div>
                </motion.section>

                {/* Travel Info Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    
                    {/* Airport */}
                    <motion.section variants={fadeIn} className="bg-white/50 p-8 rounded-2xl border border-wedding-brown/10">
                        <h3 className="font-script text-3xl text-wedding-brown mb-4">Getting There</h3>
                        <p className="font-sans mb-4">
                            <strong>Fly into Lisbon Portela Airport (LIS)</strong>
                        </p>
                        <p className="font-sans text-wedding-brown/80">
                            The airport is approximately 45 minutes from the venue. We recommend renting a car to explore the beautiful region freely, or arranging a transfer service.
                        </p>
                    </motion.section>

                    {/* Accommodation */}
                    <motion.section variants={fadeIn} className="bg-white/50 p-8 rounded-2xl border border-wedding-brown/10">
                        <h3 className="font-script text-3xl text-wedding-brown mb-4">Where to Stay</h3>
                        <p className="font-sans text-wedding-brown/80 mb-4">
                            We suggest staying in <strong>Alenquer</strong> or the surrounding wine country for the days leading up to the wedding. 
                        </p>
                        <ul className="list-disc list-inside font-sans text-wedding-brown/80 space-y-2">
                             <li>Local quintas (wine estates)</li>
                             <li>Boutique hotels in Aldeia Galega</li>
                             <li>Airbnbs in the Lisbon District</li>
                        </ul>
                    </motion.section>
                </div>

                {/* Local Attractions */}
                <motion.section variants={fadeIn} className="mt-12">
                     <h2 className="font-script text-4xl text-wedding-brown mb-8 text-center">Local Gems</h2>
                     <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "Lisbon City", desc: "Explore the historic tram 28, Belém Tower, and Alfama district." },
                            { title: "Sintra", desc: "Visit the fairytale Pena Palace and Quinta da Regaleira." },
                            { title: "Wine Tasting", desc: "The Alenquer region is famous for its vineyards and wine cellars." }
                        ].map((item, index) => (
                            <div key={index} className="bg-white/40 p-6 rounded-xl hover:bg-white/60 transition-colors duration-300">
                                <h4 className="font-bold text-xl mb-2 text-wedding-brown">{item.title}</h4>
                                <p className="font-sans text-sm">{item.desc}</p>
                            </div>
                        ))}
                     </div>
                </motion.section>

            </div>
        </motion.div>
    );
};
