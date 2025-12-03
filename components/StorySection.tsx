import React from 'react';
import { motion } from 'framer-motion';

interface DesktopLayoutProps {
  top: string;
  left: string;
  alignContent: 'top' | 'bottom';
  imagePosition?: 'top' | 'bottom' | 'left' | 'right';
  slideDirection: 'left' | 'right';
}

interface TimelineEvent {
  id: number;
  date: string;
  title?: string;
  description: string;
  image?: string;
  // Desktop specific layout configuration
  desktop: DesktopLayoutProps;
}

const events: TimelineEvent[] = [
  {
    id: 1,
    date: "Sep 2021",
    title: "Our first date",
    description: "playing Jenga at the Game Parlour in SF",
    image: "https://picsum.photos/id/122/300/200", // Building
    desktop: {
      top: '14%',
      left: '15%',
      alignContent: 'bottom',
      imagePosition: 'top',
      slideDirection: 'left'
    }
  },
  {
    id: 2,
    date: "Early 2022",
    title: "Meet the parents.",
    description: "",
    desktop: {
      top: '14%',
      left: '75%',
      alignContent: 'bottom',
      slideDirection: 'left'
    }
  },
  {
    id: 3,
    date: "2023",
    description: "Move to Long Beach, CA for Mackenzie to pursue a Nursing degree",
    image: "https://picsum.photos/id/331/200/300", // Woman
    desktop: {
      top: '50%',
      left: '55%',
      alignContent: 'top',
      imagePosition: 'bottom', // Place image below the line for variety
      slideDirection: 'right' // This row flows Right -> Left
    }
  },
  {
    id: 4,
    date: "Jan 2025",
    title: "Otis arrives",
    description: "into the family",
    image: "https://picsum.photos/id/40/200/200", // Cat
    desktop: {
      top: '86%',
      left: '20%',
      alignContent: 'top',
      imagePosition: 'left', // Put cat to the side
      slideDirection: 'left'
    }
  },
  {
    id: 5,
    date: "2025",
    description: "Mackenzie becomes a nurse and we get engaged!",
    desktop: {
      top: '86%',
      left: '70%',
      alignContent: 'top',
      slideDirection: 'left'
    }
  }
];

export const StorySection: React.FC = () => {
  return (
    <section className="min-h-screen bg-wedding-cream py-20 relative overflow-hidden">
      <div className="text-center mb-12 relative z-10">
        <motion.h2 
          className="font-script text-6xl md:text-7xl text-[#5D4037]"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          our story
        </motion.h2>
      </div>

      {/* ================= MOBILE LAYOUT (Vertical) ================= */}
      <div className="md:hidden max-w-lg mx-auto relative px-4">
        {/* Vertical Spine */}
        <div className="absolute left-[20px] top-0 bottom-0 w-1 bg-[#8F9E56] opacity-30 rounded-full"></div>

        <div className="space-y-12 relative">
          {events.map((event, index) => (
            <MobileTimelineItem key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>

      {/* ================= DESKTOP LAYOUT (Snake SVG) ================= */}
      <div className="hidden md:block relative w-full max-w-6xl mx-auto h-[900px]">
        {/* SVG Snake Path */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <svg 
            viewBox="0 0 1000 900" 
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 50 126 L 900 126 C 1020 126, 1020 450, 900 450 L 100 450 C -20 450, -20 774, 100 774 L 900 774"
              fill="none"
              stroke="#556B2F"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Desktop Events */}
        {events.map((event) => (
            <DesktopTimelineItem key={event.id} event={event} />
        ))}

      </div>
    </section>
  );
};

// ----------------- SUB-COMPONENTS -----------------

const MobileTimelineItem: React.FC<{ event: TimelineEvent; index: number }> = ({ event, index }) => {
  return (
    <motion.div 
      className="flex flex-col w-full pl-12 relative"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Dot */}
      <div className="absolute left-[14px] top-2 w-4 h-4 bg-[#556B2F] rounded-full border-2 border-[#F2F0E9] z-10 shadow-sm"></div>

      <div className="flex flex-col gap-2 items-start text-left">
         {event.image && (
           <div className="mb-2">
             <img 
               src={event.image} 
               alt="Story moment" 
               className="max-w-[180px] rounded-sm shadow-md border-4 border-white -rotate-2"
             />
           </div>
         )}
         <span className="font-sans font-bold text-[#5D4037] text-lg">{event.date}</span>
         {event.title && (
           <h3 className="font-sans font-medium text-lg text-wedding-green">{event.title}</h3>
         )}
         <p className="font-sans text-gray-600 max-w-xs leading-relaxed">
           {event.description}
         </p>
      </div>
    </motion.div>
  );
};

const DesktopTimelineItem: React.FC<{ event: TimelineEvent }> = ({ event }) => {
  const { top, left, alignContent, imagePosition, slideDirection } = event.desktop;

  const initialX = slideDirection === 'left' ? -50 : 50;
  
  // Calculate content offset classes based on alignment
  const contentClass = alignContent === 'top' 
    ? 'bottom-full mb-6' 
    : 'top-full mt-6';

  return (
    <motion.div 
        className="absolute flex flex-col items-center"
        style={{ top, left }}
        initial={{ opacity: 0, x: initialX }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
    >
        {/* The Dot on the line */}
        <div className="w-5 h-5 bg-[#556B2F] rounded-full border-4 border-[#F2F0E9] z-20 shadow-sm relative"></div>

        {/* Text Content Group */}
        <div className={`absolute ${contentClass} w-64 flex flex-col items-center text-center z-10`}>
            
            {/* Specific Image Handling for 'left' or 'right' positioning relative to text block, or stacked */}
            {event.image && (imagePosition === 'left' || imagePosition === 'right') && (
                <div className={`absolute ${imagePosition === 'left' ? 'right-full mr-4' : 'left-full ml-4'} top-0 w-40`}>
                    <img src={event.image} alt="Story" className="rounded-sm shadow-md border-4 border-white rotate-3" />
                </div>
            )}

            {/* Stacked Image Handling (Top/Bottom relative to text) */}
            {event.image && imagePosition === 'top' && alignContent === 'bottom' && (
                // If content is bottom, image on top means image is closer to the dot (between dot and text) or above the dot?
                // Let's interpret 'imagePosition: top' as "Above the text". 
                // If content is below line, Image -> Text.
                // But visuals usually want Image attached to line. 
                // Let's use absolute positioning for images to be safe.
                 <div className="absolute bottom-full mb-8 w-48">
                    <img src={event.image} alt="Story" className="rounded-sm shadow-md border-4 border-white -rotate-2" />
                 </div>
            )}
             {event.image && imagePosition === 'bottom' && alignContent === 'top' && (
                 // Content above line. Image bottom means Image below text (closer to line) or below line? 
                 // Let's place it "Below the line" separate from text block.
                 <div className="absolute top-[200%] mt-8 w-40">
                     <img src={event.image} alt="Story" className="rounded-sm shadow-md border-4 border-white rotate-2" />
                 </div>
             )}
            
            {/* Main Text */}
            <span className="font-sans font-bold text-[#5D4037] text-xl">{event.date}</span>
            {event.title && (
                <h3 className="font-sans font-medium text-lg text-wedding-green whitespace-nowrap">{event.title}</h3>
            )}
            <p className="font-sans text-gray-600 leading-relaxed text-sm mt-1">
                {event.description}
            </p>

             {/* Standard Stacked Image if part of flow */}
             {event.image && !['top','bottom','left','right'].includes(imagePosition || '') && (
                 <img src={event.image} alt="Story" className="mt-2 w-32 rounded-sm shadow-sm" />
             )}
        </div>

        {/* Image specifically placed Above the dot if defined as 'top' but content is 'bottom' (See Event 1) */}
        {/* Note: The layout is tricky with pure stacking. Let's use the configured imagePosition to place absolutely relative to the Dot center */}
        
        {event.image && imagePosition === 'top' && (
            <div className="absolute bottom-8 w-48 pointer-events-none">
                 <img src={event.image} alt="" className="w-full rounded-sm shadow-md border-4 border-white -rotate-2" />
            </div>
        )}
    </motion.div>
  );
};