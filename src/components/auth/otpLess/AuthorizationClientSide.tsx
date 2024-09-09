"use client";
import React from "react";
import UseAuthorization from "./UseAuthorization";

const AuthorizationClientSide = () => {
  const {
    isLoading,
    errorMessage,
    code,
    password,
    firstName,
    lastName,
    setPassword,
    setFirstName,
    setLastName,
    handleAuthorization,
  } = UseAuthorization();

  if (typeof window === "undefined") {
    return null; // Return null on the server side
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {code ? (
        <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-xl font-semibold text-center mb-4">
            Authorization Form
          </h1>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              placeholder="Enter first name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              placeholder="Enter last name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              placeholder="Enter password"
            />
          </div>
          {isLoading ? (
            <p className="text-center text-gray-500">Authorizing...</p>
          ) : (
            <>
              {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                onClick={handleAuthorization}
              >
                Authorize
              </button>
            </>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-700">No code found in the URL.</p>
      )}
    </div>
  );
};

export default AuthorizationClientSide;
