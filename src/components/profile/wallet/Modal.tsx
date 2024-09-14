import React, { useState } from "react";
import { toast } from "react-toastify";

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
        <div className="modal-content">
          <h2>Withdraw {walletType}</h2>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0"
          />
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    )
  );
};

export default Modal;
