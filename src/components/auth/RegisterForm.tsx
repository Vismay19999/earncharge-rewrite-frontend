"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import register from "@/../public/register.png";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/logo.png";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

interface RegisterFormProps {
  onSubmit: (
    method: "email" | "phoneNumber",
    formData: {
      email: string;
      phoneNumber: string;
      password: string;
      firstName: string;
      lastName: string;
    }
  ) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [method, setMethod] = useState<"email" | "phoneNumber" | null>(
    "phoneNumber"
  );
  const [isMethodLocked, setIsMethodLocked] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      phoneNumber: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const watchEmail = watch("email");
  const watchPhoneNumber = watch("phoneNumber");

  // Lock method switch if email or phone number has been entered
  useEffect(() => {
    if (watchEmail || watchPhoneNumber) {
      setIsMethodLocked(true);
    }
  }, [watchEmail, watchPhoneNumber]);

  const handleMethodSelect = (selectedMethod: "email" | "phoneNumber") => {
    if (!isMethodLocked) {
      setMethod(selectedMethod);
    }
  };

  const onSubmitHandler = (data: any) => {
    if (method) {
      onSubmit(method, data);
    }
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
            <h1 className="text-3xl xl:text-5xl font-extrabold">Sign Up</h1>
            <span className="text-gray-600 text-lg mt-2">
              Already having an account?
            </span>
            <Link
              href="/login"
              className="text-blue-600 text-lg underline hover:no-underline"
            >
              Login Now
            </Link>
            <div className="flex w-full justify-between mt-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMethodSelect("phoneNumber")}
                className={`w-1/2 py-4 border-2 rounded-lg mr-2 cursor-pointer transition-colors duration-200 
                ${
                  method === "phoneNumber"
                    ? "border-blue-600 text-gray-700"
                    : "border-gray-600"
                } ${isMethodLocked ? "cursor-not-allowed opacity-50" : ""}`}
              >
                <div className="flex items-center px-4">
                  {method === "phoneNumber" ? (
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
                  method === "email"
                    ? "border-blue-600 text-gray-700"
                    : "border-gray-600"
                } ${isMethodLocked ? "cursor-not-allowed opacity-50" : ""}`}
              >
                <div className="flex items-center px-4">
                  {method === "email" ? (
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
                  Or sign up quickly with OtpLess
                </Link>
              </div>

              <div className="mx-auto max-w-xs">
                <div>
                  <Controller
                    name="firstName"
                    control={control}
                    rules={{ required: "First name is required" }}
                    render={({ field }) => (
                      <input
                        type="text"
                        id="firstName"
                        placeholder="Enter your first name"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        {...field}
                      />
                    )}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <Controller
                    name="lastName"
                    control={control}
                    rules={{ required: "Last name is required" }}
                    render={({ field }) => (
                      <input
                        type="text"
                        id="lastName"
                        placeholder="Enter your last name"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        {...field}
                      />
                    )}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                {method === "phoneNumber" && (
                  <div>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      rules={{ required: "Phone number is required" }}
                      render={({ field }) => (
                        <input
                          type="text"
                          id="phoneNumber"
                          placeholder="Enter your phone number"
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                          {...field}
                        />
                      )}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                )}

                {method === "email" && (
                  <div>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      }}
                      render={({ field }) => (
                        <input
                          type="email"
                          id="email"
                          placeholder="Enter your email"
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                          {...field}
                        />
                      )}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                )}
                <div>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Password is required" }}
                    render={({ field }) => (
                      <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        {...field}
                      />
                    )}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  className="mt-5 tracking-wide font-semibold bg-blue-600 text-gray-100 w-full py-4 rounded-lg hover:bg-blue-800 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  disabled={!method} // Disable button until a method is selected
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
                  <span className="ml-3">Sign Up</span>
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
            <Image src={register} alt="login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
