import React from "react";
import RedCirle from "../../../../../public/assets/Home-new/RedCircle.png";
import GreenCirle from "../../../../../public/assets/Home-new/GreenCircle.png";
import PrupleCirle from "../../../../../public/assets/Home-new/PurpleCircle.png";
import Tick from "../../../../../public/assets/Home-new/tick.png";

const FuelBottomLine = () => {
  return (
    <div className=" p-5 bg-[#0F0F0F] flex flex-col  sm:gap-[50px]">
      <h2 className=" pb-3 sm:pb-0 text-center text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] to-[#999999] text-[20px] sm:text-[35px] font-bold">
        All the features you need that fuel your bottom line
      </h2>
      <div className=" grid sm:grid-cols-2 lg:grid-cols-3 gap-5 px-[5px] sm:px-[50px] 2xl:px-[180px] ">
        <div className=" flex flex-col gap-4 p-[20px] sm:p-[40px]   w-full bg-gradient-to-b from-white-1f via-white-0a to-white-12 rounded-[20px] border-1 border-solid border-[#707070]">
          <img src={RedCirle} className=" w-[30px]" alt="RedCirle" />
          <p className=" mb-0 text-[22px] font-semibold text-white">
            AI Interviews for the Education Sector
          </p>
          <div className=" flex flex-col gap-2 w-full">
            <div className=" w-full flex justify-start items-center gap-2">
              <div className=" w-[8%]">
                <img src={Tick} className="w-[100%]" alt="tick" />
              </div>
              <div className=" w-[92%]">
                <p className="mb-0 leading-[1.2em] text-[15px] text-[#9ca1a3]">
                  Auto-Scheduling with Adaptive Questions
                </p>
              </div>
            </div>

            <div className=" w-full flex justify-start items-center gap-2">
              <div className=" w-[8%]">
                <img src={Tick} className="w-[100%]" alt="tick" />
              </div>
              <div className=" w-[92%]">
                <p className="mb-0 leading-[1.2em] text-[15px] text-[#9ca1a3]">
                  Custom Questions for Education
                </p>
              </div>
            </div>

            <div className=" w-full flex justify-start items-center gap-2">
              <div className=" w-[8%]">
                <img src={Tick} className="w-[100%]" alt="tick" />
              </div>
              <div className=" w-[92%]">
                <p className="mb-0 leading-[1.2em] text-[15px] text-[#9ca1a3]">
                  User-Friendly Interface
                </p>
              </div>
            </div>

            <div className=" w-full flex justify-start items-center gap-2">
              <div className=" w-[8%]">
                <img src={Tick} className="w-[100%]" alt="tick" />
              </div>
              <div className=" w-[92%]">
                <p className="mb-0 leading-[1.2em] text-[15px] text-[#9ca1a3]">
                  Unbiased Evaluation and Scoring
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex flex-col gap-4 p-[20px] sm:p-[40px]   w-full bg-gradient-to-b from-white-1f via-white-0a to-white-12 rounded-[20px] border-1 border-solid border-[#707070]">
          <img src={GreenCirle} className=" w-[30px]" alt="RedCirle" />
          <p className=" mb-0 text-[22px] font-semibold text-white">
            Create Dynamic Job Descriptions
          </p>
          <div className=" flex flex-col gap-2 w-full">
            <div className=" w-full flex justify-start items-center gap-2">
              <div className=" w-[8%]">
                <img src={Tick} className="w-[100%]" alt="tick" />
              </div>
              <div className=" w-[92%]">
                <p className="mb-0 leading-[1.2em] text-[15px] text-[#9ca1a3]">
                  Hassle-Free Sharing
                </p>
              </div>
            </div>

            <div className=" w-full flex justify-start items-center gap-2">
              <div className=" w-[8%]">
                <img src={Tick} className="w-[100%]" alt="tick" />
              </div>
              <div className=" w-[92%]">
                <p className="mb-0 leading-[1.2em] text-[15px] text-[#9ca1a3]">
                  AI-Powered Automation
                </p>
              </div>
            </div>

            <div className=" w-full flex justify-start items-center gap-2">
              <div className=" w-[8%]">
                <img src={Tick} className="w-[100%]" alt="tick" />
              </div>
              <div className=" w-[92%]">
                <p className="mb-0 leading-[1.2em] text-[15px] text-[#9ca1a3]">
                  User-Friendly Interface
                </p>
              </div>
            </div>

            <div className=" w-full flex justify-start items-center gap-2">
              <div className=" w-[8%]">
                <img src={Tick} className="w-[100%]" alt="tick" />
              </div>
              <div className=" w-[92%]">
                <p className="mb-0 leading-[1.2em] text-[15px] text-[#9ca1a3]">
                  Unbiased Evaluation and Scoring
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex flex-col gap-4 p-[20px] sm:p-[40px]   w-full bg-gradient-to-b from-white-1f via-white-0a to-white-12 rounded-[20px] border-1 border-solid border-[#707070]">
          <img src={PrupleCirle} className=" w-[30px]" alt="RedCirle" />
          <p className=" mb-0 text-[22px] font-semibold text-white">
          Streamline Your Recruitment Process
          </p>
          <div className=" flex flex-col gap-2 w-full">
            <div className=" w-full flex justify-start items-center gap-2">
              <div className=" w-[8%]">
                <img src={Tick} className="w-[100%]" alt="tick" />
              </div>
              <div className=" w-[92%]">
                <p className="mb-0 leading-[1.2em] text-[15px] text-[#9ca1a3]">
                Filter Precise Matches
                </p>
              </div>
            </div>

            <div className=" w-full flex justify-start items-center gap-2">
              <div className=" w-[8%]">
                <img src={Tick} className="w-[100%]" alt="tick" />
              </div>
              <div className=" w-[92%]">
                <p className="mb-0 leading-[1.2em] text-[15px] text-[#9ca1a3]">
                Compatibility Scoring
                </p>
              </div>
            </div>

            <div className=" w-full flex justify-start items-center gap-2">
              <div className=" w-[8%]">
                <img src={Tick} className="w-[100%]" alt="tick" />
              </div>
              <div className=" w-[92%]">
                <p className="mb-0 leading-[1.2em] text-[15px] text-[#9ca1a3]">
                Skill and Experience Matching
                </p>
              </div>
            </div>

            <div className=" w-full flex justify-start items-center gap-2">
              <div className=" w-[8%]">
                <img src={Tick} className="w-[100%]" alt="tick" />
              </div>
              <div className=" w-[92%]">
                <p className="mb-0 leading-[1.2em] text-[15px] text-[#9ca1a3]">
                Unbiased Evaluation and Scoring
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuelBottomLine;
