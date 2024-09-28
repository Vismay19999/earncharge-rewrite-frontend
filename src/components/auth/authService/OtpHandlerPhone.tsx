import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setTokens } from '@/utils/auth';
import { useUser } from '@/actions/UserContext/UserContext';

interface OtpHandlerPhoneProps {
    phoneNumber: string;
    onSuccess: () => void;
    onFailure: () => void;
}

const OtpHandlerPhone: React.FC<OtpHandlerPhoneProps> = ({ phoneNumber, onSuccess, onFailure }) => {
    const [otp, setOtp] = useState<string>('');
    const [otpSent, setOtpSent] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(30);  // Timer set to 30 seconds
    const { setUser } = useUser();

    const sendOtp = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/phone/send-otp`, {
                phoneNumber,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setOtpSent(true);
            setTimer(30); // Reset the timer on OTP send
        } catch (error) {
            console.error(error);
            toast.error('Failed to send OTP. Please try again.');
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/phone/verify-otp`, {
                phoneNumber,
                otp,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const { accessToken, refreshToken, user } = response.data;
            setTokens(accessToken, refreshToken);
            setUser(user);

            toast.success('OTP verified successfully!');
            onSuccess();
        } catch (error) {
            console.error(error);
            toast.error('Invalid OTP. Please try again.');
            onFailure();
        }
    };

    // Send OTP when the component mounts
    useEffect(() => {
        sendOtp();
    }, []);  // Empty dependency array ensures this runs only once when the component mounts

    // Timer countdown effect
    useEffect(() => {
        if (otpSent && timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            return () => clearInterval(countdown);
        }
    }, [otpSent, timer]);

    return (
        <div className="flex flex-col items-center justify-center">
            {otpSent && (
                <>
                    <div className="w-64">
                        <input
                            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            maxLength={8}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button
                            className="w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                            onClick={verifyOtp}
                        >
                            Verify OTP
                        </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        Resend OTP in {timer} seconds
                    </p>
                    <button
                        className={`mt-2 px-4 py-2 text-white bg-blue-500 rounded ${timer > 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                        onClick={sendOtp}
                        disabled={timer > 0}  // Disable resend button until timer runs out
                    >
                        Resend OTP
                    </button>
                </>
            )}
            <ToastContainer />
        </div>
    );
};

export default OtpHandlerPhone;
