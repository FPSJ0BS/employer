import React from "react";
import CloseIcon from "../../../../../../../public/assets/icons/remove.png";
import { useDispatch } from "react-redux";
import {
  clearAllFilters,
  closeFilterSuggestedModal,
  editEmployerCandidateData,
  setApplyData,
  toggleApplyFilter,
} from "../../../../Redux/EmployerCandidate";

import { useSelector } from "react-redux";
import { useState } from "react";
import { FMCurrentLocation } from "./FilterModalRightComponents/FMCurrentLocation";
import { FMPreferedLocation } from "./FilterModalRightComponents/FMPreferedLocation";
import { FMMinimumSalary } from "./FilterModalRightComponents/FMMinimumSalary";
import { FMExperience } from "./FilterModalRightComponents/FMExperience";
import { FMQualification } from "./FilterModalRightComponents/FMQualification";
import { FMAge } from "./FilterModalRightComponents/FMAge";
import { FMTeachingLevel } from "./FilterModalRightComponents/FMTeachingLevel";
import { FMNoticePeriod } from "./FilterModalRightComponents/FMNoticePeriod";
import Branch from "./FilterModalRightComponents/Branch";
import Location from "./FilterModalRightComponents/Location";
import { editEmployerEditJob } from "../../../../Redux/EmployerEditJob";
import { setHeaderShow } from "../../../../Redux/EmployerSlice";

export const SuggestedFilter = () => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(closeFilterSuggestedModal());
  };
  const [isClear, setIsClear] = useState(false);
  const [leftBarData, setLeftBarData] = useState([
    { name: "Branch", id: 1, status: true },
    { name: "Experience", id: 2, status: false },
    { name: "Salary", id: 3, status: false },
    { name: "Location", id: 4, status: false },
    { name: "Degree", id: 5, status: false },
    { name: "Teaching Level", id: 6, status: false },
    { name: "Notice Period", id: 7, status: false },
  ]);

  const setActiveStatus = (id) => {
    setLeftBarData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: true } : { ...item, status: false }
      )
    );
  };

  const onApplyFilter = async () => {
    await dispatch(setApplyData(true));
    closeModal();
    dispatch(setHeaderShow(true));
  };

  const clearingAllFilter = () => {
    dispatch(
      editEmployerCandidateData({
        minimumSalary: null,
        maximumSalary: null,
        minimumExperience: null,
        maximumExperience: null,
        noticePeriod: "",

      })
    );
    dispatch(
      editEmployerEditJob({
        catID: null,
        functionID: null,
        state: "",
        city: "",
      })
    );
    setIsClear(true);
    dispatch(clearAllFilters());
    // getCandidateList()
  };

  return (
    <div className="absolute h-full w-full bg-gray-600 bg-opacity-80 z-50 ">
      <div className=" fixed h-[100%]  w-[100%] flex justify-center items-center z-50 ">
        <div className=" bg-white h-[500px] w-[90vw] lg:w-[65vw] xl:w-[60vw] rounded-lg relative z-50 ">
          <div className=" absolute right-1 top-1 z-50">
            <img
              onClick={() => {
                closeModal();
                dispatch(setHeaderShow(true));
                dispatch(setApplyData(false));
              }}
              src={CloseIcon}
              alt="close"
              className=" w-[30px] cursor-pointer"
            />
          </div>

          <div className=" w-[100%] h-[100%] flex ">
            <div className="w-[30%] h-[100%] bg-[#003049] py-[20px]  pr-[5px] rounded-l-lg rounded-r-[50px]">
              <h2 className="text-[20px] font-semibold text-white pl-[20px]">
                Filter
              </h2>

              <div className=" postjobHandleScrollbar h-[90%] text-white flex flex-col pt-[30px] gap-4 text-[18px] font-medium overflow-y-auto ">
                {leftBarData.map((item) => {
                  return (
                    <h3
                      onClick={() => setActiveStatus(item.id)}
                      key={item.id}
                      className={` cursor-pointer pl-[20px] mr-[20px] rounded-r-[20px] ${
                        item.status === true ? " bg-white text-[#003049] " : ""
                      }`}
                    >
                      {item.name}
                    </h3>
                  );
                })}
              </div>
            </div>

            <div className="w-[70%] h-[100%] flex flex-col justify-between px-[30px] py-[20px]">
              <div className=" h-[80%]">
                {leftBarData[0]?.status === true && (
                  <Branch isClear={isClear} />
                )}
                {leftBarData[1]?.status === true && <FMExperience />}
                {leftBarData[2]?.status === true && <FMMinimumSalary />}
                {leftBarData[3]?.status === true && (
                  <Location isClear={isClear} />
                )}
                {leftBarData[4]?.status === true && <FMQualification />}
                {leftBarData[5]?.status === true && <FMTeachingLevel />}
                {leftBarData[6]?.status === true && <FMNoticePeriod />}
              </div>

              <div className=" flex justify-end items-end w-[100%] h-[20%] gap-2 ">
                <div
                  onClick={() => clearingAllFilter()}
                  className=" cursor-pointer h-[30px] w-[100px] flex justify-center items-center rounded-lg font-medium border-[2px] border-solid text-white border-red-500 bg-red-500  "
                >
                  Reset
                </div>

                <div
                  onClick={() => onApplyFilter()}
                  className=" cursor-pointer h-[30px] w-[100px] flex justify-center items-center rounded-lg font-medium border-[2px] border-solid bg-[#458d76] text-white"
                >
                  Apply
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
