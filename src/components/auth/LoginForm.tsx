"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";
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
    <div className="flex items-center">
      <div className="shadow-lg rounded-lg bg-white flex w-full overflow-hidden">
        {/* Left side with info */}
        <div className="w-1/2 bg-white p-8 hidden md:flex flex-col justify-center">
          <Image src={login} alt="login image" layout="responsive" />
        </div>

        {/* Right side with form */}
        <div className="w-full md:w-1/2 p-8 max-w-lg mx-auto">
          <h2 className="text-5xl font-semibold mb-4">Sign In</h2>
          <div className="mb-8">
            <span className="text-gray-600 text-lg">
              Don&apos;t have a account?
            </span>
            <Link
              href={"/register"}
              className="text-blue-600 text-lg underline hover:no-underline"
            >
              Register Here
            </Link>
          </div>

          {/* Method Selection */}
          <div className="flex justify-between mb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMethodSelect("phoneNumber")}
              className={`w-1/2 py-4 border-2 rounded-lg mr-2 cursor-pointer text-lg transition-colors duration-200 ${
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
              className={`w-1/2 py-4 border-2 rounded-lg ml-2 cursor-pointer text-lg transition-colors duration-200 ${
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

          {/* Login Form */}
          <form onSubmit={(e) => e.preventDefault()}>
            {loginMethod === "phoneNumber" && (
              <div className="mb-4">
                <label className="block text-xl mb-2" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {loginMethod === "email" && (
              <div className="mb-4">
                <label className="block text-xl mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            )}

            <div className="mb-6">
              <label className="block text-xl mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <Link
                href={"/otpless/sendlink"}
                className="text-blue-600 hover:underline"
              >
                <button
                  type="button"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Sign in with otpless
                </button>
              </Link>
            </div>
            <button
              type="button"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              onClick={handleLogin}
              disabled={!loginMethod} // Disable button until a method is selected
            >
              Sign Up
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
