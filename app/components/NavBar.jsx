'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaCrown, FaBars, FaTimes } from 'react-icons/fa';
import { UserButton, useAuth } from '@clerk/nextjs';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex items-center justify-between p-4 shadow-sm px-10 relative">
      <Link href="/">
        <Image
          src="/log.png"
          width={200}
          height={200}
          alt="logo"
          className="w-[150px] md:w-[150px]"
        />
      </Link>

      <div className="hidden md:flex space-x-4">
       
        <Link href="/pricing">
          <button className={`flex items-center px-4 py-2 rounded-lg hover:bg-gray-400 hover:bg-opacity-25 ${isSignedIn ? 'text-sm' : ''}`}>
            <FaCrown className="text-yellow-400 mr-2" />
            Try Premium
          </button>
        </Link>

        
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Link href="/sign-in">
            <button className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-400 hover:bg-opacity-25">
              Sign-Up / Sign-In
            </button>
          </Link>
        )}
      </div>

      <button
        onClick={toggleMenu}
        className="md:hidden flex items-center text-2xl"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {isMenuOpen && (
        <div className="flex flex-col space-y-4 mt-4 md:hidden absolute bg-slate-900 top-10 left-0 w-full shadow-md p-4">
          <Link href="/pricing">
            <button className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-400 hover:bg-opacity-25">
              <FaCrown className="text-yellow-400 mr-2" />
              Try Premium
            </button>
          </Link>
          
         
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link href="/sign-in">
              <button className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-400 hover:bg-opacity-25">
                Sign-Up / Sign-In
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
