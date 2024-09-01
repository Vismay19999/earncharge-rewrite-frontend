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
        <div className="max-w-screen-xl rounded-lg m-0 sm:m-10 bg-white sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="flex flex-col items-center">
              <h1 className="text-3xl xl:text-3xl font-extrabold">Register To Get Started</h1>
              <p>Secure Access to Your Personal Dashboard</p>
            </div>
          </div>
            <div className="flex-1 text-center hidden lg:flex items-center justify-center">
              <div className="">
                <Image src={register} alt="login" />
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
