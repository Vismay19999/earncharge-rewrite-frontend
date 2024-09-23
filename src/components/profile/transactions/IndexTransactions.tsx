import React, { useState } from 'react';
import GetRefferalTC from './GetRefferalTC';
import GetCashbackTC from './GetCashbackTC';

const IndexTransactions = () => {
  const [activeTab, setActiveTab] = useState<'cashback' | 'referral'>('cashback');

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-4">
        <button
          className={`w-1/2 text-center py-2 focus:outline-none ${
            activeTab === 'cashback' ? 'border-b-2 border-blue-500 text-blue-500 font-semibold' : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('cashback')}
        >
          Cashback
        </button>
        <button
          className={`w-1/2 text-center py-2 focus:outline-none ${
            activeTab === 'referral' ? 'border-b-2 border-blue-500 text-blue-500 font-semibold' : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('referral')}
        >
          Referral
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 bg-white shadow rounded-lg">
        {activeTab === 'cashback' && <GetCashbackTC />}
        {activeTab === 'referral' && <GetRefferalTC />}
      </div>
    </div>
  );
};

export default IndexTransactions;
