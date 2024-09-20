import React, { useEffect } from "react";
import CloseIcon from "../../../../../public/assets/icons/remove.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import QRImage from "../../../../../public/assets/Payment/QrCode.png";
import { closeCheckoutModal } from "../../../../01 - New Code/Employer/Redux/EmployerPackages";
import ConfettiExplosion from "react-confetti-explosion";
import SuccessGif from "../../../../../public/assets/gif/Successful purchase.gif";
import ConfettinIconGif from "../../../../../public/assets/gif/confetti.gif";
import { postDbtandUpi } from "../../../../api/apiAxios";
import { DbtOrUpi } from "./input/dbtOrUpi";
import { useNavigate } from "react-router-dom";
import { CustomizedSnackbarTwo } from "../../../../01 - New Code/Reusable Components/Snackbar/snackbarNew";

export const CheckoutModal = ({ paymentSuccesful, setPaymentSuccessful }) => {
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
  const { singlePlanData, employerPackageFields } = useSelector(
    (state) => state.employerPackages
  );



  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(closeCheckoutModal());
  };

  const [passValue, setPassValue] = useState("");
  const [upiOrDbt, setUpiOrDbt] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPassValue(inputValue);
  };

  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setConfetti(true);
    }, 500);
  }, [paymentSuccesful]);

  const [secondsTime, setSecondsTime] = useState(30);

  useEffect(() => {
    if (secondsTime > 0) {
      const timerId = setInterval(() => {
        setSecondsTime((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }

    if (secondsTime === 0) {
      navigate("/employers-dashboard/post-jobs");
    }
  }, [secondsTime]);

  const payment = async (e) => {
    e.preventDefault();
    try {
      const res = await postDbtandUpi({
        transaction_id: passValue,
        payment_type: upiOrDbt,
        amount: parseInt(employerPackageFields.price),
        pack_id: singlePlanData?.singlePlanData?.id,
        option_id: parseInt(employerPackageFields.optionId),
      });
      if (res?.data.status) {
        const onSuccessMessage = await res?.data?.message;
        await setSnackbarSuccessMessage(onSuccessMessage);
        await setSnackbarSuccessOpen(true);
        setPaymentSuccessful(true);
      } else {
        const onErrorMessage = res?.data?.message;
        await setSnackbarErrorMessage(onErrorMessage);
        setSnackbarErrorOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute h-full w-full bg-gray-600 bg-opacity-80 z-40  ">
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
      <div className=" min-h-[30%] w-[100%] flex justify-center items-top z-40 fixed mt-[10px] ">
        {!paymentSuccesful && (
          <div
            className={` bg-white  min-h-[500px] w-[500px] rounded-lg relative z-50 py-[20px]`}
          >
            <div className=" absolute right-1 top-1 z-50">
              <img
                onClick={() => closeModal()}
                src={CloseIcon}
                alt="close"
                className=" w-[30px] cursor-pointer"
              />
            </div>
            <div className=" w-[100%] h-[100%] flex justify-center items-center flex-col gap-2">
              <img
                className="w-[150px] pt-[10px]"
                src={QRImage}
                alt="Phone Number"
              />

              <div className="w-[100%] h-[50px] flex justify-center items-center">
                <span className="w-[50%]">
                  <hr className="bg-gray-600" />
                </span>
                <span className="w-[10%] flex justify-center items-center font-semibold">
                  OR
                </span>
                <span className="w-[50%]">
                  <hr className="bg-gray-600" />
                </span>
              </div>

              <h2 className="text-black font-semibold">Direct Bank Transfer</h2>
              <div className="w-[60%] flex  justify-center items-center my-[20px]">
                <div className=" w-[100%] gap-2 flex flex-col items-start">
                  <h3 className=" font-semibold">Bank Name.</h3>
                  <h3 className=" font-semibold">Account Name.</h3>
                  <h3 className=" font-semibold">Account Name.</h3>
                  <h3 className=" font-semibold">IFSC Code.</h3>
                </div>

                <div className=" w-[100%] gap-1 flex flex-col items-start">
                  <p>ICICI Bank</p>
                  <p>Fps Job Private Limited</p>
                  <p>341605500211</p>
                  <p>ICIC0006759</p>
                </div>

                {/* <div className="flex justify-between items-center w-[70%]">
                <h3 className=" font-semibold">Account Name.</h3>
                <p>Fps Job Private Limited</p>
              </div>
              <div className="flex justify-between items-center w-[70%]">
                <h3 className=" font-semibold">Account No.</h3>
                <p>341605500211</p>
              </div>
              <div className="flex justify-between items-center w-[70%]">
                <h3 className=" font-semibold">IFSC Code.</h3>
                <p>ICIC0006759</p>
              </div> */}
              </div>

              <div className="w-[100%] h-[50px] flex justify-center items-center">
                <span className="w-[40%]">
                  <hr className="bg-gray-600 h-[1.5px]" />
                </span>
                <span className="w-[20%] flex justify-center items-center font-semibold">
                  Final Step
                </span>
                <span className="w-[40%]">
                  <hr className="bg-gray-600 h-[1.5px]" />
                </span>
              </div>

              <form
                onSubmit={(e) => payment(e)}
                className="flex flex-col gap-2 justify-center items-center w-[80%]"
              >
                <div className="flex flex-col gap-2 w-[100%]">
                  <label
                    htmlFor="contactPersonName"
                    className=" postJobInputTitle font-semibold text-gray-700"
                  >
                    Enter Transaction Id & Payment Type to verify the Payment!
                  </label>
                  <div className="flex justify-center items-baseline gap-2">
                    <input
                      placeholder="Enter Transaction Id..."
                      autoComplete="off"
                      required
                      onChange={(e) => handleChange(e)}
                      type="text"
                      id="contactPersonName"
                      name="InstituteName"
                      className=" h-[40px] p-2 w-[50%] sm:w-[50%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                      value={passValue}
                    />
                    <DbtOrUpi
                      upiOrDbtinput={upiOrDbt}
                      setUpiOrDbtinput={setUpiOrDbt}
                    />
                  </div>
                </div>

                <button className="w-[300px] relative mt-3 px-8 py-2 rounded-md bg-[#cc5475] isolation-auto z-10 border-2 border-solid text-white before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-lime-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700">
                  Verify Payment
                </button>
              </form>
            </div>
          </div>
        )}

        {paymentSuccesful && (
          <div className="bg-white  h-[350px] w-[800px] rounded-lg relative z-40 py-[20px] mt-[100px] flex justify-center items-center">
            <div className="w-[40%] flex justify-center items-center">
              <img className="w-[80%]" src={SuccessGif} alt="success" />
            </div>

            <div className="z-50 w-[60%] flex  flex-col justify-center items-center pr-[50px] gap-4">
              {confetti && <ConfettiExplosion zIndex={100} duration={4000} />}
              <div>
                <h2 className="flex justify-center items-center  text-[30px] text-center font-medium leading-[1.4em]">
                  Congratulations{" "}
                  <span>
                    <img
                      className="w-[40px]"
                      src={ConfettinIconGif}
                      alt="conf"
                    />
                  </span>{" "}
                </h2>
                <h2 className="text-[30px] text-center font-medium leading-[1.4em]">
                  on being a part of{" "}
                  <span className="font-bold ">FPS JOBS!</span>
                </h2>
              </div>
              <p className="text-center">
                * We have recieved the transaction id and we will soon <br />
                update the status of your payment.
              </p>
              <div>
                <p>
                  <span
                    onClick={() => navigate("/employers-dashboard/post-jobs")}
                    className="text-black font-medium cursor-pointer"
                  >
                    Click here
                  </span>{" "}
                  to redirect or Regirecting in{" "}
                  <span className="font-medium">{secondsTime}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
