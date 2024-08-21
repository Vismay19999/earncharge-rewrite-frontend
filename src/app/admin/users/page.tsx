import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '@/utils/auth'; // Assuming you have a utility to get the token

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = getAccessToken();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://api.earncharge.in/v1/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setUsers(response.data);
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
          <li key={index} className="mb-2">
            <div><strong>Name:</strong> {user.name}</div>
            <div><strong>Email:</strong> {user.email}</div>
            {/* Add more user fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsersPage;
