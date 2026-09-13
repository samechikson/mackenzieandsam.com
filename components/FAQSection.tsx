'use client';

import React from 'react';
import Image from 'next/image';
import { RsvpButton } from './RsvpButton';

const OFFSITE_STAYS = [
  { name: 'Largo da Rainha, Guesthouse', url: 'https://www.hoteisfinder.com/largo-da-rainha-guesthouse/', time: '5 min drive from QDB' },
  { name: 'Cambeiros Guesthouse', url: 'https://www.cambeirosguesthouse.com/', time: '11 min drive from QDB' },
  { name: 'Sóis Montejunto Eco Lodge', url: 'https://soisecolodge.com/stay', time: '12 min drive from QDB' },
  { name: 'Stay Hotel Torres Vedras Centro', url: 'https://www.stayhotels.pt/torres-vedras-centro/en/', time: '25 min drive from QDB' },
  { name: 'CampoReal Resort Torres Vedras', url: 'https://www.dolcecamporeal.com/', time: '27 min drive from QDB' },
  { name: 'Casa do Limoeiro Airbnb', url: 'https://www.airbnb.com/rooms/9274917?adults=2&check_in=2027-05-05&check_out=2027-05-08&location=Lisbon%2C%20Portugal&search_mode=regular_search&source_impression_id=p3_1788484839_P3KM4ef5RTDD8VMp&previous_page_section_name=1001&federated_search_id=16dcc47b-7d08-4c9d-b40c-d69f0d40743e', time: null },
  { name: 'Wine Cellar House Airbnb', url: 'https://www.airbnb.com/rooms/10419816?adults=2&check_in=2027-05-05&check_out=2027-05-08&location=Lisbon%2C%20Portugal&search_mode=regular_search&source_impression_id=p3_1788484939_P30bYoefNtrakaRM&previous_page_section_name=1001&federated_search_id=16dcc47b-7d08-4c9d-b40c-d69f0d40743e', time: null },
  { name: 'Arneiro Garden House Airbnb (larger group house)', url: 'https://www.airbnb.com/rooms/1263645385469797888?adults=2&check_in=2027-05-05&check_out=2027-05-08&location=Lisbon%2C%20Portugal&search_mode=regular_search&source_impression_id=p3_1788485066_P3p-HAg0aqBxwu_Z&previous_page_section_name=1001&federated_search_id=09ded69c-47fb-41f2-8534-0a44441c1a3e', time: null },
];

const LINK_CLASS = 'underline underline-offset-2 hover:text-white transition-colors';

const FAQ_ITEMS: { question: string; answer: React.ReactNode }[] = [
  {
    question: 'When should I RSVP by?',
    answer: (
      <>To help us plan our events, please RSVP as soon as you can! The deadline to RSVP is February 1st, 2027.</>
    ),
  },
  {
    question: 'How do I RSVP?',
    answer: <RsvpButton deadlineClassName="text-white" />,
  },
  {
    question: 'What do I need to travel to Portugal?',
    answer: (
      <>
        <p>
          You must carry a valid passport that does not expire within 3 months of your departure date from Portugal. No visa is required for stays of 90 days or less.
        </p>
        <p className="mt-4">
          See more information on traveling to and from Portugal{' '}
          <a href="https://travel.state.gov/en/international-travel/travel-advisories/portugal.html" target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
            here
          </a>.
        </p>
      </>
    ),
  },
  {
    question: 'Can I bring a plus one?',
    answer: (
      <>Due to limited space, we can only accommodate guests who are formally invited. If you&apos;ve received a plus one, they will be specifically addressed on the save the date/invitation envelope. Thank you for understanding!</>
    ),
  },
  {
    question: 'What should I wear?',
    answer: (
      <>
        <p className="font-bold">Welcome dinner: Elevated casual attire</p>
        <p className="italic">Think: linen pants, sundress and sandals, wedge heels, light button down without a tie, non-denim shorts</p>
        <p className="mt-2 font-bold">
          Wedding day:{' '}
          <a href="https://pin.it/33MDRy7yN" target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
            Garden cocktail attire
          </a>
        </p>
        <p className="italic">Think: midi dresses, floral prints, tailored suits (tie optional), lightweight blazers, dressy jumpsuits</p>
        <p className="mt-4">Please keep in mind the venue has uneven surfaces like gravel and grass, so consider your shoe choice carefully!</p>
      </>
    ),
  },
  {
    question: 'Is the wedding outside?',
    answer: (
      <>Yes, we plan to have both the ceremony and dinner outdoors. The average early May temperature ranges from 68-70°F, with cooler evenings — plan to bring a light layer.</>
    ),
  },
  {
    question: 'What if I have dietary restrictions?',
    answer: (
      <>We aim to accommodate all dietary needs, so please indicate this in your RSVP and we will work with Quinta da Bichinha to make sure you have an amazing meal.</>
    ),
  },
  {
    question: 'Is there an open bar?',
    answer: (
      <>Yes! We want you to have the best time, so the drinks are on us — but the hangover is on you!</>
    ),
  },
  {
    question: 'Can I reserve a room onsite?',
    answer: (
      <>Due to limited space, we&apos;re reserving the onsite rooms at Quinta da Bichinha for family and the bridal party. We&apos;ll take care of reserving all the rooms and creating room assignments — Mackenzie or Sam will reach out to let you know whether or not you&apos;ll have a room onsite. If not, there are hotel and Airbnb options in the surrounding area (see below!).</>
    ),
  },
  {
    question: "If I don't have an onsite room, where should I stay?",
    answer: (
      <div className="flex flex-col gap-2">
        {OFFSITE_STAYS.map((stay) => (
          <p key={stay.name}>
            <a href={stay.url} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
              {stay.name}
            </a>
            {stay.time && ` (${stay.time})`}
          </p>
        ))}
      </div>
    ),
  },
  {
    question: "I'm staying onsite at Quinta da Bichinha, what's included with my stay?",
    answer: (
      <>
        <p>All rooms have a private bathroom and basic amenities: air conditioning, towels, a blow dryer, shower gel, and shampoo. In the communal area you&apos;ll find a shared kettle, ironing board, and steamer to use. Please note that this is a guesthouse, not a hotel — there is no room service or 24/7 front desk.</p>
        <p className="mt-4">Meals provided for those staying onsite: welcome party dinner, breakfast, lunch, and hors d&apos;oeuvres/dinner on the wedding day, breakfast the day after the wedding.</p>
        <p className="mt-2">Meals provided for those NOT staying onsite: welcome party dinner and hors d&apos;oeuvres/dinner on the wedding day.</p>
      </>
    ),
  },
  {
    question: 'What do I need to bring?',
    answer: (
      <>Quinta da Bichinha is in the rural countryside, and there are no walkable amenities nearby. Once you&apos;re there, you&apos;re there, so please make sure you bring everything you need with you. For guests staying onsite, all main meals and beverages will be provided, but feel free to bring your favorite midnight snack if you&apos;re particular. Remember to pack your swimsuit for a dip in the lake!</>
    ),
  },
];

export const FAQSection: React.FC = () => {
  return (
    <section
      id="faq"
      className="w-full min-h-screen bg-wedding-brown text-wedding-cream"
    >
      <div className="relative w-full h-64 md:h-96">
        <Image
          src="/images/by-the-lake.jpg"
          alt="By the lake at Quinta da Bichinha"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="font-script lowercase text-6xl md:text-7xl text-white text-center">
            frequently asked questions
          </h1>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-wedding-brown to-transparent" />
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-24">

        {FAQ_ITEMS.length === 0 ? (
          <p className="font-mono text-center text-wedding-cream/70 uppercase tracking-widest text-sm">
            Coming soon!
          </p>
        ) : (
          <div className="flex flex-col gap-10">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx} className="border-b border-wedding-cream/15 pb-8 text-center">
                <h2 className="font-mono text-lg md:text-xl font-bold uppercase tracking-wide text-wedding-cream mb-3">
                  {item.question}
                </h2>
                <div className="font-mono text-base md:text-lg leading-relaxed">
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="font-mono text-base md:text-lg leading-relaxed text-center mt-16">
          Should you have any further questions or concerns, please don&apos;t hesitate to get in touch with either Mackenzie{' '}
          <a href="tel:+17079534902" className={LINK_CLASS}>707.953.4902</a> or Sam{' '}
          <a href="tel:+19802536281" className={LINK_CLASS}>980.253.6281</a>.
        </p>
      </div>
    </section>
  );
};
