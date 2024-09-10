"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '@/utils/auth';

const PaymentPage = () => {
  const [formHtml, setFormHtml] = useState<string | null>(null);
  const accessToken = getAccessToken();

  const initiatePayment = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/payment/initiate`,
        { amount: "10.00" },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Assuming the API returns an HTML response
      setFormHtml(response.data); // Store the raw HTML response in state
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  useEffect(() => {
    initiatePayment();
  }, []);

  return (
    <div>
      <h1>Payment Page</h1>
      {formHtml ? (
        <div
          dangerouslySetInnerHTML={{ __html: formHtml }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PaymentPage;
