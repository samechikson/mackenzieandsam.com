"use client";

import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { RsvpButton } from "./RsvpButton";
import { MapPin } from "lucide-react";

const DETAILS_DATA = [
  {
    id: "ceremony",
    items: [
      {
        title: "Ceremony Date",
        content: (
          <>
            Thursday <br />
            6th of May, 2027
          </>
        ),
      },
      {
        title: "Location",
        content: (
          <a
            href="https://maps.app.goo.gl/ctcqSJBekBprL7Sx5"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-stone-300 transition-colors inline-flex flex-col items-center"
          >
            <MapPin className="inline mb-1" size={16} />
            Quinta da Bichinha
            <br />
            <span className="text-mono">Portugal</span>
          </a>
        ),
      },
      {
        title: "Time",
        content: (
          <>
            Ceremony at 4:00pm <br />
            Cocktails & <br /> Dinner to follow
          </>
        ),
      },
    ],
  },
  {
    id: "schedule",
    header: "Itinerary",
    items: [
      {
        title: "Monday May 3rd",
        className: "md:col-start-2",
        content: <>Informal event TBD. Stay tuned for details!</>,
        footer: (
          <div className="flex flex-row gap-2 justify-center items-center">
            <MapPin size={16} /> Lisbon, Portugal
          </div>
        ),
      },
      {
        title: "Tuesday May 4th",
        content: <>Informal event TBD. Stay tuned for details!</>,
        footer: (
          <div className="flex flex-row gap-2 justify-center items-center">
            <MapPin size={16} /> Lisbon, Portugal
          </div>
        ),
      },
      {
        title: "Wednesday May 5th",
        content: (
          <>
            Welcome Paella Feast & Drinks
            <br />
            Before the big day!
          </>
        ),
        footer: (
          <div className="flex flex-row gap-2 justify-center items-center">
            <MapPin size={16} /> Quinta da Bichinha
          </div>
        ),
      },
      {
        title: "Thursday May 6th",
        content: "The Wedding ceremony, dinner, and dancing 'till late",
        footer: (
          <div className="flex flex-row gap-2 justify-center items-center">
            <MapPin size={16} /> Quinta da Bichinha
          </div>
        ),
      },
      {
        title: "Friday May 7th",
        content:
          "Brunch & goodbyes. Recover, refuel, and debrief the funny moments",
        footer: (
          <div className="flex flex-row gap-2 justify-center items-center">
            <MapPin size={16} /> Quinta da Bichinha
          </div>
        ),
      },
    ],
  },
  {
    id: "travel",
    header: "Travel Logistics",
    items: [
      {
        title: "Passport",
        content:
          "Please ensure you have a valid passport for entry into Portugal. MUST NOT EXPIRE WITHIN 3 MONTHS after your trip",
      },
      {
        title: "Flying in",
        content:
          "Lisbon Humberto Delgado Airport (LIS) is the closest major airport.",
      },
      {
        title: "Getting to the Quinta",
        content: (
          <div className="flex flex-col items-center">
            <p className="mb-2">From Lisbon (45-60 min):</p>
            <ul className="space-y-1 list-none">
              <li>• Rental car (recommended)</li>
              <li>• Taxi/Uber/Bolt</li>
              <li>• LIS to Quinta shuttle to be arranged</li>
            </ul>
          </div>
        ),
      },
      {
        title: "Hotel information",
        className: "md:col-start-2 md:col-span-4",
        content: (
          <>
            We will have a block of rooms reserved at the Quinta da Bichinha for
            Wednesday and Thursday nights. Stay tuned for details on how to
            book!
          </>
        ),
      },
    ],
  },
];

export const BasicDetails: React.FC = () => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const FilmStripCard = ({
    children,
    className = "",
    stripeClassName = "bg-wedding-green",
  }: {
    children: React.ReactNode;
    className?: string;
    stripeClassName?: string;
  }) => {
    // Generate notches for the strip effect
    const notches = Array.from({ length: 20 });

    return (
      <div
        className={clsx(
          "relative w-full rounded-3xl bg-wedding-cream flex flex-col overflow-hidden",
          className,
        )}
      >
        {/* Top Strip */}
        <div className="absolute top-0 w-full h-8 flex justify-between px-2 lg:px-8">
          {notches.map((_, i) => (
            <div
              key={`top-${i}`}
              className={clsx("w-[2%] h-600 md:h-200", stripeClassName)}
            />
          ))}
        </div>

        {/* Content */}
        <div className="p-6 w-full flex-1 z-10">
          <div className="h-full w-full bg-wedding-blue rounded-xl p-8 md:p-12 flex flex-col items-center justify-center text-center">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="details"
      className="w-full py-24 px-4 md:px-8 flex flex-col items-center gap-12 bg-[#cfc9a1] text-[#3E2723]"
    >
      <div className="w-full max-w-5xl flex flex-col gap-16">
        {/* Header */}
        <motion.h2
          variants={itemVariants}
          className="font-script lowercase text-4xl md:text-6xl text-white text-center tracking-wide"
        >
          ALL THE INFORMATION:
        </motion.h2>

        {DETAILS_DATA.map((section, sectionIndex) => (
          <motion.div key={section.id} variants={itemVariants}>
            <FilmStripCard
              stripeClassName={
                sectionIndex === 1 ? "bg-wedding-brown" : "bg-wedding-green"
              }
            >
              {section.header && (
                <h2 className="font-mono text-xl text-white uppercase tracking-wider pb-6">
                  {section.header}
                </h2>
              )}
              <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-12 md:gap-4 text-white">
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "flex flex-col items-center gap-4 md:col-span-2",
                      item.className,
                    )}
                  >
                    <h3 className="font-mono text-lg tracking-[0.2em] font-bold uppercase whitespace-nowrap">
                      {item.title}
                    </h3>
                    <div className="font-mono text-base uppercase tracking-wider leading-relaxed flex flex-col items-center">
                      {item.content}
                    </div>
                    {item.footer && (
                      <div className="font-mono text-sm uppercase tracking-wider  leading-relaxed flex flex-col items-center">
                        {item.footer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </FilmStripCard>
          </motion.div>
        ))}
      </div>

      <div className="items-center justify-center my-10">
        <RsvpButton />
      </div>
    </section>
  );
};
