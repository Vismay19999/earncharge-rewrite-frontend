import React, { useState } from "react";
import WaterProvider from "./WaterProvider";
import IndexBillFlow from "../IndexBillFlow";

const IndexWaterBBPS = () => {
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);

  return (
    <div>
      {selectedProviderId ? (
        // Show IndexBillFlow when a provider is selected
        <IndexBillFlow providerId={selectedProviderId} />
      ) : (
        // Show WaterProvider until a provider is clicked
        <WaterProvider onProviderSelect={(id) => setSelectedProviderId(id)} />
      )}
    </div>
  );
};

export default IndexWaterBBPS;
