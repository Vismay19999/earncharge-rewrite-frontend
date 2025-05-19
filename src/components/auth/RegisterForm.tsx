"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import register from "@/../public/reg.jpg";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IND from "@/../../public/IND.webp";
import { ToastContainer } from "react-toastify";

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
  const [method, setMethod] = useState<"email" | "phoneNumber">("phoneNumber");
  const [isMethodLocked, setIsMethodLocked] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      email: "",
      phoneNumber: "",
      password: "",
      firstName: "",
      lastName: ""
    }
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
    if (!isMethodLocked || selectedMethod === method) {
      setMethod(selectedMethod);
    }
  };

  const onSubmitHandler = (data: any) => {
    if (method) {
      onSubmit(method, data);
    }
  };

  return (
    <>
      <div className="rounded-lg text-gray-900 flex justify-center w-full">
        <div className="w-full max-w-screen-xl gap-10 rounded-lg m-0 sm:m-10 bg-white sm:rounded-lg flex flex-col lg:flex-row justify-center">
          <div className="w-full lg:w-1/2 xl:w-5/12 p-4 sm:p-6 lg:p-12">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl sm:text-3xl xl:text-3xl font-extrabold text-center">
                Register To Get Started
              </h1>
              <p className="text-center mt-2">Secure Access to Your Personal Dashboard</p>
              <form action="" onSubmit={handleSubmit(onSubmitHandler)} className="w-full max-w-sm">
                <Tabs
                  defaultValue={method === "phoneNumber" ? "mobile" : "email"}
                  className="w-full mt-8"
                >
                  <TabsList className="w-full">
                    <TabsTrigger
                      value="email"
                      className="w-full"
                      onClick={() => handleMethodSelect("email")}
                    >
                      Email
                    </TabsTrigger>
                    <TabsTrigger
                      value="mobile"
                      className="w-full"
                      onClick={() => handleMethodSelect("phoneNumber")}
                    >
                      Mobile
                    </TabsTrigger>
                  </TabsList>

                  {/* Email Registration */}
                  <TabsContent value="email">
                    <div className="grid w-full items-center gap-1.5 mt-6">
                      {/* First Name */}
                      <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                        <Label htmlFor="fname" className="font-semibold">
                          First Name
                        </Label>
                        <Controller
                          name="firstName"
                          control={control}
                          rules={{ required: "First name is required" }}
                          render={({ field }) => (
                            <Input
                              id="firstName"
                              maxLength={12}
                              placeholder="Enter Your First Name"
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

                      {/* Last Name */}
                      <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                        <Label htmlFor="lname" className="font-semibold">
                          Last Name
                        </Label>
                        <Controller
                          name="lastName"
                          control={control}
                          rules={{ required: "Last name is required" }}
                          render={({ field }) => (
                            <Input
                              id="lastName"
                              maxLength={12}
                              placeholder="Enter Your Last Name"
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

                      {/* Email */}
                      <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                        <Label htmlFor="email" className="font-semibold">
                          Email
                        </Label>
                        <Controller
                          name="email"
                          control={control}
                          rules={{
                            required: "Email is required",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Invalid email address"
                            }
                          }}
                          render={({ field }) => (
                            <Input
                              type="email"
                              id="email"
                              maxLength={60}
                              placeholder="someone@something.com"
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

                      {/* Password */}
                      <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                        <Label htmlFor="password" className="font-semibold">
                          Password
                        </Label>
                        <Controller
                          name="password"
                          control={control}
                          rules={{ required: "Password is required" }}
                          render={({ field }) => (
                            <Input
                              type="password"
                              id="password"
                              maxLength={30}
                              placeholder="Choose a Strong Password"
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
                    </div>
                  </TabsContent>

                  {/* Mobile Registration */}
                  <TabsContent value="mobile">
                    <div className="grid w-full items-center gap-1.5 mt-6">
                      {/* First Name */}
                      <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                        <Label htmlFor="fname" className="font-semibold">
                          First Name
                        </Label>
                        <Controller
                          name="firstName"
                          control={control}
                          rules={{ required: "First name is required" }}
                          render={({ field }) => (
                            <Input
                              id="firstName"
                              placeholder="Enter Your First Name"
                              maxLength={12}
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

                      {/* Last Name */}
                      <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                        <Label htmlFor="lname" className="font-semibold">
                          Last Name
                        </Label>
                        <Controller
                          name="lastName"
                          control={control}
                          rules={{ required: "Last name is required" }}
                          render={({ field }) => (
                            <Input
                              id="lastName"
                              placeholder="Enter Your Last Name"
                              maxLength={12}
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

                      {/* Phone Number */}
                      <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                        <Label htmlFor="phoneNumber" className="font-semibold">
                          Phone Number
                        </Label>
                        <Controller
                          name="phoneNumber"
                          control={control}
                          rules={{
                            required: "Phone number is required",
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message: "Phone number must be exactly 10 digits"
                            }
                          }}
                          render={({ field }) => (
                            <div className="relative">
                              <Image
                                src={IND}
                                alt="Flag"
                                className="absolute top-3.5 left-3"
                                width={20}
                                height={100}
                              />
                              <Input
                                type="tel"
                                maxLength={10}
                                id="phoneNumber"
                                placeholder="Enter Your Phone Number"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          )}
                        />
                        {errors.phoneNumber && (
                          <p className="text-red-500 text-sm">
                            {errors.phoneNumber.message}
                          </p>
                        )}
                      </div>

                      {/* Password */}
                      <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                        <Label htmlFor="password" className="font-semibold">
                          Password
                        </Label>
                        <Controller
                          name="password"
                          control={control}
                          rules={{ required: "Password is required" }}
                          render={({ field }) => (
                            <Input
                              type="password"
                              id="password"
                              maxLength={30}
                              placeholder="Choose a Strong Password"
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
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Submit Button */}
                <div className="grid w-full items-center gap-1.5 mt-6">
                  <button
                    className="transition p-2.5 rounded-2xl bg-[#0AA579] hover:bg-black text-white focus:bg-black font-semibold"
                    disabled={!method}
                    type="submit"
                  >
                    Register
                  </button>
                </div>
                {/* <div className="hidden md:grid w-full items-center gap-1.5 mt-6">
                  <button
                    type="button"
                    className="p-2.5 rounded-2xl bg-white border-[1px] text-black focus:bg-zinc-100 font-semibold"
                  >
                    <Link href="/otpless/sendLink">Sign In without OTP</Link>
                  </button>
                </div> */}
                <div className="grid w-full items-center gap-1.5 mt-5">
                  <button
                    type="button"
                    className="p-2.5 rounded-2xl bg-black text-white focus:bg-black font-semibold"
                  >
                    <Link href="/login">Already have an account?</Link>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Register Image */}
          <div className="w-full lg:w-1/2 text-center hidden lg:flex">
            <Image
              src={register}
              alt="Register"
              className="w-full h-full rounded-t-lg lg:rounded-l-lg lg:rounded-t-none object-cover"
            />
          </div>

          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
