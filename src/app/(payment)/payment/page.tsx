"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { getAccessToken } from "@/utils/auth";

// Separate client component for the payment form
const PaymentForm = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [formHtml, setFormHtml] = useState("");
  const [error, setError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [vpa, setVpa] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Get amount and providerId from URL parameters
  const amount = searchParams.get("amount") || "10";
  const providerId = searchParams.get("providerId") || "1";

  // Validate phone number and VPA
  useEffect(() => {
    // Basic validation - adjust as needed
    const isPhoneValid = phoneNumber.length >= 10;
    const isVpaValid = vpa.includes('@');
    setIsFormValid(isPhoneValid && isVpaValid);
  }, [phoneNumber, vpa]);

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    try {
      setLoading(true);
      
      // Make API call to payment creation endpoint
      const response = await axios.post(
        "https://api.earncharge.in/v1/payment/create",
        {
          amount: parseInt(amount),
          vpa,
          phoneNumber,
          providerId,
          gateway: "PAYU"
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`
          }
        }
      );

      // Set the HTML form from the response
      setFormHtml(response.data);
      setShowPaymentForm(true);
      
      // After a short delay, submit the form automatically
      setTimeout(() => {
        const formElement = document.getElementById("payment-form") as HTMLFormElement;
        if (formElement) {
          formElement.submit();
        }
      }, 1000);
    } catch (err) {
      console.error("Payment creation failed:", err);
      setError("Failed to initialize payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
      {!showPaymentForm ? (
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Payment Details</h1>
          <form onSubmit={handleDetailsSubmit}>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="vpa" className="block text-sm font-medium text-gray-700 mb-1">
                VPA (UPI ID)
              </label>
              <input
                type="text"
                id="vpa"
                value={vpa}
                onChange={(e) => setVpa(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@upi"
                required
              />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Amount: ₹{amount} | Provider ID: {providerId}
              </p>
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                  isFormValid && !loading ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </div>
          </form>
        </div>
      ) : loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Initializing payment gateway...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button 
            onClick={() => setShowPaymentForm(false)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div>
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Payment Gateway</h1>
            <p className="text-gray-600">You'll be redirected to the payment page in a moment...</p>
          </div>
          <div id="form-container" dangerouslySetInnerHTML={{ __html: formHtml }}></div>
        </div>
      )}
    </div>
  );
};

// Main page component with Suspense boundary
const PaymentPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Suspense fallback={
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment form...</p>
        </div>
      }>
        <PaymentForm />
      </Suspense>
    </div>
  );
};

export default PaymentPage;
