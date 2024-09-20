import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { editEmployerEditJob } from "../../../Redux/EmployerEditJob";
import { TextInputValidEmployer } from "../../../functions/employerFunctions";

export const EditJobRemarks = () => {
  const { employerEditJob } = useSelector(
    (state: any) => state.employerEditJob
  );

  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    const inputValue = e.target.value;

    
      if (inputValue ?? false) {
        dispatch(
          editEmployerEditJob({
            remarks: inputValue,
          })
        );
      } else {
        dispatch(
          editEmployerEditJob({
            remarks: "",
          })
        );
      }
    
  };

  return (
    <div className=" sm:w-[100%] w-[200px] flex flex-col gap-2">
      <label
        htmlFor="EditJobRemarks"
        className=" postJobInputTitle font-medium text-gray-700"
      >
        Remarks
      </label>
      <input
      autoComplete="off"
        onChange={(e) => handleChange(e)}
        type="text"
        id="EditJobRemarks"
        name="jobTitle"
        className=" p-2  sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        value={employerEditJob.remarks}
      />
    </div>
  );
};
