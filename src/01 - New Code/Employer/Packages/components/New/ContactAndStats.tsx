import { ArrowBigRight, ChevronRight } from "lucide-react";
import React from "react";
import MoreQuestionImage from "../../../../../../public/assets/membership/Group.png";

const ContactAndStats = () => {
  return (
    <div className=" w-full flex-col flex gap-[50px]">
      <div className=" w-full flex justify-between items-center h-[180px] bg-[#fdf6f8] rounded-lg p-4 px-5 gap-4 lg:gap-1">
        <div className="w-[20%] hidden lg:block">
          <img src={MoreQuestionImage} className="w-[150px]" />
        </div>
        <div className="flex flex-col gap-1 justify-center h-full w-[70%] lg:w-[60%]">
          <h2 className=" text-[#c94f56] font-medium text-[24px] ">
            Have More Questions? We're Here to Help!
          </h2>
          <p>
            Connect with us anytime for clear answers, expert guidance, and
            personalized support. We'rejust a call or click away!
          </p>
          
        </div>
        <div className=" w-[30%] lg:w-[20%] flex justify-center items-center">
          <button className="flex gap-2 items-center bg-white border-2 border-[#999999] border-solid h-[50px] px-3 rounded-xl text-[18px] font-medium">
            Contact Us <ChevronRight />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 h-[200px] w-full gap-[30px] px-[20px] mb-[250px] lg:mb-[50px]">
        <div className=" h-full w-full bg-[#f7f7f7] rounded-2xl p-4 flex flex-col gap-3">
          <div className=" h-[40px] w-[40px] bg-black rounded-full"></div>
          <h3 className=" text-[25px] font-bold text-[#171d45]">5 Crore +</h3>
          <p className=" text-[#455164] text-[20px]">Candidates use Tallento</p>
        </div>
        <div className=" h-full w-full bg-[#f7f7f7] rounded-2xl p-4 flex flex-col gap-3">
          <div className=" h-[40px] w-[40px] bg-black rounded-full"></div>
          <h3 className=" text-[25px] font-bold text-[#171d45]">1 Lakhs +</h3>
          <p className=" text-[#455164] text-[20px]">
            New Candidates every month
          </p>
        </div>
        <div className=" h-full w-full bg-[#f7f7f7] rounded-2xl p-4 flex flex-col gap-3">
          <div className=" h-[40px] w-[40px] bg-black rounded-full"></div>
          <h3 className=" text-[25px] font-bold text-[#171d45]">7 Lakhs +</h3>
          <p className=" text-[#455164] text-[20px]">
            Employers already at Tallento.
          </p>
        </div>
        <div className=" h-full w-full bg-[#f7f7f7] rounded-2xl p-4 flex flex-col gap-3">
          <div className=" h-[40px] w-[40px] bg-black rounded-full"></div>
          <h3 className=" text-[25px] font-bold text-[#171d45]">95 +</h3>
          <p className=" text-[#455164] text-[20px]">Cities</p>
        </div>
      </div>
    </div>
  );
};

export default ContactAndStats;
