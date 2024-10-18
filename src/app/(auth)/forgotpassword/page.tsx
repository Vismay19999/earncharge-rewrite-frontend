"use client";
import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import axios from "axios";
import OtpVerification from "@/components/auth/OtpVerification";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const payload = activeTab === 0 ? { phoneNumber } : { email };
      await axios.post(
        "https://api.earncharge.in/v1/user/forgot-password",
        payload
      );
      setSuccess("OTP sent successfully!");
      setShowOtpVerification(true);
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleCloseOtpVerification = () => {
    setShowOtpVerification(false);
    setError("");
    setSuccess("");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
            <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl mb-6">
              {["Phone", "Email"].map((tab, index) => (
                <Tab
                  key={tab}
                  className={({ selected }: { selected: boolean }) =>
                    `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60
                    ${
                      selected
                        ? "bg-white shadow"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                    }`
                  }
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 10) setPhoneNumber(value);
                    }}
                    placeholder="Enter phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4"
                  >
                    Reset Password
                  </button>
                </form>
              </Tab.Panel>
              <Tab.Panel>
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4"
                  >
                    Reset Password
                  </button>
                </form>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
          {showOtpVerification && (
            <OtpVerification
              phoneNumber={activeTab === 0 ? phoneNumber : undefined}
              email={activeTab === 1 ? email : undefined}
              onClose={handleCloseOtpVerification}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
