"use client";
import React from "react";
import VerifyKyc from "../profileUtils/VerfiyKyc";
import { FaCheckCircle } from "react-icons/fa";

const KycBase = ({ user }: { user: any }) => {
  console.log("KycBase rendered, user:", user);

  return (
    <div>
      {!user.kyc_verification_status ? (
        <VerifyKyc />
      ) : (
        <div className="bg-white shadow-md rounded-xl p-8 w-full border-l-[8px] border-[#0AA87E] mt-4">
          <div className="flex flex-col items-center justify-center">
            <FaCheckCircle className="text-green-500 text-6xl mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">KYC Verified</h2>
            <p className="text-xl text-gray-600">Your KYC verification is complete.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default KycBase;
