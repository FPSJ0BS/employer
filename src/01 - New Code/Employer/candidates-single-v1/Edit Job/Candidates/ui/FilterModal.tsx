import React from "react";
import CloseIcon from "../../../../../../../public/assets/icons/remove.png";
import { useDispatch } from "react-redux";
import {
  clearAllFilters,
  closeFilterModal,
  editEmployerCandidateData,
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
import { FMApplicationWithinDays } from "./FilterModalRightComponents/FMApplicationWithinDays";
import { setHeaderShow } from "../../../../Redux/EmployerSlice";

export const FilterModal = () => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(closeFilterModal());
  };
  const { authRegister } = useSelector(
    (state: any) => state.autheticationSlice
  );

  const [leftBarData, setLeftBarData] = useState([
    { name: "Current Location", id: 1, status: true },
    { name: "Preferred Location", id: 2, status: false },
    // { name: "Current Organization", id: 3, status: false },
    // { name: "All Organization", id: 4, status: false },
    { name: "Salary", id: 5, status: false },
    { name: "Experience", id: 6, status: false },
    { name: "Degree", id: 7, status: false },
    { name: "Age", id: 14, status: false },
    { name: "Teaching Level", id: 8, status: false },
    { name: "Notice Period", id: 10, status: false },
    { name: "Application Within Days", id: 11, status: false },
    // { name: "Notice Period", id: 12, status: false },
    // { name: "Batch", id: 13, status: false },
    // { name: "Application Date", id: 15, status: false },
    // { name: "Last Seen", id: 16, status: false },
    // { name: "Languages", id: 17, status: false },
    // { name: "Willing to Relocate?", id: 18, status: false },
  ]);

  const setActiveStatus = (id) => {
    setLeftBarData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: true } : { ...item, status: false }
      )
    );
  };

  const onApplyFilter = async () => {
    await dispatch(toggleApplyFilter());
    closeModal();
    dispatch(setHeaderShow(true));
  };

  const clearingAllFilter = () => {
    dispatch(
      editEmployerCandidateData({
        sortDataLength: 10,
        pageNumber: 1,
        status: "",
        totalData: null,
        minimumSalary: null,
        maximumSalary: null,
        minimumExperience: null,
        maximumExperience: null,
        minimumAge: null,
        maximumAge: null,
        filterTrueOrNot: true,
        noticePeriod: "",
        applicationWithinDays: null,
      })
    );

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
                {leftBarData[0].status === true && <FMCurrentLocation />}
                {leftBarData[1].status === true && <FMPreferedLocation />}
                {leftBarData[2].status === true && <FMMinimumSalary />}
                {leftBarData[3].status === true && <FMExperience />}
                {leftBarData[4].status === true && <FMQualification />}
                {leftBarData[5].status === true && <FMAge />}
                {leftBarData[6].status === true && <FMTeachingLevel />}
                {leftBarData[7].status === true && <FMNoticePeriod />}
                {leftBarData[8].status === true && <FMApplicationWithinDays />}
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
