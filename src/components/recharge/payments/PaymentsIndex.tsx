import { getAccessToken } from "@/utils/auth";
import { ArrowRightAlt } from "@mui/icons-material";
import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import payment from "@/../../public/payment.gif";
import Image from "next/image";
const PaymentsIndex = ({
  amount,
  provider
}: {
  amount: string;
  provider: string;
}) => {
  const [activeTab, setActiveTab] = useState<string>("payu");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [vpa, setVpa] = useState<string>("");
  const accessToken = getAccessToken();
  const [isPaymentInitiated, setIsPaymentInitiated] = useState(false);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  const handleTabChange = (tab: string) => {
    if (!isPaymentInitiated) {
      setActiveTab(tab);
      setPhoneNumber(""); 
      setVpa(""); 
      setHtmlContent(null);
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleVpaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 22) {
      setVpa(value);
    }
  };

  const initiatePayment = async () => {
    const paymentData = {
      amount: amount,
      vpa: vpa,
      phoneNumber: phoneNumber,
      providerID: activeTab === "payu" ? "6" : "1"
    };

    const url =
      activeTab === "payu"
        ? "https://api.earncharge.in/v1/payment/payu/initiate"
        : "https://api.earncharge.in/v1/payment/lsp/initiate";

    try {
      const response = await axios.post(url, paymentData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        if (activeTab === "payu") {
          setHtmlContent(response.data);
        } else if (activeTab === "lightspeedpay") {
          const paymentLink = response.data.paymentLink;
          window.location.href = paymentLink;
        }
        setIsPaymentInitiated(true);
      } else {
        toast.error("Payment failed. Please try again.");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred during the payment process."
      );
    }
  };

  return (
    <>
    <div>
      <ToastContainer />
      <div className="bg-white shadow-md rounded-lg p-10 flex-[1]">
        {/* Tabs for PayU and LightspeedPay */}
        <div className="space-x-4 border-b mb-4 flex">
          <button
            className={`flex-[1] py-2 text-lg font-semibold transition duration-200 ${
                activeTab === "payu" 
                ? "border-b-2 border-black text-black"
                : "text-gray-600 hover:text-black"
                }`}
            onClick={() => handleTabChange("payu")}
            disabled={isPaymentInitiated}
          >
            PayU
          </button>
          <button
            className={`flex-[1] py-2 text-lg font-semibold transition duration-200 ${
              activeTab === "lightspeedpay" 
              ? "border-b-2 border-black text-black"
              : "text-gray-600 hover:text-black"
              }`}
            onClick={() => handleTabChange("lightspeedpay")}
            disabled={isPaymentInitiated}
          >
            LightspeedPay
          </button>
        </div>
              <Image src={payment} alt="Payment" height={350} width={350} />
        {/* Input fields for the selected tab */}
        <div className="mt-4">
          <div className="mb-4">
            <input
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="Enter Phone Number"
              className="block w-full p-2 border border-gray-300 rounded"
              maxLength={10}
              pattern="[0-9]*"
            />
            {phoneNumber.length > 0 && phoneNumber.length < 10 && (
              <p className="text-red-500 text-sm">
                Phone number must be 10 digits.
              </p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={vpa}
              onChange={handleVpaChange}
              placeholder="Enter VPA"
              className="block w-full p-2 border border-gray-300 rounded"
              maxLength={22}
            />
            {vpa.length > 0 && vpa.length < 22 && (
              <p className="text-gray-500 text-sm">
                Max length for VPA is 22 characters.
              </p>
            )}
          </div>

          {!isPaymentInitiated && (
            <button
              onClick={initiatePayment}
              className="w-full bg-black py-2 rounded-lg text-white"
            >
              Verify <ArrowRightAlt />
            </button>
          )}

          {htmlContent && (
            <div className="mt-4" dangerouslySetInnerHTML={{ __html: htmlContent }} />
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default PaymentsIndex;
