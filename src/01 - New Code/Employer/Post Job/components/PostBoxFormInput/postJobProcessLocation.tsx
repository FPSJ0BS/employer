import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postEmployerPostJob } from "../../../Redux/EmployerSlice";
import { getArea } from "../../../../../api/apiAxios";

export const PostJobProcessLocation = ({setProcessLoc}) => {
  const { employerPostJob, selectionProcessData } = useSelector(
    (state: any) => state.employerSliceNew
  );

  const [areaData, setAreaData] = useState([]);

  const dispatch = useDispatch();



  useEffect(() => {
    const fetchAreaData = async () => {
      try {
        const res = await getArea(employerPostJob?.city);
  
        if (res?.status) {
          const data = res?.data?.data;
          const mainData = [...data, { area: "Other" }];
    
          setAreaData(mainData);
         
        } else {
          console.error("Failed to fetch area data:", res);
        }
      } catch (error) {
        console.error("Error fetching area data:", error);
      }
    };
  
    // Only call the function if a valid city is selected
    if (employerPostJob?.city) {
      fetchAreaData();
    }
  }, [employerPostJob?.city]);
  

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
    // dispatch(
    //   postEmployerPostJob({
    //     process_location: value,
    //   })
    // );
  };

  const handleOptionSelect = (option: string) => {
    setInputValue(option);
    setShowDropdown(false);
    setIsSelect(true);

    if(option === "Other"){

      setProcessLoc(true);

    } else{

      dispatch(
        postEmployerPostJob({
          process_location: option,
        })
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        !e.target.closest(".postjobHandleScrollbar")
      ) {
        setShowDropdown(false);
        isSelect === false ;
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
    setProcessLoc(false);

    dispatch(
      postEmployerPostJob({
        process_location: "",
      })
    );
  };

  useEffect(() => {
    setInputValue("");
  }, [employerPostJob.state , employerPostJob.city]);

  return (
    <div className=" relative  sm:w-[100%] w-[250px] ">
      <label
        htmlFor="EmployerPostJobSelectionArea"
        className="postJobInputTitle pb-1 block  font-medium text-gray-700"
      >
        Area *
        {employerPostJob.city.trim() === "" ? (
          <span className=" text-[14px] font-medium"> (Select City First)</span>
        ) : null}
      </label>
      <div className="relative">
        <input
          disabled={employerPostJob.city.trim() === ""}
          autoComplete="off"
          required
          placeholder={`${areaData.length > 0 ? "Choose Area..." : "Type your Area..."}  `}
          ref={inputRef}
          type="text"
          id="EmployerPostJobSelectionArea"
          name="EmployerPostJobSelectionArea"
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
            disabled={employerPostJob.city.trim() === ""}
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
  <ul className="postjobHandleScrollbar max-h-[300px] overflow-y-auto absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
    {inputValue
      ? areaData
          ?.filter(({ area }: { area: string }) =>
            area?.toLowerCase().includes(inputValue.toLowerCase())
          )
          .map(({ area }: { area: string }, index: number) => (
            <li
              key={index}
              className="cursor-pointer hover:bg-gray-100 py-1 px-3"
              onClick={() => handleOptionSelect(area)}
            >
              {area}
            </li>
          ))
      : areaData?.map(({ area }: { area: string }, index: number) => (
          <li
            key={index}
            className="cursor-pointer hover:bg-gray-100 py-1 px-3"
            onClick={() => handleOptionSelect(area)}
          >
            {area}
          </li>
        ))}
  </ul>
)}

    </div>
  );
};
