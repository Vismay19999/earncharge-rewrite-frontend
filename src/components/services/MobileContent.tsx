import React from 'react'
import IndexRecharge from '../recharge/IndexRecharge'

const MobileContent = () => {
  return (
    <div>
        <div className="p-2 lg:p-10">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-[1] lg:p-10">
          <h1 className="text-3xl font-bold leading-10">
            Instant Prepaid Mobile Recharge Solution
          </h1>
          <p className="mt-10 text-xl">
            Empower your connectivity with seamless prepaid mobile recharges,
            where convenience meets innovation.
          </p>
          <div className="mt-10 w-full h-[200px] border-[1px] p-4 text-sm overflow-y-scroll">
            Nowadays, everyone has a smartphone, and the number of smartphone
            users continues to rise. When it comes to mobile payment plans,
            users have two options: postpaid or prepaid.Prepaid mobile plans are
            those you must pay in advance to use them. Customers can choose from
            a variety of prepaid plans offered by various operators. People
            looking for budget-friendly options might consider prepaid
            subscriptions. There are so many options available online to do your
            prepaid mobile recharge, but EarnCharge is one of the most
            trustworthy digital payments app to make your life easier.
            <br />
            <br />
            Mobile phones are an intrinsic part of our lives, and so is online
            mobile recharge. Online recharge gives you the liberty to recharge
            your mobile phone number anytime and from anywhere, all you need is
            an internet connection. So. when you think of easy recharge options
            with mobile recharge offers, EarnCharge is the best platform to turn
            to. You can now carry out your net recharge and bill payments for
            any number of your friends and family using EarnCharge. Prepaid
            mobile plans can be paid through Net Banking, Debit Card, Credit
            Card, Visa or Mastercard, and EarnCharge wallet.
          </div>
        </div>
        <div className="flex-[1]">
            <div className="bg-white p-10 rounded-xl shadow-xl">
          <h1 className="text-2xl font-semibold">
            Mobile Recharge or Bill Payment
          </h1>
          <IndexRecharge />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default MobileContent