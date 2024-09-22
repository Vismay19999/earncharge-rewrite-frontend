import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/auth";
import Image from "next/image";

interface GasProviderData {
  provider_id: string; // Changed to string
  provider_name: string;
  service_id: number;
  service_name: string;
  help_line: string | null;
  provider_icon: string;
}

interface GasProviderProps {
  onProviderSelect: (id: string) => void; // Changed to string
}

const GasProvider: React.FC<GasProviderProps> = ({ onProviderSelect }) => {
  const [gasProviders, setGasProviders] = useState<GasProviderData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  useEffect(() => {
    const fetchGasProviders = async () => {
      setLoading(true);
      setError(null);

      const accessToken = getAccessToken();
      try {
        const response = await axios.get(
          "https://api.earncharge.in/v1/bbps/gas-providers",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        setGasProviders(response.data);
      } catch (error: any) {
        setError("Error fetching gas providers: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGasProviders();
  }, []);

  // Filter gas providers based on the search query
  const filteredGasProviders = gasProviders.filter((provider) =>
    provider.provider_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Gas Providers</h2>

      {/* Search bar */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search providers..."
        className="mb-4 p-2 border rounded"
      />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul>
          {filteredGasProviders.length > 0 ? (
            filteredGasProviders.map((provider) => (
              <li
                key={provider.provider_id}
                className="p-2 border-b flex items-center cursor-pointer"
                onClick={() => onProviderSelect(provider.provider_id)} // Pass provider ID as a string
              >
                <Image
                  width={40}
                  height={40}
                  src={provider.provider_icon}
                  alt={provider.provider_name}
                  className="w-8 h-8 mr-4"
                />
                <span>{provider.provider_name}</span>
              </li>
            ))
          ) : (
            <p></p>
          )}
        </ul>
      )}
    </div>
  );
};

export default GasProvider;
