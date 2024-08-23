import React, { useState } from "react";

const Recharge = () => {
  const [showMore, setShowMore] = useState(false);

  const services = [
    { name: "Mobile Recharge", icon: "📱" },
    { name: "Mobile Postpaid", icon: "💸" },
    { name: "Electricity", icon: "💡" },
    { name: "DTH", icon: "📡" },
    { name: "FASTag Recharge", icon: "🚗" },
    { name: "Gift Cards", icon: "🎁" },
  ];

  const extraServices = [
    { name: "Landline", icon: "☎️" },
    { name: "Water Bill", icon: "🚰" },
    { name: "Broadband", icon: "🌐" },
    { name: "Gas Bill", icon: "🔥" },
    { name: "Insurance", icon: "📜" },
    { name: "Education", icon: "🎓" },
    { name: "Cable TV", icon: "📺" },
    { name: "Municipal Taxes", icon: "🏠" },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 rounded-lg bg-[#fffcf8]">
      <h1 className="text-[#131c23] font-bold text-3xl text-center">
        Recharges & Bill Payments
      </h1>
      <p className="text-center text-gray-600 mt-2">
        Enjoy lightning-fast payments, exciting rewards, and seamless
        transactions on every recharge & bill payment
      </p>

      <div className="grid grid-cols-6 gap-4 mt-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center h-48 justify-center bg-white p-4 rounded-lg shadow-md"
          >
            <div className="text-4xl mb-2">{service.icon}</div>
            <p className="text-md text-gray-700">{service.name}</p>
          </div>
        ))}

        {showMore &&
          extraServices.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center h-48 justify-center bg-white p-4 rounded-lg shadow-md"
            >
              <div className="text-4xl mb-2">{service.icon}</div>
              <p className="text-sm text-gray-700">{service.name}</p>
            </div>
          ))}
      </div>

      <div className="flex justify-center mt-6">
        {!showMore ? (
          <button
            className="px-6 py-2 bg-white text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition"
            onClick={() => setShowMore(true)}
          >
            View All
          </button>
        ) : (
          <button
            className="px-6 py-2 bg-white text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition"
            onClick={() => setShowMore(false)}
          >
            View Less
          </button>
        )}
      </div>
    </div>
  );
};

export default Recharge;
