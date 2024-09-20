import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextInputValidEmployer } from "../../../functions/employerFunctions";
import { editEmployerManageJobsFields } from "../../../Redux/EmployerManageJobs";

export const JobsSearch = () => {
 
    const { employerManageJobsFields } = useSelector(
        (state: any) => state.employerManageJobs
      );

  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    const inputValue = e.target.value;

    if (TextInputValidEmployer(inputValue)) {
      if (inputValue ?? false) {
        dispatch(
          editEmployerManageJobsFields({
            search: inputValue,
          })
        );
      } else {
        dispatch(
          editEmployerManageJobsFields({
            search: "",
          })
        );
      }
    }
  };

  return (
    <div className=" sm:w-[20%] w-[250px] flex flex-col gap-2 ">
      <label
        htmlFor="EmployerJobsSearchBox"
        className=" postJobInputTitle font-medium text-gray-700 "
      >
        Search
      </label>
      <input
      autoComplete="off"
      placeholder="Search..."
        onChange={(e) => handleChange(e)}
        type="text"
        id="EmployerJobsSearchBox"
        name="jobTitle"
        className=" p-2 h-[30px] sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        value={employerManageJobsFields?.search}
      />
    </div>
  );
};
