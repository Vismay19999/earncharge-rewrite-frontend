"use client"
import { useUser } from '@/actions/UserContext/UserContext';
import IndexProfile from '@/components/profile/IndexProfile';
import React from 'react';

const Page = () => {
    return (
        <>
        <IndexProfile />
        </>
    );
};

export default Page;
