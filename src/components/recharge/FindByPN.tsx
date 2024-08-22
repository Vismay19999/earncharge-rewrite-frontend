import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FindByPN = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [operatorInfo, setOperatorInfo] = useState(null);

    const handleFindOperator = async () => {
        try {
            const response = await axios.post(
                'https://api.earncharge.in/v1/recharge/find-operator',
                {
                    phoneNumber: phoneNumber,
                },
                {
                    headers: {
                        Authorization: `Bearer YOUR_ACCESS_TOKEN`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setOperatorInfo(response.data);
            toast.success('Operator found successfully!');
        } catch (error: any) {
            toast.error('Error finding operator: ' + error.message);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Find Operator by Phone Number</h2>
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                className="border p-2 rounded w-full mb-4"
            />
            <button onClick={handleFindOperator} className="p-2 bg-blue-500 text-white rounded">
                Find Operator and Circle
            </button>

            {operatorInfo && (
                <div className="mt-4">
                    <h3 className="text-md font-bold">Operator Information:</h3>
                    <pre>{JSON.stringify(operatorInfo, null, 2)}</pre>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default FindByPN;
