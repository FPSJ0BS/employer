import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CityInterface } from "../../../Redux/EmployerSlice";
import { editEmployerCandidateData } from "../../../../../Redux/EmployerCandidate";

export const FMNoticePeriod = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [isSelect, setIsSelect] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownOptions = [
    "15 Days or less",
    "1 Months",
    "2 Months",
    "3 Months",
    "More then 3 Months",
  ];

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
      editEmployerCandidateData({
        noticePeriod: option ?? "",
      })
    );
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Check if the clicked element is outside the input box and not within the dropdown
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        !e.target.closest(".postjobHandleScrollbar")
      ) {
        setShowDropdown(false);
        isSelect === false && setInputValue("");
      }
    };

    document.body.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSelect]);

  const clearInput = () => {
    setInputValue("");
    setShowDropdown(true);
    setIsSelect(false);
    dispatch(
      editEmployerCandidateData({
        noticePeriod: "",
      })
    );
  };

  return (
    <div className=" relative  sm:w-[100%] w-[250px]">
      <label
        htmlFor="EmployerPostJobCity"
        className="postJobInputTitle pb-1 block  font-medium text-gray-700"
      >
        Notice Period *
      </label>
      <div className="relative">
        <input
          placeholder="Choose notice Period..."
          autoComplete="off"
          required
          ref={inputRef}
          type="text"
          id="EmployerPostJobCity"
          name="EmployerPostJobCity"
          value={inputValue}
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
            onClick={openDropdown}
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
      {showDropdown && (
        <ul className=" postjobHandleScrollbar max-h-[300px] overflow-y-auto absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {inputValue
            ? dropdownOptions
                .filter((option: CityInterface) =>
                  option.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((option: CityInterface, index: number) => (
                  <li
                    key={index}
                    className="cursor-pointer hover:bg-gray-100 py-1 px-3"
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </li>
                ))
            : dropdownOptions.map((option: CityInterface, index: number) => (
                <li
                  key={index}
                  className="cursor-pointer hover:bg-gray-100 py-1 px-3"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </li>
              ))}
        </ul>
      )}
    </div>
  );
};
