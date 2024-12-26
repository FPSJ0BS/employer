import { Briefcase, ListCollapse, UserRound } from "lucide-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const Steps = ({ sectionState, setSectionDate }) => {
  const { employerManageProfileFields } = useSelector(
    (state) => state.employerManageProfile
  );

  const notifyInfoVerifyPhoneNumber = () => toast.info("Please Verify Phone Number!");


  const nextSet = () => {
    if (employerManageProfileFields?.phoneNumberVerified === 0) {
      notifyInfoVerifyPhoneNumber();
      return;
    } else {
      setSectionDate((prevState) => ({
        ...prevState,
        sectionOne: false,
        sectionThree: false,
        sectionTwo: true,
      }));
    }
  };

  const nextSetThree = () => {
    if (employerManageProfileFields?.phoneNumberVerified === 0) {
      notifyInfoVerifyPhoneNumber();
      return;
    } else {
      setSectionDate((prevState) => ({
        ...prevState,
        sectionOne: false,
        sectionThree: true,
        sectionTwo: false,
      }));
    }
  };

  useEffect(() => {
    console.log("sectionStatesectionState", sectionState);
  }, [sectionState]);
  return (
    <div className="w-[100%] flex justify-center items-center">
      <div className="w-full gap-0 2xl:w-[50%] xl:w-[60%] xl:ml-[50px] 2xl:ml-[30px] h-[100px] flex items-center">
        {/* Section 1 */}
        <div className="w-[10%] h-full flex justify-end items-center relative">
          <div
            onClick={() => {
              setSectionDate((prevState) => ({
                ...prevState,
                sectionOne: true,
                sectionTwo: false,
                sectionThree: false,
              }));
            }}
            className={`cursor-pointer w-[50px] h-[50px] rounded-full border-2 border-solid border-[#cc5475] ${
              sectionState.sectionOne ? "bg-[#cc5475] text-white" : "bg-white"
            } flex justify-center items-center`}
          >
            <UserRound />
          </div>
          <h2 className="absolute bottom-[-20px] left-[70%] transform -translate-x-1/2 text-center font-medium">
            Personal Details
          </h2>
        </div>

        {/* Line between Section 1 and Section 2 */}
        <div className="w-[35%] h-full flex justify-center items-center">
          <hr className="bg-[#cc5475] h-[2px] w-full" />
        </div>

        {/* Section 2 */}
        <div className="w-[10%] h-full flex justify-start items-center relative -mr-8">
          <div
            onClick={() => nextSet()}
            className={`cursor-pointer w-[50px] h-[50px] rounded-full border-2 border-solid border-[#cc5475] ${
              sectionState.sectionTwo ? "bg-[#cc5475] text-white" : "bg-white"
            } flex justify-center items-center`}
          >
            <Briefcase />
          </div>
          <h2 className="absolute bottom-[-20px] left-6 transform -translate-x-1/2 text-center font-medium">
            Organization Details
          </h2>
        </div>

        {/* Line between Section 2 and Section 3 */}
        <div className="w-[35%] h-full flex justify-center items-center">
          <hr className="bg-[#cc5475] h-[2px] w-[95%]" />{" "}
          {/* Adjusted the width */}
        </div>

        {/* Section 3 */}
        <div className="w-[10%] h-full flex justify-start items-center relative -ml-3">
          <div
            onClick={() => nextSetThree()}
            className={`cursor-pointer w-[50px] h-[50px] rounded-full border-2 border-solid border-[#cc5475] ${
              sectionState.sectionThree ? "bg-[#cc5475] text-white" : "bg-white"
            } flex justify-center items-center`}
          >
            <ListCollapse />
          </div>
          <h2 className="absolute bottom-[-20px]  left-6 right-1 transform -translate-x-1/2 text-center font-medium">
            Other Details
          </h2>
        </div>
      </div>
    </div>
  );
};
