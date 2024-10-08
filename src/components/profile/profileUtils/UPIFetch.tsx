import React, { useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '@/utils/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UPIFetch = () => {
    const [upiData, setUpiData] = useState({ upiId: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUPIData = async () => {
        setLoading(true);
        setError(null);
        const token = getAccessToken();

        try {
            const response = await axios.get('https://api.earncharge.in/v1/user/get-upi', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUpiData(response.data.data);
            toast.success('UPI data fetched successfully!');
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        } catch (error: any) {
            setError(error.message);
            toast.error('Failed to fetch UPI data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={fetchUPIData} className="text-sm font-semibold bg-black px-4 py-2 rounded-lg text-white">
                Fetch UPI Data
            </button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {upiData && (
                <div>
                    <h2>UPI : {upiData.upiId}</h2>
                    {/* Display the fetched UPI data here */}
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default UPIFetch;
