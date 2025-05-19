"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/auth";
import { format } from "date-fns";
import { FiDownload, FiCreditCard } from "react-icons/fi";

interface Transaction {
  id: string;
  wallet_type: string;
  amount: number;
  transaction_type: string;
  walletId: string;
  createdAt: string;
}

const IndexTransactions = () => {
  const [activeTab, setActiveTab] = useState<"withdraw" | "payment">("withdraw");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab === "withdraw") {
      fetchTransactions();
    }
  }, [activeTab]);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const accessToken = getAccessToken();
      const response = await axios.get<{ message: string; data: { transactions: Transaction[] } }>(
        "https://api.earncharge.in/v1/user/wallet/transactions",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      setTransactions(response.data.data.transactions);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch transactions");
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy, hh:mm a");
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full border-l-[8px] border-[#0AA87E] mt-4">
      <h2 className="text-xl font-bold mb-6">Transaction History</h2>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm focus:outline-none flex items-center gap-2 ${
            activeTab === "withdraw"
              ? "border-b-2 border-[#0AA87E] text-[#0AA87E]"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("withdraw")}
        >
          <FiDownload /> Withdraw Transactions
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm focus:outline-none flex items-center gap-2 ${
            activeTab === "payment"
              ? "border-b-2 border-[#0AA87E] text-[#0AA87E]"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("payment")}
        >
          <FiCreditCard /> Payment Transactions
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "withdraw" && (
        <>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse flex p-4 border rounded-lg">
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  </div>
                  <div className="w-24">
                    <div className="h-5 bg-slate-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-6 text-red-500">{error}</div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <FiDownload className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No Transactions</h3>
              <p className="text-gray-500 mt-1">You haven't made any withdrawals yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <h3 className="font-medium">
                      {transaction.transaction_type === "debit" ? "Withdrawal" : "Deposit"} 
                      {transaction.wallet_type && ` - ${transaction.wallet_type.charAt(0).toUpperCase() + transaction.wallet_type.slice(1)}`}
                    </h3>
                    <p className="text-sm text-gray-500">{formatDate(transaction.createdAt)}</p>
                  </div>
                  <div className={`font-medium ${transaction.transaction_type === "debit" ? "text-red-500" : "text-green-500"}`}>
                    {transaction.transaction_type === "debit" ? "-" : "+"} ₹{transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === "payment" && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <FiCreditCard className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Coming Soon</h3>
          <p className="text-gray-500 mt-1">Payment transactions will be available soon.</p>
        </div>
      )}
    </div>
  );
};

export default IndexTransactions;
