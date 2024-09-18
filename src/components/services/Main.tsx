"use client";
import { useState, useRef } from "react";
import MobileContent from './MobileContent';
import IndexElectricityBBPS from "@/components/bbps/Electricity/IndexElectricityBBPS";
import IndexFastTagBBPS from "@/components/bbps/FastTag/IndexFastTagBBPS";
import IndexGasBBPS from "@/components/bbps/Gas/IndexGasBBPS";
import IndexWaterBBPS from "@/components/bbps/Water/IndexWaterBBPS";
import { Add, Remove, PhoneAndroid, ElectricBolt, DirectionsCar, WaterDrop, PropaneTank } from "@mui/icons-material";

// Define a type for the tab content and icons
interface Tab {
  content: JSX.Element;
  icon: JSX.Element;
}

const AllTabs = () => {
  const [currentTab, setCurrentTab] = useState<string>("Mobile");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const tabContentRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tab: string) => {
    setCurrentTab(tab);
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  // Define the tabs with their respective content and icons
  const tabs: Record<string, Tab> = {
    Mobile: { content: <MobileContent />, icon: <MobileIcon /> },
    Electricity: { content: <IndexElectricityBBPS />, icon: <ElectricityIcon /> },
    Gas: { content: <IndexGasBBPS />, icon: <GasIcon /> },
    Water: { content: <IndexWaterBBPS />, icon: <WaterIcon /> },
    FastTag: { content: <IndexFastTagBBPS />, icon: <FastTagIcon /> },
  };

  const renderTabs = (visibleTabs: string[]) => {
    return visibleTabs.map((tab) => (
      <button
        key={tab}
        className={`text-left flex flex-1 items-center justify-center p-4 rounded-lg lg:rounded-l-lg transition-all duration-200 ${
          currentTab === tab
            ? "bg-[#164B60] text-white shadow-lg"
            : "bg-white-200 text-gray-800 hover:bg-gray-100 hover:shadow"
        }`}
        onClick={() => handleTabClick(tab)}
      >
        <div className="flex flex-col items-center gap-2">
          {tabs[tab].icon}
          <span className="text-sm font-medium">{tab}</span>
        </div>
      </button>
    ));
  };

  const renderRemainingTabs = () => {
    const remainingTabs = Object.keys(tabs).slice(2);

    if (!showDropdown) return null;

    return (
      <div className="absolute z-10 top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {renderTabs(remainingTabs)}
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex flex-col p-4">
      {/* Mobile View - Show first 2 tabs + dropdown */}
      <div className="relative flex gap-2 lg:hidden">
        {renderTabs(Object.keys(tabs).slice(0, 2))}
        <button
          className="flex items-center justify-center bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-200"
          onClick={handleDropdownClick}
        >
          {showDropdown ? <Remove /> : <Add />}
        </button>
        {renderRemainingTabs()}
      </div>

      {/* Desktop View - Show first 6 tabs */}
      <div className="relative hidden lg:flex gap-10">
        {renderTabs(Object.keys(tabs).slice(0, 6))}
        <button
          className="flex items-center justify-center bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-200"
          onClick={handleDropdownClick}
        >
          {showDropdown ? <Remove /> : <Add />}
        </button>
        {renderRemainingTabs()}
      </div>

      {/* Tab content */}
      <div
        ref={tabContentRef}
        className="flex-[4] p-4 bg-[#fffbf6] border-[1px] rounded-b-[10px]"
      >
        {tabs[currentTab].content}
      </div>
    </div>
  );
};

// Define icons as components
const MobileIcon = () => <PhoneAndroid className="text-2xl" />;
const ElectricityIcon = () => <ElectricBolt className="text-2xl" />;
const GasIcon = () => <PropaneTank className="text-2xl" />;
const WaterIcon = () => <WaterDrop className="text-2xl" />;
const FastTagIcon = () => <DirectionsCar className="text-2xl" />;

export default AllTabs;
