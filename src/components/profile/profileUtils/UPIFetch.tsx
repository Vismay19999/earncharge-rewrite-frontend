"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAccessToken } from '@/utils/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UPIFetch = () => {
    const [upiData, setUpiData] = useState({ upiId: '' });
    const [loading, setLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    const fetchUPIData = async () => {
        if (!isMounted) return;

        setLoading(true);
        const token = getAccessToken();

        try {
            const response = await axios.get('https://api.earncharge.in/v1/user/get-upi', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (isMounted) {
                setUpiData(response.data.data);
                toast.success('UPI data fetched successfully!');
                setTimeout(() => {
                    if (isMounted) window.location.reload();
                }, 2000);
            }
        } catch (error) {
            if (isMounted) {
                console.error('Failed to fetch UPI data:', error);
                toast.error('Failed to fetch UPI data. Please try again.');
            }
        } finally {
            if (isMounted) setLoading(false);
        }
    };

    if (!isMounted) {
        return null; // or a loading placeholder
    }

    return (
        <div>
            <button 
                onClick={fetchUPIData} 
                className="text-sm mt-2 font-semibold bg-black px-4 py-2 rounded-lg text-white"
                disabled={loading}
            >
                {loading ? 'Fetching...' : 'Fetch UPI Data'}
            </button>
            {upiData.upiId && (
                <div className="mt-2">
                    <h2 className="text-sm font-semibold">{upiData.upiId}</h2>
                </div>
            )}
        </div>
    );
};

export default UPIFetch;
