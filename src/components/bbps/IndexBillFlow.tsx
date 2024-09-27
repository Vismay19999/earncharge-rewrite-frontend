import React, { useState } from "react";
import ValidateProvider from "./ValidateProvider";
import PaymentBBPS from "./PaymentBBPS";

const IndexBillFlow = ({ providerId }: { providerId: string }) => {
  // State to store optional fields from bill data, allowing string or null
  const [optionalData, setOptionalData] = useState<{
    optional1: string | null;
    optional2: string | null;
    optional3: string | null;
    optional4: string | null;
  }>({
    optional1: null,
    optional2: null,
    optional3: null,
    optional4: null
  });

  const [billAmount, setBillAmount] = useState<string | null>(null); // State to store the amount
  const [showPayment, setShowPayment] = useState(false); // State to show/hide PaymentBBPS

  // Callback to receive optional data and amount from ValidateProvider
  const handleOptionalData = (
    data: {
      optional1: string | null;
      optional2: string | null;
      optional3: string | null;
      optional4: string | null;
    },
    amount: string
  ) => {
    setOptionalData(data);
    setShowPayment(true);
    setBillAmount(amount); // Store the amount received from the bill data
  };

  return (
    <div>
      {providerId && (
        <div>
          <ValidateProvider
            providerId={providerId}
            onOptionalData={handleOptionalData}
          />
        </div>
      )}

      {/* Show the PaymentBBPS component when the button is clicked */}
      {showPayment && billAmount && (
        <PaymentBBPS
          providerId={providerId}
          optional1={optionalData.optional1}
          optional2={optionalData.optional2}
          amount={billAmount}
        />
      )}
    </div>
  );
};

export default IndexBillFlow;
