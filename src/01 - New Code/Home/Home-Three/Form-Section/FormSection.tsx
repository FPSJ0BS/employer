import React, { useState } from "react";

import WorkWithUS from "../../../../../public/assets/Home-new/Frame 1597883412 1.png";
import MainBg from "../../../../../public/assets/Home-new/bg.png";
import { OrganizationName } from "./components/InputFields/Enquiry/OrganizationName";
import { EmailId } from "./components/InputFields/Enquiry/EmailID";
import { FirstName } from "./components/InputFields/Enquiry/FirstName";
import { LastName } from "./components/InputFields/Enquiry/LastName";
import { Industry } from "./components/InputFields/Enquiry/Industry";
import EnquiryForm from "./components/EnquiryForm/EnquiryForm";
import SwitcherOne from "./components/SwitcherOne/SwitcherOne";
import SwitcherTwo from "./components/SwitcherTwo/SwitcherTwo";
import MobileNumberForm from "./components/InputFields/Login/MobileNumberForm";
import EmailForm from "./components/InputFields/Login/EmailForm";
import { CustomizedSnackbarTwo } from "../../../Reusable Components/Snackbar/snackbarNew";
import { useSelector } from "react-redux";

export type FormDataType = {
  sales_company_name: string;
  sales_email: string;
  person_first_name: string;
  sales_subject: string;
  sales_city: string;
  industry: number | null;
  sales_phone: number | null;
  password: string;
  sales_message: string;
};

export const FormSection = () => {
  const {login} = useSelector(state => state.login);  
  const [mainTabSwitch, setMainTabSwitch] = useState(false);

  const [isRecruitmentSelected, setRecruitmentSelected] = useState(true);
  const [isJobOpportunitiesSelected, setJobOpportunitiesSelected] =
    useState(false);

  const [isLoginSelected, setLoginSelected] = useState(true);
  const [isEmailSelected, setIsEmailSelected] = useState(false);

  const handleRecruitmentChange = () => {
    setRecruitmentSelected(true);
    setJobOpportunitiesSelected(false);
  };

  const handleJobOpportunitiesChange = () => {
    setRecruitmentSelected(false);
    setJobOpportunitiesSelected(true);
  };
  const handleLoginChange = () => {
    setLoginSelected(true);
    setIsEmailSelected(false);
  };

  const handleEmailChange = () => {
    setLoginSelected(false);
    setIsEmailSelected(true);
  };

  // Snackbar start ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // Snackbar Success

  const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
  const [snackbarSuccessMessage, setSnackbarSuccessMessage] = useState("");

  const handleSuccessCloseSnackbar = () => {
    setSnackbarSuccessOpen(false);
  };

  // Snackbar Error

  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
  const [snackbarErrorMessage, setSnackbarErrorMessage] = useState("");

  const handleErrorCloseSnackbar = () => {
    setSnackbarErrorOpen(false);
  };

  // Snackbar end ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  return (
    <>
      <CustomizedSnackbarTwo
        open={snackbarSuccessOpen}
        autoCloseDuration={4000} // milliseconds
        onClose={handleSuccessCloseSnackbar}
        message={snackbarSuccessMessage}
        severity="success" // or 'success', 'warning', 'info'
        backgroundColor="#344e41" // Custom background color
      />

      <CustomizedSnackbarTwo
        open={snackbarErrorOpen}
        autoCloseDuration={4000} // milliseconds
        onClose={handleErrorCloseSnackbar}
        message={snackbarErrorMessage}
        severity="error" // or 'success', 'warning', 'info'
        backgroundColor="#9d0208" // Custom background color
      />
      <div className=" flex item min-h-[100vh]  pt-[70px] xl:pt-[85px] xl:pb-[50px] ">
        <div className=" h-full   flex flex-col xl:flex-row w-full pt-[50px] 2xl:pt-[80px] pl-3 pr-3 sm:pl-0 sm:pr-0 md:px-[80px] 2xl:px-[100px] bg-[url('../../../../../public/assets/Home-new/bg.png')] bg-cover bg-center">
          
          
          <div className="  w-full xl:w-[55%] 2xl:w-[65%] flex flex-col gap-3 2xl:gap-5">
            <div className=" hidden md:flex flex-col gap-2">
              <h1 className="   text-[35px] sm:text-[45px] xl:text-[40px]  2xl:text-[3.5vw] text-black font-semibold">
                Hiring made super-easy with
              </h1>
              <h2 className=" text-[35px] sm:text-[45px] xl:text-[40px]  2xl:text-[3.3vw] text-[#c94f56] font-semibold">
                THE POWER OF AI and HUMANS!
              </h2>
            </div>
            <div className=" flex md:hidden flex-col gap-2">
              <h1 className=" text-center  text-[35px] sm:text-[45px] xl:text-[40px]  2xl:text-[3.5vw] text-black font-semibold">
                Hiring made super-easy with
              </h1>
              <h2 className=" text-center text-[35px] sm:text-[45px] xl:text-[40px]  2xl:text-[3.3vw] text-[#c94f56] font-semibold">
                THE POWER OF AI and HUMANS!
              </h2>
            </div>

            <p className=" text-black text-[16px] 2xl:text-[18px] leading-[1.2em] md:pr-[50px]">
              Get the top 1% filtered candidates 3x faster with FPSJOBS +
              Tallento.ai. You can focus on
               onboarding while we find the perfect fit.
            </p>
           

            <img
              src={WorkWithUS}
              className=" w-full xl:w-[92%] mt-[20px]  xl:mb-[0px] mb-[20px]"
              alt="Work With Us"
            />
          </div>

          

          <div className=" h-full  items-center  w-full xl:w-[45%] 2xl:w-[35%]  ">
            <div className=" min-h-[300px] w-full flex flex-col border-1 border-solid border-[#e6e6e6] border-[15px] rounded-[20px] p-4">
              <div className=" w-full flex justify-between pb-2 mb-3 ">
                <button
                  onClick={() => setMainTabSwitch(false)}
                  className={` font-semibold text-[15px] sm:text-[18px] ${login ? "w-[100%]" : "w-[50%]"}  ${
                    !mainTabSwitch ? "border-red-600" : "border-gray-300"
                  } border-b-1 border-l-0 border-t-0 border-r-0 border-solid  pb-2`}
                >
                  Sales Enquiry
                </button>
                { !login && <button
                  onClick={() => setMainTabSwitch(true)}
                  className={` font-semibold text-[15px] sm:text-[18px] w-[50%] ${
                    mainTabSwitch ? "border-red-600" : "border-gray-300"
                  } border-b-1 border-l-0 border-t-0 border-r-0 border-solid border-gray-300 pb-2`}
                >
                  Login / Register
                </button>}
              </div>

              {!mainTabSwitch ? (
                <div className=" w-full ">
                  <SwitcherOne
                    isRecruitmentSelected={isRecruitmentSelected}
                    handleRecruitmentChange={handleRecruitmentChange}
                    isJobOpportunitiesSelected={isJobOpportunitiesSelected}
                    handleJobOpportunitiesChange={handleJobOpportunitiesChange}
                  />
                  
                  {isRecruitmentSelected && <EnquiryForm 
                  setSnackbarSuccessMessage={setSnackbarSuccessMessage}
                  setSnackbarSuccessOpen={setSnackbarSuccessOpen}
                  setSnackbarErrorMessage={setSnackbarErrorMessage}
                  setSnackbarErrorOpen={setSnackbarErrorOpen}/>}
                  {isJobOpportunitiesSelected && (
                    <div className=" w-full flex items-center justify-center py-4">
                      <button   onClick={() => window.open('https://tallento.ai/', '_blank')} className=" w-[80%] h-[50px] bg-[#c94f56] font-semibold text-[16px] text-white rounded-md">
                        Search Jobs on Tallento.ai!
                      </button>
                    </div>
                  )}
                </div>

              ) : (
                <div className=" w-full ">
                  <SwitcherTwo
                    isLoginSelected={isLoginSelected}
                    handleLoginChange={handleLoginChange}
                    isEmailSelected={isEmailSelected}
                    handleEmailChange={handleEmailChange}
                  />

                  {isLoginSelected && (
                    <MobileNumberForm
                      setSnackbarSuccessMessage={setSnackbarSuccessMessage}
                      setSnackbarSuccessOpen={setSnackbarSuccessOpen}
                      setSnackbarErrorMessage={setSnackbarErrorMessage}
                      setSnackbarErrorOpen={setSnackbarErrorOpen}
                    />
                  )}
                  {isEmailSelected && <EmailForm 
                  setSnackbarSuccessMessage={setSnackbarSuccessMessage}
                  setSnackbarSuccessOpen={setSnackbarSuccessOpen}
                  setSnackbarErrorMessage={setSnackbarErrorMessage}
                  setSnackbarErrorOpen={setSnackbarErrorOpen}/>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormSection;
