import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PasswordProtectionProps {
  onSuccess: () => void;
}

export const PasswordProtection: React.FC<PasswordProtectionProps> = ({ onSuccess }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Case-insensitive check for "QUINTA27"
    if (input.trim().toUpperCase() === 'QUINTA2027') {
      onSuccess();
    } else {
      setError(true);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F0E9] flex flex-col items-center justify-center px-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-md w-full"
      >
        <h1 className="font-script text-6xl md:text-7xl text-[#556B2F] mb-10 -rotate-2">
          mackenzie and sam
        </h1>
        
        <div className="bg-white/40 backdrop-blur-sm p-8 rounded-lg shadow-sm border border-[#5D4037]/10">
            <p className="font-sans text-[#5D4037] mb-6 uppercase tracking-widest text-xs font-bold">
            Please enter the password
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="password"
                value={input}
                onChange={(e) => {
                    setInput(e.target.value);
                    setError(false);
                }}
                className="w-full px-4 py-3 border-b-2 border-[#5D4037]/20 bg-transparent text-center font-sans text-xl text-[#5D4037] focus:outline-none focus:border-[#556B2F] transition-colors placeholder-[#5D4037]/30"
                placeholder="Password"
                autoFocus
            />
            
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full mt-4 py-3 bg-[#5D4037] text-[#F2F0E9] font-sans font-bold uppercase tracking-widest hover:bg-[#556B2F] transition-colors duration-300 rounded-sm shadow-md"
            >
                Enter
            </motion.button>
            
            <div className="h-6 mt-2">
                {error && (
                <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-red-800/70 font-sans text-xs uppercase tracking-wide"
                >
                    Incorrect password
                </motion.p>
                )}
            </div>
            </form>
        </div>
      </motion.div>
    </div>
  );
};