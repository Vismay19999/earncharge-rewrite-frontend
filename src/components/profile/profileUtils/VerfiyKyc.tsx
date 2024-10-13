"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAccessToken } from "@/utils/auth";

interface VerifyKycProps {}

const VerifyKyc: React.FC<VerifyKycProps> = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);

  const token = getAccessToken();
  console.log("Token fetched:", token);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOtpSent, timer]);

  const handleSendOtp = async () => {
    console.log("Send OTP clicked, Aadhaar:", aadhaarNumber);

    if (!aadhaarNumber.match(/^\d{12}$/)) {
      toast.error("Please enter a valid 12-digit Aadhaar number.");
      console.log("Invalid Aadhaar number:", aadhaarNumber);
      return;
    }

    setLoading(true);
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
      setTimer(30); // Start the 30-second timer
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

  return (
    <div className="mt-4">
      <div className="bg-white shadow-md rounded-xl p-6 w-full border-l-[8px] border-[#0AA87E]">
        <h2 className="text-lg font-bold mb-4">Verify KYC</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Aadhaar Number
          </label>
          <input
            type="text"
            value={aadhaarNumber}
            onChange={(e) => {
              console.log("Aadhaar input changed:", e.target.value);
              setAadhaarNumber(e.target.value);
            }}
            placeholder="UID 12 Digit Number"
            maxLength={12}
            className="mt-1 p-2 w-full border rounded-md text-sm outline-none"
            disabled={isOtpSent || loading}
          />
        </div>
        {isOtpSent && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => {
                console.log("OTP input changed:", e.target.value);
                setOtp(e.target.value);
              }}
              placeholder="Enter OTP"
              maxLength={6}
              className="mt-1 p-2 w-full border rounded-md text-sm"
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
            className="transition w-full bg-black text-white p-2 rounded-md text-sm hover:bg-gray-800"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        ) : (
          <>
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 mb-2"
              disabled={loading}
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
            <button
              onClick={handleSendOtp}
              className="w-full bg-gray-200 text-gray-700 p-2 rounded-md hover:bg-gray-300"
              disabled={loading || timer > 0}
            >
              Resend OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyKyc;
