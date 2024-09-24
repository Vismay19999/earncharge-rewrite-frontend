import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/auth";

interface PaymentHistory {
  id: string;
  amount: number;
  status: boolean;
  userDataId: string;
  walletType: string;
}

const GetPaymentsTC = () => {
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const accessToken = getAccessToken();

        if (!accessToken) {
          throw new Error("No token found");
        }

        const response = await axios.get(
          "https://api.earncharge.in/v1/recharge/payment/transactions",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        setPaymentHistory(response.data.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Payments Transaction History</h1>
      {paymentHistory && (
        <div>
          {paymentHistory.length === 0 ? (
            <p>No payment transactions found</p>
          ) : (
            <ul>
              {paymentHistory.map((transaction) => (
                <li key={transaction.id}>
                  <p>Amount: {transaction.amount}</p>
                  <p>Status: {transaction.status ? "Completed" : "Pending"}</p>
                  <p>Wallet Type: {transaction.walletType}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default GetPaymentsTC;
