"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "./../../../public/logo.png";

const Header = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`py-4 ${
        isFixed ? "fixed top-0 left-0 right-0 z-50" : "relative"
      } transition-all duration-300 bg-white`}
    >
      <div className="flex items-center justify-between mx-24 px-6">
        <div className="flex items-center space-x-2">
          <Image src={Logo} alt="logo" width={150} height={150} />
        </div>

        {/* Middle section: Navigation links */}
        <div className="flex items-center space-x-6 text-lg font-semibold text-gray-800">
          <Link href="/">
            <h1 className="hover:underline">Home</h1>
          </Link>
          <span className="text-sm">•</span>
          <Link href="/">
            <h1 className="hover:underline">Blog</h1>
          </Link>
          <span className="text-sm">•</span>
          <Link href="/">
            <h1 className="hover:underline">Contact</h1>
          </Link>
        </div>

        {/* Right section: Buttons */}
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-white border border-gray-800 text-gray-800 rounded-md hover:bg-gray-100">
            Log In
          </button>
          <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;