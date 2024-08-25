'use client'
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

interface RegisterFormProps {
  onSubmit: (method: 'email' | 'phoneNumber', formData: {
    email: string;
    phoneNumber: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [method, setMethod] = useState<'email' | 'phoneNumber' | null>('phoneNumber');
  const [isMethodLocked, setIsMethodLocked] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      email: '',
      phoneNumber: '',
      password: '',
      firstName: '',
      lastName: ''
    }
  });

  const watchEmail = watch('email');
  const watchPhoneNumber = watch('phoneNumber');

  // Lock method switch if email or phone number has been entered
  useEffect(() => {
    if (watchEmail || watchPhoneNumber) {
      setIsMethodLocked(true);
    }
  }, [watchEmail, watchPhoneNumber]);

  const handleMethodSelect = (selectedMethod: 'email' | 'phoneNumber') => {
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
    <div className="flex h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        {/* Method Selection */}
        <div className="flex justify-between mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleMethodSelect('phoneNumber')}
            className={`w-1/2 text-center py-4 border rounded-lg mr-2 cursor-pointer transition-colors duration-200 ${method === 'phoneNumber' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
              } ${isMethodLocked ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            Phone Number
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleMethodSelect('email')}
            className={`w-1/2 text-center py-4 border rounded-lg ml-2 cursor-pointer transition-colors duration-200 ${method === 'email' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
              } ${isMethodLocked ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            Email
          </motion.div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          {method === 'phoneNumber' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="phoneNumber">
                Phone Number
              </label>
              <Controller
                name="phoneNumber"
                control={control}
                rules={{ required: 'Phone number is required' }}
                render={({ field }) => (
                  <input
                    type="text"
                    id="phoneNumber"
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    {...field}
                  />
                )}
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
            </div>
          )}

          {method === 'email' && (
            <div className="mb-4">
              <label className="block text-sm mb-2" htmlFor="email">
                Email
              </label>
              <Controller
                name="email"
                control={control}
                rules={{ required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' } }}
                render={({ field }) => (
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    {...field}
                  />
                )}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <Controller
              name="password"
              control={control}
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...field}
                />
              )}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="firstName">
              First Name
            </label>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: 'First name is required' }}
              render={({ field }) => (
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter your first name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...field}
                />
              )}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="lastName">
              Last Name
            </label>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: 'Last name is required' }}
              render={({ field }) => (
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter your last name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...field}
                />
              )}
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>

          <div>
            <p>Already have an account?<Link className='text-blue-600' href={"/login"}> Login now</Link></p>
            <p>Use<Link className='text-blue-600' href={"/otpless/sendLink"}> OTPless</Link></p>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
            disabled={!method}  // Disable button until a method is selected
          >
            Register
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default RegisterForm;
