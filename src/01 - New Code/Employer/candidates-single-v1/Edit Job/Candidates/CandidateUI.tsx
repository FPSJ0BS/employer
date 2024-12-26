import React from "react";
import NODATAPIC from "../../../../../../public/assets/storyset/Innovation-pana.png";
import { Dot } from "lucide-react";

const CandidateUI = ({ applicationsArray }) => {
  return (
    <div className="flex flex-col gap-4  w-full mt-4 ">
      {applicationsArray?.length < 1 ? (
        <div className=" flex flex-col justify-center items-center z-30">
          {" "}
          <h2 className=" font-medium text-[20px]">
            No Data, Keep Searching!!!
          </h2>{" "}
          <img className=" w-[40%]" src={NODATAPIC} alt="No Data" />
        </div>
      ) : (
        applicationsArray?.map((application, index) => {
          return (
            <>
              {" "}
              <div
                key={application?.applyID}
                style={{ position: "relative" }}
                className=" cursor-default relative transition-all duration-500 hover:translate-y-2 w-full min-h-[250px] bg-neutral-50 rounded-lg shadow-xl flex flex-row items-start justify-center gap-4 p-3 before:absolute before:w-full hover:before:top-0 before:duration-500 before:-top-1 before:h-1 "
              >
                <div className="  w-full h-[100px] flex border-b-2 border-solid border-[#e4e4e4] border-t-0 border-r-0 border-l-0">
                  <div className="w-[85%] h-full flex  items-start gap-0">
                    <div className="w-[10%] h-full flex justify-start items-center">
                      <div className="h-[70px] w-[70px] rounded-full bg-black"></div>
                    </div>
                    <div className="w-[90%] h-full flex flex-col justify-center items-start gap-2">
                      <div className="flex items-center">
                        <h2 className=" font-semibold text-[20px]">Dharavi Mayur</h2>
                        <button className=" bg-[#fae8fd] rounded-[30px] text-[#7d348c] px-3  text-[15px] font-medium">
                          View full profile!
                        </button>
                      </div>
                      <div className="flex w-fit gap-4 text-[#636363] text-[15px]">
                        <div className="flex gap-0 items-center w-full ">
                          <Dot /> Full Time
                        </div>
                        <div className="flex gap-0 items-center w-full ">
                          <Dot /> Full Time
                        </div>
                        <div className="flex gap-0 items-center w-full ">
                          <Dot /> Full Time
                        </div>
                        <div className="flex gap-0 items-center w-full ">
                          <Dot /> Full Time
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[15%] h-full"></div>
                </div>
              </div>
            </>
          );
        })
      )}
    </div>
  );
};

export default CandidateUI;
