import React from "react";
import TopTalemt from "../../../../../public/assets/Home-new/TopTalent.png";

const TopTalent = () => {
  return (
    <div className=" w-full pb-5 flex flex-col gap-4 justify-center items-center">
      <div className=" gap-[100px] 2xl:gap-[100px] flex flex-col lg:flex-row  items-center  lg:h-[500px]  w-[80%] bg-[#0b0b0b] rounded-[20px] p-[20px] sm:p-[40px]">
        <div className=" flex flex-col justify-center gap-3 h-full">
          <h3 className=" hidden sm:block text-left text-[25px] sm:text-[30px] text-white">
            Find and engage top talent online in just a few clicks.
          </h3>
          <h3 className=" block sm:hidden text-center text-[25px] sm:text-[30px] text-white">
            Find and engage top talent online in just a few clicks.
          </h3>
          <p className="hidden sm:block  text-white">
            We’re reinventing what it means to source, engage, and hire top
            talent. Our AI-powered talent engagement platform automates sourcing
            and outreach, giving your recruiters the bandwidth to focus on the
            human side of recruiting. Built by recruiters for recruiters.
          </p>
          <p className="block sm:hidden text-center text-white">
            We’re reinventing what it means to source, engage, and hire top
            talent. Our AI-powered talent engagement platform automates sourcing
            and outreach, giving your recruiters the bandwidth to focus on the
            human side of recruiting. Built by recruiters for recruiters.
          </p>
        </div>
        <img alt=" img" src={TopTalemt} className="w-[50%] hidden lg:block" />
      </div>
    </div>
  );
};

export default TopTalent;
