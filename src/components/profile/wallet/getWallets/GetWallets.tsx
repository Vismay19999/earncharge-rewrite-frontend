"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/auth";
import { FaWallet } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import Modal from "../Modal";
import IMPSPage from "../../IMPSMODAL";

interface Wallets {
  referralWallet: { amount: number };
  cashbackWallet: { amount: number };
  paymentWallet: { amount: number };
}

const GetWallets: React.FC = () => {
  const [wallets, setWallets] = useState<Wallets | null>(null);
  const [error, setError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<
    "cashback" | "referral" | "payment"
  >("cashback");
  const [isHelpPopupOpen, setIsHelpPopupOpen] = useState<boolean>(false); // Help popup state

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const accessToken = getAccessToken();
        const response = await axios.get<Wallets>(
          "https://api.earncharge.in/v1/user/wallets",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
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
          : modalType === "referral"
          ? "https://api.earncharge.in/v1/user/wallet/withdraw/referral"
          : "https://api.earncharge.in/v1/user/wallet/withdraw/payment";
      await axios.post(
        url,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Refresh wallets after withdrawal
      const response = await axios.get<Wallets>(
        "https://api.earncharge.in/v1/user/wallets",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
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
    <div className="bg-white shadow-md rounded-xl p-6 w-full border-l-[8px] border-[#0AA87E] mt-4">
      <div className="flex flex-wrap justify-between items-center">
        <h2 className="text-lg font-bold mb-4 flex-[1]">Wallets</h2>
        <button
          className="text-sm font-regular mb-4 flex-[1] text-right"
          onClick={() => setIsHelpPopupOpen(true)} // Open help popup
        >
          Help?
        </button>
      </div>

      {/* Help Popup */}
      {isHelpPopupOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[480px] relative">
            <h3 className="font-semibold mb-2">How to Use Your Wallets</h3>
            <p className="text-sm">
              You can manage your Referral, Cashback, and Payment wallets here. To
              withdraw funds, click the button next to each wallet. For any further
              assistance, contact our support.
            </p>
            <button
              className="text-blue-500 underline mt-4"
              onClick={() => setIsHelpPopupOpen(false)} // Close the help popup
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Referral Wallet */}
      <div className="flex flex-row justify-between py-2">
        <div className="flex-[1]">
          <div className="flex flex-wrap flex-row gap-4 justify-start items-center">
            <div className="flex">
              <div className="bg-gray-100 p-2 rounded-full">
                <FaWallet />
              </div>
            </div>
            <div className="flex-[1] font-semibold text-sm">Referral</div>
          </div>
        </div>
        <div className="flex-[1]">
          <div className="flex flex-wrap flex-row gap-5 justify-end items-center">
            <div className="flex">₹ {wallets.referralWallet.amount}</div>
            <div className="flex">
              <button
                onClick={() => {
                  setModalType("referral");
                  setIsModalOpen(true);
                }}
                className="rounded-xl bg-black p-2"
              >
                <FiPlus className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cashback Wallet */}
      <div className="flex flex-row justify-between py-2">
        <div className="flex-[1]">
          <div className="flex flex-wrap flex-row gap-4 justify-start items-center">
            <div className="flex">
              <div className="bg-gray-100 p-2 rounded-full">
                <FaWallet />
              </div>
            </div>
            <div className="flex-[1] font-semibold text-sm">Cashback</div>
          </div>
        </div>
        <div className="flex-[1]">
          <div className="flex flex-wrap flex-row gap-5 justify-end items-center">
            <div className="flex">₹ {wallets.cashbackWallet.amount}</div>
            <div className="flex">
              <button
                onClick={() => {
                  setModalType("cashback");
                  setIsModalOpen(true);
                }}
                className="rounded-xl bg-black p-2"
              >
                <FiPlus className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Wallet */}
      <div className="flex flex-row justify-between py-2">
        <div className="flex-[1]">
          <div className="flex flex-wrap flex-row gap-4 justify-start items-center">
            <div className="flex">
              <div className="bg-gray-100 p-2 rounded-full">
                <FaWallet />
              </div>
            </div>
            <div className="flex-[1] font-semibold text-sm">Payment</div>
          </div>
        </div>
        <div className="flex-[1]">
          <div className="flex flex-wrap flex-row gap-5 justify-end items-center">
            <div className="flex">
              <div className="flex items-center gap-5">
                ₹ {wallets.paymentWallet.amount} <IMPSPage />
              </div>
            </div>
          </div>
        </div>
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
