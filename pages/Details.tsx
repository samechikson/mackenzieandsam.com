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
            <div className="max-w-5xl mx-auto space-y-16">
                
                {/* Header */}
                <motion.div variants={fadeIn} className="text-center mb-12">
                    <h1 className="font-script text-8xl md:text-7xl text-wedding-brown mb-4 leading-36">travel details</h1>
                    <p className="font-sans text-lg md:text-xl tracking-wide uppercase">Portugal Awaits</p>
                </motion.div>

                {/* Venue Address */}
                <motion.section variants={fadeIn} className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-wedding-brown/10 text-center max-w-2xl mx-auto">
                    <h2 className="font-script text-6xl text-wedding-brown mb-4 leading-30">venue address</h2>
                    <p className="font-sans text-xl font-medium">Quinta da Bichinha, Estr. de Vila Chã, 2580-413, Portugal</p>
                    <div className="mt-6">
                        <a 
                            href="https://maps.app.goo.gl/wp6AADZdJU9CZcWv9" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-3 bg-wedding-brown text-white rounded-full hover:bg-[#3E2C26] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 font-sans"
                        >
                            View on Map
                        </a>
                    </div>
                </motion.section>

                {/* Logistics Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Flying In */}
                    <motion.section variants={fadeIn} className="bg-white/50 p-8 rounded-2xl border border-wedding-brown/10 h-full flex flex-col">
                        <h3 className="font-script text-6xl text-wedding-brown mb-6 leading-30">flying in</h3>
                        <div className="space-y-4 font-sans text-wedding-brown/90 flex-grow">
                            <p>
                                <strong>Lisbon Humberto Delgado Airport (LIS)</strong> is the closest major airport. Daily nonstop flights are available from many US and European cities.
                            </p>
                            <div className="bg-wedding-brown/5 p-4 rounded-xl border border-wedding-brown/10 mt-4">
                                <p className="font-bold text-sm uppercase tracking-wide mb-2 text-wedding-brown">Passport Reminder</p>
                                <p className="text-sm">
                                    Please check the expiration date on your passport now! Portugal (and all Schengen countries) requires that your passport be valid for at least 6 months after your travel dates.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Getting to the Venue */}
                    <motion.section variants={fadeIn} className="bg-white/50 p-8 rounded-2xl border border-wedding-brown/10 h-full flex flex-col">
                        <h3 className="font-script text-6xl text-wedding-brown mb-6 leading-30">getting to the venue</h3>
                        <div className="space-y-4 font-sans text-wedding-brown/90 flex-grow">
                            <p className="font-semibold">options from lisbon airport:</p>
                            <ul className="list-disc list-inside space-y-2 ml-2">
                                <li>rental car (most flexible for exploring the region)</li>
                                <li>private transfer (we can help coordinate options closer to the date)</li>
                                <li>Taxi/Uber/Bolt, depending on availability</li>
                            </ul>
                            <p className="pt-2 italic text-sm">Travel time is typically 45–60 minutes.</p>
                        </div>
                    </motion.section>
                </div>

                {/* Where to Stay */}
                <motion.section variants={staggerContainer} className="space-y-8">
                    <motion.div variants={fadeIn} className="text-center max-w-3xl mx-auto">
                        <h2 className="font-script text-6xl text-wedding-brown mb-6 leading-30">where to stay <span className="block text-2xl md:text-3xl mt-2 font-sans opacity-80 uppercase tracking-widest font-normal">before the wedding</span></h2>
                        <p className="font-sans text-lg text-wedding-brown/80 leading-relaxed">
                            If you’re spending a few days in Lisbon before heading to the venue, some great neighborhoods include:
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { 
                                area: "baixa / chiado", 
                                features: "Central, historic, and tourist-friendly", 
                                desc: "Packed with shops, cafes, restaurants, and easy access to major sights." 
                            },
                            { 
                                area: "alfama", 
                                features: "Full of history, character, and old-world charm", 
                                desc: "Think winding cobbled streets, traditional houses with tiled façades, and vintage architecture. The streets are often steep and hilly!" 
                            },
                            { 
                                area: "príncipe real", 
                                features: "Trendy, stylish, and a bit more local", 
                                desc: "Ideal for boutique-shops, cafés, independent design stores, galleries and a relaxed atmosphere." 
                            },
                            { 
                                area: "bairro alto", 
                                features: "Lively nightlife, bars, clubs", 
                                desc: "Especially in the evenings, these districts come alive. Good for younger travelers, people looking to party, or anyone wanting a social, energetic stay." 
                            }
                        ].map((item, index) => (
                            <motion.div 
                                key={index} 
                                variants={fadeIn}
                                className="bg-white/40 hover:bg-white/60 p-6 md:p-8 rounded-xl transition-all duration-300 border border-transparent hover:border-wedding-brown/20 group"
                            >
                                <h4 className="font-script text-6xl text-wedding-brown mb-2 group-hover:scale-105 transition-transform origin-left leading-30">{item.area}</h4>
                                <p className="font-sans font-bold text-sm uppercase tracking-wide text-wedding-green mb-3">{item.features}</p>
                                <p className="font-sans text-wedding-brown/80 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

            </div>
        </motion.div>
    );
};
