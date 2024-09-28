"use client";
import React, { useState } from "react";
import axios from "axios";
import { useUser } from "@/actions/UserContext/UserContext";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import iconLogo from "@/../../public/icon.png";
import Social from "@/../../public/Social.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
const Page = () => {
  const { user } = useUser();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  React.useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);

  const handleSendLink = async () => {
    try {
      const response = await axios.post(
        "https://api.earncharge.in/v1/auth/otpless/sendlink",
        {
          phoneNumber: phoneNumber.toString()
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      toast.success("Link sent successfully!");
      window.location.href = response.data.requestIds[0].destinationUri;
    } catch (error: any) {
      toast.error("Error sending link: " + error.message);
    }
  };

  if (user) {
    router.push("/profile");
  }

  return (
    <>
      <div className="rounded-lg text-gray-900 flex justify-center">
        <div className="max-w-screen-xl gap-10 rounded-lg m-0 sm:m-10 bg-white sm:rounded-lg flex justify-center flex-1 items-center">
          <div className="flex-1 hidden lg:flex items-center">
            <div className="p-20">
              <Image src={iconLogo} alt="Icon" width={64} />
              <h1 className="p-2 text-5xl font-semibold pb-4 leading-[60px]">
                Sign in without{" "}
                <span className="font-bold">Passwords/OTPs.</span>
              </h1>
              <Image src={Social} alt="login" width={400} />
            </div>
          </div>
          <div className="lg:w-1/3 xl:w-5/16 p-6 sm:p-12 border-[1px] m-10 rounded-xl shadow-xl">
            <div className="flex flex-col items-center">
              <h1 className="text-3xl xl:text-3xl font-extrabold">
                Lets Sign In...
              </h1>

              <Input
                type="text"
                maxLength={10}
                value={phoneNumber}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  setPhoneNumber(numericValue);
                }}
                placeholder="Enter your phone number"
                className="border p-2 rounded mt-4 w-full"
              />

              <button
                onClick={handleSendLink}
                className="mt-4 bg-black p-2 border-[1px] rounded-xl w-full text-white"
              >
                Continue
              </button>
              <ToastContainer />

              <div className="flex flex-col items-center">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
