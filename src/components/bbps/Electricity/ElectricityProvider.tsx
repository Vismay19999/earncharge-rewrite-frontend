"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAccessToken } from '@/utils/auth';
import Image from 'next/image';

interface Provider {
  provider_id: number;
  provider_name: string;
  provider_icon: string;
}

interface ElectricityProviderProps {
  onProviderSelect: (id: string) => void; 
}

const ElectricityProvider: React.FC<ElectricityProviderProps> = ({ onProviderSelect }) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProviders = async () => {
    setLoading(true);
    setError('');
    const accessToken = getAccessToken();

    try {
      const response = await axios.get('https://api.earncharge.in/v1/bbps/electricity-providers', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

  // Filter providers based on the search query
  const filteredProviders = providers.filter(provider =>
    provider.provider_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-lg font-semibold mb-4">Electricity Providers</h2>

      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        maxLength={30}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search provider..."
      />

      {loading && <p>Loading providers...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.length > 0 ? (
          filteredProviders.map((provider) => (
            <li
              key={provider.provider_id}
              className="flex items-center p-4 bg-white rounded-lg shadow cursor-pointer"
              onClick={() => onProviderSelect(provider.provider_id.toString())} // Trigger the callback on click
            >
              <Image
                width={40}
                height={40}
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

export default ElectricityProvider;