import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Reject from "../../../../../../public/Employer/Manage Profile/reject.png";
import Check from "../../../../../../public/assets/icons/check.png";
import { validatePhoneNumber } from "../../../functions/employerFunctions";
import {
  editEmployerManageProfileFields,
  openPhoneNumberManageProfileModal,
} from "../../../Redux/CompanyProfile";
import { postAuthPhoneOtpSendAxios } from "../../../../../api/apiAxios";
import { toast } from "react-toastify";

export const PhoneNumber = () => {
  const { employerManageProfileFields } = useSelector(
    (state: any) => state.employerManageProfile
  );

  const dispatch = useDispatch();

  const [otpState, setOtpState] = useState(false); 
  const [timer, setTimer] = useState<number | null>(null); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (validatePhoneNumber(inputValue)) {
      const phoneNumber = inputValue ? parseInt(inputValue) : null;
      dispatch(editEmployerManageProfileFields({ phoneNumber }));
    } else {
      dispatch(editEmployerManageProfileFields({ phoneNumber: null }));
    }
  };

  const notifySuccess = () => toast.success("OTP sent successfully");

  const sendOtpFromPhone = async () => {
    if (timer === null) {
      setOtpState(true);
      try {
        const res = await postAuthPhoneOtpSendAxios({
          mobile_number: employerManageProfileFields?.phoneNumber,
        });

        if (res?.data?.status) {
          notifySuccess();
          setOtpState(false);
          setTimer(60);
          setTimeout(() => {
             dispatch(openPhoneNumberManageProfileModal());
          }, 1000);
        } else {
          const errMessage = await res?.data?.message;
          console.log("Error message:", errMessage);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Timer countdown logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer !== null && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer ? prevTimer - 1 : null));
      }, 1000);
    } else if (timer === 0) {
      setTimer(null); // Stop the timer when it reaches 0
    }

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div
      className={`z-40 w-[100%] flex flex-col gap-2 col-span-2 ${
        employerManageProfileFields?.phoneNumberVerified === 0 ? "mt-4" : "mt-0"
      }`}
    >
      <div className="flex gap-4 items-center">
        <label
          htmlFor="authRegisterInstName"
          className="postJobInputTitle font-medium text-gray-700"
        >
          Mobile Number *
        </label>
        {employerManageProfileFields?.phoneNumberVerified === 0 && (
          <button
            type="button"
            onClick={sendOtpFromPhone}
            disabled={otpState || timer !== null}
            className={`bg-[#d8e2dc] text-black px-3 rounded-md text-[14px] font-medium ${
              otpState || timer !== null ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {otpState
              ? "Sending..."
              : timer !== null
              ? `Resend OTP in ${timer}s`
              : "Send OTP on Mobile Number"}
          </button>
        )}
      </div>
      <div className="flex justify-center items-center gap-2 w-[100%]">
        <input
          disabled
          autoComplete="off"
          required
          onChange={(e) => handleChange(e)}
          type="string"
          id="authRegisterInstName"
          name="InstituteName"
          className="p-2 w-[20%] sm:w-[10%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          value="+91"
        />
        <input
          disabled
          placeholder="Enter Phone Number"
          autoComplete="off"
          required
          onChange={(e) => handleChange(e)}
          type="number"
          id="authRegisterInstNamee"
          name="InstituteName"
          className="p-2 w-full border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          value={employerManageProfileFields?.phoneNumber}
        />
        <div
          className={`${
            employerManageProfileFields?.phoneNumberVerified === 0
              ? "sm:w-[40%]"
              : "sm:w-[30%]"
          } flex justify-center items-center gap-2`}
        >
          <span>
            {employerManageProfileFields?.phoneNumberVerified === 0 ? (
              <img className="w-[30px]" src={Reject} alt="reject" />
            ) : (
              <img className="w-[30px]" src={Check} alt="check" />
            )}
          </span>
          {employerManageProfileFields?.phoneNumberVerified === 0
            ? "Not Verified"
            : "Verified"}
        </div>
      </div>
    </div>
  );
};
