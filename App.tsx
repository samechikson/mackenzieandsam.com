import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PasswordProtection } from './components/PasswordProtection';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { Travel } from './pages/Travel';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check session storage to keep user logged in during session
    const auth = sessionStorage.getItem('wedding_auth');
    console.log(auth);
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

  if (!isAuthenticated) {
    return <PasswordProtection onSuccess={handleLogin} />;
  }

  return (
    <Router>
      <div className="font-sans text-wedding-green selection:bg-wedding-green selection:text-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/travel" element={<Travel />} />
        </Routes>
      </div>
    </Router>
  );
}