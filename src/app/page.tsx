"use client";
import { useUser } from "@/actions/UserContext/UserContext";
import Recharge from "@/components/core/Home/recharge";
import IndexRecharge from "@/components/recharge/IndexRecharge";
import Main from "@/components/services/Main";

import animated from "@/../public/animated.gif";
import animated2 from "@/../public/animated2.gif";
import animated3 from "@/../public/animated3.gif";

import SecuredImage from "@/../public/security.svg";

import Image from "next/image";
import GoogleTranslate from "@/components/GoogleTranslate";
import Translatecomponent from "@/components/translate/translatecomponent";

export default function Home() {
  const { user } = useUser()

  return (
    <div>
      
      <Translatecomponent />
      <div>
        {/* <Recharge /> */}
      </div>
      {user && (
        <div className="m-auto max-w-[1200px]">
          <Main />
          {/* <IndexRecharge /> */}
        </div>
      )}
<section className="w-full">
        <div className="max-w-[1300px] m-auto flex flex-col">
          <div className="h-[5vh]"></div>
          <div className="flex-1 flex">
            <div className="flex-1 lg:flex">
              <div className="flex-1 p-[25px] lg:flex items-center justify-center ">
                <div className="flex flex-col gap-y-[20px] md:max-w-[650px] lg:max-w-[400px]">
                  <div className="text-[30px] font-bold lg:text-[50px] leading-[45px]">
                    Instant Transactions and Secure Payments
                  </div>
                  <div className="font-[400] text-[18px] leading-[25px] ">
                    Recharge is fast and easy to use. So, a user can look for a
                    suitable recharge plan and complete the recharge in just a
                    few clicks. It does not even take a minute. Recharge is 100%
                    safe for making your payments. It offers end-to-end data
                    protection with each prepaid recharge.
                  </div>
                  <div className="font-[500] text-[20px] ">Learn more</div>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center lg:justify-start mt-10">
                <div className="flex items-end justify-center pl-[30px] ">
                  <div className="">
                    <Image src={animated} alt="Image" height={350} width={350} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#121b22] mt-[140px]">
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
                    More<span className="text-green-400 ">Savings</span>
                  </div>
                  <div className="text-[18px] font-[500] ">
                    With Recharge, you can also save. It offers exciting
                    discounts and cashback rewards on prepaid plans that helps
                    you in increasing your savings.
                  </div>
                  <div className="text-[20px] ">Learn more</div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[5vh]"></div>
        </div>
      </section>

      <section className="w-full mt-[120px]">
        <div className="max-w-[1300px] m-auto flex flex-col">
          <div className="h-[10vh]"></div>
          <div className="flex-1 flex">
            <div className="flex-1 lg:flex">
              <div className="flex-1 p-[25px] lg:flex items-center justify-center ">
                <div className="flex flex-col gap-y-[20px] md:max-w-[500px] lg:max-w-[400px]">
                  <div className="text-[30px] font-bold lg:text-[50px] leading-[45px]">
                    Various Payment Options
                  </div>
                  <div className="font-[400] text-[18px] leading-[25px] ">
                    You can complete your prepaid recharge using any of the
                    available payment methods suitable for you. Recharge accepts
                    payment via Credit card, Debit card, UPI, ZIP pay later and
                    many other payment methods.
                  </div>
                  <div className="font-[500] text-[20px] ">Learn more</div>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center lg:justify-start ">
                <div className="flex items-end justify-center pl-[30px] ">
                  <div className="">
                    <Image src={animated3} alt="Image" height={350} width={350} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[15vh]"></div>
        </div>
      </section>

      <section className="w-full p-[60px]" id="sectionBack">
        <div className="max-w-[1150px] m-auto">
          <div className="flex flex-wrap gap-8 justify-between items-center flex-col lg:flex-row">
            <div className="flex-[1]">
              <Image src={SecuredImage} alt="Image" />
            </div>
            <div className="flex-[1.5]">
              <h1 className="text-5xl font-semibold text-white">
                Trusted, Safe & Secure
              </h1>
              <p className="mt-4 text-white">
                Bank Grade Security, Fully Encrypted, 24X7 Customer Support, App
                Lock
              </p>
              <div className="mt-5 w-full p-6 bg-white rounded-xl">
                <div className="flex flex-wrap flex-col lg:flex-row gap-5 justify-around items-center">
                  <Image src="https://fcpress.freecharge.in/api/mediamanager/media/DgHJOvJYp.svg" alt="Payment" width={1000} height={1000} className="w-[100px]" />
                  <Image src="https://fcpress.freecharge.in/api/mediamanager/media/6ZrQKBBoU.svg" alt="Payment" width={1000} height={1000} className="w-[100px]"/>
                  <Image src="https://fcpress.freecharge.in/api/mediamanager/media/4W1-4LipK.svg" alt="Payment" width={1000} height={1000} className="w-[100px]"/>
                  <Image src="https://fcpress.freecharge.in/api/mediamanager/media/ZO8fhY3dX.svg" alt="Payment" width={1000} height={1000} className="w-[100px]"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}