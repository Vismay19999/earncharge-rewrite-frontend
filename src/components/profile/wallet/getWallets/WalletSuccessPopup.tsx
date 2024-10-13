import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface WalletSuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  walletType: string;
  successMessage: string;
}

const WalletSuccessPopup: React.FC<WalletSuccessPopupProps> = ({ isOpen, onClose, walletType, successMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <FaCheckCircle className="text-green-500 text-5xl mb-4 mx-auto" />
        <h2 className="text-2xl font-bold mb-4">Success!</h2>
        <p className="mb-6">{successMessage || `Your ${walletType} withdrawal was successful.`}</p>
        <button
          onClick={onClose}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WalletSuccessPopup;
