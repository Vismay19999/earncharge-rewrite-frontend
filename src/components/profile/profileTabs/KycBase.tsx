"use client";
import React, { useState, useEffect } from "react";
import VerifyKyc, { VerifyKycProps } from "../profileUtils/VerfiyKyc";
import { FaCheckCircle } from "react-icons/fa";

const KycBase = ({ user, onKycVerified }: { user: any; onKycVerified: () => void }) => {
  const [showVerifiedBox, setShowVerifiedBox] = useState(false);

  useEffect(() => {
    if (user.kyc_verification_status && !showVerifiedBox) {
      setShowVerifiedBox(true);
      const timer = setTimeout(() => {
        setShowVerifiedBox(false);
        onKycVerified();
      }, 5000); // Changed to 5000 milliseconds (5 seconds)
      return () => clearTimeout(timer);
    }
  }, [user.kyc_verification_status, onKycVerified, showVerifiedBox]);

  if (!user.kyc_verification_status) {
    return (
      <div className="mt-6">
        <VerifyKyc
          onVerificationComplete={() => {
            // Simulate KYC verification completion
            user.kyc_verification_status = true;
            setShowVerifiedBox(true);
          }}
        />
      </div>
    );
  }

  return null;
};

export default KycBase;
