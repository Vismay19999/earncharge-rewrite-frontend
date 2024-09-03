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
    <>
      <div className="rounded-lg text-gray-900 flex justify-center">
        <div className="max-w-screen-xl gap-10 rounded-lg m-0 sm:m-10 bg-white sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/3 xl:w-5/12 p-6 sm:p-12">
            <div className="flex flex-col items-center">
              <h1 className="text-3xl xl:text-3xl font-extrabold">
                Register To Get Started
              </h1>
              <p>Secure Access to Your Personal Dashboard</p>

              <Tabs defaultValue="email" className="w-[400px] mt-8">
                <TabsList className="w-full">
                  <TabsTrigger value="email" className="w-full">
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="mobile" className="w-full">
                    Mobile
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="email">
                  <div className="flex flex-col items-center">
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
                            type="fname"
                            id="firstName"
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
                            type="lname"
                            id="lastName"
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
                            message: "Invalid email address",
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            type="email"
                            id="email"
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
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                      <button
                        type="submit"
                        className="transition p-2.5 rounded-2xl bg-[#0AA579] hover:bg-black text-white focus:bg-black font-semibold"
                        disabled={!method}
                      >
                        Sign Up
                      </button>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                      <button
                        type="button"
                        className="p-2.5 rounded-2xl bg-black text-white focus:bg-black font-semibold"
                        disabled={!method}
                      >
                        <Link href="/login">I want to login?</Link>
                      </button>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                      <p className="text-sm text-center">
                        I agree to abide by EarnCharge{" "}
                        <Link href="#" className="font-semibold">
                          {" "}
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
                      <Label htmlFor="fname" className="font-semibold">
                        First Name
                      </Label>
                      <Controller
                        name="firstName"
                        control={control}
                        rules={{ required: "First name is required" }}
                        render={({ field }) => (
                          <Input
                            type="fname"
                            id="firstName"
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
                            type="lname"
                            id="lastName"
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
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                      <Label htmlFor="email" className="font-semibold">
                        Phone
                      </Label>
                      <Controller
                        name="phoneNumber"
                        control={control}
                        rules={{ required: "Phone number is required" }}
                        render={({ field }) => (
                          <Input
                            type="text"
                            id="phoneNumber"
                            placeholder="8888866666"
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
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                      <button
                        type="submit"
                        className="transition p-2.5 rounded-2xl bg-[#0AA579] hover:bg-black text-white focus:bg-black font-semibold"
                        disabled={!method}
                      >
                        Sign Up
                      </button>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                      <button
                        type="button"
                        className="p-2.5 rounded-2xl bg-black text-white focus:bg-black font-semibold"
                        disabled={!method}
                      >
                        Already have account?
                      </button>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                      <p className="text-sm text-center">
                        I agree to abide by EarnCharge{" "}
                        <Link href="#" className="font-semibold">
                          {" "}
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
          <div className="flex-1 text-center hidden lg:flex items-center justify-center">
            <div className="p-10">
              <Image src={register} alt="login" className="rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
