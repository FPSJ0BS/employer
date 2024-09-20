import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editEmployerEditJob } from "../../../Redux/EmployerEditJob";
import { isValidNumber } from "../../../functions/employerFunctions";

export const EditJobSalaryRange = () => {
  const { employerEditJob } = useSelector(
    (state: any) => state.employerEditJob
  );

  const dispatch = useDispatch();
   const [isSelect, setIsSelect] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const dropdownOptions = ["Hourly", "Weekly", "Monthly", "Annually"];

  const openDropdown = () => {
    setShowDropdown(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
     setIsSelect(false);
    setInputValue(value);
    setShowDropdown(true);
  };

  const handleOptionSelect = (option: string) => {
    setInputValue(option);
    setShowDropdown(false);
       setIsSelect(true);
    dispatch(
      editEmployerEditJob({
        salary_type: option ?? "",
      })
    );
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setShowDropdown(false);
       isSelect === false && setInputValue("");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSelect]);

  const clearInput = () => {
    setInputValue("");
    setShowDropdown(true);
     setIsSelect(false);
    dispatch(
      editEmployerEditJob({
        salary_type: "",
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
            min_salary: 0,
            max_salary: 1, // Set max_salary to 1 more than min_salary
          })
        );
      } else {
        dispatch(
          editEmployerEditJob({
            min_salary: value,
            max_salary: value + 1, // Set max_salary to 1 more than min_salary
          })
        );
      }
    } else {
      dispatch(
        editEmployerEditJob({
          min_salary: 0,
          max_salary: 1,
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
          max_salary: value,
        })
      );
    } else {
      dispatch(
        editEmployerEditJob({
          max_salary: null,
        })
      );
    }

    if (value < 0) {
      // Check if value is less than 0
      dispatch(
        editEmployerEditJob({
          max_salary: 0,
        })
      );
    }
  };

  return (
    <div className="  relative  sm:w-[100%] w-[200px] col-span-2 ">
      <label
        htmlFor="EditJobSalaryRange"
        className="postJobInputTitle pb-1 block  font-medium text-gray-700"
      >
        Salary Range *
      </label>
      <div className=" flex gap-2 w-[100%]">
        <div className=" w-[35%]">
          <input
            autoComplete="off"
            required
            type="text"
            placeholder="Minimum"
            name="EditJobSalaryRange"
            value={employerEditJob.min_salary ? employerEditJob.min_salary : ""}
            onChange={(e) => onChangeMinExp(e)}
            className="mt-1 p-2  w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>

        <div className="w-[35%]">
          <input
            autoComplete="off"
            required
            type="text"
            placeholder="Maximum"
            name="EmployerPostSalaryRangeMax"
            value={employerEditJob.max_salary ? employerEditJob.max_salary : ""}
            onChange={(e) => onChangeMaxExp(e)}
            className="mt-1 p-2 w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>

        <div className="relative w-[30%]">
          <input
            autoComplete="off"
            required
            placeholder="Unit"
            ref={inputRef}
            type="text"
            id="EmployerPostSalaryRangeUnit"
            name="EmployerPostSalaryRangeUnit"
            value={employerEditJob?.salary_type}
            onChange={handleInputChange}
            onClick={openDropdown}
            className="mt-1 p-2  w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />

          {inputValue ? (
            <button
              className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
              onClick={clearInput}
              aria-label="Clear input"
              type="button"
            >
              <svg
                className="w-4 h-4 text-gray-500 hover:text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          ) : (
            <button
              className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
              aria-label="Clear input"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-chevron-down"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          )}
        </div>
      </div>
      {showDropdown && (
        <div className=" flex w-full justify-end">
          <ul className="  w-[30%] postjobHandleScrollbar max-h-[300px] overflow-y-auto absolute z-10 mt-1  bg-white border border-gray-300 rounded-md shadow-lg">
            {inputValue
              ? dropdownOptions
                  .filter((option) =>
                    option.toLowerCase().includes(inputValue.toLowerCase())
                  )
                  .map((option, index) => (
                    <li
                      key={index}
                      className="cursor-pointer hover:bg-gray-100 py-1 px-3"
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option}
                    </li>
                  ))
              : dropdownOptions.map((option, index) => (
                  <li
                    key={index}
                    className="cursor-pointer hover:bg-gray-100 py-1 px-3"
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </li>
                ))}
          </ul>
        </div>
      )}
    </div>
  );
};
