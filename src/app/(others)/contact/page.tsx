"use client"
import { motion } from "framer-motion";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useInView } from "react-intersection-observer";
import ContactForm from "./ContactForm";

const Contact = () => {
    const [ref] = useInView({
        triggerOnce: true,
      });
  return (
    <>
      <div className="m-auto max-w-[1200px] mt-[100px] mb-[100px]">
      <div id="sectionBack" className="rounded-[20px] p-10 flex flex-wrap justify-end flex-col gap-10 lg:flex-row items-center">
          <motion.div
            ref={ref}
            initial="hidden"
            animate="visible"
            variants={{
              visible: { opacity: 1, x: 0 },
              hidden: { opacity: 0, x: -100 },
            }}
            transition={{ duration: 1.3 }}
            className="flex-[1]"
          >
            <motion.h1 
              className="text-4xl lg:text-6xl font-semibold text-left"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-green-400">Need Assistance?</span>{" "}
              <span className="text-green-400">We are Here</span>{" "}
              <span className="text-green-400">for You</span>{" "}
              <span className="text-green-400">24/7!</span>
            </motion.h1>
            <p className="mt-5 text-sm text-white lg:text-2xl">
            Feel free to reach out with any inquiries or feedback. We look forward to hearing from you!
            </p>
            <br />
            <div className="font-semibold text-white block mt-10">
              Find Out More <FontAwesomeIcon icon={faArrowDown} />
            </div>
          </motion.div>
          <motion.div
            ref={ref}
            initial="hidden"
            animate="visible"
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: -100 },
            }}
            transition={{ duration: 1.3 }}
            className="flex-[1]"
          >
            <iframe width="100%" height="350" scrolling="no" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Dharampeth,%20Nagpur,%20Maharashtra+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" className="rounded-lg"></iframe>
          </motion.div>
        </div>
            <motion.div className="flex flex-col xl:flex-row p-3 lg:p-0 gap-10 mt-10">
                <div className="flex-[1]">
                <motion.div
        className="flex flex-col flex-wrap gap-5"
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex justify-center items-center flex-col bg-white p-10 shadow-lg rounded-lg
        border-[#131c23] border-b-[10px]">
          <h1 className="text-4xl font-semibold">Mobile</h1>
          <p>+91-7058111852</p>
        </motion.div>
        <motion.div className="flex justify-center items-center flex-col bg-white p-10 shadow-lg rounded-lg
        border-[#131c23] border-b-[10px]">
          <h1 className="text-4xl font-semibold">Email</h1>
          <p className="inline">assist@earncharge.in</p>
        </motion.div>
        <motion.div className="flex justify-center items-center flex-col bg-white p-10 shadow-lg rounded-lg
        border-[#131c23] border-b-[10px]">
          <h1 className="text-4xl font-semibold">Address</h1>
            <center>Plot No: 326, behind LAD Collage Shankar Nagar Nagpur Maharashtra India 440010</center>
        </motion.div>
      </motion.div>
                </div>
                <div className="flex-[1]">
                    <ContactForm />
                </div>
            </motion.div>
          </div>
    </>
  )
}

export default Contact
