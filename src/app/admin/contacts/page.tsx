import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@/actions/UserContext/UserContext';
import { getAccessToken } from '@/utils/auth';

const AdminContactDataPage: React.FC = () => {
  const [contactData, setContactData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = getAccessToken();

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get('https://api.earncharge.in/v1/admin/contact-data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContactData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching contact data:', err);
        setError('Failed to load contact data.');
        setLoading(false);
      }
    };

    if (token) {
      fetchContactData();
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
      <h1 className="text-2xl font-bold mb-4">Contact Data</h1>
      <ul>
        {contactData.map((contact, index) => (
          <li key={index} className="mb-2">
            <div><strong>Name:</strong> {contact.name}</div>
            <div><strong>Email:</strong> {contact.email}</div>
            <div><strong>Subject:</strong> {contact.subject}</div>
            <div><strong>Message:</strong> {contact.message}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminContactDataPage;
