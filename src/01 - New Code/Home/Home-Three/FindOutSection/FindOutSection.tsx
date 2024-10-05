import React from "react";

import FindOutOne from "../../../../../public/assets/Home-new/FindOutOne.png";
import FindOutTwo from "../../../../../public/assets/Home-new/FindOutTwo.png";
import FindOutThree from "../../../../../public/assets/Home-new/FindOutThree.png";
import FindOutFour from "../../../../../public/assets/Home-new/FindOutFour.png";
import FindOutFive from "../../../../../public/assets/Home-new/FindOutFive.png";
import FindOutSix from "../../../../../public/assets/Home-new/FindOutSix.png";

const FindOutSection = () => {
  return (
    <div className=" flex flex-col gap-5 py-[50px] px-[20px] 2xl:px-[100px] w-full bg-black">
      <div className=" flex items-center justify-center flex-col gap-2">
        <h2 className="text-center text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] to-[#999999] text-[30px] sm:text-[50px] font-bold">
          Find out what we do at Tallento
        </h2>

        <p className=" text-[14px] text-[#cccccc] text-center">
          Recruitment made easy for candidates searching for IIT JEE, NEET
          Coaching jobs, Edtech jobs, School teacher
           jobs & Other Education Sector Jobs.
        </p>
        
      </div>

      <div className=" hidden lg:flex justify-center gap-5 py-[50px]  w-full">
        <div className=" w-[25%] flex flex-col gap-5">
          <img src={FindOutOne} className="w-[25%]" alt="reputation" />

          <div className=" flex flex-col gap-2">
            <h3 className=" text-white text-[20px] font-semibold">
              Job Requirement Collection
            </h3>
            <p className=" text-[#9ca1a3]">
              We gather detailed job descriptions, including role
              responsibilities, qualifications, salary range, and interview
              process.
            </p>
          </div>
        </div>

        <div className=" py-[130px] h-full border-1 border-solid border-[#343a40]"></div>

        <div className=" w-[25%] flex flex-col gap-5">
          <img src={FindOutTwo} className="w-[25%]" alt="reputation" />

          <div className=" flex flex-col gap-2">
            <h3 className=" text-white text-[20px] font-semibold">
              Job Posting & Candidate Sourcing
            </h3>
            <p className=" text-[#9ca1a3]">
              We post jobs on our portal and source candidates from our
              extensive database. We also leverage our network to attract.
            </p>
          </div>
        </div>

        <div className=" py-[130px] h-full border-1 border-solid border-[#343a40]"></div>

        <div className=" w-[25%] flex flex-col gap-5">
          <img src={FindOutThree} className="w-[25%]" alt="reputation" />

          <div className=" flex flex-col gap-2">
            <h3 className=" text-white text-[20px] font-semibold">
              Screening and Shortlisting
            </h3>
            <p className=" text-[#9ca1a3]">
              We review applications and shortlist candidates based on your
              criteria. Our process involves initial screening through phone.
            </p>
          </div>
        </div>
      </div>

      <div className=" hidden lg:flex justify-center gap-5 pb-[50px]  w-full">
        <div className=" w-[25%] flex flex-col gap-5">
          <img src={FindOutFour} className="w-[25%]" alt="reputation" />

          <div className=" flex flex-col gap-2">
            <h3 className=" text-white text-[20px] font-semibold">
              Interview Scheduling and Communication
            </h3>
            <p className=" text-[#9ca1a3]">
              We coordinate interviews with candidates, ensuring a smooth and
              efficient process.
            </p>
          </div>
        </div>

        <div className=" py-[130px] h-full border-1 border-solid border-[#343a40]"></div>

        <div className=" w-[25%] flex flex-col gap-5">
          <img src={FindOutFive} className="w-[25%]" alt="reputation" />

          <div className=" flex flex-col gap-2">
            <h3 className=" text-white text-[20px] font-semibold">
              Final Selection & Negotiation
            </h3>
            <p className=" text-[#9ca1a3]">
              We assist with the selection process, negotiating terms and
              salaries with the selected candidates. However, please note that
              we do not.
            </p>
          </div>
        </div>

        <div className=" py-[130px] h-full border-1 border-solid border-[#343a40]"></div>

        <div className=" w-[25%] flex flex-col gap-5">
          <img src={FindOutSix} className="w-[25%]" alt="reputation" />

          <div className=" flex flex-col gap-2">
            <h3 className=" text-white text-[20px] font-semibold">
              Onboarding Assistance
            </h3>
            <p className=" text-[#9ca1a3]">
              We gather detailed job descriptions, including role
              responsibilities, qualifiOnce the candidate is selected, we
              support the onboarding process.
            </p>
          </div>
        </div>
      </div>

      {/* Md ->>>>>>>>>>>> */}

      <div className=" hidden sm:flex  lg:hidden justify-center gap-5 pt-[50px]  w-full">
        <div className=" w-[100%] flex flex-col gap-5">
          <img src={FindOutOne} className="w-[25%]" alt="reputation" />

          <div className=" flex flex-col gap-2">
            <h3 className=" text-white text-[20px] font-semibold">
              Job Requirement Collection
            </h3>
            <p className=" text-[#9ca1a3]">
              We gather detailed job descriptions, including role
              responsibilities, qualifications, salary range, and interview
              process.
            </p>
          </div>
        </div>

        <div className=" py-[130px] h-full border-1 border-solid border-[#343a40]"></div>

        <div className=" w-[100%] flex flex-col gap-5">
          <img src={FindOutTwo} className="w-[25%]" alt="reputation" />

          <div className=" flex flex-col gap-2">
            <h3 className=" text-white text-[20px] font-semibold">
              Job Posting & Candidate Sourcing
            </h3>
            <p className=" text-[#9ca1a3]">
              We post jobs on our portal and source candidates from our
              extensive database. We also leverage our network to attract.
            </p>
          </div>
        </div>
      </div>

      <div className=" hidden sm:flex  lg:hidden justify-center gap-5 pt-[50px]  w-full">
        <div className=" w-[100%] flex flex-col gap-5">
          <img src={FindOutThree} className="w-[25%]" alt="reputation" />

          <div className=" flex flex-col gap-2">
            <h3 className=" text-white text-[20px] font-semibold">
              Screening and Shortlisting
            </h3>
            <p className=" text-[#9ca1a3]">
              We review applications and shortlist candidates based on your
              criteria. Our process involves initial screening through phone.
            </p>
          </div>
        </div>
        <div className=" py-[130px] h-full border-1 border-solid border-[#343a40]"></div>

        <div className=" w-[100%] flex flex-col gap-5">
          <img src={FindOutFour} className="w-[25%]" alt="reputation" />

          <div className=" flex flex-col gap-2">
            <h3 className=" text-white text-[20px] font-semibold">
              Interview Scheduling and Communication
            </h3>
            <p className=" text-[#9ca1a3]">
              We coordinate interviews with candidates, ensuring a smooth and
              efficient process.
            </p>
          </div>
        </div>
      </div>

      <div className=" hidden sm:flex lg:hidden justify-center gap-5 pb-[50px]  w-full">
        <div className=" w-[100%] flex flex-col gap-5">
          <img src={FindOutFive} className="w-[25%]" alt="reputation" />

          <div className=" flex flex-col gap-2">
            <h3 className=" text-white text-[20px] font-semibold">
              Final Selection & Negotiation
            </h3>
            <p className=" text-[#9ca1a3]">
              We assist with the selection process, negotiating terms and
              salaries with the selected candidates. However, please note that
              we do not.
            </p>
          </div>
        </div>

        <div className=" py-[130px] h-full border-1 border-solid border-[#343a40]"></div>

        <div className=" w-[100%] flex flex-col gap-5">
          <img src={FindOutSix} className="w-[25%]" alt="reputation" />

          <div className=" flex flex-col gap-2">
            <h3 className=" text-white text-[20px] font-semibold">
              Onboarding Assistance
            </h3>
            <p className=" text-[#9ca1a3]">
              We gather detailed job descriptions, including role
              responsibilities, qualifiOnce the candidate is selected, we
              support the onboarding process.
            </p>
          </div>
        </div>
      </div>

      {/* Md ->>>>>>>>>>>> */}

      {/* Mobile ->>>>>>>>>>>> */}

      <div className=" flex sm:hidden flex-col  justify-center gap-5 pt-[50px]  w-full">
        <div className=" w-[100%] flex flex-col gap-5">
          <img src={FindOutOne} className="w-[25%]" alt="reputation" />

          <div className=" flex flex-col gap-2">
            <h3 className=" text-white text-[20px] font-semibold">
              Job Requirement Collection
            </h3>
            <p className=" text-[#9ca1a3]">
              We gather detailed job descriptions, including role
              responsibilities, qualifications, salary range, and interview
              process.
            </p>
          </div>
        </div>

        <div className=" w-[100%] flex flex-col gap-5">
          <img src={FindOutTwo} className="w-[25%]" alt="reputation" />

          <div className=" flex flex-col gap-2">
            <h3 className=" text-white text-[20px] font-semibold">
              Job Posting & Candidate Sourcing
            </h3>
            <p className=" text-[#9ca1a3]">
              We post jobs on our portal and source candidates from our
              extensive database. We also leverage our network to attract.
            </p>
          </div>
        </div>
        <div className=" w-[100%] flex flex-col gap-5">
          <img src={FindOutThree} className="w-[25%]" alt="reputation" />

          <div className=" flex flex-col gap-2">
            <h3 className=" text-white text-[20px] font-semibold">
              Screening and Shortlisting
            </h3>
            <p className=" text-[#9ca1a3]">
              We review applications and shortlist candidates based on your
              criteria. Our process involves initial screening through phone.
            </p>
          </div>
        </div>
        <div className=" w-[100%] flex flex-col gap-5">
          <img src={FindOutFour} className="w-[25%]" alt="reputation" />

          <div className=" flex flex-col gap-2">
            <h3 className=" text-white text-[20px] font-semibold">
              Interview Scheduling and Communication
            </h3>
            <p className=" text-[#9ca1a3]">
              We coordinate interviews with candidates, ensuring a smooth and
              efficient process.
            </p>
          </div>
        </div>

        <div className=" w-[100%] flex flex-col gap-5">
          <img src={FindOutFive} className="w-[25%]" alt="reputation" />

          <div className=" flex flex-col gap-2">
            <h3 className=" text-white text-[20px] font-semibold">
              Final Selection & Negotiation
            </h3>
            <p className=" text-[#9ca1a3]">
              We assist with the selection process, negotiating terms and
              salaries with the selected candidates. However, please note that
              we do not.
            </p>
          </div>
        </div>
        <div className=" w-[100%] flex flex-col gap-5">
          <img src={FindOutSix} className="w-[25%]" alt="reputation" />

          <div className=" flex flex-col gap-2">
            <h3 className=" text-white text-[20px] font-semibold">
              Onboarding Assistance
            </h3>
            <p className=" text-[#9ca1a3]">
              We gather detailed job descriptions, including role
              responsibilities, qualifiOnce the candidate is selected, we
              support the onboarding process.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile ->>>>>>>>>>>> */}
    </div>
  );
};

export default FindOutSection;
