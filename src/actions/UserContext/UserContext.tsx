"use client"
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAccessToken } from '../../utils/auth';
import axios from 'axios';

interface UserContextType {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const accessToken = getAccessToken();
                if (accessToken) {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/me`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });
                    setUser(response.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch user:', error);
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};