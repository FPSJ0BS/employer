import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editEmployerCandidateData } from "../../../../Redux/EmployerCandidate";
import { postChangeCandidateStatus } from "../../../../../../api/apiAxios";

export const CandidateStatusForApi = ({
  candidaiteId,
  getCandidateList,
}) => {
  const dispatch = useDispatch();
  const [statusInput, setStatusInput] = useState("");



  const { employerCandidateData, allStatusData } = useSelector(
    (state: any) => state.employerCandidate
  );




  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

 

  const openDropdown = () => {
    setShowDropdown(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    setShowDropdown(true);
  };

  const handleOptionSelect = async (option: string) => {
    await setShowDropdown(false);
    await setStatusInput(option);

    await dispatch(
      editEmployerCandidateData({
        statusChangeApi: option ?? "",
      })
    );
    await handleStatusChange(option);
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
    setStatusInput("");
  };

  const handleStatusChange = async (optionn) => {
    // setLoaderSet(true);

    try {
    
      const res = await postChangeCandidateStatus({
        applyID: candidaiteId,
        new_status: optionn,
      });

      if (res?.data.status) {
        
        // setLoaderSet(false);
        getCandidateList();
        setStatusInput('')
      } else {
        console.log('profile res', res);
        // setLoaderSet(false);
        setStatusInput('')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" relative  sm:w-[100%] w-[250px] ">
      <div className="relative w-[100%]">
        <input
          placeholder="Change Status..."
          autoComplete="off"
          ref={inputRef}
          type="text"
          id="EmployercandidateStatus"
          name="EmployercandidateStatus"
          value={statusInput}
          onChange={handleInputChange}
          onClick={openDropdown}
          className="mt-1 p-2 border-blue-600 h-[35px] w-[100%] border-[1px] focus:border-[2px]  rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
        {statusInput ? (
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
        <ul className="z-[100] postjobHandleScrollbar h-[150px] overflow-y-auto absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {allStatusData.map((option, index) => (
            <li
              key={index}
              className="cursor-pointer hover:bg-gray-100 py-1 px-3 z-50"
              onClick={() => handleOptionSelect(option.label)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
