import React from "react";
import FindGreat from "../../../../../public/assets/Home-new/OnBoarding.png";

const FindGreatTalent = () => {
  return (
    <div className=" w-full pb-5 flex flex-col gap-4 justify-center items-center">
      <div className=" gap-[200px] 2xl:gap-[300px] flex flex-col lg:flex-row-reverse  items-center h-[350px] sm:h-[300px] lg:h-[300px] w-[80%] bg-[#0b0b0b] rounded-[20px] p-[20px] sm:p-[40px]">
        <div className=" flex flex-col justify-center gap-3 h-full">
          <h3 className=" hidden sm:block text-left text-[25px] sm:text-[30px] text-white">
            Find great talent in days, not months.
          </h3>
          <h3 className=" block sm:hidden text-center text-[25px] sm:text-[30px] text-white">
            Find great talent in days, not months.
          </h3>
          <p className="hidden sm:block  text-white">
            We're redefining how talent is sourced, engaged, and hired.Our
            AI-powered talent engagement platform automatessourcing and
            outreach, freeing your recruiters to focuson the human side of
            recruiting. Designed by educators,for the education sector.
          </p>
          <p className="block sm:hidden text-center text-white">
            We're redefining how talent is sourced, engaged, and hired.Our
            AI-powered talent engagement platform automatessourcing and
            outreach, freeing your recruiters to focus on the human side of
            recruiting. Designed by educators,for the education sector
          </p>
        </div>
        <img alt=" img" src={FindGreat} className="w-[35%] hidden lg:block" />
      </div>
    </div>
  );
};

export default FindGreatTalent;
