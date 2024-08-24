"use client";
import AddProviderCommision from "@/components/admin/ProvidersCommision/AddProviderCommision";
import DeleteProviderComponent from "@/components/admin/ProvidersCommision/DeleteProviderComponent";
import GetProviderCommission from "@/components/admin/ProvidersCommision/GetProviderCommision";
import UpdateProviderCommission from "@/components/admin/ProvidersCommision/UpdateProviderCommission";
import React from "react";

const AdminPage: React.FC = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Provider Commissions Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <AddProviderCommision />
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <GetProviderCommission />
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <UpdateProviderCommission />
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <DeleteProviderComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
