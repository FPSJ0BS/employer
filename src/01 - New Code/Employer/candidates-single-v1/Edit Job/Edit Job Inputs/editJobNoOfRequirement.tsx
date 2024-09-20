import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { editEmployerEditJob } from "../../../Redux/EmployerEditJob";
import { isValidNumber } from "../../../functions/employerFunctions";

export const EditJobNoOfRequirement = () => {
  const { employerEditJob } = useSelector(
    (state: any) => state.employerEditJob
  );

  const dispatch = useDispatch();
  const handleChange = (e: any) => {
    const value = parseInt(e.target.value);

    if (isValidNumber(value)) {
      // Check if value is a valid number
      dispatch(
        editEmployerEditJob({
          no_of_requirement: value,
        })
      );
    } else {
      dispatch(
        editEmployerEditJob({
          no_of_requirement: null,
        })
      );
    }
  };

  return (
    <div className=" sm:w-[100%] w-[200px] flex flex-col gap-2">
      <label
        htmlFor="EditJobNoOfRequirement"
        className=" postJobInputTitle font-medium text-gray-700"
      >
        No of Requirements *
      </label>
      <input
        autoComplete="off"
        required
        onChange={(e) => handleChange(e)}
        type="text"
        id="EditJobNoOfRequirement"
        name="noOfRequirement"
        className=" p-2  sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        value={
          employerEditJob?.no_of_requirement
            ? employerEditJob?.no_of_requirement
            : ""
        }
      />
    </div>
  );
};
