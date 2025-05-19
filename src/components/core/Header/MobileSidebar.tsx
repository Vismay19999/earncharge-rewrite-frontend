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
    const token = getAccessToken();
    if (token) {
      setToken(token);
    }
  }, []);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const logoutHandler = () => {
    RemoveToken();
    logout();
    closeSidebar();
  };

  return (
    <>
      <div className="md:hidden z-50 backdrop-blur-md shadow-md flex justify-between items-center p-3">
        <Link href="/">
          <Image src={Logo} alt="Logo" width={120} height={30} />
        </Link>
        <IconButton onClick={toggleSidebar}>
          <MenuIcon fontSize="small" className="text-black" />
        </IconButton>
      </div>

      <div
        className={`fixed inset-0 z-40 transition-transform duration-300 ease-in-out bg-gray-950 p-3 text-white font-Primary w-3/4 shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-3">
          <h2 className="text-lg font-bold">EarnCharge</h2>
          <IconButton onClick={closeSidebar}>
            <CloseIcon fontSize="small" className="text-white" />
          </IconButton>
        </div>

        <nav className="flex flex-col space-y-1 p-3">
          {[
            { href: "/", label: "Home" },
            { href: "/blog", label: "Blog" },
            { href: "/aboutus", label: "About" },
            { href: "/offers", label: "Offers" },
            { href: "/bbps", label: "BBPS" },
            { href: "/referral", label: "Referral" },
            { href: "/contact", label: "Contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-2 text-sm hover:bg-gray-800 p-2 rounded-md transition"
              onClick={closeSidebar}
            >
              <FaArrowRight className="text-xs" /> <span>{item.label}</span>
            </Link>
          ))}

          <div className="flex flex-col items-center space-y-3 pt-3">
            {user ? (
              <Link
                href="/profile"
                className="w-full p-1 px-3 flex gap-2 items-center justify-center rounded-md bg-white text-black text-sm"
                onClick={closeSidebar}
              >
                <FaUser className="text-xs" /> {user.firstName}
              </Link>
            ) : (
              <>
                <Link
                  href="/register"
                  className="w-full p-1 px-3 flex items-center justify-center rounded-md bg-white text-black text-sm"
                  onClick={closeSidebar}
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  className="w-full p-1 px-3 flex items-center justify-center rounded-md bg-white text-black text-sm"
                  onClick={closeSidebar}
                >
                  Log In
                </Link>
              </>
            )}

            {token && (
              <button
                onClick={logoutHandler}
                className="w-full p-1 px-3 rounded-md bg-white text-black text-sm"
              >
                Logout
              </button>
            )}
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
