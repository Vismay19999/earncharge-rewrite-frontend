"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [code, setCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
      const response = await fetch('https://api.earncharge.in/v1/auth/otpless/exchangetoken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
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
          {/* <p>Code: {code}</p> */}
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