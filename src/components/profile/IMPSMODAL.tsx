"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/auth"; // Assuming this is your function
import { toast } from "react-toastify";
import Image from "next/image";
import { FiPlus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { ArrowRight } from "@mui/icons-material";

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
        "https://api.earncharge.in/v1/imps/initiate",
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
      toast.error(`Failed to send payment request ${err.message}`);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-xl bg-black p-2"
      >
        <FiPlus className="text-white" />
      </button>
      {wallets && (
        <>
          {/* Modal */}
          {isModalOpen && (
            <div
              style={{
                position: "fixed",
                borderRadius: "10px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "40px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                zIndex: 1000
              }}
            >
              {/* Close button */}
              <div className="flex flex-wrap justify-between">
                <div className="flex-[1]">
                  <h1>
                    Add <span className="font-semibold">Amount</span>
                  </h1>
                  <span className="text-xs border-[1px] px-2">
                    Balance ₹ {wallets.paymentWallet.amount}
                  </span>
                </div>
                <div className="flex flex-wrap justify-end flex-[1]">
                  <button onClick={() => setIsModalOpen(false)}>
                    <IoMdClose />
                  </button>
                </div>
              </div>

              {/* Input for UTR number */}
              <div className="flex flex-wrap flex-col gap-4 mt-4">
                <div>
                  <input
                    type="text"
                    placeholder="UTR Number"
                    value={utrNo}
                    className="w-full border-[1px] p-2 text-sm rounded-lg"
                    onChange={(e) => setUtrNo(e.target.value)}
                  />
                </div>

                {/* Input for Amount */}
                <div>
                  <input
                    type="number"
                    placeholder="Amount"
                    className="w-full border-[1px] p-2 text-sm rounded-lg"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                {/* File input for Image */}
                <div className="flex flex-wrap gap-2 flex-col text-sm">
                  <label className="text-xs">
                  Transaction <span className="font-semibold">Screenshot</span>
                  </label>
                  <input
                  type="file"
                  accept="image/jpeg, image/jpg, image/png"
                  className="text-sm"
                  onChange={handleFileChange}
                  />
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
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-black p-2 rounded-xl text-white text-sm hover:bg-white border-[1px] hover:text-black transition"
                  >
                    Send Request <ArrowRight />
                  </button>
                </div>
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
    </>
  );
};

export default IMPSPage;
