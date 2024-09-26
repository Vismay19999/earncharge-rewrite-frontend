import React, { useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/auth";
import { FaArrowRightLong } from "react-icons/fa6";

interface PaymentRechargeProps {
  planPrice: number;
  providerId: string;
}

const PaymentRecharge: React.FC<PaymentRechargeProps> = ({ planPrice, providerId }) => {
  const [rechargeLoading, setRechargeLoading] = useState(false);
  const [paymentHtml, setPaymentHtml] = useState<string | null>(null);
  const [vpa, setVpa] = useState<string>(""); // UPI ID
  const [phoneNumber, setPhoneNumber] = useState<string>(""); // Phone Number
  const [errors, setErrors] = useState<{ vpa?: string; phoneNumber?: string }>({}); // Error messages
  const [showPopup, setShowPopup] = useState(false); // Control modal visibility
  const accessToken = getAccessToken();

  // Validate UPI ID and Phone Number
  const validateInputs = () => {
    const newErrors: { vpa?: string; phoneNumber?: string } = {};
    
    // VPA validation: Check if it's not empty
    if (!vpa.trim()) {
      newErrors.vpa = "UPI ID is required";
    }

    // Phone number validation: Check if it's a valid 10-digit number
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const initiatePayment = async () => {
    if (!validateInputs()) return; // Do not proceed if validation fails

    setRechargeLoading(true);
    setShowPopup(false);
    try {
      const paymentData = {
        amount: planPrice.toFixed(2),
        vpa,
        phoneNumber,
        providerID: providerId,
      };

      const response = await axios.post(
        "https://api.earncharge.in/v1/payment/initiate",
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the response contains HTML
      if (response.status === 200) {
        setPaymentHtml(response.data);
        setShowPopup(false); // Close the popup after successful payment initiation
      }
    } catch (error) {
      console.error("Payment initiation error", error);
      setErrors({ vpa: "Payment failed, please try again." });
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
            className={`w-full bg-gradient-to-r from-green-400 to-emerald-500 p-2 rounded-xl mt-4 text-white text-sm flex items-center justify-center gap-2`}
          >
            Recharge Now <FaArrowRightLong />
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
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.vpa ? "border-red-500" : "border-gray-300"
                } rounded-md`}
                placeholder="Enter your UPI ID"
              />
              {errors.vpa && <p className="text-red-500 text-sm">{errors.vpa}</p>}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                  if (value.length <= 10) {
                    setPhoneNumber(value); // Set phone number if length is 10 or less
                  }
                }}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                } rounded-md`}
                placeholder="Enter your phone number"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
              )}
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
