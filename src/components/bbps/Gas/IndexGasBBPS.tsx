import React, { useState } from 'react';
import GasProvider from './GasProvider';
import IndexBillFlow from '../IndexBillFlow';

const IndexGasBBPS = () => {
    const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null); // State to track selected provider

    return (
        <div>
            {selectedProviderId ? (
                // Show IndexBillFlow when a provider is selected
                <IndexBillFlow providerId={selectedProviderId} />
            ) : (
                // Show GasProvider when no provider is selected
                <GasProvider onProviderSelect={(id) => setSelectedProviderId(id)} />
            )}
        </div>
    );
};

export default IndexGasBBPS;
