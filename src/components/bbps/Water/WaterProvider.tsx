import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '@/utils/auth';


interface WaterProviderData {
    provider_id: number;
    provider_name: string;
    service_id: number;
    service_name: string;
    help_line: string | null;
    provider_icon: string;
}

const WaterProvider = () => {
    const [waterProviders, setWaterProviders] = useState<WaterProviderData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWaterProviders = async () => {
            setLoading(true);
            setError(null);

            const accessToken = getAccessToken();
            try {
                const response = await axios.get(
                    'https://api.earncharge.in/v1/bbps/water-providers',
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                setWaterProviders(response.data);
            } catch (error: any) {
                setError('Error fetching water providers: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWaterProviders();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Water Providers</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <ul>
                    {waterProviders.length > 0 ? (
                        waterProviders.map((provider) => (
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
                        <p>No water providers found.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default WaterProvider;
