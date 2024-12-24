'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Wallet, Gift, Users, Smartphone, Tv, Phone, Droplet, Flame, Banknote, Zap, QrCode, Info } from "lucide-react";

const RechargeOptions = [
  { icon: Smartphone, label: "Mobile" },
  { icon: Tv, label: "DTH" },
  { icon: Tv, label: "Broadband" },
  { icon: Phone, label: "Landline" },
  { icon: Tv, label: "Cable" },
  { icon: Flame, label: "Gas" },
  { icon: Droplet, label: "Water" },
  { icon: Zap, label: "FasTag" },
  { icon: Banknote, label: "Loan" },
  { icon: Zap, label: "Electricity" },
];

const FeatureItems = [
  {
    icon: Wallet,
    title: "EarnCharge\nWallet",
    color: "#fff",
    bgColor: "#0F9D58",
  },
  {
    icon: Gift,
    title: "Explore\nRewards",
    color: "#fff",
    bgColor: "#0F9D58",
  },
  {
    icon: Users,
    title: "Refer &\nGet 10 Coins",
    color: "#fff",
    bgColor: "#0F9D58",
  }
];

const sliderData = [
  {
    title: "EarnCharge",
    heading: "Earn Coins",
    subtext: "Refer Your Friends",
    image: "/slider-image-1.jpg"
  },
  {
    title: "Special Offer",
    heading: "Get 50% Off",
    subtext: "On Your First Recharge",
    image: "/slider-image-2.jpg"
  },
  {
    title: "New Feature",
    heading: "Quick Pay",
    subtext: "Fast & Secure Payments",
    image: "/slider-image-3.jpg"
  }
];

const AppMain = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderData.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gray-50 mt-10">
      <main className="max-w-[480px] m-auto bg-white min-h-screen">
        <div className="flex flex-col px-5">
          <div className="relative w-full h-[200px] rounded-3xl overflow-hidden">
            <div 
              className={`absolute inset-0 p-6 flex flex-col justify-between z-10 transition-transform duration-300 ease-in-out ${
                isAnimating ? 'translate-y-[-10px] opacity-0' : 'translate-y-0 opacity-100'
              }`}
            >
              <div>
                <h1 className="text-white text-lg font-normal">{sliderData[currentSlide].title}</h1>
              </div>
              <div>
                <h2 className="text-white text-4xl font-bold">{sliderData[currentSlide].heading}</h2>
                <p className="text-white text-sm font-light">{sliderData[currentSlide].subtext}</p>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 flex gap-2 z-10">
              {sliderData.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? "bg-white scale-125" : "bg-white/50 scale-100"
                  }`}
                  onClick={() => {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setCurrentSlide(index);
                      setIsAnimating(false);
                    }, 300);
                  }}
                />
              ))}
            </div>
            <Image
              src={sliderData[currentSlide].image}
              alt="Banner"
              fill
              className={`object-cover rounded-3xl transition-all duration-300 ease-in-out ${
                isAnimating ? 'scale-105 opacity-80' : 'scale-100 opacity-100'
              }`}
            />
          </div>

          <div className="px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-gray-900">Recharge & Bharat Bill Payments</h3>
                <Info size={16} className="text-gray-400" />
              </div>
              <div className="flex items-center gap-2 text-gray-600 border rounded-full px-3 py-1">
                <span className="text-sm">vismay@okaxis</span>
                <QrCode size={16} />
              </div>
            </div>

            <div className="grid grid-cols-5 gap-6">
              {RechargeOptions.map((option, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-xl bg-white border shadow-sm flex items-center justify-center">
                    <option.icon size={24} className="text-gray-600" />
                  </div>
                  <span className="text-xs text-gray-600">{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 py-6 grid grid-cols-3 gap-4">
            {FeatureItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 p-4 rounded-xl"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                     style={{ backgroundColor: item.bgColor }}>
                  <item.icon size={24} className="text-white" />
                </div>
                <span className="text-sm font-medium text-center whitespace-pre-line">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </section>
  );
};

export default AppMain;
