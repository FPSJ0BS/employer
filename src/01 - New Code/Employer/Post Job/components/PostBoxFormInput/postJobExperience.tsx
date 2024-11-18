import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postEmployerPostJob } from "../../../Redux/EmployerSlice";
import { isValidNumber } from "../../../functions/employerFunctions";

export const PostJobExperience = () => {
  const { employerPostJob } = useSelector(
    (state: any) => state.employerSliceNew
  );

  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");


  const onChangeMinExp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : 0;  // Ensure 0 is captured
  
    if (!isNaN(value)) {  // Check if value is a valid number
      if (value < 0) {
        // Update state and dispatch
        setInputValue(0);  // Update the input field with 0
        dispatch(
          postEmployerPostJob({
            min_experience: 0,
            max_experience: 1,
          })
        );
      } else {
        // Update state and dispatch
        setInputValue(value);  // Update the input field with the current value
        dispatch(
          postEmployerPostJob({
            min_experience: value,
            max_experience: value + 1,
          })
        );
      }
    } else {
      // Handle invalid input by resetting to 0
      setInputValue(0);  // Reset the input field to 0
      dispatch(
        postEmployerPostJob({
          min_experience: 0,
          max_experience: 1,
        })
      );
    }
  };
  
  
  

  const onChangeMaxExp = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
  
    if (isValidNumber(value)) {
      // Check if value is a valid number
      dispatch(
        postEmployerPostJob({
          max_experience: value,
        })
      );
    } else {
      dispatch(
        postEmployerPostJob({
          max_experience: null,
        })
      );
    }
  
    if (value < 0) { // Check if value is less than 0
      dispatch(
        postEmployerPostJob({
          max_experience: 0,
        })
      );
    }
  
  }
  
  

  return (
    <div className="  relative  sm:w-[100%] w-[250px] sm:col-span-1 ">
      {employerPostJob.min_experience > employerPostJob.max_experience && <div className="absolute -bottom-8 text-red-800 font-semibold ">*Max Experience cannot be less than Min Experience!</div>}
      <label
        htmlFor="EmployerPostJobExperience"
        className="postJobInputTitle pb-1 block  font-medium text-gray-700"
      >
        Job Experience *
      </label>
      <div className=" flex gap-2 w-[100%]">
        <div className=" w-[50%]">
          <input
          autoComplete="off"
            required
            type="text"
            placeholder="Minimum"
            name="EmployerPostJobExperience"
            value={inputValue}
            onChange={(e) => onChangeMinExp(e)}
            className="mt-1 p-2  w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>

        <div className="w-[50%]">
          <input
          autoComplete="off"
            required
            type="text"
            placeholder="Maximum"
            name="EmployerPostJobExperience"
            value={employerPostJob.max_experience ? employerPostJob.max_experience :""}
            onChange={(e) => onChangeMaxExp(e)}
            className="mt-1 p-2 w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>

        
      </div>
      
    </div>
  );
};
