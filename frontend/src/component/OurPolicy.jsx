import React from "react";
import Title from "./Title";
import { RiExchangeFill } from "react-icons/ri";
import { RiDiscountPercentFill } from "react-icons/ri";
import { MdSupportAgent } from "react-icons/md";
const OurPolicy = () => {
  return (
    <div className="w-full min-h-screen md:h-[70vh] flex flex-col items-center justify-start bg-gradient-to-l from-[#141414] to-[#0c2025] gap-12 py-12">
      {/* Title Section */}
      <div className="text-center mt-[70px]">
        <Title text1={"OUR"} text2={"POLICY"} />
        <p className="text-[13px] md:text-[20px] px-4 text-blue-100">
          Customer-Friendly Policies - Committed to Your Satisfaction and
          Safety.
        </p>
      </div>

      {/* Policy Card Section */}
      <div className="w-full flex items-center justify-center flex-wrap gap-10">
        <div className="w-[400px] max-w-[90%] flex flex-col items-center justify-center gap-[10px] text-center">
          <RiExchangeFill className="md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#7f8f9f]" />
          <p className="font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]">
            Easy Exchange Policy
          </p>
          <p className="font-medium md:text-[18px] text-[12px] text-[aliceblue]">
            Exchange Made Easy - Quick, Simple, and Customer-Friendly Process
          </p>
        </div>
        <div className="w-[400px] max-w-[90%] flex flex-col items-center justify-center gap-[10px] text-center">
          <RiDiscountPercentFill className="md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#7f8f9f]" />
          <p className="font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]">
            7 Days Return Policy
          </p>
          <p className="font-medium md:text-[18px] text-[12px] text-[aliceblue]">
            {/* Exchange Made Easy - Quick, Simple, and Customer-Friendly Process */}
            Shop with Confidence - 7 Days Return Policy
          </p>
        </div>
        <div className="w-[400px] max-w-[90%] flex flex-col items-center justify-center gap-[10px] text-center">
          <MdSupportAgent className="md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#7f8f9f]" />
          <p className="font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]">
            Best Customer Support
          </p>
          <p className="font-medium md:text-[18px] text-[12px] text-[aliceblue]">
            {/* Exchange Made Easy - Quick, Simple, and Customer-Friendly Process */}
            Trusted Customer Support - Your Satisfaction is Our Priority
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
