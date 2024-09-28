"use client";
import PaymentsIndex from "@/components/recharge/payments/PaymentsIndex";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";

// Define the type for the fetched parameters
type SearchParamsFetcherProps = {
  onParamsFetched: (amount: string | null, providerId: string | null) => void;
};

// Create a separate component for fetching search params
const SearchParamsFetcher: React.FC<SearchParamsFetcherProps> = ({ onParamsFetched }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const fetchedAmount = searchParams.get("amount");
    const fetchedProviderId = searchParams.get("providerId");

    onParamsFetched(fetchedAmount, fetchedProviderId);
  }, [pathname, searchParams, onParamsFetched]);

  return null; // This component doesn't render anything
};

const Page: React.FC = () => {
  const [amount, setAmount] = useState<string | null>(null);
  const [providerId, setProviderId] = useState<string | null>(null);

  const handleParamsFetched = (fetchedAmount: string | null, fetchedProviderId: string | null) => {
    setAmount(fetchedAmount);
    setProviderId(fetchedProviderId);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsFetcher onParamsFetched={handleParamsFetched} />
      <div className="max-w-[450px] m-auto mt-10 mb-10">
      <div className="flex flex-wrap gap-10 w-full">
        <div className="flex-[2]">
          {amount && providerId && (
            <PaymentsIndex amount={amount} provider={providerId} />
          )}
        </div>
      </div>
      </div>
    </Suspense>
  );
};

export default Page;
