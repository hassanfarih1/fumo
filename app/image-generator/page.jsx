'use client'
import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';

export default function Page() {
  const { isLoaded, isSignedIn } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        window.location.href = '/sign-in';
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [isLoaded, isSignedIn]);

  if (!isAuthenticated) {
    return null; 
  }

  return(
    
  <div>
    <NavBar/>
    <Hero/>
  </div>

  );
}
