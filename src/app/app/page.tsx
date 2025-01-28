"use client";
import React from "react";
import AppMain from "@/components/services/AppMain";
import Footer from "@/components/core/Footer/Footer";
import { MpinModal } from "@/components/mpin/MpinModal";
import { getAccessToken } from "@/utils/auth";
import { useUser } from "@/actions/UserContext/UserContext";

const Page = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const [token, setToken] = React.useState<string | null>(null);
  const user = useUser();
  const [showMpinModal, setShowMpinModal] = React.useState(true);

  React.useEffect(() => {
    setIsMounted(true);
    const accessToken = getAccessToken(); 
    if(accessToken){
      setToken(accessToken);
    }
  }, []);

  // Render null until mounted to avoid hydration issues
  if (!isMounted) return null;

  // Return null if there is no token
  if (!token) return null;

  console.log(user.user)
  return (
    <div className="max-w-[768px] m-auto">
      <AppMain />
      {user && user.user && showMpinModal && (
        <MpinModal 
          onSuccess={() => setShowMpinModal(false)}
          MPINvalue={user.user.mpin_set_status}
          phoneNumber={user.user.phoneNumber}
        />
      )}
    </div>
  );
};

export default Page;
