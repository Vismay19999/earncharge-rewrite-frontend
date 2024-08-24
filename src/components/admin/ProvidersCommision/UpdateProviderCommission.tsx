import React, { useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '@/utils/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProviderCommission: React.FC = () => {
    const [provider, setProvider] = useState<string>('');
    const [percentage, setPercentage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const token = getAccessToken();

        try {
            await axios.post(
                'https://api.earncharge.in/v1/admin/update-provider',
                { provider, percentage },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            toast.success('Provider commission updated successfully!');
            setProvider('');
            setPercentage('');

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast.error('Failed to update provider commission');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Update Provider Commission</h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label className="mb-2">
                    Provider:
                    <input
                        type="text"
                        value={provider}
                        onChange={(e) => setProvider(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />
                </label>
                <label className="mb-2">
                    Percentage:
                    <input
                        type="text"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />
                </label>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Update Provider'}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default UpdateProviderCommission;
