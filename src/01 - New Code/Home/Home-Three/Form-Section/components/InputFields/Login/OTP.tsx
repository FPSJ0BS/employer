import React, { useRef, useEffect, useState } from "react";
import { postPhoneOtpSendAxios } from "../../../../../../../api/apiAxios";

interface OtpProps {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  numberOfDigits: number;
}

const Otp: React.FC<OtpProps> = ({
  otp,
  setOtp,
  numberOfDigits,
  mobNumber,

  setSnackbarErrorMessage,
  setSnackbarErrorOpen,
  sethash,
  setSnackbarSuccessMessage,
  setSnackbarSuccessOpen
}) => {
  const otpBoxReference = useRef<(HTMLInputElement | null)[]>([]);

  // State for managing the timer
  const [timer, setTimer] = useState<number>(60);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true); // to track if the timer is active

  const onMobileNumberCheck = async () => {
    
    try {
      // Trigger the login mutation with the entered phone number
      const response = await postPhoneOtpSendAxios(mobNumber);

      if (!response.data.status) {
        const onErrorMessage = await response?.data?.message;
        await setSnackbarErrorMessage(onErrorMessage);
        setSnackbarErrorOpen(true);
        return;
      }

      if (response?.data?.status) {
        const hash = await response?.data.data[0];
        await sethash(hash);
        const onSuccessMessage = await response?.data?.message;
        await setSnackbarSuccessMessage(onSuccessMessage);
        setSnackbarSuccessOpen(true);

        setOtp(Array(numberOfDigits).fill(""));
        setTimer(60);
        setIsTimerActive(true);
      }
    } catch (error) {
      await setSnackbarErrorMessage("network Error");
      setSnackbarErrorOpen(true);
      // setLoaderValid(false);
      console.error("OTP Sent Failed:", error);
      return;
    }
  };

  // Start timer on mount
  useEffect(() => {
    if (isTimerActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      // Clear interval on cleanup
      return () => clearInterval(interval);
    }
    return undefined;
  }, [isTimerActive, timer]);

  useEffect(() => {
    otpBoxReference.current[0]?.focus();
  }, []);

  function handleChange(value: string, index: number) {
    const newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1]?.focus();
    }
  }

  function handleBackspaceAndEnter(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      otpBoxReference.current[index - 1]?.focus();
    }
    if (
      e.key === "Enter" &&
      e.currentTarget.value &&
      index < numberOfDigits - 1
    ) {
      otpBoxReference.current[index + 1]?.focus();
    }
  }

  const handleResendOtp = () => {
    onMobileNumberCheck();

  };

  return (
    <article className="w-full">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
              ref={(reference) => (otpBoxReference.current[index] = reference)}
              className="border w-12 h-12 text-white p-3 rounded-md block bg-black focus:border-2 focus:outline-none appearance-none"
            />
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold text-gray-500">
            {timer > 0 ? (
              `Resend OTP in ${timer}s`
            ) : (
              <span
                onClick={handleResendOtp}
                className="text-gray-500 cursor-pointer hover:underline"
              >
                Resend OTP
              </span>
            )}
          </p>
        </div>
      </div>
    </article>
  );
};

export default Otp;
