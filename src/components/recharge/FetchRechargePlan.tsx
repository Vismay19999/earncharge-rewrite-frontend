import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/auth";
import PaymentRecharge from "./PaymentRecharge";
import { IoMdRefresh } from "react-icons/io";

interface Plan {
  plan_name: string;
  price: number;
  talktime: string;
  data: string;
  sms: string;
}

interface GroupedPlans {
  group_name: string;
  plans: Plan[];
}

interface FetchRechargePlanProps {
  operator: string;
  circle: string;
  providerId: string;
}

const FetchRechargePlan: React.FC<FetchRechargePlanProps> = ({
  operator,
  circle,
  providerId
}) => {
  const [plans, setPlans] = useState<GroupedPlans[]>([]);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0); // Default to the first group
  const [loading, setLoading] = useState(false);
  const accessToken = getAccessToken();

  const fetchRechargePlan = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.earncharge.in/v1/recharge/plans",
        {
          operator,
          circle
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Add your Authorization key
            "Content-Type": "application/json"
          }
        }
      );

      const data = response.data;
      if (data && data.length > 0) {
        setPlans(data); // Assuming data is an array of grouped plans
        setActiveGroupIndex(0); // Set first group as active by default
      } else {
        console.warn("No plans found for the selected operator and circle.");
      }
    } catch (error) {
      console.error("Failed to fetch recharge plans", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRechargePlan();
  }, [operator, circle, providerId]); // Fetch plans whenever operator or circle changes

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={fetchRechargePlan}
          disabled={loading}
          className={`px-4 py-2 text-xs rounded ${
            loading ? "bg-gray-300" : "bg-black text-white"
          }`}
        >
          {loading ? "Fetching..." : <IoMdRefresh />}
        </button>
      </div>

      {/* Group navigation */}
      <div className="w-[300px] m-auto lg:w-[400px] overflow-y-hidden mb-5 overflow-x-scroll">
        {plans.length > 0 && (
          <div className="flex space-x-2 mb-2">
            {plans.map((group, index) => (
              <button
                key={index}
                className={`px-2 py-2 rounded text-xs ${
                  index === activeGroupIndex
                    ? "bg-white text-black border-[1px] rounded-lg"
                    : "bg-black text-white border-[1px] border-black rounded-lg"
                }`}
                id="scrollbar"
                onClick={() => setActiveGroupIndex(index)}
              >
                {group.group_name}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Display plans for the active group */}
      {plans.length > 0 && plans[activeGroupIndex] && (
        <div>
          <div className="mb-4 p-4 border-[1px] border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {plans[activeGroupIndex].group_name} Plans
            </h3>
            <ul>
              {plans[activeGroupIndex].plans.map((plan, idx) => (
                <li key={idx} className="mb-4">
                  <div className="p-4 bg-white rounded-lg shadow">
                    <p className="font-bold block mb-2">{plan.plan_name}</p>
                    <div className="flex flex-col gap-1">
                      <p className="flex flex-wrap text-sm">
                        <strong className="flex-[3]">Price</strong>{" "}
                        <div className="flex-[7]">Rs {plan.price}</div>
                      </p>
                      <p className="flex flex-wrap text-sm">
                        <strong className="flex-[3]">Talktime</strong>{" "}
                        <div className="flex-[7]">{plan.talktime}</div>
                      </p>
                      <p className="flex flex-wrap text-sm">
                        <strong className="flex-[3]">Data</strong>{" "}
                        <div className="flex-[7]">{plan.data}</div>
                      </p>
                      <p className="flex flex-wrap text-sm">
                        <strong className="flex-[3]">SMS</strong>{" "}
                        <div className="flex-[7]">{plan.sms}</div>
                      </p>
                    </div>
                    {/* PaymentRecharge Component */}
                    <PaymentRecharge
                      planPrice={plan.price}
                      providerId={providerId}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchRechargePlan;
