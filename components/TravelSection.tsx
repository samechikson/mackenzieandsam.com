"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FilmStripCard } from "./FilmStripCard";

const TRAVEL_LOGISTICS_BOXES = [
  {
    title: "Getting to the Quinta",
    content: (
      <>
        <p className="mb-4 font-bold">
          Address: Quinta da Bichinha, Vila Chã, 2580-413 Ventosa, Alenquer
        </p>
        <p>
          The venue is 45 minutes from the nearest airport, Lisbon
          Airport/Humberto Delgado Airport (LIS). From the airport to the
          venue we recommend either renting a car, or using Uber/Bolt. There
          is plenty of free parking at the venue.
        </p>
      </>
    ),
  },
  {
    title: "Getting Back to Lisbon",
    content: (
      <p>
        As getting taxis from the countryside back to Lisbon can be
        challenging, we&apos;ve arranged a free shuttle back to Lisbon
        Airport, departing the venue at 12PM on Friday.
      </p>
    ),
  },
];

const THINGS_TO_DO = [
  {
    title: "Food and Wine Tour",
    description:
      "Walk the old city center and taste cheese, Chouriço (Portuguese sausage), bifana sandwiches, traditional rices, Port, and Lisbon wines.",
    icon: "/images/travel-icons/food-tour.png",
    link: "https://tinyurl.com/yc6cs2c2",
  },
  {
    title: "Time Out Market",
    description:
      "Taste the iconic pastel de nata pastries and other goodies at this historic market hall.",
    icon: "/images/travel-icons/time-out-market.png",
    link: "https://www.instagram.com/timeoutmarketlisboa/?hl=en",
  },
  {
    title: "Day Trip to Sintra",
    description:
      "Visit the Pena Palace and beautiful surrounding park grounds. It's truly a magical place straight out of a fairytale.",
    icon: "/images/travel-icons/sintra.png",
    link: "https://tinyurl.com/2saxdryt",
  },
  {
    title: "A Ginjinha",
    description:
      "Walk to A Ginjinha to shoot the sour cherry liquor Lisbon is known for - only 1.55 euros!",
    icon: "/images/travel-icons/jijinha.png",
    link: "https://maps.app.goo.gl/tFev5isk7SzbzZSa6",
  },
  {
    title: "Tejo Bar",
    description:
      "Hangout late into the night at Tejo Bar to hear traditional fado music. Quite possibly the smallest bar you'll ever step into!",
    icon: "/images/travel-icons/guitar.png",
    link: "https://maps.app.goo.gl/6aLyEiffVGoXFff57",
  },
  {
    title: "Alfama District",
    description:
      "Walk around the Alfama district, Lisbon's oldest neighborhood - explore the São Jorge Castle while you're there.",
    icon: "/images/travel-icons/sao-jorge.png",
    link: "https://maps.app.goo.gl/NjHjhtwX8JLwtqSj6",
  },
  {
    title: "Iconic Tram 28",
    description:
      "Hop on the iconic Tram 28 with a public transport pass for a scenic tour of the city's hills.",
    icon: "/images/travel-icons/lisbon.png",
    link: "https://maps.app.goo.gl/cidmmnAssngt4LZ46",
  },
  {
    title: "Belém Tower",
    description:
      "Visit the Belém Tower, an iconic fortress on the Tagus river that served as a point of embarkation for Portuguese explorers.",
    icon: "/images/travel-icons/belem-tower.png",
    link: "https://maps.app.goo.gl/eV1eL5LFwNwPsXHf6",
  },
  {
    title: "Day Trip to Cascais",
    description:
      "A 30 min drive from Lisbon. It's a laid-back coastal town with great beaches, good food, and easy access to scenic coastal walks. Check out Praia do Guincho, a beautiful beach with good surfing or windsurfing waves!",
    icon: "/images/travel-icons/waves.png",
    link: "https://maps.app.goo.gl/hYUiysxtgpffCvyv8",
  },
  {
    title: "Cape Roca",
    description:
      "The most western point of Europe! Scenic view of the ocean with iconic lighthouse.",
    icon: "/images/travel-icons/cabo-da-roca.png",
    link: "https://maps.app.goo.gl/zNBaDyyLeHBL24BW8",
  },
  {
    title: "Day Trip to Obidos",
    description:
      "A 1 hour drive from Lisbon. A fairy tale medieval town with charming cobblestone streets, historic castle, and unique local treats",
    icon: "/images/travel-icons/bouginvillea.png",
    link: "https://maps.app.goo.gl/pctcm4JWz7TWvAob7",
  },
];

export const TravelSection: React.FC = () => {
  return (
    <>
    <section
      id="travel"
      className="w-full py-24 px-4 md:px-8 bg-[#cfc9a1] text-[#3E2723]"
    >
      <h1 className="font-script lowercase text-4xl md:text-6xl text-white text-center tracking-wide mb-16">
        Travel
      </h1>

      <div className="w-full max-w-5xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <p className="font-mono text-[#3E2723] text-base md:text-lg leading-relaxed">
          Quinta da Bichinha is a centuries-old wine estate located just north of Lisbon, Portugal, encircled by gardens and extensive vineyards. We have exclusive use of the property May 5 - 7, 2027, and all of the wedding events will be taking place at the venue. We hope you can join us!
        </p>
        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
          <Image
            src="/images/QDB.jpeg"
            alt="Quinta da Bichinha venue at dusk"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {TRAVEL_LOGISTICS_BOXES.map((box) => (
          <FilmStripCard key={box.title} align="start">
            <h2 className="font-mono text-xl text-white uppercase tracking-wider pb-6">
              {box.title}
            </h2>
            <div className="font-mono text-base tracking-wider leading-relaxed text-white">
              {box.content}
            </div>
          </FilmStripCard>
        ))}
      </div>

      <div className="w-full max-w-5xl mx-auto mt-10 flex items-center justify-center gap-4">
        <div className="relative w-20 h-28 md:w-24 md:h-32 shrink-0">
          <Image
            src="/images/passport.png"
            alt="Passport"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-center font-mono text-base tracking-wide text-[#3E2723]">
          Please double check that your passport is still valid — it must not expire within 3 months after your trip.
        </p>
      </div>
    </section>

    <section className="w-full py-24 px-4 md:px-8 bg-wedding-cream text-[#3E2723]">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side: Map */}
        <div className="relative lg:sticky top-0 w-full h-screen">
          <Image
            src="/images/map.png"
            alt="Travel Map"
            fill
            className="object-contain"
            priority={false}
          />
        </div>

        {/* Right Side: Things to Do */}
        <div className="flex flex-col gap-8">
          <h2 className="font-script text-wedding-green text-6xl lowercase mb-8 text-center">
            While you're there
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-12">
            {THINGS_TO_DO.map((item, idx) => (
              <div
                key={idx}
                className="flex lg:flex-row flex-col group items-center lg:items-start"
              >
                <div className="relative w-44 h-44 mb-2 transition-transform duration-300 group-hover:scale-110 shrink-0">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    fill
                    className="object-contain drop-shadow-md"
                  />
                </div>

                <div>
                  <h3 className="font-mono text-xl text-wedding-brown mb-3 flex gap-2">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline hover:text-wedding-brown transition-colors decoration-1 underline-offset-4 flex items-center gap-2"
                      >
                        {item.title} <ExternalLink size={16} />
                      </a>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <p className="font-mono text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};
