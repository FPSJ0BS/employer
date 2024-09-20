import React, { useEffect } from "react";
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
import {
  postEmailSendOtp,
  postPhoneOtpRegistrationAxios,
  postRegisterAxios,
} from "../../../api/apiAxios";
import { CustomizedSnackbarTwo } from "../../Reusable Components/Snackbar/snackbarNew";

export const EMailModalTwo = ({ timerNew, resendOtpfunc, otpVerifyNew }) => {
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

  const { employerManageProfileFields } = useSelector(
    (state) => state.employerManageProfile
  );

  const [emailValue, setEmailValue] = useState("");
  const [hash, setHash] = useState("");
  const [passValue, setPassValue] = useState("");

  const otpVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await postRegisterAxios({
        // institute_name: authRegister.institute_name,
        // person_name: authRegister.first_name,
        email_id: emailValue,
        // person_first_name: authRegister.first_name,
        // person_last_name: authRegister.last_name,
        hash,
        otp: passValue,
        // nt_id: parseInt(authRegister.nt_id),
        // password: authRegister.password,
      });

      if (response?.data?.status) {
        console.log(response);
        const header = response?.data?.data[0];
        await localStorage.setItem("header", JSON.stringify(header));

        const onSuccessMessage = await response?.data?.message;
        await setSnackbarSuccessMessage(onSuccessMessage);
        setSnackbarSuccessOpen(true);

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        console.log(response);

        const onErrorMessage = await response?.data?.message;
        await setSnackbarErrorMessage(onErrorMessage);
        setSnackbarErrorOpen(true);
      }
    } catch (error) {
      await setSnackbarErrorMessage("Registration Unsuccessful, try again!");
      setSnackbarErrorOpen(true);
      // setRegisterOtp(false);
    }
  };

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(closeAdminModal());
  };
  const { authRegister } = useSelector(
    (state: any) => state.autheticationSlice
  );

  useEffect(() => {
    if (employerManageProfileFields.email) {
      setEmailValue(employerManageProfileFields.email);
    }
  }, [employerManageProfileFields.email]);

  const [checkPassword, setCheckPassword] = useState(true);
  const [switchVal, setSwitchVal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPassValue(inputValue);
    if (validateOTP(inputValue)) {
      const passOTP = inputValue ? inputValue : "";
      dispatch(postAuthRegister({ otp: passOTP }));
      setCheckPassword(true);
    } else {
      dispatch(postAuthRegister({ otp: "" }));
      setCheckPassword(false);
    }
  };

  const onEmailChange = (e) => {
    const value = e.target.value;
    setEmailValue(value);
  };

  const onSwitchVal = async (e) => {
    e.preventDefault();

    try {
      const res = await postEmailSendOtp({
        email_id: employerManageProfileFields.email,
      });
      if (res?.data?.status) {
        setSwitchVal(true);

        const hashValue = res?.data?.data[0];

        const onSuccessMessage = await res?.data?.message;
        await setSnackbarSuccessMessage(onSuccessMessage);
        setSnackbarSuccessOpen(true);
        setHash(hashValue);
      } else {
        const onErrorMessage = await res?.data?.message;
        await setSnackbarErrorMessage(onErrorMessage);
        setSnackbarErrorOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute h-full w-full bg-gray-600 bg-opacity-80 z-50 ">
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

      <div className=" h-[100%] w-[100%] flex justify-center items-start z-50 mt-[100px]">
        <div className=" bg-white h-[500px] w-[500px] rounded-lg relative z-50 flex flex-col items-center">
          <div className=" absolute right-1 top-1 z-50">
            <button
              onClick={() => {
                closeModal();
                localStorage.setItem("isModal", "false");
              }}
              className="bg-[#cc5475] px-6 py-1 rounded-md text-white"
            >
              Skip
            </button>
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

            {switchVal ? (
              <form
                onSubmit={(e) => otpVerify(e)}
                className="flex flex-col gap-2 justify-center items-center"
              >
                <div className=" sm:w-[100%] w-[100%] flex items-center flex-col gap-2">
                  <label
                    htmlFor="contactPersonName"
                    className=" postJobInputTitle font-semibold text-gray-700"
                  >
                    Enter the otp to verify your email
                  </label>
                  <input
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
                  disabled={!checkPassword || authRegister.otp.trim() === ""}
                  className="w-[300px] relative px-8 py-2 rounded-md bg-[#cc5475] isolation-auto z-10 border-2 border-solid text-white before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-lime-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
                >
                  Verify Email Address
                </button>
              </form>
            ) : (
              <form
                onSubmit={(e) => onSwitchVal(e)}
                className="flex flex-col gap-2 justify-center items-center"
              >
                <div className=" sm:w-[100%] w-[100%] flex items-center flex-col gap-2">
                  <label
                    htmlFor="contactPersonName2"
                    className=" postJobInputTitle font-semibold text-gray-700"
                  >
                    Enter you email Address
                  </label>
                  <input
                    disabled
                    placeholder="Enter Email Address..."
                    autoComplete="off"
                    required
                    onChange={(e) => onEmailChange(e)}
                    type="email"
                    id="contactPersonName2"
                    name="InstituteName"
                    className=" p-2 w-[320px] sm:w-[300px] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    value={emailValue}
                  />
                </div>

                <button className="w-[300px] relative px-8 py-2 rounded-md bg-[#cc5475] isolation-auto z-10 border-2 border-solid text-white before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-lime-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700">
                  Submit
                </button>
              </form>
            )}

            {switchVal && (
              <button
                type="button"
                onClick={() => resendOtpfunc()}
                disabled={timerNew > 0}
                className={`mb-[10px] ${
                  timerNew > 0 ? "bg-red-800" : "bg-green-700"
                } py-1 px-2 text-white rounded-lg`}
              >
                {timerNew > 0 ? `Resend OTP in ${timerNew}` : "Resend OTP"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
