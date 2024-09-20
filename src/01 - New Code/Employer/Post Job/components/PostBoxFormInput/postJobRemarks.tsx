import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { postEmployerPostJob } from "../../../Redux/EmployerSlice";
import { TextInputValidEmployer } from "../../../functions/employerFunctions";

export const PostJobRemarks = () => {
  const { employerPostJob } = useSelector((state: any) => state.employerSliceNew);


  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    const inputValue = e.target.value;

    
      if (inputValue ?? false) {
        dispatch(
          postEmployerPostJob({
            remarks: inputValue,
          })
        );
      } else {
        dispatch(
          postEmployerPostJob({
            remarks: "",
          })
        );
      }
    
  };

  return (
    <div className=" sm:w-[100%] w-[200px] flex flex-col gap-2">
      <label
        htmlFor="EmployerPostJobRemarks"
        className=" postJobInputTitle font-medium text-gray-700"
      >
        Remarks
      </label>
      <input
      autoComplete="off"
        onChange={(e) => handleChange(e)}
        type="text"
        id="EmployerPostJobRemarks"
        name="jobTitle"
        className=" p-2  sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        value={employerPostJob.remarks}
      />
    </div>
  );
};
