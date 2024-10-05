import React from "react";
import Attracting from "../../../../../public/assets/Home-new/Attracting.png"

const AIPowered = () => {
  return (
    <div className=" w-full pb-5 flex flex-col gap-4 justify-center items-center">
      <div className=" hidden  w-full md:flex flex-col items-center justify-center gap-3">
        <h3 className="  text-center text-[25px] sm:text-[35px] font-bold text-black ">
          AI-powered job portal adapts to modern recruitment
        </h3>
        <p className="  text-center ">
          AI-powered job portal adapts to modern recruitment demands, offering
          efficient, flexible, and insightful
          <br /> hiring solutions
        </p>
      </div>

      <div className=" w-full flex md:hidden flex-col items-center justify-center gap-3 px-2">
        <h3 className=" text-center text-[22px] sm:text-[35px] font-bold text-black ">
          AI-powered job portal adapts to modern recruitment
        </h3>
        <p className="  text-center ">
          AI-powered job portal adapts to modern recruitment demands, offering
          efficient, flexible, and insightful
          hiring solutions
        </p>
      </div>

      <div className=" flex flex-col lg:flex-row lg:justify-between items-center h-[300px] sm:h-[300px] lg:h-[300px] w-[80%] bg-[#0b0b0b] rounded-[20px] p-[20px] sm:p-[40px]">
        
        <div className=" flex flex-col justify-between h-full">
          <h3 className=" hidden sm:block text-left text-[25px] sm:text-[30px] text-white">
            Attracting the Best Talent is Crucial
            <br /> for Maintaining a Competitive
            <br /> Advantage
          </h3>
          <h3 className=" block sm:hidden text-center text-[25px] sm:text-[30px] text-white">
            Attracting the Best Talent is Crucial
            for Maintaining a Competitive
           Advantage
          </h3>
          <p className="hidden sm:block  text-white">With FPS Jobs and Tallento.ai harnessing the power of AI<br /> and human expertise, you can boost your recruiters'<br /> productivity by 10x.</p>
          <p className="block sm:hidden text-center text-white">With FPS Jobs and Tallento.ai harnessing the power of AI and human expertise, you can boost your recruiters' productivity by 10x.</p>
        </div>

        <img 
        
        alt=" img"
        src={Attracting}  
        className="w-[30%] hidden lg:block"      
        />
      </div>
    </div>
  );
};

export default AIPowered;
