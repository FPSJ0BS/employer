import DefaulHeader2 from "../Headers/DefaulHeader2";
import MobileMenu from "../Headers/MobileMenu";
import FooterDefault from "../../components/footer/common-footer/index";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { LoginLottieAnimation } from "../../../public/assets/Lottie/LoginLottieAnimation";
import { useDispatch } from "react-redux";
import { setLogin } from "@/redux/Login/loginSlice";
import CustomizedSnackbar from "../Reusable Components/Snackbar/snackbar";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { BASE_URL } from "../../api/apiAxios";

export const LoginEmail = () => {
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

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fcm_token = localStorage.getItem("Fcm");
  const dispatch = useDispatch();

  // const [postLoginEmail] = usePostLoginEmailMutation();

  const formSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/login/signInwithEmail`, {
        email,
        pwd: password,
        fcm_token,
      });

      if (response?.data?.status) {
        const header = response?.data?.data[0];
        await localStorage.setItem("header", JSON.stringify(header));
        await dispatch(setLogin(true));
        const onSuccessMessage = await response?.data?.message;
        await setSnackbarSuccessMessage(onSuccessMessage);
        setSnackbarSuccessOpen(true);
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
          // dispatch(setWalletData(data));
      } else {
        const onErrorMessage = await response?.data?.message;
        await setSnackbarErrorMessage(onErrorMessage);
        setSnackbarErrorOpen(true);
      }
    } catch (error) {
      const onErrorMessage = "Login Failed, Wrong Email or Password";
      await setSnackbarErrorMessage(onErrorMessage);
      setSnackbarErrorOpen(true);
      console.error("Login failed:", error);
      // Handle error, you can update state or display an error message
    }
  };

  const [showPassword1, setShowPassword1] = useState(false);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="">
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

      <div className="flex justify-center  items-start gap-[100px] h-auto">
        <div className=" hidden lg:block">
          <LoginLottieAnimation />
        </div>

        <div className=" w-[500px] mt-[8rem] flex flex-col items-center">
          <h2 className=" text-[2rem] font-medium mb-4">
            Login To FPS Employer
          </h2>

          <form
            className=" flex flex-col gap-6"
            onSubmit={(e) => formSubmit(e)}
          >
            <div className=" flex flex-col gap-2 justify-center items-center sm:justify-start sm:items-start">
              <TextField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                id="InsNameReg"
                label="Email Address"
                variant="outlined"
                color="primary"
                className="bg-[#f0f5f7] w-[300px] lg:w-[350px]"
                autoComplete="off"
              />
            </div>
            <div className=" flex flex-col gap-2 justify-center items-center sm:justify-start sm:items-start">
              <FormControl sx={{ width: "350px" }} variant="outlined">
                <InputLabel htmlFor="new-password">Password *</InputLabel>
                <OutlinedInput
                  className=" bg-[#f1f5f7]"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  id="new-password"
                  type={showPassword1 ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword1}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword1 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password *"
                  autoComplete="off"
                />
              </FormControl>
            </div>

            <button
              disabled={!email?.trim() || !password?.trim()}
              className={`bg-mainBgColor h-[60px] w-[300px] sm:w-[350px] rounded-lg text-white `}
            >
              Login
            </button>
          </form>

          <div className="flex justify-center items-center pt-4 gap-4">
            <h3 className="font-semibold text-black">
              <Link to="/forgot-password">Forgot Password</Link>
            </h3>

            <h3 className="font-semibold text-black">
              <Link to="/login-otp">Login With Otp</Link>
            </h3>
          </div>

          <div className="flex justify-center items-center pt-2 pb-4">
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
