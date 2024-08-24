"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface FormData {
  name: string;
  email: string;
  message: string;
  subject: string;
}

const ContactPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();


  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        'https://api.earncharge.in/v1/contact/send',
        data,
        {
          headers: {
            Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with your actual token
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Response:', response.data);
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            {...register('name', { required: 'Name is required' })}
            className="border p-2 w-full"
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            {...register('email', { required: 'Email is required' })}
            className="border p-2 w-full"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium">
            Subject
          </label>
          <input
            id="subject"
            {...register('subject', { required: 'Subject is required' })}
            className="border p-2 w-full"
            placeholder="Enter the subject"
          />
          {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            {...register('message', { required: 'Message is required' })}
            className="border p-2 w-full"
            placeholder="Enter your message"
            rows={5}
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
