import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editEmployerManageProfileFields } from "../../../Redux/CompanyProfile";
import Reject from "../../../../../../public/Employer/Manage Profile/reject.png";
import Check from "../../../../../../public/assets/icons/check.png";
import { postAuthPhoneOtpSendAxios } from "../../../../../api/apiAxios";
import { toast } from "react-toastify";

export const Email = ({ setEmailState }) => {
  const { employerManageProfileFields } = useSelector(
    (state: any) => state.employerManageProfile
  );

  const dispatch = useDispatch();

  const [otpState, setOtpState] = useState(false); // State for OTP sending
  const [timer, setTimer] = useState<number | null>(null); // State for timer (seconds)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue ?? false) {
      dispatch(
        editEmployerManageProfileFields({
          email: inputValue,
        })
      );
    } else {
      dispatch(
        editEmployerManageProfileFields({
          email: "",
        })
      );
    }
  };

  const notifySuccess = () => toast.success("OTP sent successfully");

  const sendOtpFromEMail = async () => {
    if (timer === null) {
      setOtpState(true);
      try {
        const res = await postAuthPhoneOtpSendAxios({
          email_id: employerManageProfileFields.email,
        });

        if (res?.data?.status) {
          notifySuccess();
          setOtpState(false);
          setTimer(60);
          setTimeout(() => {
            setEmailState(true);
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
      className={`z-40 sm:w-[100%] w-[250px] flex flex-col gap-2 col-span-2 ${
        employerManageProfileFields?.emailVerified === 0 ? "mt-4" : "mt-0"
      }`}
    >
      <div className="flex gap-4 items-center">
        <label
          htmlFor="manageProfileEmail"
          className="postJobInputTitle font-medium text-gray-700"
        >
          Official E-mail *
        </label>
        {employerManageProfileFields?.emailVerified === 0 && (
          <button
            onClick={sendOtpFromEMail}
            disabled={otpState || timer !== null} // Disable button during OTP sending or timer
            className={`bg-[#d8e2dc] text-black px-3 rounded-md text-[14px] font-medium ${
              otpState || timer !== null ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {otpState
              ? "Sending..."
              : timer !== null
              ? `Resend OTP in ${timer}s`
              : "Send OTP on Email"}
          </button>
        )}
      </div>
      <div className="flex justify-center items-center gap-2 w-[100%]">
        <input
          disabled
          autoComplete="off"
          required
          onChange={(e) => handleChange(e)}
          type="email"
          id="manageProfileEmail"
          name="InstituteName"
          className="p-2 sm:w-[80%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          value={employerManageProfileFields.email}
        />
        <div
          className={`${
            employerManageProfileFields?.emailVerified === 0
              ? "sm:w-[30%]"
              : "sm:w-[20%]"
          } flex justify-center items-center gap-2`}
        >
          <span>
            {employerManageProfileFields?.emailVerified === 0 ? (
              <img className="w-[30px]" src={Reject} alt="reject" />
            ) : (
              <img className="w-[30px]" src={Check} alt="check" />
            )}
          </span>
          {employerManageProfileFields?.emailVerified === 0
            ? "Not Verified"
            : "Verified"}
        </div>
      </div>
    </div>
  );
};
