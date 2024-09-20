import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCityList } from "../../../../../../../api/apiAxios";
import {
  addPreferedCityToFilter,
  editEmployerCandidateData,
  removePreferedCityFromFilter,
  setPreferedAllCityData,
} from "../../../../../Redux/EmployerCandidate";
import { isValidNumber } from "../../../../../functions/employerFunctions";

export const FMAge = () => {
  const dispatch = useDispatch();
  const [citiesData, setCitiesData] = useState([]);

  const { preferedAllCityData, PreferedCityDataToFilter, employerCandidateData } = useSelector(
    (state) => state.employerCandidate
  );

  // useEffect(() => {
  //   console.log("citydata", PreferedCityDataToFilter, preferedAllCityData);
  // }, [PreferedCityDataToFilter]);



  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);


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

 
  const onChangeMinExp = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    
    if (isValidNumber(value)) {
      // Check if value is a valid number
      if (value < 0) {
        dispatch(
          editEmployerCandidateData({
            minimumAge: 0,
            maximumAge: 1, // Set maximumAge to 1 more than minimumAge
          })
        );
      } else {
        dispatch(
          editEmployerCandidateData({
            minimumAge: value,
            maximumAge: value + 1, // Set maximumAge to 1 more than minimumAge
          })
        );
      }
    } else {
      dispatch(
        editEmployerCandidateData({
          minimumAge: 0,
          maximumAge: 1,
        })
      );
    }
  }
  

  const onChangeMaxExp = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
  
    if (!isNaN(value)) { // Check if value is a valid number
      dispatch(
        editEmployerCandidateData({
          maximumAge: value,
        })
      );
    } else {
      dispatch(
        editEmployerCandidateData({
          maximumAge: null,
        })
      );
    }
  
    if (value < 0) { // Check if value is less than 0
      dispatch(
        editEmployerCandidateData({
          maximumAge: 0,
        })
      );
    }
  
  }
  

  return (
    <>
      <div className="h-[20%] border-b-2 border-l-0 border-r-0 border-t-0 border-solid border-gray-500 pb-0 mb-2 flex flex-col gap-2">
        <h2 className="text-[20px] font-semibold">Age</h2>
       
      </div>

      <div className="  relative  sm:w-[100%] w-[250px] sm:col-span-1 ">
      {employerCandidateData.minimumAge > employerCandidateData.maximumAge && <div className="absolute -bottom-8 text-red-800 font-semibold ">*Max Experience cannot be less than Min Experience!</div>}
      <label
        htmlFor="EmployerPostJobExperience"
        className="postJobInputTitle pb-1 block  font-medium text-gray-700"
      >
       Age Range 
      </label>
      <div className=" flex gap-2 w-[100%]">
        <div className=" w-[50%]">
          <input
          autoComplete="off"
            required
            type="text"
            placeholder="Minimum"
            name="EmployerPostJobExperience"
            value={employerCandidateData.minimumAge ? employerCandidateData.minimumAge : ''}
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
            value={employerCandidateData.maximumAge ? employerCandidateData.maximumAge :''}
            onChange={(e) => onChangeMaxExp(e)}
            className="mt-1 p-2 w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>

        
      </div>
      
    </div>
    </>
  );
};
