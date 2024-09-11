import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
}

const FetchRechargePlan: React.FC<FetchRechargePlanProps> = ({ operator, circle }) => {
  const [plans, setPlans] = useState<GroupedPlans[]>([]);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0); // Default to the first group
  const [loading, setLoading] = useState(false);

  const fetchRechargePlan = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://api.earncharge.in/v1/recharge/plans',
        {
          operator,
          circle,
        },
        {
          headers: {
            Authorization: 'Bearer YOUR_API_KEY_HERE', // Add your Authorization key
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data;
      if (data && data.length > 0) {
        setPlans(data); // Assuming data is an array of grouped plans
        setActiveGroupIndex(0); // Set first group as active by default
        toast.success('Recharge plans fetched successfully!');
      } else {
        toast.warn('No plans found for the selected operator and circle.');
      }
    } catch (error) {
      toast.error('Failed to fetch recharge plans');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRechargePlan();
  }, [operator, circle]); // Fetch plans whenever operator or circle changes

  return (
    <div>
      {/* <ToastContainer /> */}
      <div className="mb-4">
        <button
          onClick={fetchRechargePlan}
          disabled={loading}
          className={`px-4 py-2 rounded ${loading ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
        >
          {loading ? 'Fetching...' : 'Fetch Recharge Plan'}
        </button>
      </div>

      {/* Group navigation */}
      {plans.length > 0 && (
        <div className="flex space-x-4 mb-6">
          {plans.map((group, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded ${
                index === activeGroupIndex ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveGroupIndex(index)}
            >
              {group.group_name}
            </button>
          ))}
        </div>
      )}

      {/* Display plans for the active group */}
      {plans.length > 0 && plans[activeGroupIndex] && (
        <div>
          <div className="mb-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {plans[activeGroupIndex].group_name} Plans
            </h3>
            <ul>
              {plans[activeGroupIndex].plans.map((plan, idx) => (
                <li key={idx} className="mb-4">
                  <div className="p-4 bg-white rounded-lg shadow">
                    <p><strong>Plan Name:</strong> {plan.plan_name}</p>
                    <p><strong>Price:</strong> Rs {plan.price}</p>
                    <p><strong>Talktime:</strong> {plan.talktime}</p>
                    <p><strong>Data:</strong> {plan.data}</p>
                    <p><strong>SMS:</strong> {plan.sms}</p>
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
