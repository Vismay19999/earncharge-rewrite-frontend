import React, { useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/auth";

interface PaymentBBPSProps {
  providerId: string;
  optional1: string | null;
  optional2: string | null;
  amount: string;
}

const PaymentBBPS: React.FC<PaymentBBPSProps> = ({
  providerId,
  optional1,
  optional2,
  amount
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const accessToken = getAccessToken();

      const response = await axios.post(
        "https://api.earncharge.in/v1/payment/bbps/initiate",
        {
          providerId,
          optional1,
          optional2,
          amount
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Replace with actual token
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.status === "success") {
        setSuccessMessage("Payment initiated successfully!");
      } else {
        setError("Payment failed. Please try again.");
      }
    } catch (err: any) {
      setError("Error initiating payment: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {loading && <p>Processing payment...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      {/* Button to initiate the payment */}
      <button
        onClick={handlePayment}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        Initiate Payment
      </button>
    </div>
  );
};

export default PaymentBBPS;
