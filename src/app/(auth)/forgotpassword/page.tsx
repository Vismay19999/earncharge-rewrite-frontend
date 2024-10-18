"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import forgotPasswordImage from "@/../../public/register.png"; // Make sure to add this image
import IND from "@/../../public/IND.webp";
import OtpVerification from "@/components/auth/OtpVerification";

const ForgotPassword = () => {
  const [activeTab, setActiveTab] = useState<"email" | "phoneNumber">("email");
  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: ""
  });
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { [activeTab]: formData[activeTab] };
      await axios.post(
        "https://api.earncharge.in/v1/user/forgot-password",
        payload
      );
      toast.success("OTP sent successfully!");
      setShowOtpVerification(true);
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleCloseOtpVerification = () => {
    setShowOtpVerification(false);
    router.push("/");
  };

  return (
    <>
      <ToastContainer />
      <div className="rounded-lg text-gray-900 flex justify-center items-center">
        <div className="max-w-screen-xl gap-10 rounded-lg m-0 sm:m-10 bg-white sm:rounded-lg items-center flex justify-center flex-1">
          <div className="flex-1 text-center hidden lg:flex items-center justify-center ">
            <div className="p-10">
              <Image
                src={forgotPasswordImage}
                alt="Forgot Password"
                className="rounded-3xl"
              />
            </div>
          </div>
          <div className="lg:w-1/3 xl:w-5/12 p-6 sm:p-12">
            <div className="flex flex-col items-center">
              <h1 className="text-3xl xl:text-3xl font-extrabold">
                Forgot Password
              </h1>
              <p>Reset your account password</p>
              <Tabs
                value={activeTab}
                onValueChange={(value) =>
                  setActiveTab(value as "email" | "phoneNumber")
                }
                className="w-[400px] mt-8"
              >
                <TabsList className="w-full">
                  <TabsTrigger value="email" className="w-full">
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="phoneNumber" className="w-full">
                    Mobile
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email">
                  <form onSubmit={handleSubmit}>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6 p-2">
                      <Label htmlFor="email" className="font-semibold">
                        Email
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="someone@something.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        maxLength={60}
                        required
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                      <button
                        type="submit"
                        className="transition p-2.5 rounded-2xl bg-[#0AA579] hover:bg-black text-white focus:bg-black font-semibold"
                      >
                        Reset Password
                      </button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="phoneNumber">
                  <form onSubmit={handleSubmit}>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                      <Label htmlFor="phoneNumber" className="font-semibold">
                        Mobile
                      </Label>
                      <div className="relative">
                        <Image
                          src={IND}
                          alt="Flag"
                          className="absolute top-3.5 left-3"
                          width={20}
                          height={100}
                        />
                        <Input
                          type="text"
                          id="phoneNumber"
                          name="phoneNumber"
                          className="pl-10"
                          placeholder="8888855544"
                          value={formData.phoneNumber}
                          onChange={handleNumberInputChange}
                          maxLength={10}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                      <button
                        type="submit"
                        className="transition p-2.5 rounded-2xl bg-[#0AA579] hover:bg-black text-white focus:bg-black font-semibold"
                      >
                        Reset Password
                      </button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                <p className="text-sm text-center">
                  By resetting your password, you agree to EarnCharges&apos;s{" "}
                  <Link href="#" className="font-semibold">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="font-semibold">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showOtpVerification && (
        <OtpVerification
          phoneNumber={
            activeTab === "phoneNumber" ? formData.phoneNumber : undefined
          }
          email={activeTab === "email" ? formData.email : undefined}
          onClose={handleCloseOtpVerification}
        />
      )}
    </>
  );
};

export default ForgotPassword;
