import React from "react";
import Image from "next/image";
import Logo from "@/../public/footer logo.png";
import Link from "next/link";
import { Facebook, Instagram, LinkedIn, YouTube } from "@mui/icons-material";
import { FaThreads } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <div className="w-full py-12 p-6 bg-[#131c23]">
        <div className="max-w-[1000px] m-auto">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-[1]">
            <Link href="/">
              <Image src={Logo} alt="Logo" width={200} height={200} />
            </Link>
            <div className="flex justify-start gap-4 p-5 text-white">
              <Link href="https://www.facebook.com/profile.php?id=61567165222175&mibextid=JRoKGi" target="_blank"><Facebook /></Link>
              <Link href="https://www.instagram.com/earncharge?igsh=dWxkYWg0NGl6N2R0" target="_blank"><Instagram /></Link>
              <Link href="https://www.youtube.com/@EarnChargeIndia" target="_blank"><YouTube /></Link>
              <Link href="https://www.threads.net/@earncharge?glyph_type=SELF_PROFILE" target="_blank"><FaThreads /></Link>
            </div>
            </div>
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
                Earncharge is a fully owned subsidary of Arahant Economy
                Services Private Limited. It is a digital platform providing
                recharge and BBPS services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
