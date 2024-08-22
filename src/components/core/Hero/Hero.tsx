import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex items-center justify-center mt-8">
      <div className="bg-white p-8 rounded-lg shadow-md flex flex-col lg:flex-row items-center">
        {/* Text Section */}
        <div className="lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left">
          <h1 className="text-3xl font-bold mb-4">
            Fast, Simple and Secure way to pay
          </h1>
          <p className="text-gray-600 mb-4">
            Make payments in-store or online, plus send money to any bank
            account in a flash directly from your bank account.
          </p>
          <ul className="list-none space-y-2 mb-6">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span>
              Fastest QR scan for lightspeed payments
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span>
              100% safe & secure
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span>
              24/7 money transfers to anyone, anytime
            </li>
          </ul>
          <div className="flex justify-center lg:justify-start">
            {/* QR Code Placeholder */}
            <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-md">
              <span className="text-gray-400">QR Code Image</span>
            </div>
          </div>
          <div className="mt-4 flex justify-center lg:justify-start">
            <Image
              src="/google-play-badge.png"
              alt="Google Play"
              width={100}
              height={100}
              className="w-32 mr-2"
            />
            <Image src="/app-store-badge.png" alt="App Store" width={100} height={100} className="w-32" />
          </div>
        </div>

        {/* Mobile Image Placeholder */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <div className="w-64 h-64 bg-gray-200 flex items-center justify-center rounded-md">
            <span className="text-gray-400">Mobile Image</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
