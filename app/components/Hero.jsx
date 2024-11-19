'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'auto'; 
    }
    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, [loading]);

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleGenerateClick = async () => {
    if (!prompt) return;

    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const formData = new FormData();
      formData.append('prompt', prompt);
      formData.append('output_format', 'webp');
      formData.append('aspect_ratio', '16:9');

      const response = await fetch(
        `https://api.stability.ai/v2beta/stable-image/generate/ultra`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer sk-V7poHePcVQXlUyCoZV5PpHCpyGj29mjX7cxh7cN4CoaX8bRx`,
            'Accept': 'image/*',
          },
          body: formData, 
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const buffer = await response.arrayBuffer();
      const blob = new Blob([buffer], { type: 'image/webp' });
      const url = URL.createObjectURL(blob);
      setImageUrl(url); 
    } catch (error) {
      setError('Failed to generate image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center text-center mt-16 space-y-5 relative z-10">
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
          value={prompt}
          onChange={handleInputChange}
        />
        <button
          className='bg-primary rounded-md py-2 px-2 md:py-3 md:px-7 font-semibold rounded-l-none'
          onClick={handleGenerateClick}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      
      {loading && (
        <div className="absolute inset-0 -top-64 z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="absolute inset-0 flex justify-center items-center text-white">
            <div className="border-t-4 border-white w-16 h-16 rounded-full animate-spin mb-4"></div>
            <p className="text-xl">Generating...</p>
          </div>
        </div>
      )}

      {imageUrl ? (
        <div className="mt-4 flex justify-center">
          <div className="mt-2">
            <Image 
              src={imageUrl} 
              alt="Generated Image" 
              width={650}  
              height={365} 
              className="rounded-md"
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center opacity-80">
          <Image 
            src='/hero.webp' 
            width={900} 
            height={900} 
            alt="Hero Image" 
            className="rounded-md"
          />
        </div>
      )}
    </div>
  );
}
