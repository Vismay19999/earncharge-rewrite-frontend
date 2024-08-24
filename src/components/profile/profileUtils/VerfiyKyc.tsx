"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface VerifyKycProps {}

const VerifyKyc: React.FC<VerifyKycProps> = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const token = "YOUR_ACCESS_TOKEN"; // Replace with actual token fetching logic

  const handleSendOtp = async () => {
    if (!aadhaarNumber.match(/^\d{12}$/)) {
      toast.error("Please enter a valid 12-digit Aadhaar number.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "https://api.earncharge.in/v1/kyc/aadhaar/send-otp",
        { aadhaarNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("OTP sent successfully!");
      setIsOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.match(/^\d{6}$/)) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "https://api.earncharge.in/v1/kyc/aadhaar/verify-otp",
        { otp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("OTP verified successfully!");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <ToastContainer />
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Verify KYC</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Aadhaar Number</label>
          <input
            type="text"
            value={aadhaarNumber}
            onChange={(e) => setAadhaarNumber(e.target.value)}
            placeholder="Enter Aadhaar Number"
            className="mt-1 p-2 w-full border rounded-md"
            disabled={isOtpSent || loading}
          />
        </div>
        {isOtpSent && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="mt-1 p-2 w-full border rounded-md"
              disabled={loading}
            />
          </div>
        )}
        {!isOtpSent ? (
          <button
            onClick={handleSendOtp}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        ) : (
          <button
            onClick={handleVerifyOtp}
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Verifying OTP..." : "Verify OTP"}
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyKyc;
