"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios'; // Import Axios
import { setTokens } from '@/utils/auth';
import { useUser } from '@/actions/UserContext/UserContext';

const Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [code, setCode] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { user } = useUser();
  
    React.useEffect(() => {
      if (user) {
        router.push("/profile");
      }
    }, [user, router]);
  

    const { setUser } = useUser();

    useEffect(() => {
        const codeFromUrl = searchParams.get('code');
        if (codeFromUrl) {
            setCode(codeFromUrl);
        }
    }, [searchParams]);

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

            // Set tokens and user data from response
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

    return (
        <div>
            {code ? (
                <div>
                    <button onClick={handleAuthorization} disabled={isLoading}>
                        {isLoading ? 'Authorizing...' : 'Authorize'}
                    </button>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </div>
            ) : (
                <p>No code found in the URL.</p>
            )}
        </div>
    );
};

export default Page;
