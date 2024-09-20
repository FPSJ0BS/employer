import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { postEmployerPostJob } from "../../../Redux/EmployerSlice";
import { TextInputValidEmployer } from "../../../functions/employerFunctions";

export const PostJobJobTitle = () => {
  const { employerPostJob } = useSelector((state: any) => state.employerSliceNew);


  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    const inputValue = e.target.value;

    if (TextInputValidEmployer(inputValue)) {
      if (inputValue ?? false) {
        dispatch(
          postEmployerPostJob({
            job_title: inputValue,
          })
        );
      } else {
        dispatch(
          postEmployerPostJob({
            job_title: "",
          })
        );
      }
    }
  };

  return (
    <div className=" sm:w-[100%] w-[250px] flex flex-col gap-2 ">
      <label
        htmlFor="EmployerPostJobJobTitle"
        className=" postJobInputTitle font-medium text-gray-700 "
      >
        Job Title *
      </label>
      <input
      autoComplete="off"
      placeholder="Enter Job Title..."
        required
        onChange={(e) => handleChange(e)}
        type="text"
        id="EmployerPostJobJobTitle"
        name="jobTitle"
        className=" p-2  sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        value={employerPostJob.job_title}
      />
    </div>
  );
};
