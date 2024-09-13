import React, { useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/auth";

interface PaymentRechargeProps {
  planPrice: number;
  providerId: string;
  onBtn: (btnChange: boolean) => void;
}

const PaymentRecharge: React.FC<PaymentRechargeProps> = ({
  planPrice,
  providerId,
  onBtn
}) => {
  const [rechargeLoading, setRechargeLoading] = useState(false);
  const [paymentHtml, setPaymentHtml] = useState<string | null>(null);
  const [vpa, setVpa] = useState<string>(""); // UPI ID
  const [phoneNumber, setPhoneNumber] = useState<string>(""); // Phone Number
  const [showPopup, setShowPopup] = useState(false); // Control modal visibility
  const accessToken = getAccessToken();

  const initiatePayment = async () => {
    setRechargeLoading(true);
    setShowPopup(false);
    try {
      const paymentData = {
        amount: planPrice.toFixed(2),
        vpa,
        phoneNumber,
        providerID: providerId
      };

      const response = await axios.post(
        "https://api.earncharge.in/v1/payment/initiate",
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Add your Authorization key
            "Content-Type": "application/json"
          }
        }
      );

      // Check if the response contains HTML
      if (response.status === 200) {
        setPaymentHtml(response.data);
        onBtn(true); // Set HTML content for rendering
        setShowPopup(false); // Close the popup after successful payment initiation
      }
    } catch (error) {
      console.error("Payment initiation error", error);
    } finally {
      setRechargeLoading(false);
    }
  };

  return (
    <div>
      {/* Button to show popup modal */}
      {!paymentHtml && (
        <>
          <button
            onClick={() => setShowPopup(true)}
            className={`mt-4 px-4 py-2 rounded bg-green-500 text-white`}
          >
            Recharge Now
          </button>
        </>
      )}

      {/* Modal for UPI ID and phone number */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-lg font-bold mb-4">Enter Payment Details</h2>

            <div className="mt-4">
              <label className="block text-sm font-medium">UPI ID (VPA)</label>
              <input
                type="text"
                value={vpa}
                onChange={(e) => setVpa(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your UPI ID"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={initiatePayment}
                className={`px-4 py-2 rounded bg-green-500 text-white ${
                  rechargeLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={rechargeLoading || !vpa || !phoneNumber}
              >
                {rechargeLoading ? "Processing..." : "Submit"}
              </button>

              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 rounded bg-red-500 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render payment HTML from the response */}
      {paymentHtml && (
        <div
          className="mt-4"
          dangerouslySetInnerHTML={{ __html: paymentHtml }}
        />
      )}
    </div>
  );
};

export default PaymentRecharge;
