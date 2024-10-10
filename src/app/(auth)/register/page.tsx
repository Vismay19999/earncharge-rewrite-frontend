"use client";
import React, { useState } from 'react';
import axios from 'axios';
import RegisterForm from '@/components/auth/RegisterForm';
import OtpHandlerEmail from '@/components/auth/authService/OtpHandlerEmail';
import OtpHandlerPhone from '@/components/auth/authService/OtpHandlerPhone';
import Success from '@/components/auth/authExtras/AuthSuccess';
import Failure from '@/components/auth/authExtras/AuthFailure';
import { useUser } from '@/actions/UserContext/UserContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


const RegistrationPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [contactMethod, setContactMethod] = useState<'email' | 'phoneNumber' | null>(null);
  const [contactValue, setContactValue] = useState<string>('');
  const [registrationSuccess, setRegistrationSuccess] = useState<boolean | null>(null);

  const { user } = useUser();
  const router = useRouter();


  const handleFormSubmit = async (method: 'email' | 'phoneNumber', formData: {
    email: string;
    phoneNumber: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      const registrationData = {
        [method]: method === 'email' ? formData.email : formData.phoneNumber,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };

      console.log(registrationData)

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/register`, registrationData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setContactMethod(method);
      setContactValue(method === 'email' ? formData.email : formData.phoneNumber);
      setStep(2);
      setRegistrationSuccess(true);
    } catch (error : any) {
      console.error(error);
      // setRegistrationSuccess(false); 
      toast.error(`Registration failed. Please try again. ${error.response.data.message}`);
      setStep(4)
    }
  };

  const handleOtpSuccess = () => {
    setStep(3);
  };

  const handleOtpFailure = () => {
    setStep(4);
  };


  if (user) {
    router.push('/profile')
  }

  return (
    <div className="">
      {step === 1 && <RegisterForm onSubmit={handleFormSubmit} />}
      {step === 2 && contactMethod === 'email' && (
        <OtpHandlerEmail email={contactValue} onSuccess={handleOtpSuccess} onFailure={handleOtpFailure} />
      )}
      {step === 2 && contactMethod === 'phoneNumber' && (
        <OtpHandlerPhone phoneNumber={contactValue} onSuccess={handleOtpSuccess} onFailure={handleOtpFailure} />
      )}
      {step === 3 && <Success />}
      {step === 4 && <Failure />}
      {registrationSuccess === false && <Failure />}
    </div>
  );
};

export default RegistrationPage;
