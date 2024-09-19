import React from "react";

const page = () => {
  return (
    <div id="overflow" className="container mx-auto p-4">
      <div className="max-w-[1200px] mx-auto mt-8">
        <div className="mt-4 mb-4">
          <h1 className="text-[#131c23] font-bold text-4xl text-center">
            Cancellation and Refund Policy
          </h1>
        </div>
        <p>
          At EarnCharge, we strive to provide a seamless and efficient platform
          for accessing a variety of essential services. However, its important
          to note that as an intermediary service provider, we facilitate
          transactions between you and the service providers, but we do not own
          or control the services themselves. Therefore, our ability to cancel
          or refund services is limited.
        </p>

        <h1 className="text-2xl font-bold mt-5 mb-4">Cancellation:</h1>
        <p>
          Once a transaction is initiated through EarnCharge and processed with
          the respective service provider, it may not be possible to cancel or
          reverse the transaction. This is because the transaction is directly
          linked to the service providers systems and processes. We recommend
          reviewing your transaction details carefully before proceeding to
          ensure accuracy.
        </p>
        <p className="mb-2 mt-2">
          We dont have any cancellation policy as it is a prepaid service also
          we dont provide any kind of postpaid billing or subscriptions.
        </p>
        <h1 className="text-2xl font-bold mt-5 mb-4">
          Refunds Technical Errors and Payment Failures:
        </h1>
        <p>
          In case of any technical error or payment failure from our server or
          website, resulting in the deduction of an amount from your account, we
          will return the amount within 7 working days and payment mode will be upi and direct bank account transfer.
        </p>
        <h1 className="text-2xl font-bold mt-5 mb-4">
          Refunds From 3rd Party:
        </h1>
        <p>
          Similarly, refunds for transactions processed through EarnCharge may
          not be feasible in many cases. As we are not the direct provider of
          the services, any requests for refunds would need to be directed to
          the relevant service provider according to their refund policies. We
          encourage you to familiarize yourself with the refund policies of the
          specific service providers you are transacting with.
        </p>
        <h1 className="text-2xl font-bold mt-5 mb-4">Be Extra Alert:</h1>
        <p>
          Given the nature of our services as an intermediary, we advise all
          users to exercise caution and diligence when making payments or
          transactions through EarnCharge. Be sure to double-check the details
          of your transactions, including service selections, payment amounts,
          and recipient information, to avoid any potential errors or
          discrepancies.
        </p>
        <p>
          By using EarnCharges services, you acknowledge and accept that
          cancellation and refund requests may not always be possible, and you
          agree to abide by the refund policies of the respective service
          providers. If you have any questions or concerns about a transaction,
          please contact our customer support team for assistance.
        </p>
        <p>
          Refunds will be processed within 7 working days from the date of
          approval and payment mode will be upi and direct bank account
          transfer. The refund amount will be credited using the original
          payment method, either through UPI or direct bank account transfer, as
          per your preference.
        </p>
        <p className="mt-4">
          Thank you for choosing EarnCharge. We appreciate your understanding
          and cooperation.
        </p>
      </div>
    </div>
  );
};

export default page;
