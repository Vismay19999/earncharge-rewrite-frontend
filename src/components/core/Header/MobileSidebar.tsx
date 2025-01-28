"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/logo.png";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { FaArrowRight } from "react-icons/fa6";
import { getAccessToken, logout as RemoveToken } from "@/utils/auth";
import { useUser } from "@/actions/UserContext/UserContext";
import { FaUser } from "react-icons/fa";

const MobileSidebar = () => {
  const { user, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

 useEffect(() => {
  const token = getAccessToken()
  if(token) {
    setToken(token)
  }
 } , [])

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const logoutHandler = () => {
    RemoveToken();
    logout();
    closeSidebar(); // Close sidebar on logout
  };

  return (
    <>
      <div className="md:hidden z-50 backdrop-blur-md shadow-md flex justify-between items-center p-4">
        <Link href="/app">
          <Image src={Logo} alt="Logo" width={150} height={40} />
        </Link>
        <IconButton onClick={toggleSidebar}>
          <MenuIcon fontSize="medium" className="text-black" />
        </IconButton>
      </div>

      <div
        className={`fixed inset-0 z-40 transition-transform duration-300 ease-in-out bg-gray-950 p-4 text-white font-Primary w-3/4 shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-bold">EarnCharge</h2>
          <IconButton onClick={closeSidebar}>
            <CloseIcon fontSize="medium" className="text-white" />
          </IconButton>
        </div>
        <nav className="flex flex-col space-y-2 p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 hover:bg-gray-800 p-3 rounded-md transition"
            onClick={closeSidebar}
          >
            <FaArrowRight /> <span className="font-semibold text-lg">Home</span>
          </Link>
          <Link
            href="/blog"
            className="flex items-center space-x-3 hover:bg-gray-800 p-3 rounded-md transition"
            onClick={closeSidebar}
          >
            <FaArrowRight /> <span className="font-semibold text-lg">Blog</span>
          </Link>
          <Link
            href="/aboutus"
            className="flex items-center space-x-3 hover:bg-gray-800 p-3 rounded-md transition"
            onClick={closeSidebar}
          >
            <FaArrowRight />{" "}
            <span className="font-semibold text-lg">About</span>
          </Link>
          <Link
            href="/offers"
            className="flex items-center space-x-3 hover:bg-gray-800 p-3 rounded-md transition"
            onClick={closeSidebar}
          >
            <FaArrowRight />{" "}
            <span className="font-semibold text-lg">Offers</span>
          </Link>
          <Link
            href="/bbps"
            className="flex items-center space-x-3 hover:bg-gray-800 p-3 rounded-md transition"
            onClick={closeSidebar}
          >
            <FaArrowRight /> <span className="font-semibold text-lg">BBPS</span>
          </Link>
          <Link
            href="/referral"
            className="flex items-center space-x-3 hover:bg-gray-800 p-3 rounded-md transition"
            onClick={closeSidebar}
          >
            <FaArrowRight /> <span className="font-semibold text-lg">Referral</span>
          </Link>
          <Link
            href="/contact"
            className="flex items-center space-x-3 hover:bg-gray-800 p-3 rounded-md transition"
            onClick={closeSidebar}
          >
            <FaArrowRight />{" "}
            <span className="font-semibold text-lg">Contact</span>
          </Link>
          <div className="flex flex-col items-center space-y-4 pt-4">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="w-full p-2 flex gap-2 items-center justify-center rounded-xl bg-white text-black"
                  onClick={closeSidebar}
                >
                  <FaUser /> {user.firstName}
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="w-full p-2 flex gap-2 items-center justify-center rounded-xl bg-white text-black"
                  onClick={closeSidebar}
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  className="w-full p-2 flex gap-2 items-center justify-center rounded-xl bg-white text-black"
                  onClick={closeSidebar}
                >
                  Log In
                </Link>
              </>
            )}

            {
              token && (
                <>
                <button
                  onClick={logoutHandler}
                  className="w-full p-2 rounded-xl bg-white text-black"
                >
                  Logout
                </button>
                </>
              )
            }
          </div>
        </nav>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-70"
          onClick={closeSidebar}
        />
      )}
    </>
  );
};

export default MobileSidebar;
