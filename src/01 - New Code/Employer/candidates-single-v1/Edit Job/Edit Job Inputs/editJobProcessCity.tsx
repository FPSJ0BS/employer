import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editEmployerEditJob } from "../../../Redux/EmployerEditJob";
import { CityInterface } from "../../../Redux/EmployerEditJob";

export const EditJobProcessCity = () => {
  const { employerEditJob, PostJobPreFillDataProcessCity } = useSelector(
    (state: any) => state.employerEditJob
  );
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSelect, setIsSelect] = useState(false);

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
    setIsSelect(true);
    setInputValue(option);
    setShowDropdown(false);

    dispatch(
      editEmployerEditJob({
        process_city: option ?? "",
      })
    );
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setShowDropdown(false);
      if (!isSelect) setInputValue("");
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
        process_city: "",
      })
    );
  };

  useEffect(() => {
    if (employerEditJob.process_city) {
      setInputValue(employerEditJob.process_city);
      setIsSelect(true);
    } else {
      setInputValue("");
    }
  }, [employerEditJob.process_city]);

  return (
    <div className="relative sm:w-[100%] w-[200px]">
      <label
        htmlFor="EditJobProcessCity"
        className="postJobInputTitle pb-1 block font-medium text-gray-700"
      >
        Process City
      </label>
      <div className="relative">
        <input
          autoComplete="off"
          disabled={employerEditJob.process_state.trim() === ""}
          ref={inputRef}
          type="text"
          id="EditJobProcessCity"
          name="EditJobProcessCity"
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
          {inputValue
            ? PostJobPreFillDataProcessCity.filter((option: CityInterface) =>
                option.name.toLowerCase().includes(inputValue.toLowerCase())
              ).map((option: CityInterface, index: number) => (
                <li
                  key={index}
                  className="cursor-pointer hover:bg-gray-100 py-1 px-3"
                  onClick={() => handleOptionSelect(option.name)}
                >
                  {option.name}
                </li>
              ))
            : PostJobPreFillDataProcessCity.map(
                (option: CityInterface, index: number) => (
                  <li
                    key={index}
                    className="cursor-pointer hover:bg-gray-100 py-1 px-3"
                    onClick={() => handleOptionSelect(option.name)}
                  >
                    {option.name}
                  </li>
                )
              )}
        </ul>
      )}
    </div>
  );
};
