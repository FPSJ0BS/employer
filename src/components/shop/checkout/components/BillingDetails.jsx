import React from "react";
import ReactHtmlParser from "react-html-parser";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPaymentOrder, postValidatePayment } from "../../../../api/apiAxios";
import checkPng from "../../../../../public/assets/icons/check.png";
import CheckoutImage from '../../../../../public/assets/storyset/Ecommerce checkout laptop-amico.png'
import { ShoppingCart } from "lucide-react";
import { editPackageFields, openCheckoutModal } from "../../../../01 - New Code/Employer/Redux/EmployerPackages";


const BillingDetails = () => {

  const dispatch = useDispatch();

  const { singlePlanData, employerPackageFields } = useSelector(
    (state) => state.employerPackages
  );

  useEffect(()=>{


    console.log(employerPackageFields);
  },[employerPackageFields])


  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");

  const handlePayment = async (price, idd, optionIdd) => {


    await dispatch(
      editPackageFields({
        price,
        id: optionIdd,
        optionId:idd,
      })
    );

    navigate("/checkout");

  };




  return (
    <div className="default-form w-full">
      <div className="row">


        {/* start ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>... */}

        <div className=" w-[100%] h-[200px] border-b-[2px] border-t-0 border-r-0 border-l-0 border-dashed rounded-lg flex">


          <div className="w-[30%] h-[100%] flex justify-start items-center">
            <img className="w-[75%]" src={CheckoutImage} />
          </div>
          <div className="w-[70%] flex flex-col justify-center items-end h-[100%] gap-4">

            <div className="flex flex-col justify-center items-center gap-4">
              {/* <h2 className="text-[40px] font-medium">Checkout</h2> */}
              <button
                onClick={() => dispatch(openCheckoutModal())}
                className="relative flex gap-2 py-2 px-8 text-white hover:text-black text-base font-bold  overflow-hidden bg-[#dda15e] rounded-[20px] border-1 border-solid transition-all duration-400 ease-in-out shadow-md hover:scale-105  hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
              >
                <ShoppingCart />
                Easy Checkout!
              </button>
              <p className="text-center">* Easy Checkout with QR or<br /> Direct Bank Transfer</p>
            </div>


          </div>

        </div>


        <div className=" flex justify-center items-center gap-2 w-full my-[50px]">
          <h1 className=" font-semibold text-[25px] underline">{singlePlanData?.singlePlanData?.name.charAt(0).toUpperCase() + singlePlanData?.singlePlanData?.name.slice(1)}</h1>
        </div>




        <div className=" w-[100%]  justify-center items-center">
          <div className=" grid grid-cols-1 w-[100%] place-items-center gap-y-2 px-[100px]">
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
                  <div className=" flex justify-between gap-4 w-full ">
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
                      onClick={() => handlePayment(item?.price, item?.id, item?.packid)}
                      className={ `cursor-pointer rounded-md text-white w-[60px] h-[30px] ${employerPackageFields.optionId === item?.id ? " bg-green-700" : "bg-mainBgColor"}  flex justify-center items-center`}
                    >
                      {employerPackageFields.optionId === item?.id ? " Buying" : "Buy"}
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
                    xl:px-[100px] w-full flex justify-center items-center
                "
        >
          <p className=" text-left leading-[1.4em]">
            {ReactHtmlParser(singlePlanData.singlePlanData?.description)}
          </p>
        </div>




        {/* End ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.. */}





      </div>
    </div>
  );
};

export default BillingDetails;
