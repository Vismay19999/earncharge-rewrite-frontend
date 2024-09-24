import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/auth";
import { FaWallet } from "react-icons/fa6";

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
          throw new Error("No token found");
        }

        const response = await axios.get(
          "https://api.earncharge.in/v1/user/wallet/withdraw/history/cashback",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        setCashbackHistory(response.data.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCashbackHistory();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-2">
      {cashbackHistory.length === 0 ? (
        <p>No cashback transactions found</p>
      ) : (
        <>
          {cashbackHistory.map((transaction) => (
            <div
              key={transaction.id}
              className="border-b-white flex flex-wrap flex-row gap-2 items-center justify-between"
            >
              <div className="flex p-2">
                <div className="bg-gray-100 p-2 rounded-full">
                  <FaWallet />
                </div>
              </div>
              <div className="flex-[1] p-2">{transaction.amount} {transaction.walletType}</div>
              <div className="flex p-2">{transaction.status ? <><p>Completed</p></> : 'Pending'}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default GetCashbackTC;
