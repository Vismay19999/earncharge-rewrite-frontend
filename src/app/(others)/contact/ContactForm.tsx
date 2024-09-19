import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);

    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md border-[#131c23] border-b-[10px]">
      <h2 className="text-4xl font-semibold mb-4 text-[#222]">Ask Us?</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="What's Your Name?"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="border border-[#eee] rounded px-4 py-2 w-full focus:outline-none focus:border-[#eee]"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email?"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="border border-[#eee] rounded px-4 py-2 w-full focus:outline-none focus:border-[#eee]"
          />
        </div>
        <div className="mb-4">
          <textarea
            id="message"
            name="message"
            placeholder="Your Query"
            value={formData.message}
            onChange={handleInputChange}
            required
            className="border border-[#eee] rounded px-4 py-2 w-full h-24 resize-none focus:outline-none focus:border-[#eee]"
          />
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
