import Link from 'next/link';
import React from 'react';

const Failure = () => {
    return (
        <div className=" absolute flex flex-col items-center justify-center w-full h-full  bg-red-100">
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16 text-red-500 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">Failure</h1>
                <p className="text-gray-600 mb-4">Oops! Something went wrong with your registration.</p>
                <Link
                    href="/"
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                    Try Again
                </Link>
            </div>
        </div>
    );
};

export default Failure;
