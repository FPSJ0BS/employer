import React from "react";
import CloseIcon from "../../../../../public/assets/icons/remove.png";
import { useDispatch, useSelector } from "react-redux";
import {
  closeBuyPackageModal,
  editPackageFields,
} from "../../Redux/EmployerPackages";
import { useEffect, useState } from "react";
import {
  postValidatePayment,
  postPaymentOrder,
} from "../../../../api/apiAxios";
import { useNavigate } from "react-router";
import checkPng from "../../../../../public/assets/icons/check.png";
import ReactHtmlParser from "react-html-parser";

export const BuyPackageModal = () => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(closeBuyPackageModal());
  };
  const { singlePlanData, employerPackageFields } = useSelector(
    (state) => state.employerPackages
  );

  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");

  const [razorpay_payment_idValue, setRazorpay_payment_idValue] = useState("");
  const [razorpay_order_idValue, setRazorpay_order_idValue] = useState("");
  const [razorpay_signatureValue, setRazorpay_signatureValue] = useState("");
  const [amount, setAmount] = useState("");
  const [planId, setPlanId] = useState("");

  useEffect(() => {
    const finAmountValue = singlePlanData?.singlePlanData?.national_price;
    const finPlanId = singlePlanData?.id;
    setAmount(finAmountValue);
    setPlanId(finPlanId);
    console.log(singlePlanData);
  }, [singlePlanData]);

  const razorPayOptions = {
    key: "rzp_live_zulSgy2c3oFT5u",
    // key: "rzp_live_eoNE0pukX4o3zA",
    amount: "5000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "FPS JOBS", //your business name
    description: "Test Transaction",
    image: "https://rzp-mobile.s3.amazonaws.com/images/rzp.png",
    order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: async function (response) {
      // console.log(response.razorpay_payment_id);
      // console.log(response.razorpay_order_id);
      // console.log(response.razorpay_signature);
      await setRazorpay_payment_idValue(response.razorpay_payment_id);
      await setRazorpay_order_idValue(response.razorpay_order_id);
      await setRazorpay_signatureValue(response.razorpay_signature);
    },
    prefill: {
      //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
      name: "Gaurav Kumar", //your customer's name
      email: "gaurav.kumar@example.com",
      contact: "9000090000", //Provide the customer's phone number for better conversion rates
    },
    theme: {
      color: "#a83359",
    },
  };

  useEffect(() => {
    const gettingSuccessData = async () => {
      if (
        razorpay_payment_idValue &&
        razorpay_order_idValue &&
        razorpay_signatureValue
      ) {
        completePaymentApi();
        console.log("payment ID", razorpay_payment_idValue);
        console.log("order ID value", razorpay_order_idValue);
        console.log("signature", razorpay_signatureValue);
      } else {
        console.error("Missing required properties in the response");
      }
    };

    gettingSuccessData();
  }, [
    razorpay_payment_idValue,
    razorpay_order_idValue,
    razorpay_signatureValue,
  ]);

  const completePaymentApi = async () => {
    try {
      const res = await postValidatePayment(
        razorpay_order_idValue,
        razorpay_signatureValue,
        razorpay_payment_idValue,
        planId
      );
      if (res?.data?.status) {
        navigate(`/employers-dashboard/post-jobs`);
        console.log(res);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async (price: number, id: number, optionId: number) => {
    await dispatch(
      editPackageFields({
        price,
        id,
        optionId,
      })
    );

    navigate("/checkout");
  };

  useEffect(() => {
    if (orderId) {
      openRazorPay(); // Call openRazorPay only if orderId is truthy
    }
  }, [orderId]);

  const openRazorPay = () => {
    var rzp1 = new window.Razorpay(razorPayOptions);
    rzp1.on("payment.failed", function (response) {
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
    });

    rzp1.open();
  };

  return (
    <div className="absolute h-full w-full bg-gray-600 bg-opacity-50 z-50 ">
      <div className=" h-[100%] w-[100%] flex justify-center items-center ">
        <div
          className="fixed top-[150px] scrollHere ml-[-50px] overflow-y-auto flex flex-col gap-[20px] justify-center items-center shadow-md  py-[50px]  bg-white border-2 border-gray-400 border-solid   rounded-[20px] z-10
            
                h-[400px]
                xl:h-[500px]
                md:w-[750px]
                w-[300px]
                xl:w-[900px] xl:ml-[0px]
            "
        >
          <div onClick={() => closeModal()} className=" absolute right-1 top-1">
            <img
              src={CloseIcon}
              alt="close"
              className=" w-[30px] cursor-pointer"
            />
          </div>

          <div className=" pb-[50px]">
            <h2 className=" text-[25px] font-semibold underline">
              {singlePlanData?.singlePlanData?.name}
            </h2>
          </div>

          <div className="">
            <div className=" grid grid-cols-1 w-[100%] place-items-start gap-y-2">
              {singlePlanData?.singlePlanData?.national_package?.map((item) => {
                return (
                  <div
                    key={item?.id}
                    className=" flex justify-start items-center gap-4 w-full"
                  >
                    <img
                      alt="check"
                      height="25px"
                      width="25px"
                      src={checkPng}
                    />
                    <div className=" flex justify-between gap-4 w-full">
                      <div className="flex gap-4">
                        <div className=" flex justify-start items-center gap-2">
                          <p>Price:</p>
                          <span className=" font-semibold">{item?.price},</span>
                        </div>

                        <div className=" flex justify-start items-center gap-2">
                          <p>Jobs:</p>
                          <span className=" font-semibold">{item?.jobs},</span>
                        </div>

                        <div className=" flex justify-start items-center gap-2">
                          <p>Days:</p>
                          <span className=" font-semibold">{item?.days},</span>
                        </div>
                      </div>

                      <div
                        onClick={() =>
                          handlePayment(item?.price, item?.id, item?.packid)
                        }
                        className=" cursor-pointer rounded-md text-white w-[50px] h-[30px] bg-mainBgColor flex justify-center items-center"
                      >
                        Buy
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="text-center pt-4  text-[16px] 
                    px-[20px]
                    xl:px-[100px]
                "
          >
            <p className=" text-left leading-[1.4em]">
              {ReactHtmlParser(singlePlanData?.singlePlanData?.description)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
