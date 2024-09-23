import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '@/utils/auth';

interface CashbackHistory {
  id: string;
  amount: number;
  status: boolean;
  userDataId: string;
  walletType: string;
}

const GetCashbackTC = () => {
  const [cashbackHistory, setCashbackHistory] = useState<CashbackHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCashbackHistory = async () => {
      try {
        const accessToken = getAccessToken();

        if (!accessToken) {
          throw new Error('No token found');
        }

        const response = await axios.get('https://api.earncharge.in/v1/user/wallet/withdraw/history/cashback', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setCashbackHistory(response.data.data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchCashbackHistory();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Cashback Transaction History</h1>
      {cashbackHistory.length === 0 ? (
        <p>No cashback transactions found</p>
      ) : (
        <ul>
          {cashbackHistory.map((transaction) => (
            <li key={transaction.id}>
              <p>Amount: {transaction.amount}</p>
              <p>Status: {transaction.status ? 'Completed' : 'Pending'}</p>
              <p>Wallet Type: {transaction.walletType}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetCashbackTC;
