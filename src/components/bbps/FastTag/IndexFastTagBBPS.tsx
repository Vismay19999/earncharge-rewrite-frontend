import React, { useState } from 'react';
import FastTagProvider from './FastTagProvider';
import IndexBillFlow from '../IndexBillFlow';

const IndexFastTagBBPS = () => {
    const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null); // State to track selected provider

    return (
        <div>
            {selectedProviderId ? (
                // Show IndexBillFlow when a provider is selected
                <IndexBillFlow  providerId={selectedProviderId}/>
            ) : (
                // Show FastTagProvider when no provider is selected
                <FastTagProvider onProviderSelect={(id) => setSelectedProviderId(id)} />
            )}
        </div>
    );
};

export default IndexFastTagBBPS;
