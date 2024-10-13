import React from "react";
import Image from "next/image";
import success from "@/../public/success.png";
import Header from "@/components/core/Header/PcHeader";
import Footer from "@/components/core/Footer/Footer";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const Page = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[800px]">
        <div className="flex justify-center items-center">
          <Image
            src={success}
            alt="Verification Successful"
            width={500}
            height={500}
            className="object-cover"
          />
        </div>
        <h1 className="text-3xl font-semibold mt-4">
          Welcome to the EarnCharge Family! Your Payment has been done Successfully
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          Congratulations! You have earned your cashback successfully.
        </p>
        <button className="bg-gradient-to-r from-pink-500 to-yellow-600 text-white px-4 py-2 rounded-md text-xl mt-4 flex items-center justify-center space-x-2">
          <span>Go to Profile</span>
          <FaArrowRightFromBracket />
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Page;
