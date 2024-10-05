import React, { useState } from "react";
import CreateAccount from "../../CreateAccount/CreateAccount";
import axios from "axios";
import { BASE_URL } from "../../../../../../../api/apiAxios";
import { setLogin } from "../../../../../../../redux/Login/loginSlice.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const EmailForm = ({setSnackbarSuccessMessage, setSnackbarSuccessOpen, setSnackbarErrorMessage, setSnackbarErrorOpen}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useSelector((state) => state.login);

  const emailHandleSubmit = async (e : any) => {
    e.preventDefault();
    const fcm_token = ""

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

  return (
    <div className=" min-h-[200px] flex flex-col items-center  w-full  rounded-lg pt-2">
      <form
        onSubmit={(e) => emailHandleSubmit(e)}
        className=" flex flex-col gap-3 w-full "
      >
        <div className=" flex flex-col gap-2">
          <label className=" font-semibold" htmlFor="ema">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e?.target.value)}
            value={email}
            required
            className=" w-full rounded-[15px] h-[50px] border-solid border-2 border-[#e7e7f0] pl-2 "
            placeholder="Enter Email Address..."
            type="email"
            id="ema"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="pwd">
            Password
          </label>
          <div className="relative w-full">
            <input
              onChange={(e) => setPassword(e?.target.value)}
              value={password}
              required
              className="w-full rounded-[15px] border-2 border-[#e7e7f0] pl-2 pr-10 border-solid h-[50px]"
              placeholder="Enter Password..."
              type={showPassword ? "text" : "password"}
              id="pwd"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500 border-none"
            >
              {showPassword ? "Hide" : "Show"}{" "}
            </button>
          </div>
        </div>
        <div className=" flex w-full items-center justify-center">
          <button
          disabled = {login}
            className="w-[80%] h-[40px] bg-[#D94452]  text-white  rounded-[30px] font-semibold text-[16px]"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      <CreateAccount name = {"email ID"}/>
    </div>
  );
};

export default EmailForm;
