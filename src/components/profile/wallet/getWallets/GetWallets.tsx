"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/auth";
import { FaWallet } from "react-icons/fa";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WalletData {
  total_amount: number;
}

const GetWallets: React.FC = () => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState<boolean>(false);
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const accessToken = getAccessToken();
      const response = await axios.get<{ message: string; walletData: WalletData }>(
        "https://api.earncharge.in/v1/user/wallet",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      setWalletData(response.data.walletData);
    } catch (err: any) {
      toast.error("Failed to fetch wallet. Please try again.");
    }
  };

  const handleWithdraw = async () => {
    setError(null);
    setSuccess(null);
    
    if (!withdrawAmount || parseFloat(withdrawAmount) < 10) {
      setError("Minimum withdrawal amount is ₹10");
      return;
    }

    if (walletData && parseFloat(withdrawAmount) > walletData.total_amount) {
      setError("Insufficient balance in your wallet");
      return;
    }

    try {
      setIsLoading(true);
      const accessToken = getAccessToken();
      const response = await axios.post(
        "https://api.earncharge.in/v1/user/wallet/withdraw",
        { amount: withdrawAmount },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      setSuccess(response.data?.message || "Withdrawal request successful");
      await fetchWallet();
      setTimeout(() => {
        setIsWithdrawOpen(false);
        setWithdrawAmount("");
        setSuccess(null);
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!walletData) {
    return (
      <div className="bg-white shadow-md rounded-xl p-6 w-full border-l-[8px] border-[#0AA87E] mt-4">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-1/5 animate-pulse"></div>
        </div>
        <div className="bg-white rounded-xl p-6 border-2 border-[#0AA87E] shadow-lg animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
            <div className="w-24 h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full border-l-[8px] border-[#0AA87E] mt-4">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h2 className="text-xl font-bold">My Wallet</h2>
      </div>

      <div className="bg-white rounded-xl p-6 text-gray-900 mb-6 border-2 border-[#0AA87E] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#0AA87E]/10 rounded-full -mr-20 -mt-20 z-0"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#0AA87E]/10 rounded-full -ml-10 -mb-10 z-0"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-[#0AA87E] p-3 rounded-full">
              <FaWallet size={24} className="text-white" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Available Balance</p>
              <h3 className="text-2xl font-bold text-gray-900">₹ {walletData.total_amount}</h3>
            </div>
          </div>
          <Button 
            onClick={() => setIsWithdrawOpen(true)}
            className="bg-[#0AA87E] hover:bg-[#0AA87E]/80 text-white font-medium"
          >
            Withdraw
          </Button>
        </div>
      </div>

      {/* Withdraw Modal */}
      <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white text-gray-900 border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-gray-900">Withdraw Funds</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="bg-[#0AA87E] p-4 rounded-full">
                <FaWallet size={24} className="text-white" />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Available Balance</p>
                <p className="text-xl font-bold">₹ {walletData.total_amount}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium text-gray-700">
                Withdrawal Amount (Min ₹10)
              </label>
              <Input
                id="amount"
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Enter amount"
                min={10}
                max={walletData.total_amount}
                className="bg-white border-gray-300 text-gray-900"
              />
              {error && <p className="text-red-500 text-xs">{error}</p>}
              {success && <p className="text-green-500 text-xs">{success}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWithdrawOpen(false)} className="bg-white text-gray-700 border-gray-300 hover:bg-gray-100">
              Cancel
            </Button>
            <Button 
              onClick={handleWithdraw} 
              disabled={isLoading || !withdrawAmount || parseFloat(withdrawAmount) < 10 || parseFloat(withdrawAmount) > walletData.total_amount}
              className="bg-[#0AA87E] hover:bg-[#0AA87E]/90 text-white"
            >
              {isLoading ? "Processing..." : "Withdraw"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GetWallets;
