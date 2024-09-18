"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";
import { setTokens } from "@/utils/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/actions/UserContext/UserContext";
import login from "@/../public/log.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const [loginMethod, setLoginMethod] = useState<
    "phoneNumber" | "email" | null
  >(null);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    password: "",
  });

  const router = useRouter()
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
            "Content-Type": "application/json",
          },
        }
      );

      const { accessToken, refreshToken, user } = response.data;
      setTokens(accessToken, refreshToken);
      setUser(user);
      toast.success("Login successful!");
      router.push("/profile")
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  const handleMethodSelect = (selectedMethod: "phoneNumber" | "email") => {
    setLoginMethod(selectedMethod);
  };

  return (
    <>
      <div className="rounded-lg text-gray-900 flex justify-center">
        <div className="max-w-screen-xl gap-10 rounded-lg m-0 sm:m-10 bg-white sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 text-center hidden lg:flex items-center justify-center">
            <div className="p-10">
              <Image src={login} alt="login" className="rounded-3xl" />
            </div>
          </div>
          <div className="lg:w-1/3 xl:w-5/12 p-6 sm:p-12">
            <div className="flex flex-col items-center">
              <h1 className="text-3xl xl:text-3xl font-extrabold">
                Login to your account
              </h1>
              <p>Secure Access to Your Personal Dashboard</p>
              <Tabs defaultValue="email" className="w-[400px] mt-8">
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
                <TabsContent value="email">
                  <div className="flex flex-col items-center">
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
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
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                      <Label htmlFor="password" className="font-semibold">
                        Password
                      </Label>
                      <Input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Your Credentials"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                      <button
                        type="button"
                        className="transition p-2.5 rounded-2xl bg-[#0AA579] hover:bg-black text-white focus:bg-black font-semibold"
                        onClick={handleLogin}
                      >
                        Sign In
                      </button>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                      <button
                        type="button"
                        className="p-2.5 rounded-2xl bg-white border-[1px] text-black focus:bg-zinc-100 font-semibold"
                      >
                        <Link href="/otpless/sendLink">
                          Sign In without OTP
                        </Link>
                      </button>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                      <button
                        type="button"
                        className="p-2.5 rounded-2xl bg-black text-white focus:bg-black font-semibold"
                      >
                        <Link href="/register">I want to register?</Link>
                      </button>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                      <p className="text-sm text-center">
                        I agree to abide by EarnCharge{" "}
                        <Link href="#" className="font-semibold">
                          Terms Conditions
                        </Link>{" "}
                        &{" "}
                        <Link href="#" className="font-semibold">
                          Privacy Policy
                        </Link>
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="mobile">
                  <div className="flex flex-col items-center">
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                      <Label htmlFor="mobile" className="font-semibold">
                        Mobile
                      </Label>
                      <Input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="8888855544"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                      <Label htmlFor="password" className="font-semibold">
                        Password
                      </Label>
                      <Input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Your Credentials"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                      <button
                        type="button"
                        className="transition p-2.5 rounded-2xl bg-[#0AA579] hover:bg-black text-white focus:bg-black font-semibold"
                        onClick={handleLogin}
                        disabled={!loginMethod} // Disable button until a method is selected
                      >
                        Sign In
                      </button>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                      <button
                        type="button"
                        className="p-2.5 rounded-2xl bg-white border-[1px] text-black focus:bg-zinc-100 font-semibold"
                      >
                        <Link href="/otpless/sendLink">
                          Sign In without OTP
                        </Link>
                      </button>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
                      <button
                        type="button"
                        className="p-2.5 rounded-2xl bg-black text-white focus:bg-black font-semibold"
                      >
                        <Link href="/register">I want to register?</Link>
                      </button>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                      <p className="text-sm text-center">
                        I agree to abide by EarnCharge{" "}
                        <Link href="#" className="font-semibold">
                          Terms Conditions
                        </Link>{" "}
                        &{" "}
                        <Link href="#" className="font-semibold">
                          Privacy Policy
                        </Link>
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
