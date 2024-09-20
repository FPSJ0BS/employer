import React from "react";
import CloseIcon from "../../../../../../public/assets/icons/remove.png";
import { useDispatch } from "react-redux";
import { closePhoneNumberManageProfileModal } from "../../../Redux/CompanyProfile";
import Lottie from "lottie-react";
import MailGifIcon from "../../../../../../public/assets/gif/email-file.gif";
import Edit from "../../../../../../public/assets/icons/edit.png";

export const EmailModal = () => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(closePhoneNumberManageProfileModal());
  };

  return (
    <div className="absolute h-full w-full bg-gray-600 bg-opacity-80 z-50 ">
      <div className=" h-[100%] w-[100%] flex justify-center items-center ">
        <div className=" bg-white h-[500px] w-[500px] rounded-lg relative">
          <div
            className=" absolute right-1 top-1 "
          >
            <img
              onClick={() => closeModal()}
              src={CloseIcon}
              alt="close"
              className=" w-[30px] cursor-pointer"
            />
          </div>

          <div className=" w-[100%] h-[100%] flex justify-center items-center flex-col gap-6">
            <img className="w-[100px]" src={MailGifIcon} alt="mail" />
            <h2 className=" font-bold text-[30px] text-center cursor-default">
              Verify your Email
            </h2>
            <p className="text-center text-[18px] font-normal leading-[1.6em] cursor-default">
              One Time Password(OTP) has been sent on <br />
              <span className="flex justify-center items-center gap-2">
                ceo@fpsjob.com
                <img
                  className="w-[20px] cursor-pointer"
                  src={Edit}
                  alt="edit"
                />
              </span>
            </p>

            <form className="flex flex-col gap-2 justify-center items-center">
              <div className=" sm:w-[100%] w-[2100%] flex items-center flex-col gap-2">
                <label
                  htmlFor="contactPersonName"
                  className=" postJobInputTitle font-semibold text-gray-700"
                >
                  Enter the otp to verify your email
                </label>
                <input
                  autoComplete="off"
                  required
                  // onChange={(e) => handleChange(e)}
                  type="number"
                  id="contactPersonName"
                  name="InstituteName"
                  className=" p-2  sm:w-[300px] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  // value={authRegister.person_name}
                />
              </div>
              <button className="w-[300px] relative px-8 py-2 rounded-md bg-[#cc5475] isolation-auto z-10 border-2 border-solid text-white before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-lime-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700">
                Verify Email
              </button>
            </form>
            <p className="text-center text-[15px] font-normal leading-[1.4em] cursor-default">
              Resend Code in 30
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
