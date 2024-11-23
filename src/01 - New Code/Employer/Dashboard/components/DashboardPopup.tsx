import { CornerUpLeft, X } from "lucide-react";
import React from "react";
import {
  setDashboardPopupFields,
  setToggleDashboardPopup,
} from "../../Redux/EmployerSlice";
import { useDispatch, useSelector } from "react-redux";

const DashboardPopup = () => {
  const dispatch = useDispatch();
  const { dashboardPopupFields } = useSelector(
    (state: any) => state.employerSliceNew
  );
  return (
    <div
      onClick={() => dispatch(setToggleDashboardPopup())}
      className="flex w-full justify-center items-center h-[100vh] bg-gray-600/60 pt-[100px] fixed inset-0 z-50 realtive"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" w-[95%] sm:w-[80%] xl:w-[50%] 2xl:w-[40%] min-h-[200px] bg-white text-black relative rounded-xl p-4 md:p-5 flex flex-col gap-5 justify-center items-center"
      >
        <X
          onClick={() => dispatch(setToggleDashboardPopup())}
          className="absolute right-3 top-3 cursor-pointer"
        />
        <h2 className="text-[25px] font-semibold leading-[1.2em] text-center">
          {" "}
          {dashboardPopupFields.heading}
        </h2>
        <div className="flex sm:flex-row flex-col gap-4">
          <button
            onClick={() => {
              dispatch(setToggleDashboardPopup());
              dispatch(
                setDashboardPopupFields({
                  hitApi: true,
                })
              );
            }}
            className="bg-white text-center px-4 rounded-2xl h-14 relative text-black text-xl font-semibold group shadow-lg"
            type="button"
          >
            <div
              className={`bg-green-400 rounded-xl h-12 w-[${dashboardPopupFields.iconOnePercentage}] flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[96%] z-10 duration-500`}
            >
              <CornerUpLeft />
            </div>
            <p
              className={`translate-x-2 font-semibold pl-[${dashboardPopupFields.btnOneTextPl}] pr-[${dashboardPopupFields.btnOneTextPr}]`}
            >
              {dashboardPopupFields.buttonTextOne}
            </p>
          </button>
          <button
            onClick={() => dispatch(setToggleDashboardPopup())}
            className="bg-white text-center px-4 rounded-2xl h-14 relative text-black text-xl font-semibold group shadow-lg"
            type="button"
          >
            <div
              className={`bg-red-400 rounded-xl h-12 w-[${dashboardPopupFields.iconTwoPercentage}] flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[96%] z-10 duration-500`}
            >
              <X />
            </div>
            <p
              className={`translate-x-2 font-semibold pl-[${dashboardPopupFields.btnTwoTextPl}] pr-[${dashboardPopupFields.btnTwoTextPr}]`}
            >
              {dashboardPopupFields.buttonTextTwo}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPopup;
