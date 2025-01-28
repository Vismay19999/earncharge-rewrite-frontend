"use client"
import { useMpin } from '@/hooks/useMpin';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const MpinContext = createContext<any | undefined>(undefined);

interface MpinProviderProps {
  children: ReactNode;
  config?: any;
}

export const MpinProvider = ({ children, config = {} }: MpinProviderProps) => {
  const [isValidated, setIsValidated] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const {
    autoShow = true,
    maxAttempts = 3
  } = config;

  const { isModalOpen, openModal } = useMpin({
    maxAttempts,
    onSuccess: () => {
      setIsValidated(true);
      setIsPending(false);
    }
  });

  useEffect(() => {
    if (autoShow && !isValidated && !isModalOpen) {
      openModal();
    }
  }, [autoShow, isValidated, isModalOpen, openModal]);

  return (
    <MpinContext.Provider 
      value={{
        isValidated,
        isPending,
        requiresValidation: !isValidated && !isPending
      }}
    >
      {children}
    </MpinContext.Provider>
  );
};

export const useMpinContext = () => {
  const context = useContext(MpinContext);
  if (context === undefined) {
    throw new Error('useMpinContext must be used within a MpinProvider');
  }
  return context;
};
