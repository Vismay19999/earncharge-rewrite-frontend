import React from "react";
import offers from "@/../../public/offers.png";
import cashback from "@/../../public/cashback.png";
import joinnow from "@/../../public/joinNow.png";
import Image from "next/image";

const page = () => {
  return (
    <>
      <div className="px-10 bg-gray-900 border-t-black border-dashed">
        <div className="max-w-[1000px] p-20 m-auto justify-between items-center flex flex-wrap gap-10">
          <div className="flex-[2]">
            <h1 className="text-white font-semibold text-2xl">
              <div className="flex flex-col text-[50px] font-[500] leading-[50px] ">
                EarnCharge
                <span className="text-pink-600 font-semibold">
                  Exclusive Offers!
                </span>
              </div>
            </h1>
            <p className="mt-5 text-white text-sm text-justify leading-[25px]">
              {" "}
              Welcome to EarnCharge, where we make your recharge transactions
              not only seamless but also incredibly rewarding. Our platform is
              designed to provide you with ultimate convenience and savings,
              ensuring that every transaction you make brings you closer to
              valuable rewards. Discover why EarnCharge stands out from other
              platforms and why it is the smart choice for all your recharge and
              bill payment needs
            </p>
          </div>
          <div className="flex-[1]">
            <Image src={offers} alt="Offer" width={1000} height={1000} />
          </div>
        </div>
      </div>
      <section className="border-t-[4px] border-t-black border-dashed">
        <div className="max-w-[1200px] m-auto">
          <div className="flex flex-wrap gap-0 lg:gap-10 flex-col lg:flex-row p-10 pb-0">
            <div className="text-center flex-[1] flex-col gap-2 justify-center items-center py-10">
              <h1 className="font-semibold text-lg">
                No{" "}
                <span className="text-green-600 font-bold">
                  Platform Charges
                </span>
              </h1>
              <p className="text-sm text-justify mt-4">
                Unlike other platforms that take a 2% fee, EarnCharge provides
                all these benefits without any additional charges
              </p>
            </div>
            <div className="text-center flex-[1] flex-col gap-2 justify-center items-center py-10">
              <h1 className="font-semibold text-lg">
                Seamless{" "}
                <span className="text-blue-600 font-bold">Transactions</span>
              </h1>
              <p className="text-sm text-justify mt-4">
                Our platform is designed to provide quick and secure recharges
                and bill payments. With a user-friendly interface, you can
                navigate effortlessly and complete your transactions in just a
                few simple steps.
              </p>
            </div>
            <div className="text-center flex-[1] flex-col gap-2 justify-center items-center py-10">
              <h1 className="font-semibold text-lg">
                Attractive{" "}
                <span className="text-red-600 font-bold">Rewards</span>
              </h1>
              <p className="text-sm text-justify mt-4">
                Enjoy cashbacks, earn loyalty points, and get free recharges.
                Every transaction brings you closer to greater savings and
                exciting rewards.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-[1200px] m-auto">
          <div className="flex flex-wrap gap-0 lg:gap-10 flex-col lg:flex-row p-10">
            <div className="text-center flex-[1] flex-col gap-2 justify-center items-center py-10">
              <h1 className="font-semibold text-lg">
                User-Friendly{" "}
                <span className="text-yellow-500 font-bold">Interface</span>
              </h1>
              <p className="text-sm text-justify mt-4">
                Our website is easy to use, ensuring a smooth experience from
                start to finish. No complicated processes, just straightforward
                transactions.
              </p>
            </div>
            <div className="text-center flex-[1] flex-col gap-2 justify-center items-center py-10">
              <h1 className="font-semibold text-lg">
                Multiple{" "}
                <span className="text-rose-700 font-bold">Payment Options</span>
              </h1>
              <p className="text-sm text-justify mt-4">
                We offer a variety of payment methods to suit your needs,
                including Net Banking, Debit Card, Credit Card, Visa,
                Mastercard, and EarnCharge Wallet. Choose the method that works
                best for you and enjoy hassle-free payments.
              </p>
            </div>
            <div className="text-center flex-[1] flex-col gap-2 justify-center items-center py-10">
              <h1 className="font-semibold text-lg">
                Smart{" "}
                <span className="text-purple-500 font-bold">Community</span>
              </h1>
              <p className="text-sm text-justify mt-4">
                We build a far more engaged and smart community compared to
                other platforms, ensuring you always get the best user
                experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-gray-900 border-t-[4px] border-t-black border-dashed">
        <div className="max-w-[1000px] m-auto flex flex-col ">
          <div className="h-[15vh]"></div>
          <div className="flex-1 flex">
            <div className="flex-1 flex flex-col-reverse lg:flex lg:flex-row">
              <div className=" flex-1 flex items-center justify-center lg:justify-end ">
                <div className="flex-[1]">
                  <Image src={cashback} alt="Image" height={500} width={500} className="lg:w-full w-[200px] m-auto" />
                </div>
              </div>
              <div className="flex-[2] flex items-center p-[25px] lg:justify-center">
                <div className=" text-white max-w-[600px] flex flex-col gap-y-[20px] lg:max-w-[500px]">
                  <div className="flex flex-col text-[50px] font-[500] leading-[50px] ">
                    Cashback
                    <span className="text-yellow-500 font-semibold">
                      on Every Recharge!
                    </span>
                  </div>
                  <div className="text-[18px] font-[500] ">
                    At EarnCharge, every transaction counts. We offer attractive
                    cashbacks on every recharge you make. Whether you are
                    recharging your mobile or paying a bill, you save money
                    effortlessly while enjoying the ease and efficiency of our
                    platform. With instant cashbacks, you get more value for
                    your money every single time.
                  </div>
                  <div className="text-[20px] ">Learn more</div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[5vh]"></div>
        </div>
      </section>
      <section className="w-full bg-gray-900 border-t-[4px] border-t-black border-dashed">
        <div className="max-w-[1000px] m-auto flex flex-col ">
          <div className="h-[15vh]"></div>
          <div className="flex-1 flex">
            <div className="flex-1 flex flex-col-reverse lg:flex lg:flex-row">
              <div className="flex-[2] flex items-center p-[25px] lg:justify-center">
                <div className=" text-white max-w-[600px] flex flex-col gap-y-[20px] lg:max-w-[500px]">
                  <div className="flex flex-col text-[50px] font-[500] leading-[50px] ">
                    Join the
                    <span className="text-pink-500 font-semibold">
                      EarnCharge Community Today!
                    </span>
                  </div>
                  <div className="text-[18px] font-[500] ">
                    Do not miss out on these fantastic offers. Join the
                    EarnCharge community today and start enjoying the benefits
                    of seamless transactions, cashbacks, loyalty rewards, and
                    free recharges. Our platform is designed to make your life
                    easier and more rewarding. Join us now and help us build a
                    smart community. Whether you are recharging your mobile,
                    paying bills, or referring friends, EarnCharge ensures that
                    you get the most out of every transaction.
                  </div>
                  <div className="text-[20px] ">Learn more</div>
                </div>
              </div>
              <div className=" flex-1 flex items-center justify-center lg:justify-end ">
                <div className="flex-[1]">
                  <Image src={joinnow} alt="Image" height={500} width={500} className="lg:w-full w-[200px] m-auto" />
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

export default page;
