'use client';

import React, { useState, useEffect } from 'react';
import { PasswordProtection } from './PasswordProtection';

const AUTH_KEY = 'wedding_auth';
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Keep the user logged in for 30 days via localStorage (persists across
    // browser/tab closes, unlike sessionStorage).
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(AUTH_KEY);
        if (stored) {
          const expires = parseInt(stored, 10);
          if (!Number.isNaN(expires) && Date.now() < expires) {
            setIsAuthenticated(true);
          } else {
            // Expired or invalid — clear it.
            localStorage.removeItem(AUTH_KEY);
          }
        }
      } catch {
        // localStorage unavailable (e.g. private mode) — fall back to showing the prompt.
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    try {
      localStorage.setItem(AUTH_KEY, String(Date.now() + THIRTY_DAYS_MS));
    } catch {
      // Ignore storage errors; the user stays authenticated for this session.
    }
    setIsAuthenticated(true);
  };

  // Don't render anything while checking auth state to avoid flash
  if (isLoading) return null;

  if (!isAuthenticated) {
    return <PasswordProtection onSuccess={handleLogin} />;
  }

  return <>{children}</>;
}
