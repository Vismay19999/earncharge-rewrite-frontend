"use client"
import React from 'react';
import UseAuthorization from './UseAuthorization';

const AuthorizationClientSide = () => {
    const { isLoading, errorMessage, code } = UseAuthorization();

    if (typeof window === 'undefined') {
        return null; // Return null on the server side
    }

    return (
        <div>
            {code ? (
                <div>
                    {isLoading ? (
                        <p>Authorizing...</p>
                    ) : errorMessage ? (
                        <p style={{ color: 'red' }}>{errorMessage}</p>
                    ) : (
                        <p>Authorization in progress...</p>
                    )}
                </div>
            ) : (
                <p>No code found in the URL.</p>
            )}
        </div>
    );
};

export default AuthorizationClientSide;