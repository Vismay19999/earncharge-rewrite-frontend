"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FindOperatorCircleByPH = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [operatorInfo, setOperatorInfo] = useState<{ operator: string; circle: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFindOperator = async () => {
        setLoading(true); // Start the loader
        try {
            const response = await axios.post(
                'https://api.earncharge.in/v1/recharge/find-operator',
                { phoneNumber },
                {
                    headers: {
                        Authorization: `Bearer YOUR_ACCESS_TOKEN`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            const { operator, circle   } = response.data;
            setOperatorInfo({ operator : operator, circle : circle });
            toast.success(`Success fetched data.`);
        } catch (error: any) {
            toast.error('Error finding operator: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='mt-4'>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Find Operator by Phone Number</h2>
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                className="border p-2 rounded w-full mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleFindOperator}
                className={`transition text-sm p-2 w-full rounded text-white ${loading ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'}`}
                disabled={loading}
            >
                {loading ? 'Searching...' : 'Find Operator and Circle'}
            </button>

            {operatorInfo && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                    <h3 className="text-md font-semibold text-gray-700 mb-2">Operator Information:</h3>
                    <p className="text-gray-700"><strong>Operator:</strong> {operatorInfo.operator}</p>
                    <p className="text-gray-700"><strong>Circle:</strong> {operatorInfo.circle}</p>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default FindOperatorCircleByPH;
