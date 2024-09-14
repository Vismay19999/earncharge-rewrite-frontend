"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/auth";
import Modal from "../Modal";

interface Wallets {
  referralWallet: { amount: number };
  cashbackWallet: { amount: number };
}

const GetWallets: React.FC = () => {
  const [wallets, setWallets] = useState<Wallets | null>(null);
  const [error, setError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"cashback" | "referral">(
    "cashback"
  );

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const accessToken = getAccessToken();
        const response = await axios.get<Wallets>(
          "https://api.earncharge.in/v1/user/wallets",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        setWallets(response.data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchWallets();
  }, []);

  const handleWithdraw = async (amount: string) => {
    try {
      const accessToken = getAccessToken();
      const url =
        modalType === "cashback"
          ? "https://api.earncharge.in/v1/user/wallet/withdraw/cashback"
          : "https://api.earncharge.in/v1/user/wallet/withdraw/referral";
      await axios.post(
        url,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      // Refresh wallets after withdrawal
      const response = await axios.get<Wallets>(
        "https://api.earncharge.in/v1/user/wallets",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      setWallets(response.data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!wallets) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Wallets</h2>
      <div>
        <h3>Referral Wallet</h3>
        <p>Amount: {wallets.referralWallet.amount}</p>
        <button
          onClick={() => {
            setModalType("referral");
            setIsModalOpen(true);
          }}
          className="bg-blue-400 p-2"
        >
          Withdraw Referral
        </button>
      </div>
      <div>
        <h3>Cashback Wallet</h3>
        <p>Amount: {wallets.cashbackWallet.amount}</p>
        <button
          onClick={() => {
            setModalType("cashback");
            setIsModalOpen(true);
          }}
          className="bg-blue-400 p-2"
        >
          Withdraw Cashback
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleWithdraw}
        balance={
          modalType === "cashback"
            ? wallets.cashbackWallet.amount
            : wallets.referralWallet.amount
        }
        walletType={modalType === "cashback" ? "Cashback" : "Referral"}
      />
    </div>
  );
};

export default GetWallets;
