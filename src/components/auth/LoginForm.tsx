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
import IND from "@/../../public/IND.webp";
import { ArrowLeft } from "lucide-react";

const LoginForm: React.FC = () => {
  const [loginMethod, setLoginMethod] = useState<
    "phoneNumber" | "email" | null
  >("email");
  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    password: ""
  });

  const router = useRouter();
  const { setUser } = useUser();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Validate number input to ensure only digits are allowed
    if (/^\d*$/.test(value)) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleLogin = async () => {
    if (!loginMethod) {
      toast.error("Please select a login method.");
      return;
    }

    const payload = {
      [loginMethod === 'phoneNumber' ? 'phoneNumber' : 'email']: formData[loginMethod],
      password: formData.password
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`,
        payload,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const { accessToken, refreshToken, user } = response.data;
      setTokens(accessToken, refreshToken);
      setUser(user);
      toast.success("Login successful!");
      router.push("/profile");
    } catch (error: any) {
      toast.error(
        `Login failed. ${error.response?.data?.error || error.message}`
      );
    }
  };

  const handleMethodSelect = (selectedMethod: "phoneNumber" | "email") => {
    setLoginMethod(selectedMethod);
    setFormData({
      phoneNumber: "",
      email: "",
      password: ""
    }); // Reset form data when switching login methods
  };

  return (
    <>
      <ToastContainer />
      <div className="rounded-lg text-gray-900 flex justify-center min-h-screen">
        <div className="w-full max-w-screen-xl gap-10 rounded-lg m-0 sm:m-10 bg-white sm:rounded-lg flex flex-col lg:flex-row justify-center">
          <div className="flex-1 text-center hidden lg:flex items-center justify-center p-6">
            <div className="w-full max-w-md">
              <Image src={login} alt="login" className="rounded-3xl w-full h-auto" />
            </div>
          </div>
          <div className="w-full lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-center">
                Login to your account
              </h1>
              <p className="mt-2 text-center">Secure Access to Your Personal Dashboard</p>
              <Tabs defaultValue="email" className="w-full max-w-md mt-8">
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

                {/* Email Login Tab */}
                <TabsContent value="email">
                  <div className="flex flex-col items-center w-full">
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
                        maxLength={60}
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
                        maxLength={30}
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
                    <div className="hidden md:grid w-full max-w-sm items-center gap-1.5 mt-6">
                      <button
                        type="button"
                        onClick={() => router.push("/otpless/sendLink")}
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
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
                    <button
                      type="button"
                      className="p-2.5 rounded-2xl bg-white border-[1px] text-black focus:bg-zinc-100 font-semibold"
                    >
                      <Link href="/forgotpassword">Forgot Password?</Link>
                    </button>
                  </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                      <p className="text-sm text-center">
                        I agree to abide by EarnCharge{" "}
                        <Link href="/terms" className="font-semibold">
                          Terms Conditions
                        </Link>{" "}
                        &{" "}
                        <Link href="/policy" className="font-semibold">
                          Privacy Policy
                        </Link>
                      </p>
                    </div>
                  </div>
                </TabsContent>

                {/* Mobile Login Tab */}
                <TabsContent value="mobile">
                  <div className="flex flex-col items-center w-full">
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
                        />
                      </div>
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
                        maxLength={30}
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
                  </div>
                  <div className="hidden md:grid w-full max-w-sm items-center gap-1.5 mt-6">
                    <button
                      type="button"
                      className="p-2.5 rounded-2xl bg-white border-[1px] text-black focus:bg-zinc-100 font-semibold"
                    >
                      <Link href="/otpless/sendLink">Sign In without OTP</Link>
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
                  <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
                    <button
                      type="button"
                      className="p-2.5 rounded-2xl bg-white border-[1px] text-black focus:bg-zinc-100 font-semibold"
                    >
                      <Link href="/forgotpassword">Forgot Password?</Link>
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
