"use client";
import PaymentsIndex from "@/components/recharge/payments/PaymentsIndex";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState<string | null>(null);
  const [providerId, setProviderId] = useState<string | null>(null);

  useEffect(() => {
    const fetchedAmount = searchParams.get("amount");
    const fetchedProviderId = searchParams.get("providerId");

    if (fetchedAmount) {
      setAmount(fetchedAmount);
    }
    if (fetchedProviderId) {
      setProviderId(fetchedProviderId);
    }
  }, [pathname, searchParams]);

  return (
    <div className="flex flex-row justify-center items-start w-full">
      <div>
        {amount && providerId && (
          <PaymentsIndex amount={amount} provider={providerId} />
        )}
        {/* <PaymentsIndex amount={amount} provider={providerId} />  */}
      </div>
      <div>
        <p>Amount: {amount}</p>
        <p>Provider ID: {providerId}</p>
      </div>
    </div>
  );
};

export default Page;
