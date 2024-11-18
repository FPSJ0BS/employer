import React, { useState } from "react";
import CreateAccount from "../../CreateAccount/CreateAccount";
import {
  postPhoneOtpSendAxios,
  postPhoneOtpVerifyAxios,
} from "../../../../../../../api/apiAxios";
import Otp from "./OTP";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../../../../../../redux/Login/loginSlice.jsx";

const MobileNumberForm = ({
  setSnackbarSuccessMessage,
  setSnackbarSuccessOpen,
  setSnackbarErrorMessage,
  setSnackbarErrorOpen,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobNumber, setMobNumber] = useState("");
  const [hash, sethash] = useState("");
  const [switchToOtp, setSwitchToOtp] = useState(false);
  const numberOfDigits = 6;
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const { login } = useSelector((state) => state.login);

  const onMobileNumberCheck = async (e: any) => {
    e.preventDefault();
    // setLoaderValid(true);

    try {
      // Trigger the login mutation with the entered phone number
      const response = await postPhoneOtpSendAxios(mobNumber);

      if (!response.data.status) {
        const onErrorMessage = await response?.data?.message;
        await setSnackbarErrorMessage(onErrorMessage);
        setSnackbarErrorOpen(true);
        // setLoaderValid(false);
        setMobNumber("");
        return;
      }

      if (response?.data?.status) {
        setSwitchToOtp(true);
        const hash = await response?.data.data[0];
        await sethash(hash);
        const onSuccessMessage = await response?.data?.message;
        await setSnackbarSuccessMessage(onSuccessMessage);
        setSnackbarSuccessOpen(true);
        // setOtpCheck(true);
        // setLoaderValid(false);
      }
    } catch (error) {
      await setSnackbarErrorMessage("network Error");
      setSnackbarErrorOpen(true);
      // setLoaderValid(false);
      setMobNumber("");
      console.error("OTP Sent Failed:", error);
      return;
    }
  };

  const otpVerify = async (e) => {
    e.preventDefault();
    // setLoaderValidOtp(true);
    const otpJoin = otp.join("");
    try {
      const response = await postPhoneOtpVerifyAxios(
        mobNumber,
        hash,
        Number(otpJoin)
      );

      if (!response.data.status) {
        const onErrorMessage = await response?.data?.message;
        await setSnackbarErrorMessage(onErrorMessage);
        setSnackbarErrorOpen(true);
        // setLoaderValidOtp(false);
        return;
      }

      if (response.data.status) {
        const onSuccessMessage = await response?.data?.message;
        await setSnackbarSuccessMessage(onSuccessMessage);
        setSnackbarSuccessOpen(true);

        console.log(response?.data);
        // setLoaderValidOtp(false);
        const header = response?.data?.data[0];
        await localStorage.setItem("header", JSON.stringify(header));
        await dispatch(setLogin(true));
        // window.location.href = '/employers-dashboard/dashboard';
        navigate("/employers-dashboard/dashboard");

        // const data = {
        //   dateTransaction: String(new Date()),
        //   typeTransaction: "Bonus Coins",
        //   Status: "Credit",
        //   amountCoins: "100",
        //   currentBalance: "100",
        //   purchasedCoins: "0",
        //   bonusCoins: "100",
        // };
        // localStorage.setItem("wallet", JSON.stringify(data));
        // localStorage.setItem("walletData", JSON.stringify([data]));
        // dispatch(setWalletData(data));
        // window.location.reload();
      }
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  return (
    <div className="pt-3 flex flex-col w-full">
      {!switchToOtp ? (
        <form
          onSubmit={(e) => onMobileNumberCheck(e)}
          className=" flex flex-col gap-4 w-full "
        >
          <div className=" flex flex-col gap-2">
            <label className=" font-semibold" htmlFor="pnNumebr">
              Phone Number
            </label>
            <div className=" flex items-center gap-2 w-full">
              <p className=" rounded-[15px] mb-0 border-2 border-solid border-[#e7e7f0] h-[50px] w-[50px] flex items-center justify-center font-semibold">
                {" "}
                +91
              </p>
              <input
                value={mobNumber}
                onChange={(e) => setMobNumber(e?.target?.value)}
                required
                className=" w-full rounded-[15px] h-[50px] border-solid border-2 border-[#e7e7f0] pl-2 "
                placeholder="10 digit phone number ..."
                type="tel"
                id="pnNumebr"
              />
            </div>
          </div>
          <div className=" flex w-full items-center justify-center">
            <button
              disabled={login}
              className="w-[80%] h-[40px] bg-[#D94452]  text-white  rounded-[30px] font-semibold text-[16px]"
              type="submit"
            >
              Send OTP
            </button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={(e) => otpVerify(e)}
          className=" flex flex-col gap-3 items-center justify-center w-full"
        >
          <Otp
            otp={otp}
            setOtp={setOtp}
            numberOfDigits={numberOfDigits}
            mobNumber={mobNumber}
            setSnackbarErrorMessage={setSnackbarErrorMessage}
            setSnackbarErrorOpen={setSnackbarErrorOpen}
            sethash={sethash}
            setSnackbarSuccessMessage={setSnackbarSuccessMessage}
            setSnackbarSuccessOpen={setSnackbarSuccessOpen}
          />
          <div className=" w-full flex items-center justify-center">
            <button
              disabled={login}
              className="w-[80%] h-[40px] bg-[#D94452]  text-white  rounded-[30px] font-semibold text-[16px]"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      )}

      <CreateAccount name={"mobile number"} />
    </div>
  );
};

export default MobileNumberForm;
