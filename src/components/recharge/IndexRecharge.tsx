import React, { useState } from "react";
import FindOperatorCircleByPH from "./FindOperatorCircleByPH";
import FetchRechargePlan from "./FetchRechargePlan"; // Correct import of FetchRechargePlan
import { ToastContainer } from "react-toastify";

const IndexRecharge = () => {
  const [operator, setOperator] = useState<string | null>(null);
  const [circle, setCircle] = useState<string | null>(null);
  const [providerId, setProviderId] = useState<string | null>(null);
  // Callback function to handle operator and circle
  const handleOperatorData = (
    operator: string,
    circle: string,
    provider: string
  ) => {
    setOperator(operator);
    setProviderId(provider);
    setCircle(circle);
    console.log("Operator:", operator, "Circle:", circle);
  };

  return (
    <div>
      <FindOperatorCircleByPH onOperatorData={handleOperatorData} />

      {/* Display collected operator and circle */}
      {operator && circle && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg mb-2">
          <p className="text-gray-700">
            <strong>Operator:</strong> {operator}
          </p>
          <p className="text-gray-700">
            <strong>Circle:</strong> {circle}
          </p>
        </div>
      )}
      {operator && circle && providerId && (
        <>
          <FetchRechargePlan
            operator={operator}
            providerId={providerId}
            circle={circle}
          />
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default IndexRecharge;
