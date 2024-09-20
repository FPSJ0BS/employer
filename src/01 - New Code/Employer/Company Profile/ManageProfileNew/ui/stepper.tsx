import React from "react";
import { useSelector } from "react-redux";

export const Steps = ({ setNextSection, nextSectionData }) => {
  const { employerManageProfileFields } = useSelector(
    (state) => state.employerManageProfile
  );

  const nextSet = () => {
    if (employerManageProfileFields?.phoneNumberVerified === 0) {
      return;
    } else {
      setNextSection(true);
    }
  };
  return (
    <div className="w-[100%] flex justify-center items-center">
      <div className=" w-[100%] sm:w-[30%]  h-[100px] flex ">
        <div className=" w-[30%] h-[100%]  flex  justify-end items-center relative">
          
          <div
            onClick={() => setNextSection(false)}
            className={`  cursor-pointer w-[50px] h-[50px] rounded-[50%] border-2  border-solid border-[#cc5475] ${
              !nextSectionData ? "bg-[#cc5475]" : "bg-white"
            }  flex justify-center items-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`lucide lucide-users-round  ${
                !nextSectionData ? " text-white" : "text-[#cc5475]"
              }`}
            >
              <path d="M18 21a8 8 0 0 0-16 0" />
              <circle cx="10" cy="8" r="5" />
              <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
            </svg>
          </div>

          <h2 className=" absolute bottom-0 xl:left-[30%] 2xl:left-[40%] mr-[-50px] font-medium">Personal Details</h2>

        </div>

        <div className=" w-[40%] h-[100%]  flex justify-center items-center">
          <div className="w-[100%]">
            <hr className="bg-[#cc5475] opacity-100 h-[2px]" />
          </div>
        </div>

        <div className=" w-[30%] h-[100px] ">
          <div className=" w-[100%] h-[100%]  flex justify-start items-center relative">
            <div
              onClick={() => nextSet()}
              className={`cursor-pointer w-[50px] h-[50px] rounded-[50%] border-2 opacity-100 border-[#cc5475] ${
                nextSectionData ? "bg-[#cc5475]" : "bg-white"
              } border-solid flex justify-center items-center`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`lucide lucide-briefcase-business ${
                  nextSectionData ? " text-white" : "text-[#cc5475]"
                }`}
              >
                <path d="M12 12h.01" />
                <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                <path d="M22 13a18.15 18.15 0 0 1-20 0" />
                <rect width="20" height="14" x="2" y="6" rx="2" />
              </svg>
            </div>
            <h2 className=" absolute bottom-0 xl:left-[-40%] 2xl:left-[-30%] mr-[-50px] font-medium">Organization Details</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
