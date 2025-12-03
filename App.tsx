import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { EnvelopeSection } from './components/EnvelopeSection';
import { DetailsSection } from './components/DetailsSection';
import { StorySection } from './components/StorySection';
import { PasswordProtection } from './components/PasswordProtection';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check session storage to keep user logged in during session
    const auth = sessionStorage.getItem('wedding_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem('wedding_auth', 'true');
    setIsAuthenticated(true);
  };

  // Don't render anything while checking auth state to avoid flash
  if (isLoading) return null;

  // if (!isAuthenticated) {
  //   return <PasswordProtection onSuccess={handleLogin} />;
  // }

  return (
    <div className="font-sans text-wedding-green selection:bg-wedding-green selection:text-white">
      <HeroSection />
      <EnvelopeSection />
      <DetailsSection />
      <StorySection />
      
      <footer className="py-8 text-center text-sm opacity-50 font-sans">
        <p>Made with ❤️ for Mackenzie & Sam</p>
      </footer>
    </div>
  );
}