import React from "react";
import Image from "next/image";
import Logo from "@/../public/footer logo.png";

const Footer = () => {
  return (
    <>
      <div className="w-full py-12 p-6 bg-[#131c23] mt-[100px]">
        <div className="max-w-[1000px] m-auto">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-[1]">
              <Image src={Logo} alt="Logo" width={200} height={200} />
            </div>
            <div className="flex-[1]">
              <span className="text-xs font-bold text-white">Our Company</span>
              <div className="cursor-pointer text-white mt-4 text-lg">Home</div>
              <div className="cursor-pointer text-white mt-4 text-lg">Blog</div>
              <div className="cursor-pointer text-white mt-4 text-lg">Help</div>
            </div>
            <div className="flex-[1]">
              <span className="text-xs font-bold text-white">Legal</span>
              <div className="cursor-pointer text-white mt-4 text-lg">
                Refund Policy
              </div>
              <div className="cursor-pointer text-white mt-4 text-lg">
                Privacy Policy
              </div>
              <div className="cursor-pointer text-white mt-4 text-lg">
                Disclaimer
              </div>
              <div className="cursor-pointer text-white mt-4 text-lg">
                Terms & Conditions
              </div>
              <div className="cursor-pointer text-white mt-4 text-lg">
                Contact
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mt-20 justify-between flex-col gap-5 lg:flex-row lg:items-center">
            <div className="flex-[1]">
              <p className="text-sm font-bold leading-1 text-white">
                Made with 💖 in India
              </p>
            </div>
            <div className="flex-[1]">
              <p className="text-xs leading-1 text-white">
                EarnCharge, a subsidiary of Arihant Economy Services Pvt. Ltd.,
                is a digital platform facilitating quick borrowing. © 2024
                Arihant Economy Services Pvt. Ltd.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
