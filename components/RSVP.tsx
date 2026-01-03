'use client';

import React, { useState, FormEvent } from 'react';
import { AsYouType } from 'libphonenumber-js';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Image from 'next/image';

const ACTIVITIES = [
  { id: 'foodTour', label: 'Lisbon Food Tour' },
  { id: 'beachDay', label: 'Cascais Beach Day' },
  { id: 'golf', label: 'Oitavos Dunes Golf' },
  { id: 'sintraTour', label: 'Sintra Castle Tour' },
  { id: 'timeoutMarket', label: 'Time Out Market' },
];

export const RSVP: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attending: '',
    guests: 1,
    guestNames: [] as string[],
    dietary: '',
    stayOnsite: '',
    transfer: '',
    activities: {
      foodTour: false,
      beachDay: false,
      golf: false,
      sintraTour: false,
      timeoutMarket: false,
    },
    welcomeDinner: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const savedName = localStorage.getItem('guestName');
    if (savedName) {
      setFormData((prev) => ({ ...prev, name: savedName }));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'guests') {
      const count = parseInt(value) || 1;
      setFormData((prev) => {
        const extraGuests = count - 1;
        let newGuestNames = [...prev.guestNames];

        if (extraGuests > newGuestNames.length) {
          const toAdd = extraGuests - newGuestNames.length;
          newGuestNames = [...newGuestNames, ...Array(toAdd).fill('')];
        } else if (extraGuests < newGuestNames.length) {
          newGuestNames = newGuestNames.slice(0, extraGuests);
        }

        return { ...prev, [name]: count, guestNames: newGuestNames };
      });
    } else if (name === 'phone') {
      console.log(value);
      // Format phone number as the user types
      const formatted = new AsYouType().input(value);
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleGuestNameChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newGuestNames = [...prev.guestNames];
      newGuestNames[index] = value;
      return { ...prev, guestNames: newGuestNames };
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      activities: { ...prev.activities, [name]: checked },
    }));
  };

  const formatActivities = () => {
    const activityLabels: Record<string, string> = ACTIVITIES.reduce((acc, activity) => {
      acc[activity.id] = activity.label;
      return acc;
    }, {} as Record<string, string>);

    return Object.entries(formData.activities)
      .filter(([key, isSelected]) => isSelected)
      .map(([key]) => activityLabels[key] || key)
      .join(', ');
  };

  const submitToGoogleSheets = async (name: string) => {
    const response = await fetch('/api/rsvp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: formData.email,
        phone: formData.phone,
        attending: formData.attending,
        dietary: formData.attending === 'yes'
          ? formData.dietary
          : '',
        stayOnsite: formData.attending === 'yes' ? formData.stayOnsite : '',
        transfer: formData.attending === 'yes' ? formData.transfer : '',
        activities: formData.attending === 'yes' ? formatActivities() : '',
        welcomeDinner: formData.attending === 'yes' ? formData.welcomeDinner : '',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to submit RSVP');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Submit for the main guest
      await submitToGoogleSheets(formData.name);

      // 2. Submit for additional guests
      if (formData.attending === 'yes') {
        const additionalGuestSubmissions = formData.guestNames
          .filter(name => name.trim() !== '')
          .map(guestName => submitToGoogleSheets(guestName));

        if (additionalGuestSubmissions.length > 0) {
          await Promise.all(additionalGuestSubmissions);
        }
      }

      console.log('Form Submitted', formData);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong submitting your RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-wedding-cream flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-wedding-paper p-8 md:p-12 shadow-2xl rounded-sm transform rotate-1 text-center"
        >
          <h1 className="font-script text-5xl md:text-6xl text-wedding-green mb-8 lowercase">Thank You!</h1>
          <p className="font-mono text-wedding-brown text-lg">
            We've received your RSVP. We can't wait to see you in Portugal!
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="absolute -top-13 right-6">
          <Image src="/images/otis-head.png" alt="Otis" width={60} height={60} />
        </div>
        <div className="bg-wedding-paper shadow-2xl px-8 pb-8 rounded-sm relative lg:-rotate-1 border border-wedding-green/10">
          <div className="text-center mb-10">
            <h1 className="font-script text-7xl md:text-9xl mb-12 text-wedding-green lowercase">RSVP</h1>
            <p className="font-mono text-wedding-brown text-lg font-light tracking-wide">
              Please let us know if you can make it by <span className="font-bold">12/1/2026</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 font-mono text-wedding-brown">

            {error && (
              <div className="bg-red-50 text-red-800 p-4 rounded text-center border border-red-200">
                {error}
              </div>
            )}

            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b-2 border-wedding-brown/20 focus:border-wedding-green outline-none py-2 transition-colors text-lg placeholder-wedding-brown/30"
                placeholder="Jane Doe"
              />
            </div>

            {/* Attending */}
            <div className="space-y-3">
              <p className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                Will you be attending?
              </p>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border border-wedding-brown flex items-center justify-center transition-colors ${formData.attending === 'yes' ? 'border-wedding-green' : ''}`}>
                    {formData.attending === 'yes' && <div className="w-3 h-3 bg-wedding-green rounded-full" />}
                  </div>
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={formData.attending === 'yes'}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <span className="group-hover:text-wedding-green transition-colors">Joyfully Accept</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border border-wedding-brown flex items-center justify-center transition-colors ${formData.attending === 'no' ? 'border-wedding-green' : ''}`}>
                    {formData.attending === 'no' && <div className="w-3 h-3 bg-wedding-green rounded-full" />}
                  </div>
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === 'no'}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <span className="group-hover:text-wedding-green transition-colors">Regretfully Decline</span>
                </label>
              </div>

            </div>

            <motion.div
              initial={false}
              animate={{
                height: formData.attending === 'yes' ? 'auto' : 0,
                opacity: formData.attending === 'yes' ? 1 : 0,
                overflow: 'hidden'
              }}
              className="space-y-8"
            >
              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required={formData.attending === 'yes'}
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b-2 border-wedding-brown/20 focus:border-wedding-green outline-none py-2 transition-colors text-lg placeholder-wedding-brown/30"
                  placeholder="jane@example.com"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required={formData.attending === 'yes'}
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b-2 border-wedding-brown/20 focus:border-wedding-green outline-none py-2 transition-colors text-lg placeholder-wedding-brown/30"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              {/* Guests */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="guests" className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                    Number of Guests in Your Party
                  </label>
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    min="1"
                    required={formData.attending === 'yes'}
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b-2 border-wedding-brown/20 focus:border-wedding-green outline-none py-2 transition-colors text-lg"
                  />
                </div>

                {formData.guestNames.length > 0 && (
                  <div className="space-y-4 pl-4 border-l-2 border-wedding-green/20">
                    {formData.guestNames.map((guestName, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <label htmlFor={`guest-${index}`} className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                          Guest {index + 2} Name
                        </label>
                        <input
                          type="text"
                          id={`guest-${index}`}
                          required={formData.attending === 'yes'}
                          value={guestName}
                          onChange={(e) => handleGuestNameChange(index, e.target.value)}
                          className="w-full bg-transparent border-b-2 border-wedding-brown/20 focus:border-wedding-green outline-none py-2 transition-colors text-lg placeholder-wedding-brown/30"
                          placeholder="Full Name"
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Welcome Dinner */}
              <div className="space-y-3">
                <p className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                  Will you be attending the welcome dinner?
                </p>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-full border border-wedding-brown flex items-center justify-center transition-colors ${formData.welcomeDinner === 'yes' ? 'border-wedding-green' : ''}`}>
                      {formData.welcomeDinner === 'yes' && <div className="w-3 h-3 bg-wedding-green rounded-full" />}
                    </div>
                    <input
                      type="radio"
                      name="welcomeDinner"
                      value="yes"
                      checked={formData.welcomeDinner === 'yes'}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span className="group-hover:text-wedding-green transition-colors">Yes, I'll be there!</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-full border border-wedding-brown flex items-center justify-center transition-colors ${formData.welcomeDinner === 'no' ? 'border-wedding-green' : ''}`}>
                      {formData.welcomeDinner === 'no' && <div className="w-3 h-3 bg-wedding-green rounded-full" />}
                    </div>
                    <input
                      type="radio"
                      name="welcomeDinner"
                      value="no"
                      checked={formData.welcomeDinner === 'no'}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span className="group-hover:text-wedding-green transition-colors">No, I can't make it</span>
                  </label>
                </div>
              </div>

              {/* Dietary */}
              <div className="space-y-2">
                <label htmlFor="dietary" className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                  Dietary Restrictions
                </label>
                <textarea
                  id="dietary"
                  name="dietary"
                  rows={2}
                  value={formData.dietary}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b-2 border-wedding-brown/20 focus:border-wedding-green outline-none py-2 transition-colors text-lg placeholder-wedding-brown/30 resize-none"
                  placeholder="Allergies, vegetarian, vegan, etc."
                />
              </div>

              {/* Stay Onsite */}
              <div className="space-y-3">
                <p className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                  Would you like to stay onsite at Quinta da Bichinha? <span className="normal-case font-normal text-xs block mt-1">(Space permitting)</span>
                </p>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-full border border-wedding-brown flex items-center justify-center transition-colors ${formData.stayOnsite === 'yes' ? 'border-wedding-green' : ''}`}>
                      {formData.stayOnsite === 'yes' && <div className="w-3 h-3 bg-wedding-green rounded-full" />}
                    </div>
                    <input
                      type="radio"
                      name="stayOnsite"
                      value="yes"
                      checked={formData.stayOnsite === 'yes'}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span className="group-hover:text-wedding-green transition-colors">Yes, please!</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-full border border-wedding-brown flex items-center justify-center transition-colors ${formData.stayOnsite === 'no' ? 'border-wedding-green' : ''}`}>
                      {formData.stayOnsite === 'no' && <div className="w-3 h-3 bg-wedding-green rounded-full" />}
                    </div>
                    <input
                      type="radio"
                      name="stayOnsite"
                      value="no"
                      checked={formData.stayOnsite === 'no'}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span className="group-hover:text-wedding-green transition-colors">No, I'll stay elsewhere</span>
                  </label>
                </div>
              </div>

              {/* Transfer - Conditional */}
              {formData.stayOnsite === 'yes' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-3 bg-wedding-green/5 p-4 rounded-md"
                >
                  <p className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                    Do you need a transfer from Lisbon to the venue?
                  </p>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border border-wedding-brown flex items-center justify-center transition-colors ${formData.transfer === 'yes' ? 'border-wedding-green' : ''}`}>
                        {formData.transfer === 'yes' && <div className="w-3 h-3 bg-wedding-green rounded-full" />}
                      </div>
                      <input
                        type="radio"
                        name="transfer"
                        value="yes"
                        checked={formData.transfer === 'yes'}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <span className="group-hover:text-wedding-green transition-colors">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border border-wedding-brown flex items-center justify-center transition-colors ${formData.transfer === 'no' ? 'border-wedding-green' : ''}`}>
                        {formData.transfer === 'no' && <div className="w-3 h-3 bg-wedding-green rounded-full" />}
                      </div>
                      <input
                        type="radio"
                        name="transfer"
                        value="no"
                        checked={formData.transfer === 'no'}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <span className="group-hover:text-wedding-green transition-colors">No</span>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* Activities */}
              <div className="space-y-4">
                <p className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                  Interested Activities before the wedding <span className="block normal-case font-normal text-xs mt-1">Informal gatherings the few days before the wedding. Check all that you are interested in, and we will send more details as the date approaches.</span>
                </p>

                <div className="grid md:grid-cols-1 gap-3">
                  {ACTIVITIES.map((activity) => (
                    <label key={activity.id} className="flex items-start gap-3 cursor-pointer group hover:bg-wedding-green/5 p-2 rounded transition-colors -ml-2">
                      <div className={`mt-1 w-5 h-5 border border-wedding-brown flex items-center justify-center shrink-0 transition-colors ${formData.activities[activity.id as keyof typeof formData.activities] ? 'bg-wedding-green border-wedding-green' : 'bg-white'}`}>
                        {formData.activities[activity.id as keyof typeof formData.activities] && (
                          <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                        )}
                      </div>
                      <input
                        type="checkbox"
                        name={activity.id}
                        checked={formData.activities[activity.id as keyof typeof formData.activities]}
                        onChange={handleCheckboxChange}
                        className="hidden"
                      />
                      <span className="text-wedding-brown group-hover:text-wedding-green transition-colors leading-snug">{activity.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Submit */}
            <div className="pt-6 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-wedding-green text-white font-mono uppercase tracking-widest text-sm font-bold py-4 px-12 rounded-full hover:bg-wedding-brown transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Response'}
              </button>
            </div>

          </form>
        </div>
      </motion.div >
    </div >
  );
};
