import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';

interface HelpPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpPopup: React.FC<HelpPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[480px] max-h-[80vh] overflow-y-auto relative">
        <h3 className="font-semibold mb-2">How to Use Your Wallets</h3>
        <div className="text-sm overflow-y-auto max-h-[200px]">
          <p className="mb-4">
            <span className="font-semibold">Referral:</span> Earn rewards
            effortlessly by entering the amount in the input field. Your
            referral rewards will be credited to your account within
            minutes.
          </p>
          <p className="mb-4">
            <span className="font-semibold">Cashback:</span> Get instant
            cashback by inputting your amount. The cashback will be credited
            directly to your verified account in a flash.
          </p>
          <p className="mb-4">
            <span className="font-semibold">My Wallet:</span> To initiate
            BBPS transactions, enter the UTR number and amount, along with a
            transaction screenshot, to earn even more cashback quickly and
            easily.
          </p>
        </div>

        <iframe
          width="100%"
          height="315"
          className="w-full mt-4"
          src="https://www.youtube.com/embed/DYusH9Ixfm8?si=RI2myA7XIoVAZshj"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>

        <button
          className="w-full p-2 bg-black text-white rounded-xl mt-4 flex items-center justify-center hover:bg-gray-800"
          onClick={onClose}
        >
          Understood <FaRegCheckCircle className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default HelpPopup;
