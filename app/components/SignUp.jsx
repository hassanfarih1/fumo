import Image from 'next/image';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function SignUp({ onClose }) {
  const [isLogin, setIsLogin] = useState(false); 

  return (
    <div className="fixed inset-0 flex items-center justify-center text-primary bg-gray-800 bg-opacity-50 z-50">
      <div className="relative flex bg-white rounded-lg shadow-lg overflow-hidden w-[90%] md:w-[900px] h-[90%] md:h-[600px]">
   
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10"
        >
          <FaTimes />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <Image
            src={isLogin ? "/pic2.jpeg" : "/pic3.jpeg"} 
            width={450}
            height={600}
            alt={isLogin ? "Login" : "Sign Up"}
            className="object-cover w-full h-full md:h-full md:w-full"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
            {isLogin ? "Welcome Back!" : "Wassup!"}
          </h2>
          <p className="text-base md:text-lg text-center text-gray-600 mb-4 md:mb-6">
            {isLogin
              ? "Login to Fumo and continue your journey!"
              : "Welcome to Fumo, we are happy to see you!"}
          </p>
          <form className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
            />
            <button
              type="submit"
              className="w-full py-2 bg-primary text-white rounded-md hover:bg-opacity-90 text-sm md:text-base"
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </form>
          <p className="text-center mt-4 text-gray-600 text-sm md:text-base">
            {isLogin ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-primary font-semibold"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-primary font-semibold"
                >
                  Log in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
