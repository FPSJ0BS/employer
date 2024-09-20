import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editEmployerEditJob } from "../../../Redux/EmployerEditJob";
import { isValidNumber } from "../../../functions/employerFunctions";

export const EditJobExperience = () => {
  const { employerEditJob } = useSelector(
    (state: any) => state.employerEditJob
  );

  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const dropdownOptions = [
    "West Bengal",
    "Maharashtra",
    "Madhya Pradesh",
    "Chattisgarh",
    "Rajasthan",
    "Maharashtra",
    "Madhya Pradesh",
    "Chattisgarh",
    "Rajasthan",
    "Maharashtra",
    "Madhya Pradesh",
    "Chattisgarh",
    "Rajasthan",
  ];

  const openDropdown = () => {
    setShowDropdown(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputValue(value);
    setShowDropdown(true);
  };

  const handleOptionSelect = (option: string) => {
    setInputValue(option);
    setShowDropdown(false);

    dispatch(
      editEmployerEditJob({
        experience_unit: option ?? "",
      })
    );
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const clearInput = () => {
    setInputValue("");
    setShowDropdown(true);
    dispatch(
      editEmployerEditJob({
        experience_unit: "",
      })
    );
  };

  const onChangeMinExp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    if (isValidNumber(value)) {
      // Check if value is a valid number
      if (value < 0) {
        dispatch(
          editEmployerEditJob({
            min_experience: 0,
            max_experience: 1, // Set max_experience to 1 more than min_experience
          })
        );
      } else {
        dispatch(
          editEmployerEditJob({
            min_experience: value,
            max_experience: value + 1, // Set max_experience to 1 more than min_experience
          })
        );
      }
    } else {
      dispatch(
        editEmployerEditJob({
          min_experience: 0,
          max_experience: 1,
        })
      );
    }
  };

  const onChangeMaxExp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    if (isValidNumber(value)) {
      // Check if value is a valid number
      dispatch(
        editEmployerEditJob({
          max_experience: value,
        })
      );
    } else {
      dispatch(
        editEmployerEditJob({
          max_experience: null,
        })
      );
    }

    if (value < 0) {
      // Check if value is less than 0
      dispatch(
        editEmployerEditJob({
          max_experience: 0,
        })
      );
    }
  };

  return (
    <div className="  relative  sm:w-[100%] w-[200px]  ">
      {employerEditJob.min_experience > employerEditJob.max_experience && (
        <div className="absolute -bottom-8 text-red-800 font-semibold ">
          *Max Experience cannot be less than Min Experience!
        </div>
      )}
      <label
        htmlFor="EditJobExperience"
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
            name="EditJobExperienceMin"
            value={
              employerEditJob.min_experience
                ? employerEditJob.min_experience
                : ""
            }
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
            name="EditJobExperienceMax"
            value={
              employerEditJob.max_experience
                ? employerEditJob.max_experience
                : ""
            }
            onChange={(e) => onChangeMaxExp(e)}
            className="mt-1 p-2 w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
      </div>
    </div>
  );
};
