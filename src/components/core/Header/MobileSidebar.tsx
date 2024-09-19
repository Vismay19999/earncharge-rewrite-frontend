"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/logo.png";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import InfoIcon from "@mui/icons-material/Info";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="md:hidden z-50 backdrop-blur-md shadow-md flex justify-between items-center p-2">
        <div className="flex items-center justify-center">
          <Image src={Logo} alt="Logo" width={150} height={40} />
        </div>
        <IconButton onClick={toggleSidebar}>
          <MenuIcon fontSize="large" className="text-[#131c23]" />
        </IconButton>
      </div>

      <div
        className={`fixed inset-0 z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-[#131c23] text-white font-Primary w-3/4`}
      >
        <IconButton onClick={closeSidebar}>
          <CloseIcon fontSize="large" className="text-white" />
        </IconButton>
        <nav className="flex flex-col space-y-4 p-4">
          <Link href="/">
            <div onClick={closeSidebar} className="flex items-center space-x-2">
              <HomeIcon />
              <span>Home</span>
            </div>
          </Link>
          <Link href="#service">
            <div onClick={closeSidebar} className="flex items-center space-x-2">
              <ExploreIcon />
              <span>Blog</span>
            </div>
          </Link>
          <Link href="#about">
            <div onClick={closeSidebar} className="flex items-center space-x-2">
              <InfoIcon />
              <span>Contact</span>
            </div>
          </Link>
          <Link href="/aboutus">
            <div onClick={closeSidebar} className="flex items-center space-x-2">
              <InfoIcon />
              <span>About</span>
            </div>
          </Link>
          <div
            onClick={closeSidebar}
            className="flex items-center justify-center space-x-2 w-full"
          >
            <div className="flex flex-rows justify-center items-center space-x-2 mx-4">
              <button className="border rounded-md px-4 py-2 border-white">
                Get Started
              </button>
              <button className="border rounded-md px-4 py-2 border-white">
                Log In
              </button>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-200 pt-4 text-center text-gray-200 text-sm">
            <p className="mb-2 flex items-center justify-center font-Secondary">
              EarnCharge, a subsidiary of Arihant Economy Services Pvt. Ltd., is
              a digital platform facilitating quick borrowing. 2024 Arihant
              Economy Services Pvt. Ltd.
            </p>
          </div>
        </nav>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50"
          onClick={closeSidebar}
        />
      )}
    </>
  );
};

export default MobileSidebar;
