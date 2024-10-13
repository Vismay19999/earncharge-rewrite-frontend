"use client";
import React from "react";
import UseAuthorization from "./UseAuthorization";
import Link from "next/link";
import Image from "next/image";
import login from "@/../public/log.jpg";
const AuthorizationClientSide = () => {
  const {
    isLoading,
    errorMessage,
    code,
    password,
    firstName,
    lastName,
    setPassword,
    setFirstName,
    setLastName,
    handleAuthorization
  } = UseAuthorization();

  if (typeof window === "undefined") {
    return null; // Return null on the server side
  }

  return (
    <>
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
                  Authorize Your Account
                </h1>
                <p>Secure Access to Your Personal Dashboard</p>
                <div className="flex flex-col items-center">
                  <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                    <div className="flex justify-center items-center">
                      {code ? (
                        <div className="w-full max-w-md bg-white rounded-lg">
                          <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                              First Name
                            </label>
                            <input
                              type="text"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                              placeholder="Enter first name"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                              Last Name
                            </label>
                            <input
                              type="text"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                              placeholder="Enter last name"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                              Password
                            </label>
                            <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                              placeholder="Enter password"
                            />
                          </div>
                          {isLoading ? (
                            <p className="text-center text-gray-500">
                              Authorizing...
                            </p>
                          ) : (
                            <>
                              {errorMessage && (
                                <p className="text-center text-red-500">
                                  {errorMessage}
                                </p>
                              )}
                              <button
                                className="p-2.5 rounded-2xl bg-[#0AA87E] text-white focus:bg-black font-semibold w-full"
                                onClick={handleAuthorization}
                              >
                                Authorize
                              </button>
                            </>
                          )}
                        </div>
                      ) : (
                        <p className="text-center text-gray-700">
                          No code found in the URL.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
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
    </>
  );
};

export default AuthorizationClientSide;
