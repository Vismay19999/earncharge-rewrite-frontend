"use client";
import { useUser } from "@/actions/UserContext/UserContext";
import React from "react";
import ProfileInfo from "./ProfileInfo";
import VerifyKyc from "./profileUtils/VerfiyKyc";
import loading from "@/../../public/loading.gif";
import KycBase from "./profileTabs/KycBase";
import GetWallets from "./wallet/getWallets/GetWallets";
import IndexTransactions from "./transactions/IndexTransactions";
import Image from "next/image";

const IndexProfile = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-transparent">
        <Image src={loading} alt="Width" width={60} height={60} />
      </div>
    );
  }

  return (
    <main>
      {user && (
        <div>
          <section>
            <div className="w-full flex flex-wrap flex-col lg:flex-row gap-10">
              <div className="flex-[3]">
                <ProfileInfo user={user} />
                <KycBase user={user} />
                <GetWallets />
              </div>
              <div className="flex-[7]">
                <div className="bg-white shadow-md rounded-xl p-2 w-full border-l-[8px] border-[#0AA87E]">
                  <div className="p-4">
                    <h1 className="font-semibold text-xl">Transactions</h1>
                    <IndexTransactions />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section></section>
        </div>
      )}
    </main>
  );
};

export default IndexProfile;
