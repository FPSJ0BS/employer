import React from "react";
import CloseIcon from "../../../../public/assets/icons/remove.png";
import { useDispatch } from "react-redux";
import { closeAdminModal } from "../../Employer/Redux/Authentication";
import Lottie from "lottie-react";
import PhoneGifIcon from "../../../../public/assets/gif/email-file.gif";
import Edit from "../../../../public/assets/icons/edit.png";
import { useSelector } from "react-redux";
import { useState } from "react";
import { validateOTP } from "../../Employer/functions/employerFunctions";
import { postAuthRegister } from "../../Employer/Redux/Authentication";

export const MobileModal = ({
  timerNew,
  resendOtpfunc,
  resendOtpMobilefunc,
  otpVerifyNew,
  timerMobile,
}: any) => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(closeAdminModal());
  };
  const { authRegister } = useSelector(
    (state: any) => state.autheticationSlice
  );

  const [passValueMobile, setPassValueMobile] = useState("");
  const [checkPasswordMobile, setCheckPasswordMobile] = useState(true);

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPassValueMobile(inputValue);
    if (validateOTP(inputValue)) {
      const passOTP = inputValue ? inputValue : "";

      setCheckPasswordMobile(true);
    } else {
      setCheckPasswordMobile(false);
    }
  };

  const [passValue, setPassValue] = useState("");
  const [checkPassword, setCheckPassword] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPassValue(inputValue);
    if (validateOTP(inputValue)) {
      const passOTP = inputValue ? inputValue : "";

      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
  };

  const onSubmitFunc = (e) => {
    e.preventDefault();

    otpVerifyNew(passValue,passValueMobile)
  };

  return (
    <div className="absolute h-full w-full bg-gray-600 bg-opacity-80 z-50 ">
      <div className=" h-[100%] w-[100%] flex justify-center items-center z-50">
        <div className=" bg-white min-h-[400px] w-[40%] rounded-lg relative z-50 p-5">
          <div className=" absolute right-1 top-1 z-50">
            <img
              onClick={() => closeModal()}
              src={CloseIcon}
              alt="close"
              className=" w-[30px] cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-4 ">
            <div className=" flex flex-col gap-2">
              <h2 className=" font-bold text-[30px] text-center cursor-default">
                Verify your Phone Number
              </h2>
              <p className="text-center text-[18px] font-normal leading-[1.6em] cursor-default">
                One Time Password (OTP) has been sent on
              </p>
              <div className="flex gap-4 items-center justify-center ">
                {/* <p className="flex justify-center items-center gap-2 font-semibold">
                  {authRegister?.email_id}
                  <img
                    onClick={() => closeModal()}
                    className="w-[20px] cursor-pointer"
                    src={Edit}
                    alt="edit"
                  />
                </p> */}
                <p className="flex justify-center items-center gap-2 font-semibold">
                  {authRegister.mobile_number}
                  <img
                    onClick={() => closeModal()}
                    className="w-[20px] cursor-pointer"
                    src={Edit}
                    alt="edit"
                  />
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className=" w-[100%] h-[100%] flex justify-center items-center flex-col gap-6">
                <form
                  onSubmit={(e) => onSubmitFunc(e)}
                  className="flex flex-col gap-4 justify-center items-center"
                >
                  <div className="flex gap-4 items-start">
                    <div className="">
                      <div className=" sm:w-[100%] w-[100%] flex items-center flex-col gap-2">
                        <label
                          htmlFor="contactPersonName"
                          className=" postJobInputTitle font-semibold text-gray-700"
                        >
                          Enter the otp to verify your Mobile Number *
                        </label>
                        <input
                        placeholder="Please enter 6 digit otp..."
                          autoComplete="off"
                          required
                          onChange={(e) => handleChangePhone(e)}
                          type="number"
                          id="contactPersonName"
                          name="InstituteName"
                          className=" p-2 w-[320px] sm:w-[300px] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                          value={passValueMobile}
                        />
                      </div>
                      {!checkPasswordMobile && (
                        <p className=" text-red-800  ">
                          Please enter a valid OTP. It should be at least 6
                          digits.
                        </p>
                      )}
                    </div>

                    {/* <div>
                      <div className=" sm:w-[100%] w-[100%] flex items-center flex-col gap-2">
                        <label
                          htmlFor="contactPersonName"
                          className=" postJobInputTitle font-semibold text-gray-700"
                        >
                          Enter the otp to verify your email (Optional)
                        </label>
                        <input
                          autoComplete="off"
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
                          Please enter a valid OTP. It should be at least 6
                          digits.
                        </p>
                      )}
                    </div> */}
                  </div>

                  <button
                    disabled={!checkPasswordMobile}
                    className="w-[300px] relative px-8 py-2 rounded-md bg-[#cc5475] isolation-auto z-10 border-2 border-solid text-white before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-lime-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
                  >
                    Verify OTP
                  </button>
                </form>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => resendOtpMobilefunc()}
                    disabled={timerMobile > 0}
                    className={`mb-[10px] ${
                      timerMobile > 0 ? "bg-red-800" : "bg-green-700"
                    } py-1 px-2 text-white rounded-lg`}
                  >
                    {timerMobile > 0
                      ? `Resend Mobile OTP in ${timerMobile}`
                      : "Resend Mobile OTP"}
                  </button>

                  {/* <button
                    type="button"
                    onClick={() => resendOtpfunc()}
                    disabled={timerNew > 0}
                    className={`mb-[10px] ${
                      timerNew > 0 ? "bg-red-800" : "bg-green-700"
                    } py-1 px-2 text-white rounded-lg`}
                  >
                    {timerNew > 0
                      ? `Resend Email OTP in ${timerNew}`
                      : "Resend Email OTP"}
                  </button> */}
                </div>
              </div>

              {/* <div className=" w-[100%] h-[100%] flex justify-center items-center flex-col gap-6">
                <form
                  onSubmit={(e) => otpVerifyNew(e)}
                  className="flex flex-col gap-2 justify-center items-center"
                >
                  <button
                    disabled={!checkPassword}
                    className="w-[300px] relative px-8 py-2 rounded-md bg-[#cc5475] isolation-auto z-10 border-2 border-solid text-white before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-lime-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
                  >
                    Verify Email Address
                  </button>
                </form>

                
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
