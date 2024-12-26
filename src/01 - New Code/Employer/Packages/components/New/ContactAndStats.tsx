import React from "react";

const ContactAndStats = () => {
  return (
    <div className=" w-full flex-col flex gap-[50px]">
      <div className=" w-full h-[180px] bg-[#fdf6f8] rounded-lg p-4">
        <div className="flex flex-col gap-1">
          <h2 className=" text-[#c94f56] font-medium text-[24px] ">
            Have More Questions? We're Here to Help!
          </h2>
          <p>
            Connect with us anytime for clear answers, expert guidance, and
            personalized support. We'rejust a call or click away!
          </p>
        </div>
      </div>

      <div className="flex gap-[50px] px-[60px]">

        <div className=" h-[200px] w-full bg-black rounded-2xl"></div>
        <div className=" h-[200px] w-full bg-black rounded-2xl"></div>
        <div className=" h-[200px] w-full bg-black rounded-2xl"></div>
        <div className=" h-[200px] w-full bg-black rounded-2xl"></div>

      </div>
    </div>
  );
};

export default ContactAndStats;
