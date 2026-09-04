'use client';

import React from 'react';

const FAQ_ITEMS: { question: string; answer: string }[] = [];

export const FAQSection: React.FC = () => {
  return (
    <section
      id="faq"
      className="w-full min-h-screen py-24 px-4 md:px-8 bg-wedding-brown text-wedding-cream"
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="font-script lowercase text-6xl md:text-7xl text-white text-center mb-16">
          frequently asked questions
        </h1>

        {FAQ_ITEMS.length === 0 ? (
          <p className="font-mono text-center text-wedding-cream/70 uppercase tracking-widest text-sm">
            Coming soon!
          </p>
        ) : (
          <div className="flex flex-col gap-10">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx} className="border-b border-wedding-cream/15 pb-8">
                <h2 className="font-mono text-lg md:text-xl font-bold uppercase tracking-wide text-wedding-cream mb-3">
                  {item.question}
                </h2>
                <p className="font-mono text-base md:text-lg leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
