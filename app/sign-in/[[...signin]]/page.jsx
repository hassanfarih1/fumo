import { SignIn } from '@clerk/nextjs';
import React from 'react';

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn
        signUpUrl="/sign-up" 
        redirectUrl="/image-generator" 
      />
    </div>
  );
}
