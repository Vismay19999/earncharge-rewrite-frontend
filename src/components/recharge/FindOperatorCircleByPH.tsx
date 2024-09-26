import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  onOperatorData: (operator: string, circle: string, provider: string) => void; // Callback prop
}

const FindOperatorCircleByPH: React.FC<Props> = ({ onOperatorData }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [operatorInfo, setOperatorInfo] = useState<{
    operator: string;
    circle: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFindOperator = async () => {
    setLoading(true); // Start the loader
    try {
      const response = await axios.post(
        "https://api.earncharge.in/v1/recharge/find-operator",
        { phoneNumber },
        {
          headers: {
            Authorization: `Bearer YOUR_ACCESS_TOKEN`,
            "Content-Type": "application/json"
          }
        }
      );
      const { operator, circle, operatorCode } = response.data;
      setOperatorInfo({ operator, circle });
      toast.success(`Successfully fetched data.`);

      // Call the callback function to pass data to the parent
      onOperatorData(operator, circle, operatorCode);
    } catch (error: any) {
      toast.error("Error finding operator: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Find Operator by Phone Number
      </h2>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => {
          const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
          if (value.length <= 10) {
            setPhoneNumber(value); // Set phone number if length is 10 or less
          }
        }}
        placeholder="Enter phone number"
        className="border p-2 rounded w-full mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleFindOperator}
        className={`transition text-sm p-2 w-full rounded text-white ${
          loading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
        }`}
        disabled={loading}
      >
        {loading ? "Searching..." : "Find Operator and Circle"}
      </button>

    </div>
  );
};

export default FindOperatorCircleByPH;
