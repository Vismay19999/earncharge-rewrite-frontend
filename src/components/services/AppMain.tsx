"use client"
import React, { useState, useEffect } from "react";
import { 
  Wallet, Gift, Users, Smartphone, Tv, Phone, 
  Droplet, Flame, Banknote, Zap, QrCode, Info,
  ChevronRight, ArrowLeft
} from "lucide-react";
import { 
  Card,
  CardContent,
} from "@/components/ui/card";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Link from "next/link";
import MobileContent from "./MobileContent";
import IndexElectricityBBPS from "@/components/bbps/Electricity/IndexElectricityBBPS";
import IndexFastTagBBPS from "@/components/bbps/FastTag/IndexFastTagBBPS";
import IndexGasBBPS from "@/components/bbps/Gas/IndexGasBBPS";
import IndexWaterBBPS from "@/components/bbps/Water/IndexWaterBBPS";
import { Add, Remove, PhoneAndroid, ElectricBolt, DirectionsCar, WaterDrop, PropaneTank } from "@mui/icons-material";
import GasProvider from "../bbps/Gas/GasProvider";
import { getAccessToken } from "@/utils/auth";

// Types
interface ServiceItem {
  id: string;
  icon: React.ElementType;
  label: string;
  bgColor: string;
  content: React.ReactNode;
}

interface SliderItem {
  id: string;
  title: string;
  heading: string;
  subtext: string;
  bgColor: string;
}

interface FeatureItem {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  bgColor: string;
}

// Constants
const SERVICES: ServiceItem[] = [
  {
    id: "mobile",
    icon: Smartphone,
    label: "Mobile",
    bgColor: "bg-blue-500",
    content: <MobileContent />
  },
  {
    id: "electricity",
    icon: ElectricBolt,
    label: "Electric",
    bgColor: "bg-purple-500",
    content: <IndexElectricityBBPS />
  },
  {
    id: "fastag",
    icon: DirectionsCar,
    label: "FastTag",
    bgColor: "bg-orange-500",
    content: <IndexFastTagBBPS />
  },
  {
    id: "gas",
    icon: Flame,
    label: "Gas",
    bgColor: "bg-green-500",
    content: <IndexGasBBPS />,
  },
  {
    id: "water",
    icon: Droplet,
    label: "Water",
    bgColor: "bg-blue-400",
    content: <IndexWaterBBPS />
  }
];

const FEATURES: FeatureItem[] = [
  {
    id: "wallet",
    icon: Wallet,
    title: "EarnCharge Wallet",
    subtitle: "Quick secure payments",
    bgColor: "bg-[#0F9D58]"
  },
  {
    id: "rewards",
    icon: Gift,
    title: "Explore Rewards",
    subtitle: "Exclusive deals for you",
    bgColor: "bg-[#0F9D58]"
  },
  {
    id: "refer",
    icon: Users,
    title: "Refer & Earn",
    subtitle: "Get 10 Coins per referral",
    bgColor: "bg-[#0F9D58]"
  }
];

const SLIDER_ITEMS: SliderItem[] = [
  {
    id: "earn-coins",
    title: "EarnCharge",
    heading: "Earn Coins",
    subtext: "Refer Your Friends",
    bgColor: "bg-gradient-to-br from-blue-600 to-blue-800"
  },
  {
    id: "special-offer",
    title: "Special Offer",
    heading: "Get 50% Off",
    subtext: "On Your First Recharge",
    bgColor: "bg-gradient-to-br from-green-600 to-green-800"
  },
  {
    id: "quick-pay",
    title: "New Feature",
    heading: "Quick Pay",
    subtext: "Fast & Secure Payments",
    bgColor: "bg-gradient-to-br from-purple-600 to-purple-800"
  }
];

// Main Component
const AppMain = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const token = getAccessToken();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white min-h-screen relative">
      <main className="max-w-md mx-auto bg-white min-h-screen ">
        {/* Header */}
        <div className="px-5 py-6 space-y-8">
          {/* Hero Slider */}
          <div className="relative w-full h-52 rounded-2xl overflow-hidden">
            <div className={`absolute inset-0 ${SLIDER_ITEMS[currentSlide].bgColor} transition-all duration-500`}>
              <div className="h-full p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-white text-sm font-medium">
                    {SLIDER_ITEMS[currentSlide].title}
                  </span>
                </div>
                <div>
                  <h2 className="text-white text-4xl font-bold mb-2">
                    {SLIDER_ITEMS[currentSlide].heading}
                  </h2>
                  <p className="text-white/90 text-base">
                    {SLIDER_ITEMS[currentSlide].subtext}
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-6 right-6 flex gap-2">
              {SLIDER_ITEMS.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 
                    ${currentSlide === index ? "bg-white scale-125" : "bg-white/50 scale-100"}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-5 relative">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Services
              </button>
            </div>
            <div className={`grid grid-cols-3 gap-6 ${!token ? 'blur-sm' : ''}`}>
              {SERVICES.map((service) => (
                <button 
                  key={service.id}
                  onClick={() => token && setSelectedService(service)}
                  className={`group focus:outline-none ${!token ? 'pointer-events-none' : ''}`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`w-16 h-16 rounded-2xl ${service.bgColor} bg-opacity-80 
                      group-hover:bg-opacity-20 transition-all duration-200 flex items-center 
                      justify-center group-hover:shadow-lg group-hover:-translate-y-1`}>
                      <service.icon size={28} className={`text-opacity-70`} />
                    </div>
                    <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 
                      transition-colors">
                      {service.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Login overlay */}
            {!token && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Link
                  href="/login"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg 
                    font-medium shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  Login to Access Services
                </Link>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-900">Special Features</h3>
            <div className="grid grid-cols-1 gap-4">
              {FEATURES.map((feature) => (
                <Card 
                  key={feature.id} 
                  className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  <CardContent className="p-5">
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 
                        ${feature.bgColor}`}>
                        <feature.icon size={26} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-lg mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.subtitle}</p>
                      </div>
                      <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-600 
                        transition-colors shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Service Modal */}
        <Sheet open={!!selectedService} onOpenChange={() => ""}>
          <SheetContent className="w-full max-w-md mx-auto">
            <div className="px-4 overflow-y-scroll h-[480px]">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedService?.label}
                </h2>
              </div>
              <div className="mt-10">
                {selectedService?.content}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </main>
    </div>
  );
};

export default AppMain;
