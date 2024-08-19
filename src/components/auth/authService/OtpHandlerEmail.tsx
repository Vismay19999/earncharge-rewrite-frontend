"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface OtpHandlerEmailProps {
    email: string;
    onSuccess: () => void;  
    onFailure: () => void;  
}

const OtpHandlerEmail: React.FC<OtpHandlerEmailProps> = ({ email, onSuccess, onFailure }) => {
    const [otp, setOtp] = useState<string>('');
    const [otpSent, setOtpSent] = useState<boolean>(false);

    const sendOtp = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/email/send-otp`, {
                email
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            toast.success('OTP sent successfully!');
            setOtpSent(true);
        } catch (error) {
            console.error(error);
            toast.error('Failed to send OTP. Please try again.');
        }
    };

    const verifyOtp = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/email/verify-otp`, {
                email,
                otp
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            toast.success('OTP verified successfully!');
            onSuccess(); 
        } catch (error) {
            console.error(error);
            toast.error('Invalid OTP. Please try again.');
            onFailure();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <button
                className="px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={sendOtp}
                disabled={otpSent}
            >
                {otpSent ? 'OTP Sent' : 'Send OTP'}
            </button>
            {otpSent && (
                <div className="w-64">
                    <input
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button
                        className="w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                        onClick={verifyOtp}
                    >
                        Verify OTP
                    </button>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default OtpHandlerEmail;
