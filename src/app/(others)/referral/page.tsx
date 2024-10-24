import React from "react";
import Image from "next/image";
import referralHero from "@/../../public/refer.png"; // You'll need to add this image
import referralRewards from "@/../../public/refer2.png"; // You'll need to add this image
import referralSteps from "@/../../public/refer3.png"; // You'll need to add this image

const ReferralPage = () => {
  return (
    <>
      <div className="px-10 bg-blue-950 border-t-black border-dashed">
        <div className="max-w-[1000px] p-0 py-10 m-auto justify-between items-center flex flex-wrap flex-col lg:flex-row gap-10">
          <div className="flex-[1]">
            <h1 className="text-white font-semibold text-2xl">
              <div className="flex flex-col text-[50px] font-[500] leading-[50px] ">
                EarnCharge
                <span className="text-pink-500 font-semibold">
                  Referral Program
                </span>
              </div>
            </h1>
            <p className="mt-5 text-white text-sm text-justify leading-[25px]">
              Join our referral program and earn rewards for every friend you
              bring to EarnCharge. Its simple, rewarding, and a great way to
              share the benefits of our platform with your friends and family.
              Start referring today and watch your rewards grow!
            </p>
          </div>
          <div className="flex-[1]">
            <Image
              src={referralHero}
              alt="Referral"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>

      <section className="border-t-[4px] border-t-black border-dashed">
        <div className="max-w-[1200px] m-auto">
          <div className="flex flex-wrap gap-0 lg:gap-10 flex-col lg:flex-row p-10 pb-0">
            <div className="text-center flex-[1] flex-col gap-2 justify-center items-center py-10">
              <h1 className="font-semibold text-lg">
                Earn{" "}
                <span className="text-green-600 font-bold">Cash Rewards</span>
              </h1>
              <p className="text-sm text-justify mt-4">
                Get cash rewards for every friend who signs up and completes
                their first transaction. The more friends you refer, the more
                you earn!
              </p>
            </div>
            <div className="text-center flex-[1] flex-col gap-2 justify-center items-center py-10">
              <h1 className="font-semibold text-lg">
                Easy <span className="text-blue-600 font-bold">Sharing</span>
              </h1>
              <p className="text-sm text-justify mt-4">
                Share your unique referral link via email, SMS, or social media
                with just a few clicks. Its never been easier to spread the
                word!
              </p>
            </div>
            <div className="text-center flex-[1] flex-col gap-2 justify-center items-center py-10">
              <h1 className="font-semibold text-lg">
                Track Your{" "}
                <span className="text-red-600 font-bold">Progress</span>
              </h1>
              <p className="text-sm text-justify mt-4">
                Monitor your referrals and earnings in real-time through your
                personalized dashboard. Watch your rewards grow with each
                successful referral!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-blue-950 border-t-[4px] border-t-black border-dashed">
        <div className="max-w-[1000px] m-auto flex flex-col ">
          <div className="h-[15vh]"></div>
          <div className="flex-1 flex">
            <div className="flex-1 flex flex-col-reverse lg:flex lg:flex-row">
              <div className=" flex-1 flex items-center justify-center lg:justify-end ">
                <div className="flex-[1]">
                  <Image
                    src={referralRewards}
                    alt="Referral Rewards"
                    height={500}
                    width={500}
                    className="lg:w-full w-[200px] m-auto"
                  />
                </div>
              </div>
              <div className="flex-[1] flex items-center p-[25px] lg:justify-center">
                <div className=" text-white max-w-[600px] flex flex-col gap-y-[20px] lg:max-w-[500px]">
                  <div className="flex flex-col text-[50px] font-[500] leading-[50px] ">
                    Exciting
                    <span className="text-blue-400 font-semibold">
                      Referral Rewards!
                    </span>
                  </div>
                  <div className="text-[18px] font-[500] ">
                    Our referral program offers generous rewards for both you
                    and your friends. When your referred friend signs up and
                    completes their first transaction, you will both receive a
                    bonus. Its a win-win situation that keeps on giving!
                  </div>
                  <div className="text-[20px] ">Learn more</div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[5vh]"></div>
        </div>
      </section>

      <section className="w-full bg-gray-950 border-t-[4px] border-t-black border-dashed">
        <div className="max-w-[1000px] m-auto flex flex-col ">
          <div className="h-[15vh]"></div>
          <div className="flex-1 flex">
            <div className="flex-1 flex flex-col-reverse lg:flex lg:flex-row">
              <div className="flex-[2] flex items-center p-[25px] lg:justify-center">
                <div className=" text-white max-w-[600px] flex flex-col gap-y-[20px] lg:max-w-[500px]">
                  <div className="flex flex-col text-[50px] font-[500] leading-[50px] ">
                    How to
                    <span className="text-pink-500 font-semibold">
                      Start Referring
                    </span>
                  </div>
                  <div className="text-[18px] font-[500] ">
                    Starting your referral journey is easy! Simply log in to
                    your EarnCharge account, navigate to the referral section,
                    and grab your unique referral link. Share this link with
                    your friends through your preferred channels. When they sign
                    up and complete a transaction, you will both earn rewards!
                  </div>
                  <div className="text-[20px] ">Get started now</div>
                </div>
              </div>
              <div className=" flex-1 flex items-center justify-center lg:justify-end ">
                <div className="flex-[1]">
                  <Image
                    src={referralSteps}
                    alt="Referral Steps"
                    height={1000}
                    width={1000}
                    className="w-[250px] m-auto"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="h-[5vh]"></div>
        </div>
      </section>
    </>
  );
};

export default ReferralPage;
