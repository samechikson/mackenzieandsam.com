'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PasswordProtectionProps {
  onSuccess: () => void;
}

export const PasswordProtection: React.FC<PasswordProtectionProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, name }),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess();
      } else {
        setError(data.error || 'Incorrect password');
        setPassword('');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-wedding-cream flex flex-col items-center justify-center px-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-md w-full"
      >
        <h1 className="font-script text-6xl md:text-7xl text-wedding-green mb-10 -rotate-2">
          mackenzie and sam
        </h1>

        <div className="bg-white/40 backdrop-blur-sm p-8 rounded-lg shadow-sm border border-wedding-brown/10">
          <p className="font-sans text-wedding-brown mb-6 uppercase tracking-widest text-xs font-bold">
            Please enter your name and password
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(null);
              }}
              className="w-full px-4 py-3 border-b-2 border-wedding-brown/20 bg-transparent text-center font-sans text-xl text-wedding-brown focus:outline-none focus:border-wedding-green transition-colors placeholder-wedding-brown/30"
              placeholder="Full Name"
              autoFocus
              disabled={isLoading}
            />

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              className="w-full px-4 py-3 border-b-2 border-wedding-brown/20 bg-transparent text-center font-sans text-xl text-wedding-brown focus:outline-none focus:border-wedding-green transition-colors placeholder-wedding-brown/30"
              placeholder="Password"
              disabled={isLoading}
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full mt-4 py-3 bg-wedding-brown text-wedding-cream font-sans font-bold uppercase tracking-widest hover:bg-wedding-green transition-colors duration-300 rounded-sm shadow-md flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
              {isLoading ? (
                <div className="loader"></div>
              ) : (
                'Enter'
              )}
            </motion.button>

            <div className="h-6 mt-2">
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-800 font-sans text-sm font-semibold uppercase tracking-wide"
                >
                  {error}
                </motion.p>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};