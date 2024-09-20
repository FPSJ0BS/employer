import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { postEmployerPostJob } from "../../../Redux/EmployerSlice";
import { isValidNumber, TextInputValidEmployer } from "../../../functions/employerFunctions";

export const PostJobNoOfRequirement = () => {
 const { employerPostJob } = useSelector(
   (state: any) => state.employerSliceNew
 );

  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    const value = parseInt(e.target.value);
  
    if (isValidNumber(value)) {
      // Check if value is a valid number
      dispatch(
        postEmployerPostJob({
          no_of_requirement: value,
        })
      );
    } else {
      dispatch(
        postEmployerPostJob({
          no_of_requirement: null,
        })
      );
    }
    
  };

  return (
    <div className=" sm:w-[100%] w-[250px] flex flex-col gap-2">
      <label
        htmlFor="EmployerPostJobNoOfRequirement"
        className=" postJobInputTitle font-medium text-gray-700"
      >
        No of Requirements *
      </label>
      <input
        placeholder="No of Requirements..."
        autoComplete="off"
        required
        onChange={(e) => handleChange(e)}
        type="text"
        id="EmployerPostJobNoOfRequirement"
        name="noOfRequirement"
        className=" p-2  sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        value={
          employerPostJob?.no_of_requirement
            ? employerPostJob?.no_of_requirement
            : ""
        }
      />
    </div>
  );
};
