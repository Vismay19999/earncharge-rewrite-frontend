import Image from "next/image";
import React, { useState } from "react";
import Default from "@/../public/default_image.png";
import { FaRegEyeSlash, FaRegEye, FaUser } from "react-icons/fa";
import UpiBase from "./profileTabs/UpiBase";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type Wallet = {
  id: string;
  amount: number;
  userDataId: string;
};

type ReferralData = {
  id: string;
  referralId: string;
  referralCount: number;
  userId: string;
};

type User = {
  id: string;
  phoneNumber: string | null;
  email: string | null;
  password: string;
  createdAt: string;
  userDataId: string;
  referralData: ReferralData; // Add referralData to User type
};

type ProfileUser = {
  id: string;
  phoneNumber: string | null;
  email: string | null;
  password: string;
  createdAt: string;
  userDataId: string;
  firstName: string;
  lastName: string;
  gender: string | null;
  upi: string | null;
  phone_verification_status: boolean;
  email_verification_status: boolean;
  kyc_verification_status: boolean;
  role: string;
  cashbackWalletId: string | null;
  referralWalletId: string | null;
  paymentWalletId: string | null;
  referralWallet: Wallet;
  paymentWallet: Wallet;
  cashbackWallet: Wallet;
  transactions: any[]; // Adjust if you know the specific transaction type
  cashbackTransactions: any[]; // Adjust if you know the specific cashbackTransaction type
  user: User;
};

const ProfileInfo: React.FC<{ user: ProfileUser }> = ({ user }) => {
  const [showFullPhoneNumber, setShowFullPhoneNumber] = useState(false);

  const {
    firstName,
    lastName,
    user: userDetails,
    referralWalletId,
    referralWallet,
    paymentWallet,
    cashbackWallet,
    transactions,
    cashbackTransactions
  } = user;
  const phoneNumber = userDetails.phoneNumber;
  const referralId = userDetails.referralData.referralId; // Access referralId from referralData

  // Mask phone number if available
  const maskedPhoneNumber = phoneNumber
    ? `${phoneNumber.slice(0, 5)}*****`
    : "N/A";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Copied to clipboard");
        toast.success("Copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy!");
      }
    );
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full border-l-[8px] border-[#0AA87E]">
      <div className="flex flex-wrap gap-5 flex-start">
        <div className="flex">
          <Image
            src={Default}
            alt="Profile"
            className="rounded-full w-[80px] h-[80px] border-[2px] border-white"
          />
        </div>
        <div className="flex-[1]">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-regular text-gray-800">
              {firstName || "First Name"} {lastName || "Last Name"}
            </h1>
            <div className="flex flex-wrap gap-2 items-center flex-row">
              <p className="text-gray-600 font-semibold">
                {showFullPhoneNumber ? phoneNumber : maskedPhoneNumber}
              </p>
              {phoneNumber && (
                <button
                  onClick={() => setShowFullPhoneNumber(!showFullPhoneNumber)}
                >
                  {showFullPhoneNumber ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              )}
            </div>
            <div className="flex flex-wrap flex-start">
              <button
                onClick={() => copyToClipboard(referralId || "N/A")}
                className="p-2 border-[1px] rounded-xl flex items-center text-xs gap-2 justify-center flex-row"
              >
                <FaUser className="text-sm" /> {referralId || "N/A"}
              </button>
              <UpiBase user={user} />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProfileInfo;
