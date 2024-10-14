import { useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io"; // Import from react-icons
import Image from "next/image";
import bbpsi from "@/../public/bbps.gif";
import icon1 from "@/../public/1icon.png";
import icon2 from "@/../public/2icon.png";
import icon3 from "@/../public/3icon.png";
import icon4 from "@/../public/4icon.png";
import icon5 from "@/../public/5icon.png";
import icon6 from "@/../public/6icon.png";
import sectionArea from "@/../public/sectionArea.png";
import stockArea from "@/../public/calculate.png";

export default function BBPS() {
  return (
    <div>
      <div className="m-auto max-w-[1280px] p-10">
        <div className="mt-12 rounded-[20px] bg-gradient-to-r from-lime-50 to-slate-50 border-[1px] p-10 flex flex-wrap justify-end flex-col gap-10 lg:flex-row items-center">
          <div className="flex-[1] flex flex-col">
            <h1 className="text-4xl lg:text-6xl font-semibold">
              Bharat Bill Payment System
            </h1>
            <p className="mt-5 text-sm lg:text-2xl">
              BBPS stands for Bharat Bill Payment System. The Bharat bill
              payment system is conceptualized and driven by National Payments
              Corporation of India (NPCI).
            </p>
            <br />
            <br />
            <div className="font-semibold mt-10 flex gap-2 items-center">
              Find Out More <IoMdArrowDropdown /> {/* React Icon */}
            </div>
          </div>
          <div className="flex-[1]">
            <center>
              <Image src={bbpsi} alt="BBPS" />
            </center>
          </div>
        </div>
        <div className="flex gap-10 justify-between items-center mt-4 flex-col lg:flex-row">
          {[icon1, icon2, icon3, icon4, icon5, icon6].map((icon, index) => (
            <div
              key={index}
              className={`w-full lg:flex-[1] lg:w-0 bg-white rounded-lg shadow-lg p-4 border-b-[4px] ${
                index === 0
                  ? "border-b-blue-600"
                  : index === 1
                  ? "border-b-orange-500"
                  : index === 2
                  ? "border-b-red-500"
                  : index === 3 || index === 4
                  ? "border-b-blue-400"
                  : "border-b-blue-950"
              }`}
            >
              <center>
                <Image src={icon} alt={`Icon ${index + 1}`} className="w-[100px]" />
                <br />
                <p className="font-semibold">
                  {[
                    "Landline Bills",
                    "Electricity Bills",
                    "Gas Bills",
                    "Water Bills",
                    "Mobile Postpaid",
                    "Datacard",
                  ][index]}
                </p>
              </center>
            </div>
          ))}
        </div>
        <section className="mt-20 mb-10">
          <div className="flex flex-col xl:flex-row gap-4">
            <div
              className="flex-[1.5] border-[1px] shadow-lg bg-white border-b-blue-400 border-b-[4px] p-6 h-[350px] rounded-xl bg-right-bottom bg-no-repeat"
              style={{
                backgroundImage: `url(${sectionArea.src})`,
                backgroundSize: `180px`,
              }}
            >
              <h1 className="text-lg font-semibold">
                Benefits Of (BBPS) Bharat Bill Payment System
              </h1>
              <br />
              <p className="text-[12.5px] font-semibold leading-6">
                &bull; BBPS system accepts all kinds of bill payment across India.
                <br />
                &bull; Utility service suppliers receive payments instantly and can reflect them immediately.
                <br />
                &bull; Payments are securely processed through the NPCI network with instant receipt generation.
                <br />
                &bull; Agents or customers can check their bill details by submitting the bill number in the BBPS system.
                <br />
                &bull; Customers receive instant confirmation via registered mobile number or email.
              </p>
              <br />
            </div>
            <div
              className="flex-[1]  border-[1px] border-b-[4px] border-b-lime-400 shadow-lg bg-white p-4 rounded-xl pr-40 bg-right-bottom bg-no-repeat"
              style={{
                backgroundImage: `url(${stockArea.src})`,
                backgroundSize: `140px`,
              }}
            >
              <div className="p-2">
                <h1 className="text-lg font-semibold">
                  Bharat Bill Payment System is a unified bill payment system for India.
                </h1>
                <br />
                <p className="text-justify text-gray-800 text-sm font-semibold">
                  BBPS offers all types of bill categories and accessible payment services to customers through a network of agents, multiple payment modes, and instant confirmation of payment. It operates under NPCI, ensuring secure and prompt payment processing.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
