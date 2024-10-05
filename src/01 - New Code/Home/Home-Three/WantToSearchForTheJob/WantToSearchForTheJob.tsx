import React from "react";

import PhoneImage from "../../../../../public/assets/Home-new/MobileImage.png";

const WantToSearchForTheJob = () => {
  return (
    <div className=" px-[20px] md:px-[80px] py-[50px] flex flex-col lg:flex-row min-h-[300px] lg:h-[500px] w-full">
      <div className=" w-[100%] lg:w-[40%] h-full flex flex-col items-start justify-center font-semibold gap-[45px]">
        <p className=" mb-0 text-[40px] font-semibold text-black leading-[1.2em]">
          Want to search the Job?
        </p>
        <p className=" mb-0 text-[18px] text-black">
          Boost your hiring accuracy by 65% with structured digital interviews.
          Experience the power of organized and consistent assessments, ensuring
          you select the best candidates for your team every time.
        </p>
        <div className=" w-full flex justify-center items-center sm:justify-start sm:items-start">
          <button onClick={() => window.open('https://play.google.com/store/apps/details?id=com.fpsapp&hl=en', '_blank')} className=" w-[200px] text-white rounded-[10px] h-[40px] bg-[#121212]">
            Download the App Now!
          </button>
        </div>
      </div>
      <div className=" w-[100%] lg:w-[60%] flex items-center ">
        <img
          className=" w-full md:w-[90%] 2xl:w-[80%]"
          alt="PhoneImage"
          src={PhoneImage}
        />
      </div>
    </div>
  );
};

export default WantToSearchForTheJob;
