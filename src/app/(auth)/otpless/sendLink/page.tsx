"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@/actions/UserContext/UserContext';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
    const { user } = useUser();
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState("");

    React.useEffect(() => {
        if (user) {
            router.push("/profile");
        }
    }, [user, router]);


    const handleSendLink = async () => {
        try {
            const response = await axios.post(
                'https://api.earncharge.in/v1/auth/otpless/sendlink',
                {
                    phoneNumber: phoneNumber,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            toast.success('Link sent successfully!');
            window.location.href = response.data.requestIds[0].destinationUri
        } catch (error: any) {
            toast.error('Error sending link: ' + error.message);
        }
    };

    if (user) {
        router.push('/profile');
    }

    return (
        <div className='h-[30vh] flex items-center justify-center'>
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="border p-2 rounded"
            />
            <button onClick={handleSendLink} className="ml-2 p-2 bg-blue-500 text-white rounded">
                Send Link
            </button>
            <ToastContainer />
        </div>
    );
};

export default Page;
