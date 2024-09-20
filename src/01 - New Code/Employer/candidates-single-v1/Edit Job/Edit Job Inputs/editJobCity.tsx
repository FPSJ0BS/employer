import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  editEmployerEditJob,
  CityInterface,
} from "../../../Redux/EmployerEditJob";

export const EditJobCity = () => {
  const { employerEditJob, PostJobPreFillDataCity } = useSelector(
    (state: any) => state.employerEditJob
  );

  const dispatch = useDispatch();
  const [isSelect, setIsSelect] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openDropdown = () => {
    setShowDropdown(true);
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setIsSelect(false);
      setInputValue(value);
      setShowDropdown(true);
      console.log("Input Value Changed:", value);
    },
    []
  );

  const handleOptionSelect = (option: CityInterface) => {
    setInputValue(option.name);
    setShowDropdown(false);
    setIsSelect(true);
    dispatch(editEmployerEditJob({ city: option.name }));
    console.log("Option Selected:", option.name);
  };

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
        if (!isSelect) setInputValue("");
      }
    },
    [isSelect]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  const clearInput = () => {
    setInputValue("");
    setShowDropdown(true);
    setIsSelect(false);
    dispatch(editEmployerEditJob({ city: "" }));
    console.log("Input Cleared");
  };

  useEffect(() => {
    if (employerEditJob.city) {
      setInputValue(employerEditJob.city);
      setIsSelect(true);
    }else{
      setInputValue("");
       
    }
    console.log("City from Redux:", employerEditJob.city);
  }, [employerEditJob.city]);

  const filteredCities = inputValue
    ? PostJobPreFillDataCity.filter((option: CityInterface) =>
        option.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    : PostJobPreFillDataCity;
  
  return (
    <div className="relative sm:w-[100%] w-[200px]">
      <label
        htmlFor="EditJobCity"
        className="postJobInputTitle pb-1 block font-medium text-gray-700"
      >
        City *
      </label>
      <div className="relative">
        <input
          autoComplete="off"
          disabled={employerEditJob.state === ""}
          required
          ref={inputRef}
          type="text"
          id="EditJobCity"
          name="EditJobCity"
          value={inputValue}
          onChange={handleInputChange}
          onClick={openDropdown}
          className="mt-1 p-2 w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
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
            onClick={openDropdown}
            aria-label="Show dropdown"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-down"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        )}
      </div>
      {showDropdown && (
        <ul className="postjobHandleScrollbar max-h-[300px] overflow-y-auto absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {filteredCities.length > 0 ? (
            filteredCities.map((option: CityInterface, index: number) => (
              <li
                key={index}
                className="cursor-pointer hover:bg-gray-100 py-1 px-3"
                onClick={() => handleOptionSelect(option)}
              >
                {option.name}
              </li>
            ))
          ) : (
            <li className="py-1 px-3">No cities found</li>
          )}
        </ul>
      )}
    </div>
  );
};
