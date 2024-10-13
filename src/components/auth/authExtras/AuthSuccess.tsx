import Link from 'next/link';
import React from 'react';

const Success = () => {
  return (
    <div className=" absolute flex flex-col items-center justify-center w-full h-full bg-green-100">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 text-green-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Success!</h1>
        <p className="text-gray-600 mb-4">Welcome to the Earn Charge Smart Community!</p>
        <Link
          href="/"
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Success;
