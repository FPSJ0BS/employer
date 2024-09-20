import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editEmployerCandidateData } from "../../../../Redux/EmployerCandidate";

export const ScheduleInterviewType = () => {
  const dispatch = useDispatch();

  const { employerCandidateData } = useSelector(
    (state: any) => state.employerCandidate
  );

  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const allJobTypes = ["On Site Interview", "Zoom", "Call", "Google Meet"];

  const openDropdown = () => {
    setShowDropdown(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    setShowDropdown(true);
  };

  const handleOptionSelect = (option: string) => {
    setShowDropdown(false);

    dispatch(
      editEmployerCandidateData({
        interviewType: option ?? "",
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
      }
    };

    document.body.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clearInput = () => {
    setShowDropdown(true);
    dispatch(
      editEmployerCandidateData({
        interviewType: "",
      })
    );
  };

  return (
    <div className=" relative  sm:w-[70%] w-[250px] ">
      <label
        htmlFor="EmployerPostJobJobType"
        className="postJobInputTitle pb-1 block  font-medium text-gray-700"
      >
        Interview Type *
      </label>
      <div className="relative">
        <input
          required
          placeholder="Interview Type..."
          autoComplete="off"
          ref={inputRef}
          type="text"
          id="EmployercandidateinterviewType"
          name="EmployercandidateinterviewType"
          value={employerCandidateData?.interviewType}
          onChange={handleInputChange}
          onClick={openDropdown}
          className="mt-1 p-2 h-[40px] w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
        {employerCandidateData?.interviewType ? (
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
        <ul className="z-50 postjobHandleScrollbar max-h-[300px] overflow-y-auto absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {allJobTypes.map((option: string, index: number) => (
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
