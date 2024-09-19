"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/logo.png";
import { logout as RemoveToken } from "@/utils/auth";
import { useUser } from "@/actions/UserContext/UserContext";

const PcHeader = () => {
  const [isFixed, setIsFixed] = useState(false);
  const { user, logout } = useUser();

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

  const logoutHandler = () => {
    RemoveToken();
    logout();
  };

  return (
    <div
      className={`py-4 ${
        isFixed
          ? "fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-md"
          : "relative"
      } transition-all duration-300`}
    >
      <div className="flex items-center justify-between mx-24 px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={Logo} alt="logo" width={200} height={200} />
        </Link>

        {/* Middle section: Navigation links */}
        <div className="flex items-center space-x-5 text-xl font-semibold text-[#131c23]">
          <Link href="/">
            <h1 className="hover:underline">Home</h1>
          </Link>
          <span className="text-sm">•</span>
          <Link href="/blog">
            <h1 className="hover:underline">Blog</h1>
          </Link>
          <span className="text-sm">•</span>
          <Link href="/contact">
            <h1 className="hover:underline">Contact</h1>
          </Link>
          <span className="text-sm">•</span>

          <Link href="/aboutus">
            <h1 className="hover:underline">About Us</h1>
          </Link>
        </div>

        {/* Right section: Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div
                onClick={logoutHandler}
                className="px-4 py-2 bg-white border border-[#131c23] text-[#131c23] rounded-md hover:bg-gray-100 cursor-pointer"
              >
                Log out
              </div>
              <Link
                href={"/profile"}
                className="px-4 py-2 bg-[#131c23] text-white rounded-md hover:bg-[#0a0f13]"
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                href={"/login"}
                className="px-4 py-2 bg-white border border-[#131c23] text-[#131c23] rounded-md text-lg hover:bg-gray-100"
              >
                Log In
              </Link>
              <Link
                href={"/register"}
                className="px-4 py-2 bg-[#131c23] text-white rounded-md text-lg hover:[#0a0f13]"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PcHeader;
