"use client"
import { useUser } from '@/actions/UserContext/UserContext';
import React from 'react';

const Page = () => {
    const { user } = useUser();

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <h1 className="text-xl font-semibold text-gray-700">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-800">Welcome, {user.firstName} {user.lastName}!</h1>
                <p className="mt-2 text-gray-600">Role: <span className="font-medium">{user.role}</span></p>
                <p className="mt-2 text-gray-600">Reference ID: <span className="font-medium">{user.referenceID}</span></p>
                <p className="mt-2 text-gray-600">Email Verification Status: <span className={user.email_verification_status ? 'text-green-500' : 'text-red-500'}>{user.email_verification_status ? 'Verified' : 'Not Verified'}</span></p>
                <p className="mt-2 text-gray-600">Phone Verification Status: <span className={user.phone_verification_status ? 'text-green-500' : 'text-red-500'}>{user.phone_verification_status ? 'Verified' : 'Not Verified'}</span></p>
            </div>
        </div>
    );
};

export default Page;
