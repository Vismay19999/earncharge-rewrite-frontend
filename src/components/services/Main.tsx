"use client";
import { useState, useRef } from 'react';
import { useUser } from "@/actions/UserContext/UserContext";
import Recharge from "@/components/core/Home/recharge";
import IndexRecharge from "@/components/recharge/IndexRecharge";
import IndexElectricityBBPS from "@/components/bbps/Electricity/IndexElectricityBBPS"
import IndexFastTagBBPS from "@/components/bbps/FastTag/IndexFastTagBBPS"
import IndexGasBBPS from "@/components/bbps/Gas/IndexGasBBPS"
import IndexWaterBBPS from "@/components/bbps/Water/IndexWaterBBPS"
import MobileContent from './MobileContent';
import Soon from './Soon';

import { AccountBalance, Add, CreditCard, DirectionsCar, ElectricBolt, Favorite, Fax, HomeWork, LocalGasStation, LocalHospital, MenuBook, PhoneAndroid, Propane, PropaneTank, Remove, Router, SatelliteAlt, Tv, UmbrellaOutlined, WaterDrop } from '@mui/icons-material';

// Define a type for the tab content and icons
interface Tab {
  content: JSX.Element;
  icon: JSX.Element;
}

const AllTabs = () => {
  const [currentTab, setCurrentTab] = useState<string>('Mobile');
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
    // DTH: { content: <Soon />, icon: <DTHIcon /> },
    // BroadBand: { content: <Soon />, icon: <BroadBandIcon /> },
    // Landline: { content: <Soon />, icon: <LandlineIcon /> },
    // Cable: { content: <Soon />, icon: <CableIcon /> },
    Electricity: { content: <IndexElectricityBBPS />, icon: <ElectricityIcon /> },
    Gas: { content: <IndexGasBBPS />, icon: <GasIcon /> },
    Water: { content: <IndexWaterBBPS />, icon: <WaterIcon /> },
    // Insurance: { content: <Soon />, icon: <InsuranceIcon /> },
    // Loan: { content: <Soon />, icon: <LoanIcon /> },
    // Cylinder: { content: <Soon />, icon: <GasCylinderIcon /> },
    // Education: { content: <Soon />, icon: <EducationIcon /> },
    FastTag: { content: <IndexFastTagBBPS />, icon: <FastTagIcon /> },
    // Life: { content: <Soon />, icon: <LifeIcon /> },
    // Housing: { content: <Soon />, icon: <HousingIcon /> },
    // LPG: { content: <Soon />, icon: <LPGIcon /> },
    // Hospital: { content: <Soon />, icon: <HospitalIcon /> },
    // Credit: { content: <Soon />, icon: <CreditIcon /> },
  };

  const renderTabs = () => {
    const tabsToRender = showDropdown
      ? Object.keys(tabs)
      : Object.keys(tabs).slice(0, 6);

    return tabsToRender.map((tab) => (
      <button
        key={tab}
        className={`text-left py-3 px-4 rounded-lg lg:rounded-l-lg ${currentTab === tab
          ? "bg-[#164B60] text-white shadow-lg"
          : "bg-white-200 text-gray-800"
          }`}
        onClick={() => handleTabClick(tab)}
      >
        {tabs[tab].icon}
        {tab}
      </button>
    ));
  };

  const renderRemainingTabs = () => {
    if (!showDropdown) return null;

    return (
      <div className="absolute z-10 bottom-auto top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg">
        <div className='grid grid-cols-3 lg:grid-cols-4 gap-10 p-4'>
          {Object.keys(tabs).slice(6).map((tab) => (
            <button
              key={tab}
              className={`flex-[1] p-4 rounded-lg ${currentTab === tab
                ? "bg-[#164B60] text-white"
                : "bg-white text-gray-800"
                }`}
              onClick={() => {
                handleTabClick(tab);
                if (showDropdown) {
                  setShowDropdown(!showDropdown);
                }
              }}
            >
              <div className='flex flex-col gap-2'>
                {tabs[tab].icon}
                {tab}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex flex-col p-4">
      <div>
        <div className="relative flex gap-10 lg:hidden">
          {Object.keys(tabs).slice(0, 2).map((tab) => (
            <button
              key={tab}
              className={`flex-[1] py-4 rounded-t-[10px] ${currentTab === tab
                ? "bg-[#131c23] text-white shadow-lg"
                : "bg-black text-gray-800"
                }`}
              onClick={() => handleTabClick(tab)}
            >
              <div className='flex flex-col gap-2'>
                {tabs[tab].icon}
                {tab}
              </div>
            </button>
          ))}
          <button
            className=" bg-white-200 text-gray-800"
            onClick={handleDropdownClick}
          >
            {showDropdown ? <Remove /> : <Add />}
          </button>
          {renderRemainingTabs()}
        </div>
        <div className="relative hidden gap-10 lg:flex">
          {Object.keys(tabs).slice(0, 6).map((tab) => (
            <button
              key={tab}
              className={`flex-[1] py-4 rounded-t-[10px] ${currentTab === tab
                ? "bg-[#131c23] text-white shadow-lg"
                : "border-t-[1px] border-x-[1px] text-gray-800"
                }`}
              onClick={() => handleTabClick(tab)}
            >
              <div className='flex flex-col gap-2'>
                {tabs[tab].icon}
                {tab}
              </div>
            </button>
          ))}
          <button
            className=" bg-white-200 text-gray-800"
            onClick={handleDropdownClick}
          >
            {showDropdown ? <Remove /> : <Add />}
          </button>
          {renderRemainingTabs()}
        </div>
      </div>
      <div ref={tabContentRef} className="flex-[4] p-4 bg-[#fffbf6] border-[1px] rounded-b-[10px]">
        {tabs[currentTab].content}
      </div>
    </div>
  );
};

// Define icons as components
const MobileIcon = () => <div><PhoneAndroid /></div>;
// const DTHIcon = () => <div><SatelliteAlt /></div>;
// const BroadBandIcon = () => <div><Router /></div>;
// const LandlineIcon = () => <div><Fax /></div>;
// const CableIcon = () => <div><Tv /></div>;
const ElectricityIcon = () => <div><ElectricBolt /></div>;
// const EducationIcon = () => <div><MenuBook /></div>;
const FastTagIcon = () => <div><DirectionsCar /></div>;
const WaterIcon = () => <div><WaterDrop /></div>;
// const LoanIcon = () => <div><AccountBalance /></div>;
// const InsuranceIcon = () => <div><UmbrellaOutlined /></div>;
const GasIcon = () => <div><PropaneTank /></div>;
// const LifeIcon = () => <div><Favorite /></div>;
// const HousingIcon = () => <div><HomeWork /></div>;
// const LPGIcon = () => <div><LocalGasStation /></div>;
// const HospitalIcon = () => <div><LocalHospital /></div>;
// const CreditIcon = () => <div><CreditCard /></div>;
// const GasCylinderIcon = () => <div><Propane /></div>;

export default AllTabs;
