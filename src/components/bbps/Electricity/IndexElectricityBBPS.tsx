import React, { useState } from 'react';
import ElectricityProvider from './ElectricityProvider';
import IndexBillFlow from '../IndexBillFlow'; // Import the IndexBillFlow component

const IndexElectricityBBPS = () => {
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null); // State to track the selected provider

  return (
    <div>
      {selectedProviderId ? (
        <IndexBillFlow providerId={selectedProviderId} />
      ) : (
        <ElectricityProvider onProviderSelect={(id) => setSelectedProviderId(id)} />
      )}
    </div>
  );
};

export default IndexElectricityBBPS;
