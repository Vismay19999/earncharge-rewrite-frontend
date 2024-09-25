import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/utils/auth";
import Image from "next/image";
import EmptyWallet from "@/../../public/wallet-empty.png";
import { FaWallet } from "react-icons/fa6";
interface ReferralHistory {
  id: string;
  amount: number;
  status: boolean;
  userDataId: string;
  walletType: string;
}

const GetRefferalTC = () => {
  const [referralHistory, setReferralHistory] = useState<ReferralHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReferralHistory = async () => {
      try {
        const accessToken = getAccessToken();

        if (!accessToken) {
          throw new Error("No token found");
        }

        const response = await axios.get(
          "https://api.earncharge.in/v1/user/wallet/withdraw/history/referral",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        setReferralHistory(response.data.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchReferralHistory();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {referralHistory && (
        <div>
          {referralHistory.length === 0 ? (
            <>
              <div className="w-full flex flex-wrap justify-center flex-col gap-5 items-center h-[200px]">
                <Image
                  src={EmptyWallet}
                  alt="Empty Wallet"
                  width={100}
                  height={100}
                  className="opacity-20"
                />
                <span className="font-semibold text-sm text-gray-400">
                  No Referral Transactions!
                </span>
              </div>
            </>
          ) : (
            <ul>
              {referralHistory.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex flex-wrap flex-row gap-2 items-center justify-between"
                >
                  <div className="flex p-2">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <FaWallet className="text-[#0AA87E]" />
                    </div>
                  </div>
                  <div className="flex-[1] p-2">
                    <p className="inline font-semibold">
                      ₹{transaction.amount}
                    </p>{" "}
                    <span className="text-xs text-gray-600">
                      {transaction.walletType}
                    </span>
                  </div>
                  <div className="flex p-2">
                    {transaction.status ? (
                      <>
                        <p className="text-xs font-semibold text-green-700 py-1 px-2 border-green-200 border-[1px] bg-green-100 rounded-sm">
                          Completed
                        </p>
                      </>
                    ) : (
                      <>
                        <>
                          <p className="text-xs font-semibold text-red-700 py-1 px-2 border-red-200 border-[1px] bg-red-100 rounded-sm">
                            Pending
                          </p>
                        </>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default GetRefferalTC;
