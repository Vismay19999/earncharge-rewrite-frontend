import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getAccessToken } from '@/utils/auth';
import { FaQrcode } from 'react-icons/fa'; 

const WithdrawQR = () => {
  const [loading, setLoading] = useState(false);

  const handleWithdrawQR = async () => {
    try {
      setLoading(true);
      const accessToken = getAccessToken();
      
      const response = await axios.get(
        'https://api.earncharge.in/v1/user/wallet/referal/withdraw/qr',
        {
          headers: {
               Authorization: `Bearer ${accessToken}`
          },
        }
      );

      toast.success('QR code generated successfully');
      
    } catch (error: any) {
      // Enhanced error handling
      if (error.response?.status === 400 && error.response?.data?.message?.includes('Minimum wallet balance')) {
        toast.error('⚠️ Insufficient Balance', {
          autoClose: 4000,
          style: {
            background: '#FEF2F2',
            color: '#991B1B',
            padding: '16px',
          },
          icon: <span>₹</span>,
        });
      } else {
        toast.error(error.response?.data?.message || 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2">
      <button
        onClick={handleWithdrawQR}
        disabled={loading}
  
      >
        <FaQrcode className="text-xl" />
      </button>
    </div>
  );
};

export default WithdrawQR;