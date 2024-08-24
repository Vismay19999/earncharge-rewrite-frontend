import React, { useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '@/utils/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteProviderComponent: React.FC = () => {
    const [provider, setProvider] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete = async () => {
        setLoading(true);
        const token = getAccessToken();

        try {
            await axios.delete('https://api.earncharge.in/v1/admin/remove-provider', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                data: {
                    provider,
                },
            });

            toast.success('Provider removed successfully!');
            setProvider('');

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast.error('Failed to remove provider');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Delete Provider</h1>
            <input
                type="text"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                placeholder="Enter provider name"
                className="border p-2 rounded mb-4"
            />
            <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                disabled={loading}
            >
                {loading ? 'Deleting...' : 'Delete Provider'}
            </button>
            <ToastContainer />
        </div>
    );
};

export default DeleteProviderComponent;
