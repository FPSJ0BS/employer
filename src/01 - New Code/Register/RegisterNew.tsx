import React from "react";
import DefaulHeader2 from "../Headers/DefaulHeader2";
import MobileMenu from "../Headers/MobileMenu";

import FooterDefault from "../../components/footer/common-footer/index";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import {
  getInstituteTypeListAxios,
  getStateListAxios,
  getCityListAxios,
  postPhoneOtpRegistrationAxios,
  postRegisterAxios,
  postAuthPhoneOtpSendAxios,
  postAuthPhoneOtpVerifyAxios,
} from "../../api/apiAxios";
import { useDispatch } from "react-redux";
import { InstituteNameInputReg } from "./Inputs/InstituteNameInputReg";
import { InstituteContactPersonNameInputReg } from "./Inputs/InstituteContactPersonNameInputReg";
import { InstituteEmailInputReg } from "./Inputs/InstituteEmailInputReg";
import { InstitutePasswordInputReg } from "./Inputs/InstitutePasswordInputReg";
import { InstituteNumberInputReg } from "./Inputs/InstituteNumberInputReg";
import { InstituteInsdustryTypeInputReg } from "./Inputs/InstituteIndustryTypeReg";
import { InstituteContactPersonLastNameInputReg } from "./Inputs/InstituteContactPersonLastNameInputReg";
import { setLogin } from "../../redux/Login/loginSlice.jsx";
import { postAuthRegister } from "../Employer/Redux/Authentication";
import { useSelector } from "react-redux";
import { getCategories } from "../../api/apiAxios";
import { setAuthCategoryData } from "../Employer/Redux/Authentication";
import { CustomizedSnackbarTwo } from "../Reusable Components/Snackbar/snackbarNew";
import DotPattern from "../MagicUI/DotPattern/DotPattern";
import { cn } from "../../lib/utils";
import Lottie from "lottie-react";
import RegisterLottieAnimation from "../../../public/assets/Lottie/Animation - 1714629102573.json";
import { openAdminModal } from "../Employer/Redux/Authentication";
import { EmailModal, MobileModal } from "../UI/Modal/MobileModal";
import { closeAdminModal } from "../Employer/Redux/Authentication";

import SignUpImage from "../../../public/assets/storyset/Sign up-bro.png";

import { LoaderEmployer } from "../../../public/assets/LoaderEmployer";
import { WalletDataInterface, setWalletData } from "../Employer/Redux/Wallet";
import { ModalEmail } from "../UI/Modal/ModalEmail";

export const RegisterNew = () => {
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

  // Loader ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [loader, setLoader] = useState(false);

  // Loader ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const { authRegister, modal } = useSelector(
    (state: any) => state.autheticationSlice
  );

  const [openEmailModal, setOpenEmailModal] = useState(false);

  const [allDataValid, setAllDataValid] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loaderState, setLoaderState] = useState(true);

  // Other FOrm Data ------------------------------------------------------------
  const [hash, setHash] = useState("");
  const [otp, setOtp] = useState("");
  const [isValidOtp, setIsValidOtp] = useState(true);
  const [registerOtp, setRegisterOtp] = useState(false);

  // Options & handleChange for State

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();

        if (response?.data?.status) {
          const categoryList = response?.data?.data;

          dispatch(setAuthCategoryData(categoryList));

          setLoaderState(false);
        } else {
          setLoaderState(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoaderState(false);
      }
    };

    fetchData();
  }, []);

  // Final Register ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const registerFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoaderState(true);
    try {
      const response = await postPhoneOtpRegistrationAxios({
        email_id: authRegister.email_id,
        institute_name: authRegister.institute_name,
        person_first_name: authRegister.first_name,
        person_last_name: authRegister.last_name,
        nt_id: authRegister.nt_id,
        password: authRegister.password,
        mobile_number: authRegister.mobile_number,
      });
      if (response?.data?.status) {
        sendOtpFromPhone();
        setLoaderState(false);
        const hash = response?.data?.data[0];
        dispatch(
          postAuthRegister({
            hash,
          })
        );
        const data: WalletDataInterface = {
          dateTransaction: String(new Date()),
          typeTransaction: "Bonus Coins",
          Status: "Credit",
          amountCoins: "100",
          currentBalance: "100",
          purchasedCoins: "0",
          bonusCoins: "100",
        };
        localStorage.setItem("wallet", JSON.stringify(data));
        localStorage.setItem("walletData", JSON.stringify([data]));
        dispatch(setWalletData(data));
        const onSuccessMessage = await response?.data?.message;
        await setSnackbarSuccessMessage(onSuccessMessage);
        setSnackbarSuccessOpen(true);
        setTimeout(() => {
          dispatch(openAdminModal("true"));
          setTimer(60);
        }, 500);
      } else {
        const errMessage = await response?.data?.message;
        await setSnackbarErrorMessage(errMessage);
        setSnackbarErrorOpen(true);
        setLoaderState(false);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setLoaderState(false);
    }
  };

  const sendOtpFromPhone = async () => {
    try {
      const res = await postAuthPhoneOtpSendAxios({
        mobile_number: authRegister.mobile_number,
        // email_id: employerManageProfileFields?.email,
      });

      if (res?.data?.status) {
        const onSuccessMessage = await res?.data?.message;
        await setSnackbarSuccessMessage(onSuccessMessage);
        await setSnackbarSuccessOpen(true);
        setTimerMobile(60);
      } else {
        const errMessage = await res?.data?.message;
        await setSnackbarErrorMessage(errMessage);
        setSnackbarErrorOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sendOtpFromEMail = async () => {
    try {
      const res = await postAuthPhoneOtpSendAxios({
        // mobile_number: authRegister.mobile_number,
        email_id: authRegister.email_id,
      });

      if (res?.data?.status) {
        const onSuccessMessage = await res?.data?.message;
        await setSnackbarSuccessMessage(onSuccessMessage);
        await setSnackbarSuccessOpen(true);
        setTimer(60);
      } else {
        const errMessage = await res?.data?.message;
        await setSnackbarErrorMessage(errMessage);
        setSnackbarErrorOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

   const otpVerifyEmailandPhone = async (otpEmail, otpMobile) => {
    try {
      // Ensure at least one OTP is provided
      if (!otpEmail && !otpMobile) {
        throw new Error("Both OTP Email and OTP Mobile are missing.");
      }

      // Prepare the payload based on inputs
      const dataMain = {
        ...(otpEmail && {
          email_id: authRegister.email_id,
          email_verified_otp: otpEmail,
        }),
        ...(otpMobile && {
          mobile_number: authRegister.mobile_number,
          phone_verified_otp: otpMobile,
        }),
      };

      // Make the API call
      const response = await postAuthPhoneOtpVerifyAxios(dataMain);

      // Handle the response
      if (response?.data?.status) {
        if (otpMobile) {
          dispatch(closeAdminModal());
          sendOtpFromEMail();
          setOpenEmailModal(true);
          const header = response?.data?.data[0];
          await localStorage.setItem("header", JSON.stringify(header));
          const onSuccessMessage = await response?.data?.message;
          await setSnackbarSuccessMessage(onSuccessMessage);
          setSnackbarSuccessOpen(true);
        } else {
          
        
          setOpenEmailModal(false);
          const header = response?.data?.data[0];
          await localStorage.setItem("header", JSON.stringify(header));
          const onSuccessMessage = await response?.data?.message;
          await setSnackbarSuccessMessage(onSuccessMessage);
          setSnackbarSuccessOpen(true);
          await dispatch(setLogin(true));
          navigate("/manage-profile");

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

  // opt verify

  const clearFields = () => {
    dispatch(
      postAuthRegister({
        institute_name: "",
        first_name: "",
        last_name: "",
        email_id: "",
        mobile_number: "",
        hash: "",
        otp: "",
        nt_id: "",
        fcm_token: "",
        password: "",
      })
    );
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputOtp = e.target.value;
    // Regular expression to check if the OTP is valid
    const isValidOtpNumber = /^\d{6,}$/.test(inputOtp);
    setOtp(inputOtp);
    setIsValidOtp(isValidOtpNumber);
    dispatch(
      postAuthRegister({
        otp: inputOtp,
      })
    );
  };

  // Otp Timer ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

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

  // Otp Timer ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

  const [timerMobile, setTimerMobile] = useState(60);

  useEffect(() => {
    let interval;

    if (timerMobile > 0) {
      interval = setInterval(() => {
        setTimerMobile((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerMobile]);

  return (
    <div className="w-[100%] ">
      <div className="w-[100%] h-[100vh] flex items-end justify-center relative">
        {modal.state && (
          <MobileModal
            timerNew={timer}
            resendOtpfunc={sendOtpFromEMail}
            resendOtpMobilefunc={sendOtpFromPhone}
            otpVerifyNew={otpVerifyEmailandPhone}
            timerMobile={timerMobile}
          />
        )}
        {openEmailModal && (
          <ModalEmail
            timerNew={timer}
            resendOtpfunc={sendOtpFromEMail}
            resendOtpMobilefunc={sendOtpFromPhone}
            otpVerifyNew={otpVerifyEmailandPhone}
            timerMobile={timerMobile}
          />
        )}
        {/* Left Side */}
        <div className="w-[50%] hidden lg:block">
          <div className="relative flex flex-col gap-10 h-[88vh] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-10 md:shadow-xl">
            <p className="mb-[-20px] z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
              Register To
            </p>
            <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
              FPS JOBS + Tallento.AI
            </p>
            {/* <Lottie
              className="z-10 w-[400px]"
              animationData={RegisterLottieAnimation}
              loop={true}
            /> */}

            <img className="w-[400px] z-10" src={SignUpImage} alt="Signup" />

            <DotPattern
              className={cn(
                "[mask-image:radial-gradient(100%_circle_at_center,white,transparent)]"
              )}
            />
          </div>
        </div>

        {/* Right Side */}

        <div className="w-[100%] lg:w-[50%] h-[100%] my-[100px] sm:my-0 ">
          {!loaderState ? (
            <div className="h-[80%] mt-[8rem] flex flex-col justify-center items-center w-[100%]">
              <form
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-[20px] gap-y-[20px] place-items-top w-[100%] sm:px-[100px] pl-[50px] "
                onSubmit={(e) => registerFormSubmit(e)}
              >
                {/* BLock - 1 */}

                <InstituteNameInputReg />
                <InstituteEmailInputReg />
                <InstituteNumberInputReg />
                <InstituteContactPersonNameInputReg />
                <InstituteContactPersonLastNameInputReg />
                <InstituteInsdustryTypeInputReg />
                <InstitutePasswordInputReg />

                <div className="w-[100%] flex justify-center items-center gap-2 sm:col-span-2 mt-4">
                  <button
                    disabled={authRegister.password.trim() === ""}
                    className={`${
                      authRegister.password.trim() === ""
                        ? "bg-gray-800"
                        : "bg-mainBgColor"
                    } h-[60px] w-[300px] ml-[-50px] sm:ml-[0px] sm:w-[400px] rounded-lg text-white text-[1.2rem]`}
                  >
                    Register For Free
                  </button>
                </div>
              </form>

              <div className="flex justify-center items-center pt-[10px] ">
                <h3 className="font-semibold">
                  <span className="font-light">Already have an account? </span>
                  <Link to="/login-otp">Signin</Link>
                </h3>
              </div>
            </div>
          ) : (
            <LoaderEmployer />
          )}
        </div>
      </div>
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

      <DefaulHeader2 />
      <MobileMenu />
      {/* End MobileMenu */}

      <FooterDefault footerStyle="alternate" />
      {/* <!-- End Main Footer --> */}
    </div>
  );
};
