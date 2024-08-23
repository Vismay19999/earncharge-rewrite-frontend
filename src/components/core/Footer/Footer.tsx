import React from "react";
import Image from "next/image";
import Logo from "@/../public/footer logo.png";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="w-full py-12 p-6 bg-[#131c23] mt-[100px]">
        <div className="max-w-[1000px] m-auto">
          <div className="flex flex-col lg:flex-row gap-10">
            <Link href="/" className="flex-[1]">
              <Image src={Logo} alt="Logo" width={200} height={200} />
            </Link>
            <div className="flex-[1]">
              <span className="text-xs font-bold text-white">Our Company</span>
              <Link
                href="/"
                className="cursor-pointer block text-white mt-4 text-lg"
              >
                Home
              </Link>
              <Link
                href="/"
                className="cursor-pointer block text-white mt-4 text-lg"
              >
                Blog
              </Link>
              <Link
                href="/"
                className="cursor-pointer block text-white mt-4 text-lg"
              >
                Help
              </Link>
            </div>
            <div className="flex-[1]">
              <span className="text-xs font-bold text-white">Legal</span>
              <Link
                href="/refund"
                className="cursor-pointer block text-white mt-4 text-lg"
              >
                Refund Policy
              </Link>
              <Link
                href="/policy"
                className="cursor-pointer block text-white mt-4 text-lg"
              >
                Privacy Policy
              </Link>
              <Link
                href="/disclaimer"
                className="cursor-pointer block text-white mt-4 text-lg"
              >
                Disclaimer
              </Link>
              <Link
                href="/terms"
                className="cursor-pointer block text-white mt-4 text-lg"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/contact"
                className="cursor-pointer block text-white mt-4 text-lg"
              >
                Contact
              </Link>
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
