// BillDetails.tsx
import React from "react";

interface BillDetailsProps {
  billData: any; // You can define a more specific type if needed
}

const BillDetails: React.FC<BillDetailsProps> = ({ billData }) => {
  return (
    <div className="mt-4 p-4 border border-green-500">
      <h3 className="text-lg font-bold">Bill Details:</h3>
      <div className="mt-2">
        <p>
          <strong>Provider Name:</strong> {billData.provider_name}
        </p>
        <p>
          <strong>Number:</strong> {billData.number}
        </p>
        <p>
          <strong>Amount:</strong> ₹{billData.amount}
        </p>
        <p>
          <strong>Name:</strong> {billData.name}
        </p>
        <p>
          <strong>Due Date:</strong>{" "}
          {new Date(billData.duedate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default BillDetails;
