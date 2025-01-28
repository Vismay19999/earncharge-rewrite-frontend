import { getAccessToken } from '@/utils/auth';
import { MpinValidateRequest, MpinResetRequest, MpinSetRequest, MpinResponse } from '../types/mpin';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const mpinApi = {
  validate: async (data: MpinValidateRequest): Promise<MpinResponse> => {
    const response = await fetch(`${API_URL}/v1/auth/mpin/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    return response.json();
  },

  reset: async (data: MpinResetRequest): Promise<MpinResponse> => {
    const token = getAccessToken();
    const response = await fetch(`${API_URL}/v1/auth/mpin/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    
    return response.json();
  },

  set: async (data: MpinSetRequest): Promise<MpinResponse> => {
    const token = getAccessToken();
    const response = await fetch(`${API_URL}/v1/auth/mpin/set`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    
    return response.json();
  }
};