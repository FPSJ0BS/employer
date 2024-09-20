import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { editEmployerEditJob } from "../../../Redux/EmployerEditJob";
import { TextInputValidEmployer } from "../../../functions/employerFunctions";

export const EditJobDesignation = () => {
  const { employerEditJob } = useSelector((state: any) => state.employerEditJob);

  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    const inputValue = e.target.value;

    if (TextInputValidEmployer(inputValue)) {
      if (inputValue ?? false) {
        dispatch(
          editEmployerEditJob({
            job_designation: inputValue,
          })
        );
      } else {
        dispatch(
          editEmployerEditJob({
            job_designation: "",
          })
        );
      }
    }
  };

  return (
    <div className=" sm:w-[100%] w-[200px] flex flex-col gap-2">
      <label
        htmlFor="EditJobDesignation"
        className=" postJobInputTitle font-medium text-gray-700"
      >
        Designation
      </label>
      <input
      autoComplete="off"
        onChange={(e) => handleChange(e)}
        type="text"
        id="EditJobDesignation"
        name="Designation"
        className=" p-2  sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        value={employerEditJob.job_designation}
      />
    </div>
  );
};
