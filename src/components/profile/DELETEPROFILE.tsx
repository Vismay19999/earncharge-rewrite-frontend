"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getAccessToken, logout } from "@/utils/auth";

const DELETEPROFILE: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchedToken = getAccessToken();
    if (fetchedToken) {
      setToken(fetchedToken);
    }
    console.log(fetchedToken);
  }, []);

  const handleDelete = async () => {
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    try {
      setLoading(true);
      await axios.delete("https://api.earncharge.in/v1/user/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        data: { password }
      });
      toast.success("Profile deleted successfully");
      logout();
      setIsOpen(false);

    setTimeout(() => {
        window.location.reload();
    }, 1000);
    } catch (error) {
      toast.error("Error deleting profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-profile">
      {token && (
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => setIsOpen(true)}
        >
          Delete Profile
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              Confirm Delete Profile
            </h2>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DELETEPROFILE;
