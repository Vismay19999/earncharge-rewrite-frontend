"use client"
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { setTokens } from '@/utils/auth';
import { useUser } from '@/actions/UserContext/UserContext';

const UseAuthorization = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams?.get('code');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { user, setUser } = useUser();

    useEffect(() => {
        if (user) {
            router.push("/profile");
        }
    }, [user, router]);

    useEffect(() => {
        if (code) {
            handleAuthorization();
        }
    }, [code]);

    const handleAuthorization = async () => {
        if (!code) return;

        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await axios.post('https://api.earncharge.in/v1/auth/otpless/exchangetoken',
                { code },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            setTokens(response.data.accessToken, response.data.refreshToken);
            setUser(response.data.data);
            setTimeout(() => {
                window.location.reload();
            }, 1500);
            console.log('API Response:', response.data);
        } catch (error) {
            console.error('Failed to authorize:', error);
            setErrorMessage('Authorization failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, errorMessage, code };
};

export default UseAuthorization;