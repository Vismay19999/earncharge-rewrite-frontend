'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const LoginForm: React.FC = () => {
    const [loginMethod, setLoginMethod] = useState<'phoneNumber' | 'email' | null>(null);
    const [formData, setFormData] = useState({
        phoneNumber: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleLogin = async () => {
        if (!loginMethod) {
            toast.error('Please select a login method.');
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`, {
                [loginMethod]: formData[loginMethod],
                password: formData.password
            }, {
                headers: {
                    'Authorization': 'Bearer YOUR_TOKEN',
                    'Content-Type': 'application/json'
                }
            });

            // Handle successful login
            console.log(response.data);
            toast.success('Login successful!');
        } catch (error) {
            // Handle login error
            console.error(error);
            toast.error('Login failed. Please try again.');
        }
    };

    const handleMethodSelect = (selectedMethod: 'phoneNumber' | 'email') => {
        setLoginMethod(selectedMethod);
    };

    return (
        <div className="flex bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                {/* Method Selection */}
                <div className="flex justify-between mb-6">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMethodSelect('phoneNumber')}
                        className={`w-1/2 text-center py-4 border rounded-lg mr-2 cursor-pointer transition-colors duration-200 ${loginMethod === 'phoneNumber' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                            }`}
                    >
                        Phone Number
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMethodSelect('email')}
                        className={`w-1/2 text-center py-4 border rounded-lg ml-2 cursor-pointer transition-colors duration-200 ${loginMethod === 'email' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                            }`}
                    >
                        Email
                    </motion.div>
                </div>

                {/* Login Form */}
                <form onSubmit={e => e.preventDefault()}>
                    {loginMethod === 'phoneNumber' && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="phoneNumber">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your phone number"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                    )}

                    {loginMethod === 'email' && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <p>register a account?<Link className='text-blue-600' href={"/register"}>register now</Link></p>
                        <p>use <Link className='text-blue-600' href={"/otpless/sendlink"}>otpless</Link></p>
                    </div>
                    <button
                        type="button"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                        onClick={handleLogin}
                        disabled={!loginMethod}  // Disable button until a method is selected
                    >
                        Login
                    </button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default LoginForm;
