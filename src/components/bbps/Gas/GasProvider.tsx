import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '@/utils/auth';

interface GasProviderData {
    provider_id: number;
    provider_name: string;
    service_id: number;
    service_name: string;
    help_line: string | null;
    provider_icon: string;
}

const GasProvider = () => {
    const [gasProviders, setGasProviders] = useState<GasProviderData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGasProviders = async () => {
            setLoading(true);
            setError(null);

            const accessToken = getAccessToken();
            try {
                const response = await axios.get(
                    'https://api.earncharge.in/v1/bbps/gas-providers',
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                setGasProviders(response.data);
            } catch (error: any) {
                setError('Error fetching gas providers: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGasProviders();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Gas Providers</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <ul>
                    {gasProviders.length > 0 ? (
                        gasProviders.map((provider) => (
                            <li key={provider.provider_id} className="p-2 border-b flex items-center">
                                <img
                                    src={provider.provider_icon}
                                    alt={provider.provider_name}
                                    className="w-8 h-8 mr-4"
                                />
                                <span>{provider.provider_name}</span>
                            </li>
                        ))
                    ) : (
                        <p>No gas providers found.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default GasProvider;
