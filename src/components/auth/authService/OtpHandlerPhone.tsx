import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setTokens } from '@/utils/auth';
import { useUser } from '@/actions/UserContext/UserContext';
import { FiSend, FiCheck, FiLock } from 'react-icons/fi';

interface OtpHandlerPhoneProps {
    phoneNumber: string;
    onSuccess: () => void;
    onFailure: () => void;
}

const OtpHandlerPhone: React.FC<OtpHandlerPhoneProps> = ({ phoneNumber, onSuccess, onFailure }) => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
    const [otpSent, setOtpSent] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(30);
    const { setUser } = useUser();
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const sendOtp = useCallback(async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/phone/send-otp`, {
                phoneNumber,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setOtpSent(true);
            setTimer(30);
            toast.success('OTP sent successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to send OTP. Please try again.');
        }
    }, [phoneNumber]);

    const verifyOtp = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/phone/verify-otp`, {
                phoneNumber,
                otp: otp.join(''),
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

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false;
        
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        
        if (element.nextSibling && element.value !== '') {
            (element.nextSibling as HTMLInputElement).focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    useEffect(() => {
        sendOtp();
    }, [sendOtp]);

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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center p-8 rounded-lg shadow-xl"
        >
            <AnimatePresence>
                {otpSent ? (
                    <motion.div
                        key="otp-input"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold text-center text-gray-800">Enter OTP</h2>
                        <p className="text-sm text-center text-gray-600">
                            We have sent a 6-digit code to {phoneNumber}
                        </p>
                        <div className="flex justify-center space-x-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { inputRefs.current[index] = el; }}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-12 h-12 text-center text-xl font-semibold text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            ))}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center w-full px-6 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                            onClick={() => verifyOtp()}
                        >
                            <FiCheck className="mr-2" />
                            Verify OTP
                        </motion.button>
                        <p className="text-sm text-center text-gray-500">
                            Resend OTP in {timer} seconds
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center justify-center w-full px-6 py-3 text-white bg-blue-500 rounded-lg ${
                                timer > 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                            } transition-colors`}
                            onClick={sendOtp}
                            disabled={timer > 0}
                        >
                            <FiSend className="mr-2" />
                            Resend OTP
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="sending-otp"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center space-y-4"
                    >
                        <FiLock className="text-6xl text-blue-500" />
                        <h2 className="text-2xl font-bold text-center text-gray-800">Sending OTP</h2>
                        <p className="text-sm text-center text-gray-600">
                            Please wait while we send the OTP to {phoneNumber}
                        </p>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-12 h-12 border-t-4 border-blue-500 rounded-full animate-spin"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <ToastContainer position="bottom-center" autoClose={3000} />
        </motion.div>
    );
};

export default OtpHandlerPhone;
