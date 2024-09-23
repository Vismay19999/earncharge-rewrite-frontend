import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/auth";

interface ReferralHistory {
  id: string;
  amount: number;
  status: boolean;
  userDataId: string;
  walletType: string;
}

const GetRefferalTC = () => {
  const [referralHistory, setReferralHistory] = useState<ReferralHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReferralHistory = async () => {
      try {
        const accessToken = getAccessToken();

        if (!accessToken) {
          throw new Error("No token found");
        }

        const response = await axios.get(
          "https://api.earncharge.in/v1/user/wallet/withdraw/history/referral",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        setReferralHistory(response.data.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchReferralHistory();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Referral Transaction History</h1>
      {referralHistory.length === 0 ? (
        <p>No referral transactions found</p>
      ) : (
        <ul>
          {referralHistory.map((transaction) => (
            <li key={transaction.id}>
              <p>Amount: {transaction.amount}</p>
              <p>Status: {transaction.status ? "Completed" : "Pending"}</p>
              <p>Wallet Type: {transaction.walletType}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetRefferalTC;
