import React, { useEffect } from "react";
import CloseIcon from "../../../../../../public/assets/icons/remove.png";
import { useDispatch } from "react-redux";
import { closePhoneNumberManageProfileModal } from "../../../Redux/CompanyProfile";
import PhoneGifIcon from "../../../../../../public/assets/gif/email-file.gif";
import Edit from "../../../../../../public/assets/icons/edit.png";
import { useSelector } from "react-redux";
import { useState } from "react";
import { validateOTP } from "../../../functions/employerFunctions";
import { editEmployerManageProfileFields } from "../../../Redux/CompanyProfile";
import { toast } from "react-toastify";
import { postAuthPhoneOtpSendAxios } from "../../../../../api/apiAxios";

export const ModalEmailProfile = ({
  timerNew,
  resendOtpfunc,
  verifyOtpFromPhoneFunc,
  setEmailState
}) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    setEmailState(false)
  };

  const { employerManageProfileFields } = useSelector(
    (state: any) => state.employerManageProfile
  );

  const [passValue, setPassValue] = useState("");
  const [checkPassword, setCheckPassword] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPassValue(inputValue);
    if (validateOTP(inputValue)) {
      const passOTP = inputValue ? inputValue : "";
      dispatch(editEmployerManageProfileFields({ otp: passOTP }));
      setCheckPassword(true);
    } else {
      dispatch(editEmployerManageProfileFields({ otp: "" }));
      setCheckPassword(false);
    }
  };

  const [otpState, setOtpState] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);

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

  useEffect(() => {
    setTimer(60);
  }, []);

  return (
    <div className="fixed h-full w-full bg-gray-600 bg-opacity-80 z-50">
      <div className=" h-[100%] w-[100%] flex justify-center items-top z-50 mt-[100px]">
        <div className=" bg-white h-[500px] w-[500px] rounded-lg relative z-50">
          <div className=" absolute right-1 top-1 z-50">
            <img
              onClick={() => closeModal()}
              src={CloseIcon}
              alt="close"
              className=" w-[30px] cursor-pointer"
            />
          </div>

          <div className=" w-[100%] h-[100%] flex justify-center items-center flex-col gap-6">
            <img
              className="w-[100px] pt-[10px]"
              src={PhoneGifIcon}
              alt="Phone Number"
            />
            <h2 className=" font-bold text-[30px] text-center cursor-default">
              Verify your Email Address
            </h2>
            <p className="text-center text-[18px] font-normal leading-[1.6em] cursor-default">
              One Time Password(OTP) has been sent on <br />
              <span className="flex justify-center items-center gap-2 font-semibold">
                {employerManageProfileFields?.email}
                {/* <img
                  onClick={() => closeModal()}
                  className="w-[20px] cursor-pointer"
                  src={Edit}
                  alt="edit"
                /> */}
              </span>
            </p>

            <form
              onSubmit={(e) =>
                verifyOtpFromPhoneFunc(e, employerManageProfileFields?.otp, "")
              }
              className="flex flex-col gap-2 justify-center items-center"
            >
              <div className=" sm:w-[100%] w-[100%] flex items-center flex-col gap-2">
                <label
                  htmlFor="contactPersonName"
                  className=" postJobInputTitle font-semibold text-gray-700"
                >
                  Enter the otp to verify your Email
                </label>
                <input
                  placeholder="Enter 6 digit otp..."
                  autoComplete="off"
                  required
                  onChange={(e) => handleChange(e)}
                  type="number"
                  id="contactPersonName"
                  name="InstituteName"
                  className=" p-2 w-[320px] sm:w-[300px] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  value={passValue}
                />
              </div>
              {!checkPassword && (
                <p className=" text-red-800  ">
                  Please enter a valid OTP. It should be at least 6 digits.
                </p>
              )}
              <button
                disabled={
                  !checkPassword ||
                  employerManageProfileFields.otp.trim() === ""
                }
                className="w-[300px] relative px-8 py-2 rounded-md bg-[#cc5475] isolation-auto z-10 border-2 border-solid text-white before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-lime-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
              >
                Verify Email Address
              </button>
            </form>

            <button
              type="button"
              onClick={sendOtpFromPhone}
              disabled={otpState || timer !== null}
              className={`bg-[#d8e2dc] text-black px-3 rounded-md text-[14px] font-medium ${
                otpState || timer !== null
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {otpState
                ? "Sending..."
                : timer !== null
                ? `Resend OTP in ${timer}s`
                : "Resend OTP on Email Address"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
