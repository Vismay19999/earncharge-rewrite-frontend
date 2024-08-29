"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/logo.png";
import { setTokens } from "@/utils/auth";
import { useUser } from "@/actions/UserContext/UserContext";
import login from "@/../public/login.png";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const LoginForm: React.FC = () => {
  const [loginMethod, setLoginMethod] = useState<
    "phoneNumber" | "email" | null
  >(null);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    password: "",
  });

  const { setUser } = useUser();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    if (!loginMethod) {
      toast.error("Please select a login method.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`,
        {
          [loginMethod]: formData[loginMethod],
          password: formData.password,
        },
        {
          headers: {
            Authorization: "Bearer YOUR_TOKEN",
            "Content-Type": "application/json",
          },
        }
      );

      const { accessToken, refreshToken, user } = response.data;
      setTokens(accessToken, refreshToken);
      setUser(user);
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  const handleMethodSelect = (selectedMethod: "phoneNumber" | "email") => {
    setLoginMethod(selectedMethod);
  };

  return (
    <div className="rounded-lg text-gray-900 flex justify-center">
      <div className="max-w-screen-xl rounded-lg shadow-lg m-0 sm:m-10 bg-white sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <Image
              src={logo}
              alt="logo"
              className="mx-auto"
              height={200}
              width={200}
            />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl xl:text-5xl font-extrabold">Sign in</h1>
            <span className="text-gray-600 text-lg mt-2">
              Don&apos;t have an account?
            </span>
            <Link
              href="/register"
              className="text-blue-600 text-lg underline hover:no-underline"
            >
              Register Now
            </Link>
            <div className="flex w-full justify-between mt-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMethodSelect("phoneNumber")}
                className={`w-1/2 py-4 border-2 rounded-lg mr-2 cursor-pointer transition-colors duration-200 ${
                  loginMethod === "phoneNumber"
                    ? "border-blue-600 text-gray-700"
                    : "border-gray-600"
                }`}
              >
                <div className="flex items-center px-4">
                  {loginMethod === "phoneNumber" ? (
                    <RadioButtonCheckedIcon className="text-blue-600 mr-2" />
                  ) : (
                    <RadioButtonUncheckedIcon className="text-gray-600 mr-2" />
                  )}
                  Phone Number
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMethodSelect("email")}
                className={`w-1/2 py-4 border-2 rounded-lg ml-2 cursor-pointer text-sm transition-colors duration-200 ${
                  loginMethod === "email"
                    ? "border-blue-600 text-gray-700"
                    : "border-gray-600"
                }`}
              >
                <div className="flex items-center px-4">
                  {loginMethod === "email" ? (
                    <RadioButtonCheckedIcon className="text-blue-600 mr-2" />
                  ) : (
                    <RadioButtonUncheckedIcon className="text-gray-600 mr-2" />
                  )}
                  Email
                </div>
              </motion.div>
            </div>
            <div className="w-full flex-1">
              <div className="my-4 border-b text-center">
                <Link
                  href={"/otpless/sendLink"}
                  className="leading-none px-2 inline-block text-md text-gray-600 mb-2 tracking-wide font-medium bg-white transform translate-y-1/2"
                >
                  Or sign in quickly with OtpLess
                </Link>
              </div>

              <div className="mx-auto max-w-xs">
                {loginMethod === "phoneNumber" && (
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                )}
                {loginMethod === "email" && (
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                )}
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="mt-5 tracking-wide font-semibold bg-blue-600 text-gray-100 w-full py-4 rounded-lg hover:bg-blue-800 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  onClick={handleLogin}
                  disabled={!loginMethod} // Disable button until a method is selected
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign In</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by earncharge&apos;s
                  <a
                    href="/terms"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Terms of Service
                  </a>
                  and its
                  <a
                    href="/policy"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
        <div className="flex-1 text-center hidden lg:flex items-center justify-center">
          <div className="">
            <Image src={login} alt="login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
