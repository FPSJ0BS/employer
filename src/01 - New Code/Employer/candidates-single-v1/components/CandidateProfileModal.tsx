import React from "react";
import CloseIcon from "../../../../../public/assets/icons/remove.png";
import { useDispatch, useSelector } from "react-redux";
import { closeResumeModal } from "../../Redux/EmployerCandidate";
import { useEffect, useState } from "react";
import ProfileIcon from '../../../../../public/assets/icons/user.png'

export const CandidateProfileModal = () => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(closeResumeModal());
  };
  const { modal } = useSelector((state) => state.employerCandidate);

  return (
    <div className="absolute h-full w-full bg-gray-600 bg-opacity-50 z-50 ">
      <div className=" h-[100%] w-[100%] flex justify-center items-top mt-[100px] fixed">
        <div
          className="relative scrollHere ml-[-50px] overflow-y-auto flex flex-col justify-top items-center shadow-md  py-[30px] px-[20px]  bg-white border-2 border-gray-400 border-solid   rounded-[20px] z-10
            
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
              className=" w-[30px] cursor-pointer "
            />
          </div>

          <div className="h-[100%] w-[100%] ">


            <div className="w-[100%] h-[150px] flex">
              <div className="bg-green-600 w-[20%] h-[100%] flex justify-center items-center">
                <img className="w-[60%] rounded-[50%]" src={ProfileIcon}  alt="profile image"/>
              </div>
              <div  className="bg-blue-600 w-[60%] h-[100%]"></div>
              <div  className="bg-black w-[20%] h-[100%]"></div>
            </div>





          </div>
        </div>
      </div>
    </div>
  );
};
