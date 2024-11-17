'use client'
import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Hero() {
  const { isSignedIn } = useUser(); 
  const router = useRouter(); 

  const handleRedirect = () => {
    if (isSignedIn) {
      router.push('/image-generator'); 
    } else {
      router.push('/sign-in'); 
    }
  };

  return (
    <div className='flex flex-col justify-center text-center mt-16 space-y-5'>
      <h1 className='text-3xl md:text-6xl font-black max-w-5xl mx-auto'>
        Unleash Your Creativity with <span className='text-primary'>AI Image Generation</span>
      </h1>
      <h4 className='text-xs md:text-sm text-gray-300'>
        Create stunning visuals in seconds using cutting-edge AI technology.
      </h4>

      <div>
        <input
          className='w-[300px] md:w-[650px] pl-2 py-2 md:py-3 text-left bg-slate-900 border border-primary rounded-lg rounded-r-none'
          type="text"
          placeholder="Enter your prompt here (e.g., 'A futuristic city at sunset')."
          onFocus={handleRedirect}
        />
        <button
          className='bg-primary rounded-md py-2 px-2 md:py-3 md:px-7 font-semibold rounded-l-none'
          onClick={handleRedirect} 
        >
          Generate
        </button>
      </div>

      <div className="flex justify-center opacity-80">
        <Image 
          src='/hero.webp' 
          width={900} 
          height={900} 
          alt="Hero Image" 
          className="rounded-md"
        />
      </div>
    </div>
  );
}
