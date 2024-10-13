'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LoginSuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push('/');
    }, 2000);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Login Successful!</h1>
        <p className="text-xl text-gray-700 mb-6">Welcome to EarnCharge</p>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
        <p className="text-sm text-gray-500 mt-4">Redirecting to homepage...</p>
      </div>
    </div>
  );
};

export default LoginSuccessPage;
