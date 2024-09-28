"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/auth"; // Assuming this is your function
import { toast } from "react-toastify";
import Image from "next/image";

interface Wallets {
  paymentWallet: { amount: number };
}

const IMPSPage = () => {
  const [wallets, setWallets] = useState<Wallets | null>(null);
  const [utrNo, setUtrNo] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const accessToken = getAccessToken();
        const response = await axios.get<Wallets>(
          "https://api.earncharge.in/v1/user/wallets",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        setWallets(response.data);
      } catch (err: any) {
        setError(err.message);
        toast.error("Failed to fetch wallets");
      }
    };

    fetchWallets();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async () => {
    if (!utrNo || !amount || !image) {
      toast.error("Please fill out all fields and upload an image");
      return;
    }

    try {
      const accessToken = getAccessToken();
      const formData = new FormData();
      formData.append("utrNo", utrNo);
      formData.append("amount", amount);
      formData.append("image", image);

      await axios.post(
        "https://api.earncharge.in/v1/payment/imps/initiate",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      toast.success("Payment request sent successfully");
      setIsModalOpen(false); // Close modal on success
    } catch (err: any) {
      setError(err.message);
      toast.error("Failed to send payment request");
    }
  };

  return (
    <div>
      {/* Button to open modal */}
      <button onClick={() => setIsModalOpen(true)}>Open Payment Request</button>

      {error && <div>Error: {error}</div>}
      {wallets && (
        <>
          {/* Modal */}
          {isModalOpen && (
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "20px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                zIndex: 1000
              }}
            >
              {/* Close button */}
              <button onClick={() => setIsModalOpen(false)}>Close</button>

              <div>₹ {wallets.paymentWallet.amount}</div>

              {/* Input for UTR number */}
              <div>
                <label>UTR Number</label>
                <input
                  type="text"
                  value={utrNo}
                  onChange={(e) => setUtrNo(e.target.value)}
                />
              </div>

              {/* Input for Amount */}
              <div>
                <label>Amount</label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              {/* File input for Image */}
              <div>
                <label>Upload Image</label>
                <input type="file" onChange={handleFileChange} />
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div>
                  <Image
                    width={300}
                    height={400}
                    src={imagePreview}
                    alt="Preview"
                    style={{ width: "100px" }}
                  />
                </div>
              )}

              {/* Button to send request */}
              <div>
                <button onClick={handleSubmit}>Send Request</button>
              </div>
            </div>
          )}

          {/* Modal backdrop */}
          {isModalOpen && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 999
              }}
              onClick={() => setIsModalOpen(false)} // Close when clicking outside the modal
            />
          )}
        </>
      )}
    </div>
  );
};

export default IMPSPage;
