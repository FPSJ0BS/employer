import DefaulHeader2 from "../Headers/DefaulHeader2";
import MobileMenu from "../Headers/MobileMenu";
import FooterDefault from "../../components/footer/common-footer/index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { postPhoneOtpSendAxios, postPhoneOtpVerifyAxios } from "@/api/apiAxios";
import { LoginLottieAnimation } from "../../../public/assets/Lottie/LoginLottieAnimation";
import { useDispatch } from "react-redux";
import { setLogin } from "@/redux/Login/loginSlice";
import Loader from "../../../public/assets/Loader";
import CustomizedSnackbar from "../Reusable Components/Snackbar/snackbar";

export const Login = () => {
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
  const navigate = useNavigate();
  const [loaderValid, setLoaderValid] = useState(false);
  const [loaderValidOtp, setLoaderValidOtp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCheck, setOtpCheck] = useState(false);
  const [hash, sethash] = useState("");
  const [otp, setOtp] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isValidOtp, setIsValidOtp] = useState(true);

  const [timer, setTimer] = useState(60);

  const notify = () => toast.success("Otp Sent!");
  const notifyError = () => toast.error("Otp Failed, try again!");

  const handlePhoneNumberChange = (e) => {
    const inputPhoneNumber = e.target.value;
    // Regular expression to check if the phone number is valid
    const isValidPhoneNumber = /^[6-9]\d{9}$/.test(inputPhoneNumber);
    setPhoneNumber(inputPhoneNumber);
    setIsValid(isValidPhoneNumber);
  };

  const handleOtpChange = (e) => {
    const inputOtp = e.target.value;
    // Regular expression to check if the OTP is valid
    const isValidOtpNumber = /^\d{6,}$/.test(inputOtp);
    setOtp(inputOtp);
    setIsValidOtp(isValidOtpNumber);
  };

  const isOtpSubmitDisabled = () => {
    // Check if OTP is less than 6 digits or if the field is empty
    return otp.length < 6 || otp.trim() === "" || !isValidOtp;
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoaderValid(true);

    try {
      // Trigger the login mutation with the entered phone number
      const response = await postPhoneOtpSendAxios(phoneNumber);

      if (!response.data.status) {

        const onErrorMessage = await response?.data?.message;
        await setSnackbarErrorMessage(onErrorMessage);
        setSnackbarErrorOpen(true);
        setLoaderValid(false);
        setPhoneNumber("");
        return;
      }

      if (response?.data?.status) {
 
        const hash = await response?.data.data[0];
        await sethash(hash);
        const onSuccessMessage = await response?.data?.message;
        await setSnackbarSuccessMessage(onSuccessMessage);
        setSnackbarSuccessOpen(true);
        setOtpCheck(true);
        setLoaderValid(false);
      
      }
    } catch (error) {
      await setSnackbarErrorMessage("network Error");
      setSnackbarErrorOpen(true);
      setLoaderValid(false);
      setPhoneNumber("");
      console.error("OTP Sent Failed:", error);
      return;
    }
  };

  // verify otp functions starts ..................................................................

  const otpVerify = async (e) => {
    e.preventDefault();
    setLoaderValidOtp(true);
    try {
      const response = await postPhoneOtpVerifyAxios(phoneNumber, hash, otp);

      if (!response.data.status) {
        const onErrorMessage = await response?.data?.message;
        await setSnackbarErrorMessage(onErrorMessage);
        setSnackbarErrorOpen(true);
        setLoaderValidOtp(false);
        return;
      }

      if (response.data.status) {
        setLoaderValidOtp(false);
        const header = response?.data?.data[0];
        await localStorage.setItem("header", JSON.stringify(header));
        await dispatch(setLogin(true));
        // window.location.href = '/employers-dashboard/dashboard';
        navigate("/employers-dashboard/dashboard");
          const data = {
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
        // window.location.reload();
      }
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  useEffect(() => {
    let interval;

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

  const handleResend = async () => {
    setLoaderValidOtp(true);
    try {
      // Trigger the login mutation with the entered phone number
      const response = await postPhoneOtpSendAxios(phoneNumber);

      if (!response.data.statusCode) {
        setLoaderValidOtp(false);
        notifyError();
        return;
      }

      if (response.data.status) {
        setLoaderValidOtp(false);
        const hash = response?.data.data[0];
        sethash(hash);
        notify();
      }
    } catch (error) {
      notifyError();
      console.error("OTP Sent Failed:", error);
      return;
    }
    // Implement the logic to resend OTP here
    // For example, make an API call to request a new OTP

    // Reset the timer to its initial value (60 seconds)
    setTimer(30);
  };

  useEffect(() => {
    setTimer(35);
  }, []);

  const [loadingState, setLoadingState] = useState(false);
  function handleClick() {
    setLoadingState(true);
  }

  return (
    <div className=" bg-white">
      <CustomizedSnackbar
        open={snackbarSuccessOpen}
        autoCloseDuration={4000} // milliseconds
        onClose={handleSuccessCloseSnackbar}
        message={snackbarSuccessMessage}
        severity="success" // or 'success', 'warning', 'info'
        backgroundColor="#344e41" // Custom background color
      />

      <CustomizedSnackbar
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

      <div className="flex justify-center  items-center gap-[100px]">
        <div className="hidden md:block">
          <LoginLottieAnimation />
        </div>

        <div className=" w-[300px] sm:w-[500px] mt-[8rem] flex flex-col items-center px-4">
          <h2 className=" text-[2rem] font-medium mb-4 text-center sm:text-right">
            Login To FPS JOBS + Tallento.ai
          </h2>

          {loaderValid ? (
            <Loader />
          ) : (
            !otpCheck && (
              <form
                className="flex flex-col gap-6 "
                onSubmit={(e) => formSubmit(e)}
              >
                <div className="flex flex-col gap-2">
                  <label>Phone Number:</label>
                  <input
                    required
                    type="text"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="Enter 10-digit phone number"
                    className="h-[70px] w-[300px] sm:w-[400px] bg-[#f0f5f7] rounded-lg p-3 "
                  />
                  {!isValid && (
                    <p style={{ color: "red" }}>
                      Please enter a valid 10-digit phone number starting with
                      6, 7, 8, or 9.
                    </p>
                  )}
                </div>
                <button
                  className={`bg-mainBgColor h-[60px] w-[300px] sm:w-[400px] rounded-lg text-white`}
                  disabled={!isValid}
                >
                  Send Otp
                </button>
              </form>
            )
          )}

          {loaderValidOtp ? (
            <Loader />
          ) : (
            otpCheck && (
              <form
                className="flex flex-col gap-6"
                onSubmit={(e) => otpVerify(e)}
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="telnewVerify">Enter OTP</label>
                  <input
                    required
                    onChange={(e) => handleOtpChange(e)}
                    id="telnewVerify"
                    className="h-[70px] w-[300px] sm:w-[400px] bg-[#f0f5f7] rounded-lg p-3"
                    type="number"
                    placeholder="Enter 6 digit otp."
                  />
                </div>
                {!isValidOtp && (
                  <p style={{ color: "red" }}>
                    Please enter a valid OTP. It should be at least 6 digits.
                  </p>
                )}
                <div className="flex justify-between items-center">
                  {timer > 0 && <h2>Resend OTP in {timer}</h2>}
                  {timer === 0 && (
                    <h2
                      onClick={() => handleResend()}
                      className="text-mainBgColor font-normal cursor-pointer"
                    >
                      Send OTP Again!
                    </h2>
                  )}
                  <h2
                    onClick={() => setOtpCheck(false)}
                    className="font-bold cursor-pointer text-[#ee7a65]"
                  >
                    Enter Phone Number Again
                  </h2>
                </div>
                <button
                  className="bg-mainBgColor h-[60px] w-[300px] sm:w-[400px] rounded-lg text-white"
                  type="submit"
                  disabled={isOtpSubmitDisabled()}
                >
                  Verify OTP
                </button>
              </form>
            )
          )}

          <div className="flex justify-center items-center pt-4">
            <h3 className="font-semibold text-black">
              <Link to="/login-email">Login With Email</Link>
            </h3>
          </div>

          <div className="flex justify-center items-center py-2">
            <h3 className="font-semibold">
              <span className="font-light">Don&rsquo;t have an account? </span>
              <Link to="/register">Signup</Link>
            </h3>
          </div>
        </div>
      </div>

      <FooterDefault footerStyle="alternate" />
      {/* <!-- End Main Footer --> */}
    </div>
  );
};
