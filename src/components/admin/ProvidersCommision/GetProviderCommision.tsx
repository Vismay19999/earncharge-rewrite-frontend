import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '@/utils/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Commission {
  provider: string;
  percentage: string;
}

const GetProviderCommission: React.FC = () => {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCommissions = async () => {
      setLoading(true);
      const token = getAccessToken();

      try {
        const response = await axios.get<Commission[]>('https://api.earncharge.in/v1/admin/provider-commisions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCommissions(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchCommissions();
  }, []);

  return (
    <div>
      <h1>Provider Commissions</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {commissions.map((commission, index) => (
            <li key={index}>{`${commission.provider}: ${commission.percentage}%`}</li>
          ))}
        </ul>
      )}
      <ToastContainer />
    </div>
  );
};

export default GetProviderCommission;
