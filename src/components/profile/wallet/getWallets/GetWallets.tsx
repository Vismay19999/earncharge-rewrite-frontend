"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/auth";
import { FaWallet } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import Modal from "../Modal";
import IMPSPage from "../../IMPSMODAL";
import { toast } from "react-toastify";
import WalletSuccessPopup from "./WalletSuccessPopup";
import WalletFailurePopup from "./WalletFailurePopup";
import HelpPopup from "./HelpPopup";
import WithdrawRefQR from "../../profileTabs/WithdrawRefQR";
import WithdrawCashQR from "../../profileTabs/WithdrawCashQr";

interface Wallets {
  referralWallet: { amount: number };
  cashbackWallet: { amount: number };
  paymentWallet: { amount: number };
}

const GetWallets: React.FC = () => {
  const [wallets, setWallets] = useState<Wallets | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<
    "cashback" | "referral" | "payment"
  >("cashback");
  const [isHelpPopupOpen, setIsHelpPopupOpen] = useState<boolean>(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState<boolean>(false);
  const [isFailurePopupOpen, setIsFailurePopupOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    fetchWallets();
  }, []);

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
      toast.error("Failed to fetch wallets. Please try again.");
    }
  };

  const handleWithdraw = async (amount: string) => {
    try {
      const accessToken = getAccessToken();
      const url =
        modalType === "cashback"
          ? "https://api.earncharge.in/v1/user/wallet/withdraw/cashback"
          : modalType === "referral"
          ? "https://api.earncharge.in/v1/user/wallet/withdraw/referral"
          : "https://api.earncharge.in/v1/user/wallet/withdraw/payment";
      const response = await axios.post(
        url,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      setSuccessMessage(response.data?.message || `Your ${modalType} withdrawal was successful.`);
      await fetchWallets();
      setIsSuccessPopupOpen(true);
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || "An unexpected error occurred. Please try again.");
      setIsFailurePopupOpen(true);
    }
  };

  if (!wallets) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full border-l-[8px] border-[#0AA87E] mt-4">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex-[2] mb-4">
        <h2 className="text-lg font-semibold">Wallets</h2>
        <p className="text-xs">Kindly Refresh The Account If Cashbacks are Not Visible</p>
        </div>
        <button
          className="text-sm font-regular mb-4 flex-[1] text-right"
          onClick={() => setIsHelpPopupOpen(true)}
        >
          Help?
        </button>
      </div>

      {/* Referral Wallet */}
      <div className="flex flex-row justify-between py-2">
        <div className="flex-[1]">
          <div className="flex flex-wrap flex-row gap-4 justify-start items-center">
            <div className="flex">
              <div className="bg-gray-100 p-2 rounded-full">
                <FaWallet />
              </div>
            </div>
            <div className="flex-[1] font-semibold text-xs">Referral Wallet</div>
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
                <div>
            <WithdrawRefQR />

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
            <div className="flex-[1] font-semibold text-xs">Cashback Wallet</div>
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
            <div className="flex">
            </div>
          </div>
        </div>
      </div>
      <div>
      <WithdrawCashQR />

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
            <div className="flex-[1] font-semibold text-xs">My Wallet</div>
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

      <WalletSuccessPopup
        isOpen={isSuccessPopupOpen}
        onClose={() => setIsSuccessPopupOpen(false)}
        walletType={modalType}
        successMessage={successMessage}
      />

      <WalletFailurePopup
        isOpen={isFailurePopupOpen}
        onClose={() => setIsFailurePopupOpen(false)}
        walletType={modalType}
        errorMessage={errorMessage}
      />

      <HelpPopup
        isOpen={isHelpPopupOpen}
        onClose={() => setIsHelpPopupOpen(false)}
      />
    </div>
  );
};

export default GetWallets;
