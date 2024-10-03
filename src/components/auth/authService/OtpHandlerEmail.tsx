"use client";
import React, { useEffect, useState } from 'react';
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
    const [timer, setTimer] = useState<number>(30); // Timer for 30 seconds
    const [canResend, setCanResend] = useState<boolean>(false); // Controls resend button state

    // Function to send OTP
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
            setCanResend(false); // Disable resend button
            setTimer(30); // Reset the timer to 30 seconds
        } catch (error) {
            console.error(error);
            toast.error('Failed to send OTP. Please try again.');
        }
    };

    // Function to verify OTP
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

    // Handle timer countdown
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            setCanResend(true); // Enable resend button once timer reaches 0
        }

        return () => clearInterval(interval); // Clear interval on unmount
    }, [timer]);

    // Send OTP when the component mounts
    useEffect(() => {
        sendOtp();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
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
                        className="w-full px-4 py-2 mb-2 text-white bg-green-500 rounded hover:bg-green-600"
                        onClick={verifyOtp}
                    >
                        Verify OTP
                    </button>
                    <button
                        className={`w-full px-4 py-2 mb-2 text-white bg-blue-500 rounded ${!canResend ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                        onClick={sendOtp}
                        disabled={!canResend}
                    >
                        Resend OTP {canResend ? '' : `(${timer}s)`}
                    </button>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default OtpHandlerEmail;
