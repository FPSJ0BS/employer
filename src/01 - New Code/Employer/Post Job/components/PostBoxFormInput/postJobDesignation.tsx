import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { postEmployerPostJob } from "../../../Redux/EmployerSlice";
import { TextInputValidEmployer } from "../../../functions/employerFunctions";

export const PostJobDesignation = () => {
  const { adminEditJob } = useSelector((state: any) => state.adminSlice);

  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    const inputValue = e.target.value;

    if (TextInputValidEmployer(inputValue)) {
      if (inputValue ?? false) {
        dispatch(
          postEmployerPostJob({
            job_designation: inputValue,
          })
        );
      } else {
        dispatch(
          postEmployerPostJob({
            job_designation: "",
          })
        );
      }
    }
  };

  return (
    <div className=" sm:w-[100%] w-[250px] flex flex-col gap-2">
      <label
        htmlFor="EmployerPostJobDesignation"
        className=" postJobInputTitle font-medium text-gray-700"
      >
        Designation
      </label>
      <input
      autoComplete="off"
      placeholder="Senior Faculty, HOD..."
        onChange={(e) => handleChange(e)}
        type="text"
        id="EmployerPostJobDesignation"
        name="Designation"
        className=" p-2  sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        value={adminEditJob.job_designation}
      />
    </div>
  );
};
