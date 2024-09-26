import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    // Name validation (minimum length of 2)
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation (basic email format check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Message validation (minimum length of 10)
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);

      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      setIsSubmitted(true);
      setErrors({});
    } else {
      setErrors(validationErrors);
      setIsSubmitted(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md border-[#131c23] border-b-[10px]">
      <h2 className="text-4xl font-semibold mb-4 text-[#222]">Ask Us?</h2>
      {isSubmitted && (
        <p className="text-green-500 mb-4">Your message has been sent successfully!</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="What's Your Name?"
            value={formData.name}
            onChange={handleInputChange}
            className={`border ${errors.name ? 'border-red-500' : 'border-[#eee]'} rounded px-4 py-2 w-full focus:outline-none focus:border-[#eee]`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email?"
            value={formData.email}
            onChange={handleInputChange}
            className={`border ${errors.email ? 'border-red-500' : 'border-[#eee]'} rounded px-4 py-2 w-full focus:outline-none focus:border-[#eee]`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <textarea
            id="message"
            name="message"
            placeholder="Your Query"
            value={formData.message}
            onChange={handleInputChange}
            className={`border ${errors.message ? 'border-red-500' : 'border-[#eee]'} rounded px-4 py-2 w-full h-24 resize-none focus:outline-none focus:border-[#eee]`}
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
        </div>
        <button
          type="submit"
          className="transition bg-[#28d066] text-block rounded-full border-black w-full border-[1px] font-semibold px-6 py-4 hover:text-white hover:bg-[#131c23] 
          focus:outline-none focus:bg-[#131c23]"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
