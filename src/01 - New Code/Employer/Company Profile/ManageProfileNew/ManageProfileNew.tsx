import React, { useEffect, useState } from "react";
import DefaulHeader2 from "../../../Headers/DefaulHeader2ts";
import MobileMenu from "../../../Headers/MobileMenuts";
import FooterDefault from "../../../../components/footer/common-footer/index.jsx";
import { FirstName } from "./input/FirstName";
import { LastName } from "./input/LastName";
import { BorderBeam } from "../../../MagicUI/BorderBeam/border-beam";
import { Email } from "./input/Email";
import { Designation } from "./input/Designation";
import { PhoneNumber } from "./input/PhoneNumber";
import { Steps } from "./ui/stepper";
import { useSelector } from "react-redux";
import {
  closePhoneNumberManageProfileModal,
  openPhoneNumberManageProfileModal,
} from "../../Redux/CompanyProfile";
import { ModalPhoneNumber } from "./ui/ModalPhoneNumber";
import {
  postAuthPhoneOtpVerifyAxios,
  postPhoneOtpRegistrationAxios,
  postUpdateProfileAxios,
} from "../../../../api/apiAxios";
import { useDispatch } from "react-redux";
import { editEmployerManageProfileFields } from "../../Redux/CompanyProfile";
import { CustomizedSnackbarTwo } from "../../../Reusable Components/Snackbar/snackbarNew";

import { OrganizationName } from "./inputOrg/organizationName";
import { OrganizationDescription } from "./inputOrg/organizationDescription";
import { getStateListAxios, getProfile } from "../../../../api/apiAxios";
import { setManageProfileStatesData } from "../../Redux/CompanyProfile";
import { OrganizationState } from "./inputOrg/organizationState";
import { OrganizationCity } from "./inputOrg/organizationCity";
import { OrganizationAddress } from "./inputOrg/organizationAddress";
import { OrganizationContactPersonEmail } from "./inputOrg/organizationContactPersonEmail";
import { OrganizationContactPersonNumber } from "./inputOrg/organizationContactPersonNumber";
import { OrganizationContactPersonDesignation } from "./inputOrg/organizationContactPersonDesignation";
import { postAuthPhoneOtpSendAxios } from "../../../../api/apiAxios";
import { useNavigate } from "react-router-dom";
import { Gst } from "./input/Gst";
import { OtherBrandLevel } from "./inputOther/OtherBrandLevel";
import { OtherEmployerWebsite } from "./inputOther/OtherEmployerWebsite";
import { OtherShiftTiming } from "./inputOther/OtherShiftTiming";
import { OtherDays } from "./inputOther/OtherDays";
import { OtherEstabYear } from "./inputOther/OtherEstabYear";
import { OtherEmployeesWorking } from "./inputOther/OtherEmployeesWorking";
import { OtherSalaryDay } from "./inputOther/OtherSalaryDay";
import { OtherNoOfEmployees } from "./inputOther/OtherNoOfEmployees";
import { ModalEmailProfile } from "./ui/ModalEmailProfile";

export const ManageProfileNew = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      // setLoader(true)
      try {
        const [getState, getProfileData] = await Promise.all([
          getStateListAxios(),
          getProfile(),
        ]);

        if (getState?.data?.status && getProfileData?.data?.status) {
          await dispatch(setManageProfileStatesData(getState?.data?.data));
          const profData = await getProfileData?.data?.data?.employerDetails;
          const userData = await getProfileData?.data?.data?.userData;

          await dispatch(
            editEmployerManageProfileFields({
              firstName: profData?.contact_person_first_name,
              lastName: profData?.contact_person_last_name,
              email: userData?.email,
              organizationName: userData?.name,
              phoneNumberVerified: parseInt(userData?.phone_verified),
              phoneNumber: userData?.mobile,
              organizationDescription: profData?.organization_description,
              state: profData?.state,
              city: profData?.city,
              organizationAddress: profData?.address,
              contactPersonEmail: profData?.contact_person_email,
              contactPersonNumber: profData?.contact_person_no,
              contactPersonDesignation: profData?.contact_person_desig,
            })
          );
          // setLoader(false)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  const dispatch = useDispatch();
  const [nextSection, setNextSection] = useState(false);

  const [sectionState, setSectionDate] = useState({
    sectionOne: true,
    sectionTwo: false,
    sectionThree: false,
  });

  const { employerManageProfileFields, modal } = useSelector(
    (state: any) => state.employerManageProfile
  );

  // Resend Otp Close ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // Timer Details ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  // Timer Details ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // Send Otp from Phone ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const sendOtpFromPhone = async (e: any) => {
    e.preventDefault();

    if (employerManageProfileFields?.phoneNumberVerified === 1) {
      setSectionDate((prevState) => ({
        ...prevState,
        sectionOne: false,
        sectionTwo: true,
        sectionThree: false,
      }));
      return;
    }

    try {
      const res = await postAuthPhoneOtpSendAxios({
        mobile_number: employerManageProfileFields?.phoneNumber,
        email_id: employerManageProfileFields?.email,
      });
      if (res?.data?.status) {
        const onSuccessMessage = await res?.data?.message;
        await setSnackbarSuccessMessage(onSuccessMessage);
        await setTimer(30);
        await setSnackbarSuccessOpen(true);
        await dispatch(openPhoneNumberManageProfileModal());
      } else {
        console.log(res);
        const errMessage = await res?.data?.message;
        await setSnackbarErrorMessage(errMessage);
        setSnackbarErrorOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOtpFromPhone = async (e: any) => {
    e.preventDefault();

    try {
      const res = await postAuthPhoneOtpVerifyAxios({
        mobile_number: employerManageProfileFields?.phoneNumber,
        email_id: employerManageProfileFields?.email,
        otp: employerManageProfileFields?.otp,
      });
      if (res?.data?.status) {
        const onSuccessMessage = await res?.data?.message;
        await setSnackbarSuccessMessage(onSuccessMessage);
        await setSnackbarSuccessOpen(true);
        await dispatch(closePhoneNumberManageProfileModal());
        handleCompanyProfile1();
      } else {
        const errMessage = await res?.data?.message;
        await setSnackbarErrorMessage(errMessage);
        setSnackbarErrorOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Company Profile 1 - >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const handleCompanyProfile1 = async () => {
    try {
      const res = await getProfile();

      if (res?.data?.status) {
        const profData = await res?.data?.data?.employerDetails;
        const userData = await res?.data?.data?.userData;

        await dispatch(
          editEmployerManageProfileFields({
            phoneNumberVerified: parseInt(userData?.phone_verified),
            emailVerified: parseInt(userData?.email_verified),
            phoneNumber: userData?.mobile,
          })
        );

        setTimeout(() => {
          setNextSection(true);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Company Profile 2 - >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const handleCompanyProfile2 = async (e) => {
    e.preventDefault();
    try {
      const res = await postUpdateProfileAxios({
        organization_description:
          employerManageProfileFields?.organizationDescription,
        state: employerManageProfileFields?.state,
        city: employerManageProfileFields?.city,
        address: employerManageProfileFields?.organizationAddress,
        contact_person_email: employerManageProfileFields?.contactPersonEmail,
        contact_person_no: employerManageProfileFields?.contactPersonNumber,
        contact_person_desig:
          employerManageProfileFields?.contactPersonDesignation,
      });

      if (res?.data?.status) {
        const onSuccessMessage = await res?.data?.message;
        await setSnackbarSuccessMessage(onSuccessMessage);
        await setSnackbarSuccessOpen(true);

        setTimeout(() => {
          navigate("/employers-dashboard/post-jobs");
        }, 1000);
      } else {
        const errMessage = await res?.data?.message;
        await setSnackbarErrorMessage(errMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Change page ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

  const otpVerifyEmailandPhone = async (e,otpEmail, otpMobile) => {
    e.preventDefault()
    try {
      // Ensure at least one OTP is provided
      if (!otpEmail && !otpMobile) {
        throw new Error("Both OTP Email and OTP Mobile are missing.");
      }

      // Prepare the payload based on inputs
      const dataMain = {
        ...(otpEmail && {
          email_id: employerManageProfileFields.email,
          email_verified_otp: otpEmail,
        }),
        ...(otpMobile && {
          mobile_number: employerManageProfileFields?.phoneNumber,
          phone_verified_otp: otpMobile,
        }),
      };

      // Make the API call
      const response = await postAuthPhoneOtpVerifyAxios(dataMain);

      // Handle the response
      if (response?.data?.status) {
        handleCompanyProfile1()
        if (otpMobile) {
          const header = response?.data?.data[0];
          await localStorage.setItem("header", JSON.stringify(header));
          const onSuccessMessage = await response?.data?.message;
          await setSnackbarSuccessMessage(onSuccessMessage);
          setSnackbarSuccessOpen(true);
          await dispatch(closePhoneNumberManageProfileModal());

        } else {
          
          setEmailState(false)
          const header = response?.data?.data[0];
          await localStorage.setItem("header", JSON.stringify(header));
          const onSuccessMessage = await response?.data?.message;
          await setSnackbarSuccessMessage(onSuccessMessage);
          setSnackbarSuccessOpen(true);
          const successMessage =
            response?.data?.message || "Verification successful.";
          await setSnackbarSuccessMessage(successMessage);
          setSnackbarSuccessOpen(true);
        }
      } else {
        const errorMessage = response?.data?.message || "Verification failed.";
        await setSnackbarErrorMessage(errorMessage);
        setSnackbarErrorOpen(true);
      }
    } catch (error) {
      console.error("Error occurred during OTP verification:", error);
      await setSnackbarErrorMessage(
        error.message || "An unexpected error occurred."
      );
      setSnackbarErrorOpen(true);
    }
  };

  const [emailState,setEmailState] = useState(false);

  return (
    <div className=" w-[100%] ">
      <DefaulHeader2 />
      <MobileMenu />

      {modal && (
        <ModalPhoneNumber
          timerNew={timer}
          resendOtpfunc={sendOtpFromPhone}
          verifyOtpFromPhoneFunc={otpVerifyEmailandPhone}
        
        />
      )}
      {emailState && (
        <ModalEmailProfile
          timerNew={timer}
          resendOtpfunc={sendOtpFromPhone}
          verifyOtpFromPhoneFunc={otpVerifyEmailandPhone}
       
        
        />
      )}
      {
        <div className="min-h-[100vh] w-[100%] flex-col flex justify-center items-center">
          <div className="mt-[80px] w-[100%] mb-8">
            <Steps
              sectionState={sectionState}
              setSectionDate={setSectionDate}
            />
          </div>
          {sectionState.sectionOne && (
            <div className=" min-h-[400px] w-[100%] flex justify-center items-center flex-col gap-4 mb-[50px]">
              <h2 className="text-[30px] font-semibold">Personal Details</h2>
              <p className=" font-semibold">
                We need these details to identify you and create your account
              </p>
              <div className="relative p-[20px] min-h-[400px] w-[600px] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50">
                <BorderBeam />
                <form
                  onSubmit={(e) => sendOtpFromPhone(e)}
                  className="w-[100%] h-[100%] grid grid-cols-1 sm:grid-cols-2 gap-2 place-content-center place-items-center"
                >
                  <FirstName />
                  <LastName />
                  <Gst />
                  <Email setEmailState = {setEmailState}/>
                  <PhoneNumber />

                  <div className="w-[100%] flex justify-center  items-center col-span-2 mt-4">
                    {/* <button
                      onClick={() => navigate("/employers-dashboard/dashboard")}
                      type="button"
                      className="submitPersonalDetailButton"
                    >
                      <span className="submitPersonalDetailButton-content">
                        {"Cancel"}
                      </span>
                    </button> */}
                    {/* <button className="submitPersonalDetailButton">
                      <span className="submitPersonalDetailButton-content">
                        {employerManageProfileFields?.phoneNumberVerified === 0
                          ? "Submit Details"
                          : "Next"}
                      </span>
                    </button> */}
                    <button className="submitPersonalDetailButton">
                      <span className="submitPersonalDetailButton-content">
                        Continue
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {sectionState.sectionTwo && (
            <div className=" w-[100%] flex justify-center items-center flex-col gap-6 mb-[50px] ">
              <h2 className="text-[30px] font-semibold">
                Organization Details
              </h2>
              <div className="relative flex justify-center items-center p-[20px] min-h-[500px] w-[600px] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50">
                <BorderBeam />

                
                <button
                  onClick={() => setSectionDate((prevState) => ({
                    ...prevState,
                    sectionOne: false,
                    sectionTwo: false,
                    sectionThree: true,
                  }))}
                  className=" cursor-pointer absolute w-[80px] h-[30px] rounded-[5px] top-[5px] right-[5px] flex justify-center items-center bg-[#be5b75] text-white font-medium"
                >
                  Skip
                </button>

                <form
                  onSubmit={(e) => handleCompanyProfile2(e)}
                  className="w-[100%] h-[100%] grid grid-cols-1 sm:grid-cols-2 gap-3 place-content-center place-items-center sm:place-items-start"
                >
                  <OrganizationName />
                  <OrganizationDescription />
                  <OrganizationState />
                  <OrganizationCity />
                  <OrganizationAddress />
                  <OrganizationContactPersonEmail />
                  <OrganizationContactPersonNumber />
                  <OrganizationContactPersonDesignation />
                  <div className="w-[100%] flex justify-center sm:justify-between items-end col-span-2 mt-4 gap-4">
                    <button
                      onClick={() => navigate("/employers-dashboard/dashboard")}
                      type="button"
                      className="submitPersonalDetailButton"
                    >
                      <span className="submitPersonalDetailButton-content">
                        {"Go Back"}
                      </span>
                    </button>
                    <button className="submitPersonalDetailButton">
                      <span className="submitPersonalDetailButton-content">
                        Submit Details
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {sectionState.sectionThree && (
            <div className=" w-[100%] flex justify-center items-center flex-col gap-6 mb-[50px] ">
              <h2 className="text-[30px] font-semibold">Other Details</h2>
              <div className="relative flex justify-center items-start p-[20px] min-h-[500px] w-[600px] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50">
                <BorderBeam />

                <button
                  onClick={() => navigate("/employers-dashboard/post-jobs")}
                  className=" cursor-pointer absolute w-[80px] h-[30px] rounded-[5px] top-[5px] right-[5px] flex justify-center items-center bg-[#be5b75] text-white font-medium"
                >
                  Skip
                </button>

                <form
                  onSubmit={(e) => handleCompanyProfile2(e)}
                  className="w-[100%] h-[100%] grid grid-cols-1 sm:grid-cols-2 gap-3 place-content-center place-items-center sm:place-items-start"
                >
                  <OtherBrandLevel />
                  <OtherEmployerWebsite />
                  <OtherDays />
                  <OtherEstabYear />
                  <OtherNoOfEmployees />
                  <OtherSalaryDay />
                  <OtherShiftTiming />

                  <div className="w-[100%] flex justify-center sm:justify-between items-end col-span-2 mt-4 gap-2">
                    <button
                      onClick={() => navigate("/employers-dashboard/dashboard")}
                      type="button"
                      className="submitPersonalDetailButton"
                    >
                      <span className="submitPersonalDetailButton-content">
                        {"Cancel"}
                      </span>
                    </button>
                    <button className="submitPersonalDetailButton">
                      <span className="submitPersonalDetailButton-content">
                        Submit Details
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      }

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

      <FooterDefault footerStyle="alternate" />
    </div>
  );
};
