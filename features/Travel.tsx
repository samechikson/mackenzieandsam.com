'use client';

import React from 'react';
import { ExternalLink, MapPin } from 'lucide-react';
import Image from 'next/image';

const THINGS_TO_DO = [
  {
    title: 'Portuguese Food and Wine Tour',
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
    location: "Largo São Domingos 8, 1100-201 Lisboa",
    icon: '/images/travel-icons/jijinha.png'
  },
  {
    title: 'Tejo Bar',
    description: "Hangout late into the night at Tejo Bar to hear traditional fado music. Quite possibly the smallest bar I've ever stepped foot into!",
    location: "Beco do Vigário 1A, Alfama, 1100-613 Lisboa",
    icon: '/images/travel-icons/guitar.png'
  },
  {
    title: 'Alfama District',
    description: "Walk around the Alfama district, Lisbon's oldest neighborhood - explore the São Jorge Castle while you're there.",
    icon: '/images/travel-icons/sao-jorge.png'
  },
  {
    title: 'Iconic Tram 28',
    description: "Hop on the iconic Tram 28 with a public transport pass for a scenic tour of the city's hills.",
    icon: '/images/travel-icons/lisbon.png'
  },
  {
    title: 'Belém Tower',
    description: "Visit the Belém Tower, an iconic fortress on the Tagus river that served as a point of embarkation for Portuguese explorers.",
    icon: '/images/travel-icons/belem-tower.png'
  },
  {
    title: 'Day Trip to Cascais',
    description: "A 30 min drive from Lisbon. It's a laid-back coastal town with great beaches, good food, and easy access to scenic coastal walks.",
    icon: '/images/travel-icons/waves.png'
  }
];

export const Travel: React.FC = () => {
  return (
    <div className="w-full bg-wedding-cream min-h-screen pb-24">

      {/* 1. Map Header */}
      <div className="relative h-200 overflow-hidden my-20">
        <Image
          src="/images/map.png"
          alt="Map of Lisbon/Portugal"
          fill
          className="object-contain object-center"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-wedding-cream to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-12 relative z-10">

        {/* 2. Logistics Section */}
        <div className="bg-white p-8 md:p-12 rounded-sm shadow-xl border-t-4 border-wedding-green mb-20">
          <h1 className="font-script text-wedding-green text-6xl lowercase mb-12 text-center">Travel Logistics</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-wedding-brown">
            {/* Venue Address */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-wedding-cream p-4 rounded-full mb-2">
                <MapPin size={32} className="text-wedding-green" />
              </div>
              <h2 className="font-serif text-2xl font-bold uppercase tracking-widest text-wedding-green">Venue</h2>
              <p className="font-sans leading-relaxed text-lg">
                Quinta da Bicinha<br />
                Estr. de Vila Chã<br />
                2580-413, Portugal
              </p>
              <a href="https://maps.app.goo.gl/wp6AADZdJU9CZcWv9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-2 text-sm bg-wedding-brown text-white rounded-full hover:bg-wedding-green transition-all duration-300 shadow-md font-sans mt-2"
              >
                View Map
              </a>
            </div>

            {/* Flying In */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-wedding-cream p-4 rounded-full mb-2">
                {/* Plane Icon replacement usinglucide-react is unnecessary if generic, but let's use text/simple */}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-wedding-green"><path d="M2 22h20" /><path d="M20.498 15.418L13.144 2.148 10.994 4.1l4 7-6 1.4-3.5-3.1-2.144 2.15L8 15 2 22" /></svg>
              </div>
              <h2 className="font-serif text-2xl font-bold uppercase tracking-widest text-wedding-green">Flying In</h2>
              <p className="font-sans leading-relaxed text-lg">
                Lisbon Humberto Delgado Airport (LIS) is the closest major airport.
              </p>
              <p className="font-sans text-base text-wedding-green font-bold bg-wedding-green/10 px-4 py-2 rounded-lg">
                Check your passport expiration!
              </p>
            </div>

            {/* Transport */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-wedding-cream p-4 rounded-full mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-wedding-green"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></svg>
              </div>
              <h2 className="font-serif text-2xl font-bold uppercase tracking-widest text-wedding-green">Getting There</h2>
              <div className="font-sans leading-relaxed text-lg">
                <p className="mb-2">Options from Lisbon (45-60 min):</p>
                <ul className="text-sm space-y-1 opacity-80">
                  <li>• Rental car (recommended)</li>
                  <li>• Private transfer</li>
                  <li>• Taxi/Uber/Bolt</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Things To Do Grid */}
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="font-script text-wedding-green text-7xl lowercase">Things To Do</h2>
            <p className="font-serif text-wedding-brown text-xl max-w-2xl mx-auto">
              Some of our favorite spots, tastes, and sights in and around Lisbon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {THINGS_TO_DO.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="relative w-32 h-32 mb-6 transition-transform duration-300 group-hover:scale-110">
                  <div className="absolute inset-0 bg-wedding-green/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Image
                    src={item.icon}
                    alt={item.title}
                    fill
                    className="object-contain drop-shadow-md"
                  />
                </div>

                <h3 className="font-serif text-2xl text-wedding-green mb-3 items-center flex gap-2">
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-wedding-brown transition-colors decoration-1 underline-offset-4 flex items-center gap-2">
                      {item.title} <ExternalLink size={16} />
                    </a>
                  ) : (
                    item.title
                  )}
                </h3>

                <p className="font-sans text-wedding-brown text-lg leading-relaxed opacity-90">
                  {item.description}
                </p>

                {item.location && (
                  <p className="mt-2 text-sm font-sans italic text-wedding-brown/60">
                    {item.location}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
