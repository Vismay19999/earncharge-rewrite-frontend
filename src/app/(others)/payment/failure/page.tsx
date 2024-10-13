import React from "react";
import Image from "next/image";
import failure from "@/../public/failure.png";
import Header from "@/components/core/Header/PcHeader";
import Footer from "@/components/core/Footer/Footer";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const Page = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[800px]">
        <div className="flex justify-center items-center">
          <Image
            src={failure}
            alt="Verification Successful"
            width={900}
            height={900}
            className="object-cover"
          />
        </div>
        <h1 className="text-3xl font-semibold mt-4">
          Your Payment is Unsuccessful
        </h1>
        <p className="text-gray-600 text-lg mt-2">Try Again Later!</p>
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
