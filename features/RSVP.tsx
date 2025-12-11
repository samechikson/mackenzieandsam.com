'use client';

import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { OAuth2Client } from 'google-auth-library';

// Initialize the OAuth2Client with your app's oauth credentials
const oauthClient = new OAuth2Client({
  clientId: '357687835955-ik3i0kfpavebladfbbipac6cqneitiul.apps.googleusercontent.com',
  clientSecret: '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',
});

// Note: In a real production app, 'google-spreadsheet' is a Node.js library and may have issues 
// running directly in the browser (Vite) due to missing Node polyfills (crypto, fs, etc.).
// If this fails to build, we should revert to the simple `fetch` method or use a backend proxy.
import { GoogleSpreadsheet } from 'google-spreadsheet';

export const RSVP: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    guests: 1,
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
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Configuration
  const SPREADSHEET_ID = '1C8KVN8bf0n9VlJZQODLrUBlbP1qzQJvc-WGpcC0kbc4';
  const API_KEY = 'AIzaSyDoO2DPpi-MRky5XV-1KmSgIQI4OOPh-yA';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      activities: { ...prev.activities, [name]: checked },
    }));
  };

  const formatActivities = () => {
    const activityLabels: Record<string, string> = {
      foodTour: 'Lisbon Food Tour',
      beachDay: 'Cascais Beach Day',
      golf: 'Oitavos Dunes Golf',
      sintraTour: 'Sintra Castle Tour',
      timeoutMarket: 'Time Out Market',
    };

    return Object.entries(formData.activities)
      .filter(([key, isSelected]) => isSelected)
      .map(([key]) => activityLabels[key] || key)
      .join(', ');
  };

  const submitToGoogleSheets = async () => {
    try {

      // Initialize the sheet - doc ID is the long id in the sheets URL
      const doc = new GoogleSpreadsheet(SPREADSHEET_ID, oauthClient);

      // Initialize Auth
      // WARNING: Writing with just an API Key is typically not allowed by Google Sheets API.
      // Usually requires Service Account (JWT) or OAuth (which are harder to do in browser safely).
      // We will try this as requested by the user.
      await doc.loadInfo(); // loads document properties and worksheets

      const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

      // Data mapping to columns: Name, Number of Guests, Dietary restrictions, Stay at quinta, Needs transfer, activities
      const rowData = {
        'Name': formData.name,
        'Number of Guests': formData.guests,
        'Dietary restrictions': formData.dietary,
        'Stay at quinta': formData.stayOnsite,
        'Needs transfer': formData.transfer,
        'activities': formatActivities()
      };

      // In 'google-spreadsheet', addRow expects an object where keys match header values
      await sheet.addRow(rowData);

    } catch (err: any) {
      console.error('Submission Error:', err);
      // More descriptive error for the user
      if (err.message && err.message.includes('403')) {
        throw new Error('Permission denied. API Key may not have write access.');
      }
      throw err;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await submitToGoogleSheets();
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
          <h1 className="font-script text-5xl md:text-6xl text-wedding-green mb-6">Thank You!</h1>
          <p className="font-sans text-wedding-brown text-lg">
            We've received your RSVP. We can't wait to see you in Portugal!
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wedding-cream relative overflow-hidden flex flex-col items-center py-24 px-4">
      {/* Background decoration could go here */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <img src="/images/quinta-landscape.png" className="w-full h-full object-cover grayscale" alt="texture" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="bg-wedding-paper shadow-2xl px-8 pb-8 rounded-sm relative -rotate-1 border border-wedding-green/10">
          <div className="text-center mb-10">
            <h1 className="font-script text-7xl md:text-9xl mb-12 text-wedding-green lowercase">RSVP</h1>
            <p className="font-sans text-wedding-brown text-lg font-light tracking-wide">
              Please let us know if you can make it by <span className="font-bold">12/1/2026</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 font-sans text-wedding-brown">

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

            {/* Guests */}
            <div className="space-y-2">
              <label htmlFor="guests" className="block text-sm uppercase tracking-widest font-bold text-wedding-green">
                Number of Guests
              </label>
              <input
                type="number"
                id="guests"
                name="guests"
                min="1"
                required
                value={formData.guests}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b-2 border-wedding-brown/20 focus:border-wedding-green outline-none py-2 transition-colors text-lg"
              />
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
                Would you like to stay onsite at Quinta da Bichinha? <span className="normal-case font-normal opacity-70 text-xs block mt-1">(Space permitting)</span>
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
                Interested Activities <span className="block normal-case font-normal opacity-70 text-xs mt-1">(Check all that apply)</span>
              </p>

              <div className="grid md:grid-cols-1 gap-3">
                {[
                  { key: 'foodTour', label: 'Group Lisbon Food Tour in Lisbon' },
                  { key: 'beachDay', label: 'Beach Day in Cascais' },
                  { key: 'golf', label: 'Golf at Oitavos Dunes Golf Course' },
                  { key: 'sintraTour', label: 'Sintra Castle Tour' },
                  { key: 'timeoutMarket', label: 'Drinks and Appetizers at Time Out Marketplace' },
                ].map((activity) => (
                  <label key={activity.key} className="flex items-start gap-3 cursor-pointer group hover:bg-wedding-green/5 p-2 rounded transition-colors -ml-2">
                    <div className={`mt-1 w-5 h-5 border border-wedding-brown flex items-center justify-center shrink-0 transition-colors ${formData.activities[activity.key as keyof typeof formData.activities] ? 'bg-wedding-green border-wedding-green' : 'bg-white'}`}>
                      {formData.activities[activity.key as keyof typeof formData.activities] && (
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      )}
                    </div>
                    <input
                      type="checkbox"
                      name={activity.key}
                      checked={formData.activities[activity.key as keyof typeof formData.activities]}
                      onChange={handleCheckboxChange}
                      className="hidden"
                    />
                    <span className="text-wedding-brown group-hover:text-wedding-green transition-colors leading-snug">{activity.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-wedding-green text-white font-sans uppercase tracking-widest text-sm font-bold py-4 px-12 rounded-full hover:bg-wedding-brown transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Response'}
              </button>
            </div>

          </form>
        </div>
      </motion.div>
    </div>
  );
};
