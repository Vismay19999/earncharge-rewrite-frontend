import React, { useState } from "react";
import GetRefferalTC from "./GetRefferalTC";
import GetCashbackTC from "./GetCashbackTC";
import GetPaymentsTC from "./GetPaymentsTC";

const IndexTransactions = () => {
  // Adding 'payments' as an option for the active tab
  const [activeTab, setActiveTab] = useState<
    "cashback" | "referral" | "payments"
  >("cashback");

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-4">
        <button
          className={`w-1/3 text-center py-2 focus:outline-none ${activeTab ===
          "cashback"
            ? "border-b-2 border-[#0AA87E] text-[#0AA87E] font-semibold"
            : "text-gray-600"}`}
          onClick={() => setActiveTab("cashback")}
        >
          Cashback
        </button>
        <button
          className={`w-1/3 text-center py-2 focus:outline-none ${activeTab ===
          "referral"
            ? "border-b-2 border-[#0AA87E] text-[#0AA87E] font-semibold"
            : "text-gray-600"}`}
          onClick={() => setActiveTab("referral")}
        >
          Referral
        </button>
        <button
          className={`w-1/3 text-center py-2 focus:outline-none ${activeTab ===
          "payments"
            ? "border-b-2 border-[#0AA87E] text-[#0AA87E] font-semibold"
            : "text-gray-600"}`}
          onClick={() => setActiveTab("payments")}
        >
          Payments
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 bg-white shadow rounded-lg">
        <div>
          {activeTab === "cashback" &&
            <div>
              <GetCashbackTC />
              <div className="md:hidden">
                <br />
                <br />
                <br />
              </div>
            </div>}
        </div>
        <div>
          {activeTab === "referral" &&
            <div>
              <GetRefferalTC />
              <div className="md:hidden">
                <br />
                <br />
                <br />
              </div>
            </div>}
        </div>
        <div>
          {activeTab === "payments" &&
            <div>
              <GetPaymentsTC />
              <div className="md:hidden">
                <br />
                <br />
                <br />
              </div>
            </div>}
        </div>
      </div>
    </div>
  );
};

export default IndexTransactions;
