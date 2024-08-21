"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '@/utils/auth'; // Assuming you have a utility to get the token

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = getAccessToken(); // Replace this with the actual method to get the token

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://api.earncharge.in/v1/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setUsers(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load user data.');
        setLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    } else {
      setError('No access token available.');
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index} className="mb-4 p-4 border rounded-md shadow">
            <div><strong>ID:</strong> {user.id}</div>
            <div><strong>Phone Number:</strong> {user.phoneNumber}</div>
            <div><strong>Email:</strong> {user.email ? user.email : 'N/A'}</div>
            <div><strong>First Name:</strong> {user.userData.firstName}</div>
            <div><strong>Last Name:</strong> {user.userData.lastName}</div>
            <div><strong>Role:</strong> {user.userData.role}</div>
            <div><strong>Email Verification Status:</strong> {user.userData.email_verification_status ? 'Verified' : 'Not Verified'}</div>
            <div><strong>Phone Verification Status:</strong> {user.userData.phone_verification_status ? 'Verified' : 'Not Verified'}</div>
            <div><strong>Reference ID:</strong> {user.userData.referenceID}</div>
            <div><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsersPage;
