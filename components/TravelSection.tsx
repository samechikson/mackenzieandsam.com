'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const THINGS_TO_DO = [
  {
    title: 'Food and Wine Tour',
    description: "We got to taste cheese, Chouriço, bifana, traditional rices, Port, and Lisbon wines. It was well worth the $, we had amazing guides, and met fun people!",
    icon: '/images/travel-icons/food-tour.png',
    link: 'https://tinyurl.com/yc6cs2c2'
  },
  {
    title: 'Time Out Market',
    description: "Taste the iconic pastel de nata pastries and other goodies at this historic market hall.",
    icon: '/images/travel-icons/time-out-market.png',
    link: 'https://www.instagram.com/timeoutmarketlisboa/?hl=en'
  },
  {
    title: 'Day Trip to Sintra',
    description: "Visit the Pena Palace and beautiful surrounding park grounds. It's truly a magical place straight out of a fairytale.",
    icon: '/images/travel-icons/sintra.png',
    link: 'https://tinyurl.com/2saxdryt'
  },
  {
    title: 'A Ginjinha',
    description: "Walk to A Ginjinha to shoot the sour cherry liquor Lisbon is known for - only 1.55 euros!",
    icon: '/images/travel-icons/jijinha.png',
    link: 'https://maps.app.goo.gl/tFev5isk7SzbzZSa6'
  },
  {
    title: 'Tejo Bar',
    description: "Hangout late into the night at Tejo Bar to hear traditional fado music. Quite possibly the smallest bar I've ever stepped foot into!",
    icon: '/images/travel-icons/guitar.png',
    link: 'https://maps.app.goo.gl/6aLyEiffVGoXFff57'
  },
  {
    title: 'Alfama District',
    description: "Walk around the Alfama district, Lisbon's oldest neighborhood - explore the São Jorge Castle while you're there.",
    icon: '/images/travel-icons/sao-jorge.png',
    link: 'https://maps.app.goo.gl/NjHjhtwX8JLwtqSj6'
  },
  {
    title: 'Iconic Tram 28',
    description: "Hop on the iconic Tram 28 with a public transport pass for a scenic tour of the city's hills.",
    icon: '/images/travel-icons/lisbon.png',
    link: 'https://maps.app.goo.gl/cidmmnAssngt4LZ46'
  },
  {
    title: 'Belém Tower',
    description: "Visit the Belém Tower, an iconic fortress on the Tagus river that served as a point of embarkation for Portuguese explorers.",
    icon: '/images/travel-icons/belem-tower.png',
    link: 'https://maps.app.goo.gl/eV1eL5LFwNwPsXHf6'
  },
  {
    title: 'Day Trip to Cascais',
    description: "A 30 min drive from Lisbon. It's a laid-back coastal town with great beaches, good food, and easy access to scenic coastal walks.",
    icon: '/images/travel-icons/waves.png',
    link: 'https://maps.app.goo.gl/hYUiysxtgpffCvyv8'
  },
  {
    title: 'Day Trip to Obidos',
    description: "A 1 hour drive from Lisbon. A fairy tale medieval town with charming cobblestone streets, historic castle, and unique local treats",
    icon: '/images/travel-icons/bouginvillea.png',
    link: 'https://maps.app.goo.gl/pctcm4JWz7TWvAob7'
  }
];

export const TravelSection: React.FC = () => {
  return (
    <section className="w-full py-24 px-4 md:px-8 bg-wedding-paper text-[#3E2723]">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side: Map */}
        <div
          className="relative lg:sticky top-0 w-full aspect-3/4 md:aspect-square"
        >
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

          <div className="grid grid-cols-1 gap-x-8 gap-y-12">
            {THINGS_TO_DO.map((item, idx) => (
              <div key={idx} className="flex lg:flex-row flex-col group items-center lg:items-start">
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
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-wedding-brown transition-colors decoration-1 underline-offset-4 flex items-center gap-2">
                        {item.title} <ExternalLink size={16} />
                      </a>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <p className="font-mono text-lg">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
