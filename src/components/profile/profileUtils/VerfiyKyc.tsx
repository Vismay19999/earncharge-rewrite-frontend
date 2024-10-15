"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAccessToken } from "@/utils/auth";

export interface VerifyKycProps {
  onVerificationComplete: () => void;
}

const VerifyKyc: React.FC<VerifyKycProps> = ({ onVerificationComplete }) => {
  const [aadhaarNumber, setAadhaarNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const token = getAccessToken();
  console.log("Token fetched:", token);

  useEffect(() => {
    if (timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timer]);

  const handleSendOtp = async () => {
    setLoading(true);
    console.log("Send OTP clicked, Aadhaar:", aadhaarNumber);

    if (!aadhaarNumber.match(/^\d{12}$/)) {
      toast.error("Please enter a valid 12-digit Aadhaar number.");
      console.log("Invalid Aadhaar number:", aadhaarNumber);
      return;
    }

    try {
      console.log("Sending OTP request...");
      const response = await axios.post(
        "https://api.earncharge.in/v1/kyc/aadhaar/send-otp",
        { aadhaarNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("OTP sent response:", response);
      toast.success("OTP sent successfully!");
      setIsOtpSent(true);
      setTimer(60); // Set timer to 60 seconds after sending OTP
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    console.log("Verify OTP clicked, OTP:", otp);

    if (!otp.match(/^\d{6}$/)) {
      toast.error("Please enter a valid 6-digit OTP.");
      console.log("Invalid OTP:", otp);
      return;
    }

    setLoading(true);
    try {
      console.log("Verifying OTP...");
      const response = await axios.post(
        "https://api.earncharge.in/v1/kyc/aadhaar/verify-otp",
        { otp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("OTP verified response:", response);
      toast.success("OTP verified successfully!");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
      console.log("OTP verification operation finished.");
      window.location.reload();
    }
  };

  // Make sure to call onVerificationComplete when verification is done
  // For example:
  // const handleVerification = () => {
  //   // Your verification logic
  //   onVerificationComplete();
  // };

  return (
    <div className="mt-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full">
        <h2 className="text-lg font-semibold mb-4">Verify KYC</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Aadhaar Number
          </label>
          <input
            type="text"
            value={aadhaarNumber}
            onChange={(e) => setAadhaarNumber(e.target.value)}
            placeholder="Enter 12-digit Aadhaar number"
            maxLength={12}
            className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isOtpSent || loading}
          />
        </div>
        {isOtpSent && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={loading}
            />
            {timer > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                Resend OTP in {timer} seconds
              </p>
            )}
          </div>
        )}
        {!isOtpSent ? (
          <button
            onClick={handleSendOtp}
            className="w-full bg-green-500 text-white p-2 rounded-md text-sm hover:bg-green-600 transition duration-300 ease-in-out"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        ) : (
          <>
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 mb-2 transition duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
            <button
              onClick={handleSendOtp}
              className="w-full bg-gray-200 text-gray-700 p-2 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out"
              disabled={loading || timer > 0}
            >
              {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyKyc;
