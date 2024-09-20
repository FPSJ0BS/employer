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
} from "../../api/apiAxios";
import { useDispatch } from "react-redux";
import { InstituteNameInputReg } from "./Inputs/InstituteNameInputReg";
import { InstituteContactPersonNameInputReg } from "./Inputs/InstituteContactPersonNameInputReg";
import { InstituteEmailInputReg } from "./Inputs/InstituteEmailInputReg";
import { InstitutePasswordInputReg } from "./Inputs/InstitutePasswordInputReg";
import { InstituteNumberInputReg } from "./Inputs/InstituteNumberInputReg";
import { InstituteInsdustryTypeInputReg } from "./Inputs/InstituteIndustryTypeReg";
import { setLogin } from "../../redux/Login/loginSlice.jsx";
import { postAuthRegister } from "../Employer/Redux/Authentication";
import { useSelector } from "react-redux";
import { getCategories } from "../../api/apiAxios";
import { setAuthCategoryData } from "../Employer/Redux/Authentication";
import { CustomizedSnackbarTwo } from "../Reusable Components/Snackbar/snackbarNew";
import DotPattern from "../MagicUI/DotPattern/DotPattern";
import { cn } from "../../lib/utils";

export const Register = () => {
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

  const { authRegister } = useSelector(
    (state: any) => state.autheticationSlice
  );

  useEffect(() => {
    console.log(authRegister);
  }, [authRegister]);
  const [allDataValid, setAllDataValid] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loaderState, setLoaderState] = useState(true);

  const [instituteName, setInstituteName] = useState("");
  const [contactPersonName, setContactPersonName] = useState("");
  const [instituteEmail, setInstituteEmail] = useState("");
  const [institutePassword, setInstitutePassword] = useState("");

  // Handle Phone Number Field ------------------------------------------------------------------------------------------>
  const [isInstituteNumberValid, setInstituteNumberValid] = useState(true);
  const [instituteNumber, setInstituteNumber] = useState("");

  // Industry Type List -------------------------------------------------------------------------------------------------->
  const [optionsIndustryType, setOptionsIndustryType] = useState([]);
  const [industrySelectedOption, setIndustrySelectedOption] = useState("");

  // Other FOrm Data ------------------------------------------------------------
  const [hash, setHash] = useState("");
  const [otp, setOtp] = useState("");
  const [isValidOtp, setIsValidOtp] = useState(true);
  const [registerOtp, setRegisterOtp] = useState(false);

  // Options & handleChange for State

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch category data
        const response = await getCategories();

        // Check if data was fetched successfully
        if (response?.data?.status) {
          const categoryList = response?.data?.data;
          console.log("Category list:", categoryList);

          // Dispatch action to update Redux store with category data
          dispatch(setAuthCategoryData(categoryList));

          // Set loader state to false to indicate loading is complete
          setLoaderState(false);
        } else {
          // Handle case where data status is not success

          setLoaderState(false);
        }
      } catch (error) {
        // Handle fetch error
        console.error("Error fetching data:", error);
        setLoaderState(false);
      }
    };

    // Call fetchData function when component mounts
    fetchData();
  }, []);

  // Final Register

  const registerFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoaderState(true);
    try {
      const response = await postPhoneOtpRegistrationAxios(
        authRegister.mobile_number
      );
      if (response?.data?.status) {
        setLoaderState(false);
        const hash = response?.data?.data[0];
        dispatch(
          postAuthRegister({
            hash,
          })
        );
        setRegisterOtp(true);
        const onSuccessMessage = await response?.data?.message;
        await setSnackbarSuccessMessage(onSuccessMessage);
        setSnackbarSuccessOpen(true);
        setTimer(30);
      } else {
        const errMessage = await response?.data?.message;


        await setSnackbarErrorMessage(errMessage);
        setSnackbarErrorOpen(true);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle error here
    }
  };

  const resendOtp = async () => {
    try {
      const response = await postPhoneOtpRegistrationAxios(
        authRegister.mobile_number
      );
      if (response?.data?.status) {
        const hash = response?.data?.data[0];
        dispatch(
          postAuthRegister({
            hash,
          })
        );

        const onSuccessMessage = await response?.data?.message;
        await setSnackbarSuccessMessage(onSuccessMessage);
        setSnackbarSuccessOpen(true);
        setTimer(30);
      } else {
        const errMessage = await response?.data?.message;
   

        await setSnackbarErrorMessage(errMessage);
        setSnackbarErrorOpen(true);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle error here
    }
  };

  // opt verify

  const otpVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await postRegisterAxios({
        institute_name: authRegister.institute_name,
        person_name: authRegister.person_name,
        email_id: authRegister.email_id,
        mobile_number: authRegister.mobile_number,
        hash: authRegister.hash,
        otp: authRegister.otp,
        nt_id: authRegister.nt_id,
        password: authRegister.password,
      });

      if (response?.data?.status) {
        setLoaderState(false);
        const header = response?.data?.data[0];
        await localStorage.setItem("header", JSON.stringify(header));
        await dispatch(setLogin(true));

        const onSuccessMessage = await response?.data?.message;
        await setSnackbarSuccessMessage(onSuccessMessage);
        setSnackbarSuccessOpen(true);

        navigate("/employers-dashboard/dashboard");
      } else {
      

        const onErrorMessage = await response?.data?.message;
        await setSnackbarErrorMessage(onErrorMessage);
        setSnackbarErrorOpen(true);
        setRegisterOtp(false);
      }
    } catch (error) {
      await setSnackbarErrorMessage("Registration Unsuccessful, try again!");
      setSnackbarErrorOpen(true);
      setRegisterOtp(false);
    }
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
    let interval:any;

    if (timer > 0) {
      // If the timer is greater than 0, decrement it every second
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      // Clear the interval when the component is unmounted
      clearInterval(interval);
    };
  }, [timer]);

  return (
    <div className="">
      
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

      <div className="flex justify-center items-center min-h-[500px]">
        {/* <iframe className="mt-[100px]" width='500px' height='500px' src="https://lottie.host/embed/422e08bd-8f8f-4868-92a8-44db5e130e37/KWKAhoXN5k.json"></iframe> */}

        <div className="  mt-[8rem] flex flex-col justify-center items-center">
          <h2 className=" text-[2rem] font-medium mb-4">Register To FPS</h2>

          <form
            className=" w-[800px] grid grid-cols-1 lg:grid-cols-2 gap-x-[30px] gap-y-[20px] place-items-top"
            onSubmit={(e) => registerFormSubmit(e)}
          >
            {/* BLock - 1 */}

            <InstituteNameInputReg />
            <InstituteNumberInputReg />
            <InstituteInsdustryTypeInputReg />
            <InstituteContactPersonNameInputReg />
            <InstitutePasswordInputReg />
            <InstituteEmailInputReg />
            

            <div className=" w-[400px] flex justify-center gap-2 sm:col-span-2 mt-4">
              {!registerOtp && (
                <button
                  disabled={!(authRegister?.mobile_number.length > 9)}
                  className={` ${
                    authRegister?.mobile_number.length > 9
                      ? "bg-mainBgColor"
                      : " bg-gray-600"
                  } h-[60px] w-[250px] sm:w-[400px] rounded-lg text-white text-[1.2rem]`}
                >
                  Register
                </button>
              )}
            </div>
          </form>

          {registerOtp && (
            <form
              className="flex flex-col sm:flex-row gap-6 relative"
              onSubmit={(e) => otpVerify(e)}
            >
              <div className="flex flex-col gap-2 items-center">
                <div className=" flex gap-6 items-center">
                  <label htmlFor="telnewVerify">Enter OTP</label>
                  <button
                    type="button"
                    onClick={() => resendOtp()}
                    disabled={timer > 0}
                    className={`${
                      timer > 0 ? "bg-red-800" : "bg-green-700"
                    } py-1 px-2 text-white rounded-lg`}
                  >
                    {timer > 0 ? `Resend OTP in ${timer}` : "Resend OTP"}
                  </button>
                </div>
                <input
                  onChange={(e) => handleOtpChange(e)}
                  id="telnewVerify"
                  className="h-[70px] w-[200px] sm:w-[400px] bg-[#f0f5f7] rounded-lg p-3"
                  type="number"
                  placeholder=""
                  required
                />
              </div>
              {!isValidOtp && (
                <p className=" text-red-800 absolute bottom-[-30px]">
                  Please enter a valid OTP. It should be at least 6 digits.
                </p>
              )}
              <button
                disabled={!isValidOtp}
                className="bg-mainBgColor h-[60px] w-[300px] sm:w-[400px] rounded-lg text-white mt-[20px] sm:mt-[50px]"
                type="submit"
              >
                Verify OTP
              </button>
            </form>
          )}

          <div className="flex justify-center items-center pt-[50px] pb-[50px]">
            <h3 className="font-semibold">
              <span className="font-light">Already have an account? </span>
              <Link to="/login-otp">Signin</Link>
            </h3>
          </div>
        </div>
      </div>

      <FooterDefault footerStyle="alternate" />
      {/* <!-- End Main Footer --> */}
    </div>
  );
};
