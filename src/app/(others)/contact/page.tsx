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
            <h1 className="text-4xl lg:text-6xl text-white font-semibold">
            Got a question? We are here to help!
            </h1>
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
            <iframe width="100%" height="350" scrolling="no" src="https://maps.google.com/maps?width=100%25&amp;height=350&amp;hl=en&amp;q=505%20near%20traffic%20park%20dharampeth%20extension%20nagpur%C2%A0440010+(PlentyCred)&amp;t=p&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" className="rounded-lg"></iframe>
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
            <center>505 near traffic park dharampeth extension nagpur 440010.</center>
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