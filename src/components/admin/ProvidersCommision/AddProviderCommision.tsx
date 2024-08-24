"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '@/utils/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProviderCommision = () => {
    const [provider, setProvider] = useState('');
    const [percentage, setPercentage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const token = getAccessToken();

        try {
            const response = await axios.post(
                'https://api.earncharge.in/v1/admin/add-provider',
                {
                    provider,
                    percentage,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            toast.success('Provider commission added successfully!');
            // Clear form fields
            setProvider('');
            setPercentage('');

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast.error('Failed to add provider commission');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Add Provider Commission</h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label className="mb-2">
                    Provider:
                    <input
                        type="text"
                        value={provider}
                        onChange={(e) => setProvider(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />
                </label>
                <label className="mb-2">
                    Percentage:
                    <input
                        type="text"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />
                </label>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Add Provider'}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddProviderCommision;
