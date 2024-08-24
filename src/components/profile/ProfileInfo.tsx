import React from 'react'

interface User {
    firstName: string;
    lastName: string;
    role: string;
    referenceID: string;
    email_verification_status: boolean;
    phone_verification_status: boolean;
}

const ProfileInfo = ({ user }: { user: User }) => {
    return (
        <div>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
                <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
                    <h1 className="text-2xl font-bold text-gray-800">Welcome, {user.firstName} {user.lastName}!</h1>
                    <p className="mt-2 text-gray-600">Role: <span className="font-medium">{user.role}</span></p>
                    <p className="mt-2 text-gray-600">Reference ID: <span className="font-medium">{user.referenceID}</span></p>
                    <p className="mt-2 text-gray-600">Email Verification Status: <span className={user.email_verification_status ? 'text-green-500' : 'text-red-500'}>{user.email_verification_status ? 'Verified' : 'Not Verified'}</span></p>
                    <p className="mt-2 text-gray-600">Phone Verification Status: <span className={user.phone_verification_status ? 'text-green-500' : 'text-red-500'}>{user.phone_verification_status ? 'Verified' : 'Not Verified'}</span></p>
                </div>
            </div >
        </div>
    )
}

export default ProfileInfo