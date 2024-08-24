import { useUser } from '@/actions/UserContext/UserContext';
import React from 'react'
import ProfileInfo from './ProfileInfo';
import VerifyKyc from './profileUtils/VerfiyKyc';
import UpiBase from './profileTabs/UpiBase';
import KycBase from './profileTabs/KycBase';

const IndexProfile = () => {

    const { user } = useUser();

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <h1 className="text-xl font-semibold text-gray-700">Loading...</h1>
            </div>
        );
    }


    return (
        <main>
            {
                user && (
                    <section>
                        <ProfileInfo user={user} />
                        <UpiBase user={user} />
                        <KycBase user={user} />
                    </section>
                )
            }
        </main>
    )
}

export default IndexProfile