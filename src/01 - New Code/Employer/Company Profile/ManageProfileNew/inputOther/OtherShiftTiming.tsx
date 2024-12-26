import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editEmployerManageProfileFields } from "../../../Redux/CompanyProfile";

export const OtherShiftTiming = () => {
  const { employerManageProfileFields, modal } = useSelector(
    (state: any) => state.employerManageProfile
  );
  const [startTime, setStartTime] = useState("");

  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (employerManageProfileFields?.shift_start) {
      setStartTime(employerManageProfileFields?.shift_start);
    }
    if (employerManageProfileFields?.shift_end) {
      setEndTime(employerManageProfileFields?.shift_end);
    }
  }, [
    employerManageProfileFields?.shift_start,
    employerManageProfileFields?.shift_end,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      editEmployerManageProfileFields({
        shift_start: startTime,
        shift_end: endTime,
      })
    );
  }, [startTime, endTime]);

  const handleTimeChange = (type: "startTime" | "endTime", value: string) => {
    if (type === "startTime") {
      setStartTime(value);
    } else {
      setEndTime(value);
    }
  };

  return (
    <div className="w-[100%] flex gap-4 col-span-2 sm:col-span-2 z-1">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="startTime"
          className="postJobInputTitle font-medium text-gray-700"
        >
          Office Start Time *
        </label>
        <input
          type="time"
          id="startTime"
          className="p-2 border-[1px] rounded-md shadow-sm focus:border-indigo-500 focus:outline-none border-solid border-gray-300"
          value={startTime}
          onChange={(e) => handleTimeChange("startTime", e.target.value)}
        />
      </div>

      {/* End Time */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="endTime"
          className="postJobInputTitle font-medium text-gray-700"
        >
          Office End Time *
        </label>
        <input
          type="time"
          id="endTime"
          className="p-2 border-[1px] rounded-md shadow-sm focus:border-indigo-500 focus:outline-none border-solid border-gray-300"
          value={endTime}
          onChange={(e) => handleTimeChange("endTime", e.target.value)}
        />
      </div>
    </div>
  );
};
