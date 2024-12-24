"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MobileContent from "./MobileContent";
import IndexElectricityBBPS from "@/components/bbps/Electricity/IndexElectricityBBPS";
import IndexFastTagBBPS from "@/components/bbps/FastTag/IndexFastTagBBPS";
import IndexGasBBPS from "@/components/bbps/Gas/IndexGasBBPS";
import IndexWaterBBPS from "@/components/bbps/Water/IndexWaterBBPS";
import {
  PhoneAndroid,
  ElectricBolt,
  DirectionsCar,
  WaterDrop,
  PropaneTank,
  ArrowBack,
  Home
} from "@mui/icons-material";

interface ServiceItem {
  id: string;
  icon: JSX.Element;
  label: string;
  content: JSX.Element;
  bgColor: string;
}

const MobileAppMenu: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);

  const services: ServiceItem[] = [
    {
      id: "mobile",
      icon: <PhoneAndroid className="text-3xl" />,
      label: "Mobile",
      content: <MobileContent />,
      bgColor: "bg-blue-500"
    },
    {
      id: "electricity",
      icon: <ElectricBolt className="text-3xl" />,
      label: "Electricity",
      content: <IndexElectricityBBPS />,
      bgColor: "bg-yellow-500"
    },
    {
      id: "gas",
      icon: <PropaneTank className="text-3xl" />,
      label: "Gas",
      content: <IndexGasBBPS />,
      bgColor: "bg-green-500"
    },
    {
      id: "water",
      icon: <WaterDrop className="text-3xl" />,
      label: "Water",
      content: <IndexWaterBBPS />,
      bgColor: "bg-blue-400"
    },
    {
      id: "fastag",
      icon: <DirectionsCar className="text-3xl" />,
      label: "FasTag",
      content: <IndexFastTagBBPS />,
      bgColor: "bg-purple-500"
    }
  ];

  const handleServiceClick = (service: ServiceItem) => {
    setSelectedService(service);
    setIsModalOpen(true);
    setIsNavigating(true);
  };

  const closeModal = () => {
    setIsNavigating(false);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedService(null);
    }, 300);
  };

  // Handle back button
  useEffect(() => {
    const handlePopState = () => {
      if (isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isModalOpen]);

  return (
    <div className="relative bg-white rounded-t-[40px]">
      {/* Grid Layout */}
      <motion.div
        className="container mx-auto p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.button
              key={service.id}
              onClick={() => handleServiceClick(service)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-sm
                         hover:shadow-md transition-all duration-300 ${service.bgColor} bg-opacity-10`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ y: -2 }}
            >
              <motion.div
                className={`mb-2 ${service.bgColor} text-white p-3 rounded-full`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {service.icon}
              </motion.div>
              <span className="text-sm font-medium text-gray-700">
                {service.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Modal/Screen for Service Content */}
      <AnimatePresence>
        {isModalOpen && selectedService && (
          <motion.div
            className="fixed inset-0 bg-white z-50"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* Modal Navigation Bar */}
            <div className="sticky top-0 z-10 bg-white shadow-sm">
              <div className="flex items-center p-4">
                <motion.button
                  onClick={closeModal}
                  className="mr-4"
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowBack className="text-2xl text-gray-700" />
                </motion.button>
                <div className="flex items-center gap-2">
                  <div
                    className={`p-2 rounded-full ${selectedService.bgColor}`}
                  >
                    {selectedService.icon}
                  </div>
                  <h2 className="text-lg font-semibold">
                    {selectedService.label}
                  </h2>
                </div>
              </div>
            </div>

            {/* Service Content */}
            <motion.div
              className="p-4 h-[calc(100vh-64px)] overflow-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {selectedService.content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Indicator */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-gray-200"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

export default MobileAppMenu;
