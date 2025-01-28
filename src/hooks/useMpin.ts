// hooks/useMpin.ts

import { getAccessToken } from '@/utils/auth';
import { useState, useCallback } from 'react';
import axios from 'axios';

interface MpinState {
  isModalOpen: boolean;
  mpin: string;
  error: string | null;
  loading: boolean;
  isValid: boolean;
  attempts: number;
}

interface UseMpinOptions {
  maxAttempts?: number;
  onMaxAttemptsReached?: () => void;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}



export const useMpin = (options: UseMpinOptions = {}) => {
  const {
    maxAttempts = 3,
    onMaxAttemptsReached,
    onSuccess,
    onError
  } = options;

  const [state, setState] = useState<MpinState>({
    isModalOpen: false,
    mpin: '',
    error: null,
    loading: false,
    isValid: false,
    attempts: 0
  });

  // Reset state
  const resetState = useCallback(() => {
    setState(prev => ({
      ...prev,
      mpin: '',
      error: null,
      loading: false,
      attempts: 0
    }));
  }, []);

  // Open modal
  const openModal = useCallback(() => {
    setState(prev => ({
      ...prev,
      isModalOpen: true,
      error: null
    }));
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setState(prev => ({
      ...prev,
      isModalOpen: false,
      mpin: '',
      error: null
    }));
  }, []);

  // Handle MPIN input change
  const handleMpinChange = useCallback((value: string) => {
    if (/^\d{0,4}$/.test(value)) {
      setState(prev => ({
        ...prev,
        mpin: value,
        error: null
      }));
    }
  }, []);

  // Validate MPIN
  const validateMpin = useCallback(async (phoneNumber: string , mpin : string) => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/mpin/validate`, {
        phoneNumber,
        mpin
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = response.data;

      if (data) {
        setState(prev => ({
          ...prev,
          isValid: true,
          loading: false,
          error: null,
          attempts: 0
        }));
        onSuccess?.();
        closeModal();
        return true;
      } else {
        const newAttempts = state.attempts + 1;
        const error = data.message || 'Invalid MPIN';
        
        setState(prev => ({
          ...prev,
          loading: false,
          error,
          attempts: newAttempts,
          mpin: ''
        }));

        if (newAttempts >= maxAttempts) {
          onMaxAttemptsReached?.();
        }
        
        onError?.(error);
        return false;
      }
    } catch (error) {
      const errorMessage = 'Failed to validate MPIN';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        mpin: ''
      }));
      onError?.(errorMessage);
      return false;
    }
  }, [state.mpin, state.attempts, maxAttempts, onSuccess, onError, onMaxAttemptsReached, closeModal]);

  const resetMpin = useCallback(async (oldMpin: string, newMpin: string) => {
    const token = getAccessToken();
    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/mpin/reset`, {
        oldMpin,
        newMpin
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = response.data;

      if (data) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: null
        }));
        return true;
      } else {
        const error = data.message || 'Failed to reset MPIN';
        setState(prev => ({
          ...prev,
          loading: false,
          error
        }));
        onError?.(error);
        return false;
      }
    } catch (error) {
      const errorMessage = 'Failed to reset MPIN';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
      onError?.(errorMessage);
      return false;
    }
  }, [getAccessToken, onError]);

  const setNewMpin = useCallback(async (pin: string) => {
    const token = getAccessToken();
    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/mpin/set`, {
        pin
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = response.data;

      if (data) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: null
        }));
        return true;
      } else {
        const error = data.message || 'Failed to set MPIN';
        setState(prev => ({
          ...prev,
          loading: false,
          error
        }));
        onError?.(error);
        return false;
      }
    } catch (error) {
      const errorMessage = 'Failed to set MPIN';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
      onError?.(errorMessage);
      return false;
    }
  }, [getAccessToken, onError]);

  return {
    // State
    mpin: state.mpin,
    error: state.error,
    loading: state.loading,
    isValid: state.isValid,
    attempts: state.attempts,
    isModalOpen: state.isModalOpen,
    
    // Methods
    validateMpin,
    resetMpin,
    setNewMpin,
    handleMpinChange,
    openModal,
    closeModal,
    resetState
  };
};

// Example usage in a component:
/*
import { useMpin } from './hooks/useMpin';

const YourComponent = () => {
  const {
    mpin,
    error,
    loading,
    attempts,
    isModalOpen,
    validateMpin,
    handleMpinChange,
    openModal,
    closeModal
  } = useMpin({
    maxAttempts: 3,
    onMaxAttemptsReached: () => {
      console.log('Max attempts reached');
      // Handle max attempts (e.g., lock account, show recovery options)
    },
    onSuccess: () => {
      console.log('MPIN validated successfully');
      // Handle success (e.g., navigate to dashboard)
    },
    onError: (error) => {
      console.log('Error:', error);
      // Handle error (e.g., show notification)
    }
  });

  const handleSubmit = async () => {
    const phoneNumber = '1234567890'; // Get from your auth context/state
    await validateMpin(phoneNumber);
  };

  return (
    // Your component JSX
  );
};
*/