import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

interface WalletFailurePopupProps {
  isOpen: boolean;
  onClose: () => void;
  walletType: string;
  errorMessage: string;
}

const WalletFailurePopup: React.FC<WalletFailurePopupProps> = ({ isOpen, onClose, walletType, errorMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <FaTimesCircle className="text-red-500 text-5xl mb-4 mx-auto" />
        <h2 className="text-2xl font-bold mb-4">Withdrawal Failed</h2>
        <p className="mb-6">
          {errorMessage || `Sorry, your ${walletType} withdrawal was unsuccessful. Please try again later.`}
        </p>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WalletFailurePopup;
