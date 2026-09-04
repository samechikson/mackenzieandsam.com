"use client";

import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { RsvpButton } from "./RsvpButton";
import { FilmStripCard } from "./FilmStripCard";
import { MapPin } from "lucide-react";

const QUINTA_MAPS_URL =
  "https://www.google.com/maps/place/Quinta+da+Bichinha/@39.1139701,-9.1181965,17z/data=!3m1!4b1!4m6!3m5!1s0xd18d20da729703b:0x4fb06c522be22608!8m2!3d39.1139701!4d-9.1156216!16s%2Fg%2F12hkctzd6?entry=ttu&g_ep=EgoyMDI2MDgzMS4wIKXMDSoASAFQAw%3D%3D";

type ScheduleItem = {
  title: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

type ScheduleSection = {
  id: string;
  header?: string;
  items: ScheduleItem[];
};

const DETAILS_DATA: ScheduleSection[] = [
  {
    id: "schedule",
    items: [
      {
        title: "Wednesday 5.5",
        content: (
          <div className="flex flex-col gap-4">
            <p>
              <span className="font-bold text-wedding-green">4pm</span>
              <br />
              Check-in
              <br />
              <span className="italic normal-case text-sm">For guests staying onsite</span>
            </p>
            <p>
              <span className="font-bold text-wedding-green">5-8pm</span>
              <br />
              Welcome paella dinner, drinks, and music
            </p>
          </div>
        ),
        footer: (
          <a
            href={QUINTA_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row gap-2 justify-center items-center hover:text-wedding-green transition-colors"
          >
            <MapPin size={16} /> Quinta da Bichinha
          </a>
        ),
      },
      {
        title: "Thursday 5.6",
        content: (
          <div className="flex flex-col gap-4">
            <p>
              <span className="font-bold text-wedding-green">10-11am</span>
              <br />
              Breakfast
              <br />
              <span className="italic normal-case text-sm">For guests staying onsite</span>
            </p>
            <p>
              <span className="font-bold text-wedding-green">4pm</span>
              <br />
              Wedding Ceremony
            </p>
            <p>
              Cocktail hour + Dinner + Dancing to follow (&apos;til late!)
            </p>
          </div>
        ),
        footer: (
          <a
            href={QUINTA_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row gap-2 justify-center items-center hover:text-wedding-green transition-colors"
          >
            <MapPin size={16} /> Quinta da Bichinha
          </a>
        ),
      },
      {
        title: "Friday 5.7",
        content: (
          <div className="flex flex-col gap-4">
            <p>
              <span className="font-bold text-wedding-green">10-11am</span>
              <br />
              Breakfast
              <br />
              <span className="italic normal-case text-sm">For guests staying onsite</span>
            </p>
            <p>
              <span className="font-bold text-wedding-green">12pm</span>
              <br />
              Shuttle back to Lisbon airport
            </p>
          </div>
        ),
        footer: (
          <a
            href={QUINTA_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row gap-2 justify-center items-center hover:text-wedding-green transition-colors"
          >
            <MapPin size={16} /> Quinta da Bichinha
          </a>
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

  return (
    <section
      id="details"
      className="w-full py-24 px-4 md:px-8 flex flex-col items-center gap-12 bg-[#cfc9a1] text-[#3E2723]"
    >
      <div className="w-full max-w-5xl flex flex-col gap-16">
        {/* Header */}
        <motion.h2
          variants={itemVariants}
          className="font-script lowercase text-5xl md:text-7xl text-white text-center tracking-wide"
        >
          Schedule of Events
        </motion.h2>

        {DETAILS_DATA.map((section) => (
          <motion.div key={section.id} variants={itemVariants}>
            <FilmStripCard stripeClassName="bg-wedding-brown">
              {section.header && (
                <h2 className="font-mono text-xl text-white uppercase tracking-wider pb-6">
                  {section.header}
                </h2>
              )}
              <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-12 md:gap-0 text-white md:divide-x md:divide-white/25">
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "flex flex-col items-center gap-4 md:col-span-2 md:px-6",
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

        <div className="w-full max-w-3xl mx-auto bg-wedding-cream rounded-2xl px-8 py-6 text-center shadow-sm">
          <p className="font-mono text-sm md:text-base text-wedding-brown leading-relaxed">
            For those who will be in Lisbon the few days before the official celebration, we will be planning informal group activities in Lisbon the Monday (5.3) and Tuesday (5.4) before heading to the quinta! Details to come.
          </p>
        </div>
      </div>

      <div className="items-center justify-center my-10">
        <RsvpButton />
      </div>
    </section>
  );
};
