import Image from "next/image";
import React, { useEffect, useState } from "react";
import Default from "@/../public/default_image.png";
import { FaRegEyeSlash, FaRegEye, FaUser } from "react-icons/fa";
import UpiBase from "./profileTabs/UpiBase";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import KycBase from "./profileTabs/KycBase";
import { FaCheckCircle } from "react-icons/fa";

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
  const [loading, setLoading] = useState(true);
  const [showKycTick, setShowKycTick] = useState(false);

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

  const phoneNumber = userDetails?.phoneNumber;
  const referralId = userDetails?.referralData?.referralId || "N/A"; // Access referralId from referralData

  // Mask phone number if available
  const maskedPhoneNumber = phoneNumber
    ? `${phoneNumber.slice(0, 5)}*****`
    : "N/A";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Copied to clipboard!");
      },
      (err) => {
        toast.error("Failed to copy!");
      }
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 1000); 
  }, []);

  const handleKycVerified = () => {
    setShowKycTick(true);
  };

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-xl p-6 w-full border-l-[8px] border-[#0AA87E] flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

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
            <h1 className="text-xl font-regular text-gray-800 flex items-center">
              {firstName || "First Name"} {lastName || "Last Name"}
              {(user.kyc_verification_status || showKycTick) && (
                <FaCheckCircle className="text-green-500 ml-2" title="KYC Verified" />
              )}
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
                onClick={() => copyToClipboard(referralId)}
                className="p-2 border-[1px] rounded-xl flex items-center text-xs gap-2 justify-center flex-row"
              >
                <FaUser className="text-sm" /> {referralId}
              </button>
              <UpiBase user={user} />
            </div>
          </div>
        </div>
      </div>
      <KycBase user={user} onKycVerified={handleKycVerified} />
      <ToastContainer />
    </div>
  );
};

export default ProfileInfo;
