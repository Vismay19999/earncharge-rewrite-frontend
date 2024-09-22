import React, { useState } from "react";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import WalletIco from "@/../../public/wallet.gif";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: string) => void;
  balance: number;
  walletType: "Cashback" | "Referral";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  balance,
  walletType
}) => {
  const [amount, setAmount] = useState<string>("");

  const handleSubmit = () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.warn("Please enter a valid amount");
      return;
    }
    if (parsedAmount > balance) {
      toast.warn("Amount exceeds balance");
      return;
    }
    onSubmit(amount);
    onClose();
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="p-6 w-[400px] bg-white shadow-xl rounded-lg">
          <div className="flex flex-wrap justify-between">
            <div className="flex-[1]">
              <h1>
                Withdraw <span className="font-semibold">{walletType}</span>
              </h1>
            </div>
            <div className="flex flex-wrap justify-end flex-[1]">
              <button onClick={onClose}>
                <IoMdClose />
              </button>
            </div>
          </div>
          <center>
            <Image
              src={WalletIco}
              alt="Wallet"
              width={250}
              className="mt-2 mb-2"
            />
          </center>
          <form className="p-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="border-[1px] w-full p-2 rounded-xl text-sm outline-none pl-4"
              min="0"
            />
            <button
              onClick={handleSubmit}
              className="w-full mt-5 p-2 rounded-xl border-[1px] text-sm bg-black text-white flex gap-2 items-center justify-center"
            >
              Process <FaArrowRight />
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default Modal;
