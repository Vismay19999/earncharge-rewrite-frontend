"use client     "
import React from 'react'
import VerifyKyc from '../profileUtils/VerfiyKyc'

const KycBase = ({ user }: { user: any }) => {
    return (
        <div>
            {
                !user.kyc_verification_status && (<>
                    <VerifyKyc />
                </>)
            }
        </div>
    )
}

export default KycBase