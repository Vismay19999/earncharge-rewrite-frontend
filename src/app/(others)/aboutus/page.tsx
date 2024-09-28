import React from "react";
import aboutComp from "@/../../public/aboutSection.png";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightAlt } from "@mui/icons-material";
import animated from "@/../public/animated.gif";
import animated2 from "@/../public/animated3.gif";
import animated3 from "@/../public/animated4.gif";

const page = () => {
  return (
    <>
      <div className="px-10 bg-gradient-to-r from-lime-50 to-slate-50 p-20 border-t-[4px] border-t-black border-dashed">
        <div className="flex items-center text-center max-w-[1000px] m-auto flex-col gap-10">
          <h1 className="font-bold text-3xl">
            EarnCharge is dedicated to simplifying the way you manage your
            mobile recharges and bill payments.
          </h1>
          <p className="text-justify font-semibold">
            is dedicated to simplifying the way you manage your mobile recharges
            and bill payments. As smartphones become increasingly vital in our
            daily lives, the need for efficient and reliable prepaid mobile
            recharge options has never been greater. EarnCharge is one of the
            most trusted digital payments apps, designed to provide you with
            seamless and secure transactions, whether youre looking for
            cost-effective prepaid plans or the convenience of recharging on the
            go.
          </p>
          <Image src={aboutComp} className="w-full" alt="About Recharge" />
          <div className="inline-flex">
            <Link
              href="/"
              className="bg-black p-2 rounded-full text-white py-4 px-10"
            >
              Recharge Now <ArrowRightAlt />
            </Link>
          </div>
        </div>
      </div>
      <section className="border-t-[4px] border-t-black border-dashed">
        <div className="max-w-[1200px] m-auto">
          <div className="flex flex-wrap gap-0 lg:gap-10 flex-col lg:flex-row p-10">
            <div className="text-center flex-[1] flex-col gap-2 justify-center items-center py-10">
              <h1 className="font-semibold text-lg">Offers and Deals</h1>
              <p className="text-sm text-justify mt-4">
                We love rewarding our users. Our app has many deals and cashback
                options every time you recharge or pay a bill. This helps you
                save money and makes the process more fun.
              </p>
            </div>
            <div className="text-center flex-[1] flex-col gap-2 justify-center items-center py-10">
              <h1 className="font-semibold text-lg">Secure Transactions</h1>
              <p className="text-sm text-justify mt-4">
                Your security is our top priority. Our financial services use
                top-notch technology to ensure your transactions are safe. You
                can recharge and pay bills without worry, knowing your
                information is protected.
              </p>
            </div>
            <div className="text-center flex-[1] flex-col gap-2 justify-center items-center py-10">
              <h1 className="font-semibold text-lg">Easy Online Experience</h1>
              <p className="text-sm text-justify mt-4">
                With EarnCharge, you can recharge your phone from home or on the
                go. All you need is an internet connection. Our user-friendly
                app makes it easy to complete your transactions in just a few
                steps.
              </p>
            </div>
            <div className="text-center flex-[1] flex-col gap-2 justify-center items-center py-10">
              <h1 className="font-semibold text-lg">Multiple Payments</h1>
              <p className="text-sm text-justify mt-4">
                We offer various payment methods to suit your needs. You can pay
                via Net Banking, Debit Card, Credit Card, Visa, Mastercard, or
                EarnCharge Wallet. This makes it easy for you to complete your
                transactions using the method you prefer.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-[#121b22] border-t-[4px] border-t-black border-dashed">
        <div className="max-w-[1300px] m-auto flex flex-col ">
          <div className="h-[15vh]"></div>
          <div className="flex-1 flex">
            <div className="flex-1 flex flex-col-reverse lg:flex lg:flex-row">
              <div className=" flex-1 flex items-center justify-center lg:justify-end ">
                <div className="">
                  <Image src={animated2} alt="Image" height={500} width={500} />
                </div>
              </div>
              <div className="flex-1 flex items-center p-[25px] lg:justify-center">
                <div className=" text-white max-w-[600px] flex flex-col gap-y-[20px] lg:max-w-[500px]">
                  <div className="flex flex-col text-[50px] font-[500] leading-[50px] ">
                    What Makes
                    <span className="text-green-400 ">EarnCharge Special?</span>
                  </div>
                  <div className="text-[18px] font-[500] ">
                    With EarnCharge, you can recharge your phone from home or on
                    the go. All you need is an internet connection. Our
                    user-friendly app makes it easy to complete your
                    transactions in just a few steps.
                    <br />
                    <br />
                    Exclusive Offers and Deals: We love rewarding our users. Our
                    app has many deals and cashback options every time you
                    recharge or pay a bill. This helps you save money and makes
                    the process more fun.
                    <br />
                    <br />
                    Secure Transactions: Your security is our top priority. Our
                    financial services use top-notch technology to ensure your
                    transactions are safe. You can recharge and pay bills
                    without worry, knowing your information is protected.
                    <br />
                    <br />
                    ultiple Payment Options: We offer various payment methods to
                    suit your needs. You can pay via Net Banking, Debit Card,
                    Credit Card, Visa, Mastercard, or EarnCharge Wallet. This
                    makes it easy for you to complete your transactions using
                    the method you prefer.
                  </div>
                  <div className="text-[20px] ">Learn more</div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[5vh]"></div>
        </div>
      </section>
      <section className="w-full border-t-[4px] border-t-black border-dashed">
        <div className="max-w-[1300px] m-auto flex flex-col">
          <div className="h-[10vh]"></div>
          <div className="flex-1 flex">
            <div className="flex-1 lg:flex">
              <div className="flex-1 p-[25px] lg:flex items-center justify-center ">
                <div className="flex flex-col gap-y-[20px] md:max-w-[500px] lg:max-w-[400px]">
                  <div className="text-[30px] font-bold lg:text-[50px] leading-[45px]">
                    Our Promise to You
                  </div>
                  <div className="font-[400] text-[18px] leading-[25px] ">
                    At EarnCharge, we are dedicated to giving you the best
                    service possible. We constantly work to improve our platform
                    and add new features to make your experience better. Our
                    goal is to make mobile recharges and bill payments as simple
                    and convenient as possible, so you can focus on what matters
                    most to you.
                  </div>
                  <div className="font-[500] text-[20px] ">Learn more</div>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center lg:justify-start ">
                <div className="flex items-end justify-center pl-[30px] ">
                  <div className="">
                    <Image
                      src={animated3}
                      alt="Image"
                      height={350}
                      width={350}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[15vh]"></div>
        </div>
      </section>
      <section className="bg-[#0AA87E] border-t-[4px] border-t-black border-dashed">
        <div className="max-w-[1200px] m-auto">
          <div className="flex flex-wrap gap-0 lg:gap-10 flex-col lg:flex-row p-10">
            <div className="text-center flex-[1] flex-col gap-2 justify-center items-center py-10">
              <h1 className="font-semibold text-lg text-white">
                Easy Recharge
              </h1>
              <p className="text-sm text-justify mt-4 text-white">
                Whether youre looking for the best-prepaid plans or the most
                attractive mobile recharge offers, EarnCharge has you covered.
                Our platform supports recharges for all major operators,
                including JIO, Airtel, VI, and BSNL.
              </p>
            </div>
            <div className="text-center flex-[1] flex-col gap-2 justify-center items-center py-10">
              <h1 className="font-semibold text-lg text-white">
                Bill Payments
              </h1>
              <p className="text-sm text-justify mt-4 text-white">
                Paying your utility bills is a breeze with EarnCharge. You can
                pay your electricity, water, gas, and post-paid bills easily and
                enjoy exclusive cashback offers on every payment.
              </p>
            </div>
            <div className="text-center flex-[1] flex-col gap-2 justify-center items-center py-10">
              <h1 className="font-semibold text-lg text-white">
                DTH Recharges
              </h1>
              <p className="text-sm text-justify mt-4 text-white">
                Keep your entertainment going with our DTH recharge services.
                Recharge your Tata Play, Airtel DTH, Videocon D2H, Dish TV, and
                Sun Direct connections quickly and easily, and take advantage of
                exciting offers.
              </p>
            </div>
            <div className="text-center flex-[1] flex-col gap-2 justify-center items-center py-10">
              <h1 className="font-semibold text-lg text-white">
                Convenient Methods
              </h1>
              <p className="text-sm text-justify mt-4 text-white">
                We understand the importance of flexibility. Thats why we offer
                multiple payment options, including Net Banking, Debit Card,
                Credit Card, Visa, Mastercard, and EarnCharge Wallet. Choose the
                method that works best for you and complete your transactions
                with ease.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
