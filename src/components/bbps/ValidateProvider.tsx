"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/auth";

interface ValidationParam {
  name: string;
  placeholder: string;
}

interface ValidateProviderProps {
  providerId: string;
}

const ValidateProvider: React.FC<ValidateProviderProps> = ({ providerId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<ValidationParam[]>([]);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [billData, setBillData] = useState<any>(null);
  const [failureResponse, setFailureResponse] = useState(false);
  const accessToken = getAccessToken();

  useEffect(() => {
    const fetchValidationParams = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          "https://api.earncharge.in/v1/bbps/validate-provider",
          { providerID: providerId },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json"
            }
          }
        );

        if (
          response.data.status === "success" &&
          response.data.params[0].dataType === "NUMERIC"
        ) {
          setFailureResponse(true);
        } else if (response.data.status === "success") {
          console.log("Else IF Working")
          setParams(response.data.params);
          window.scrollTo(0, 0);
        } else {
          setError("Validation failed"); 
        }
      } catch (err: any) {
        setError("Error fetching validation params: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchValidationParams();
  }, [providerId, accessToken]);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const fetchBillDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://api.earncharge.in/v1/bbps/fetch-bill",
        {
          providerId,
          ...formData
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.status === "success") {
        setBillData(response.data);
        window.scrollTo(0, 0);
      } else {
        setError("Failed to fetch bill details");
      }
    } catch (err: any) {
      setError("Error fetching bill details: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && params.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Enter Details
          </h2>

          {params.map((param) => (
            <div key={param.name} className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                {param.placeholder}
              </label>
              <input
                type="text"
                value={formData[param.name] || ""}
                onChange={(e) => handleInputChange(param.name, e.target.value)}
                placeholder={param.placeholder}
                className="border border-gray-300 p-2 w-full"
              />
            </div>
          ))}

          <button
            onClick={fetchBillDetails}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Fetch Bill Details
          </button>
        </div>
      )}

      {failureResponse && (
        <div className="text-red-500 font-semibold mt-2">
          The requested information is not available.
        </div>
      )}

      {billData && (
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
      )}
    </div>
  );
};

export default ValidateProvider;
