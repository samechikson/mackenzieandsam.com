import React from 'react';
import { motion } from 'framer-motion';

export const Events: React.FC = () => {
    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const timelineEvents = [
        {
            day: "Welcome Celebration",
            date: "May 5th, 2027",
            events: [
                {
                    time: "4:00 PM",
                    title: "Arrive to venue and Check-In",
                    description: "Settle into your room, explore the grounds, and relax."
                },
                {
                    time: "5:00-8:00 PM",
                    title: "Welcome Celebration",
                    description: "A casual sunset dinner to kick off the festivities. Come hungry!"
                }
            ]
        },
        {
            day: "Wedding Day",
            date: "May 6th, 2027",
            events: [
                {
                    time: "10:00-11:00 AM", 
                    title: "Breakfast",
                    description: "Light breakfast served for guests staying onsite."
                },
                {
                    time: "4:00 PM",
                    title: "Wedding Ceremony",
                    description: "Join us lakeside for our vows."
                },
                {
                    time: "5:00 PM-4:00 AM",
                    title: "Wedding Reception",
                    description: "Dinner, cocktails, dancing, and more."
                }
            ]
        },
        {
            day: "Departure Day",
            date: "May 7th, 2027",
            events: [
                {
                    time: "10:00-11:00 AM",
                    title: "Breakfast",
                    description: "A relaxed morning meal before goodbyes."
                },
                {
                    time: "12:00 PM",
                    title: "Checkout",
                    description: ""
                }
            ]
        }
    ];

    return (
        <div className="w-full min-h-screen bg-wedding-cream flex items-center justify-center py-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                
                {/* Left Column: Image Placeholder */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="sticky top-24 w-full h-[60vh] lg:h-[80vh] bg-wedding-brown/5 overflow-hidden rounded-sm border border-wedding-brown/10"
                >
                    <img src="images/sm/events.jpg" alt="sam and mackenzie" className="w-full h-full object-cover" />
                </motion.div>

                {/* Right Column: Timeline */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-20 pt-10 pb-20"
                >
                    {timelineEvents.map((daySection, index) => (
                        <motion.div key={index} variants={fadeIn} className="relative">
                            
                            {/* Day Header */}
                            <div className="mb-8 border-b border-wedding-brown/20 pb-4">
                                <h2 className="font-script text-6xl text-wedding-brown mb-2 leading-none lowercase">
                                    {daySection.day}
                                </h2>
                                <p className="font-sans text-right text-wedding-brown/80 uppercase tracking-wide">
                                    {daySection.date}
                                </p>
                            </div>

                            {/* Events List */}
                            <div className="space-y-10 pl-2">
                                {daySection.events.map((event, idx) => (
                                    <div key={idx} className="group">
                                        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
                                            <span className="font-sans font-bold text-wedding-brown/80 text-sm w-36 shrink-0 uppercase tracking-wide">
                                                {event.time}
                                            </span>
                                            <div>
                                                {event.title && (
                                                    <h3 className="font-serif text-2xl text-wedding-brown mb-2">
                                                        {event.title}
                                                    </h3>
                                                )}
                                                {event.description && (
                                                    <p className="font-sans text-wedding-brown/70 leading-relaxed max-w-md">
                                                        {event.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
