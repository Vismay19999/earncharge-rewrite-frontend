"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAccessToken } from '@/utils/auth';
import Image from 'next/image';

interface FastTagProviderData {
    provider_id: string; // Changed from number to string
    provider_name: string;
    provider_icon: string;
}

interface FastTagProviderProps {
    onProviderSelect: (id: string) => void; // Changed to string
}

const FastTagProvider: React.FC<FastTagProviderProps> = ({ onProviderSelect }) => {
    const [providers, setProviders] = useState<FastTagProviderData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); // State for search input

    const fetchProviders = async () => {
        setLoading(true);
        setError('');
        const accessToken = getAccessToken();

        try {
            const response = await axios.get('https://api.earncharge.in/v1/bbps/fastag-providers', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            setProviders(response.data);
        } catch (error) {
            setError('Failed to fetch providers');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProviders();
    }, []);

    // Filter the providers based on the search query
    const filteredProviders = providers.filter((provider) =>
        provider.provider_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4">
            <ToastContainer />
            <h2 className="text-lg font-semibold mb-4">FastTag Providers</h2>

            {/* Search bar */}
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search providers..."
            />

            {loading && <p>Loading providers...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Display the filtered list of providers */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProviders.length > 0 ? (
                    filteredProviders.map((provider) => (
                        <li
                            key={provider.provider_id}
                            className="flex items-center p-4 bg-white rounded-lg shadow cursor-pointer"
                            onClick={() => onProviderSelect(provider.provider_id)} // Pass selected provider ID as a string
                        >
                            <Image
                                width={48}
                                height={48}
                                src={provider.provider_icon}
                                alt={provider.provider_name}
                                className="w-12 h-12 mr-4"
                            />
                            <span>{provider.provider_name}</span>
                        </li>
                    ))
                ) : (
                    <p>No providers found</p>
                )}
            </ul>
        </div>
    );
};

export default FastTagProvider;
