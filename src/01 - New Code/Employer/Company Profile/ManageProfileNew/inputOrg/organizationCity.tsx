import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CityInterface } from "../../../Redux/EmployerSlice";
import { editEmployerManageProfileFields } from "../../../Redux/CompanyProfile";

export const OrganizationCity = () => {
  const {
    manageProfilePreFillDataCity,
    manageProfilePreFillDataState,
    employerManageProfileFields,
  } = useSelector((state: any) => state.employerManageProfile);

  const dispatch = useDispatch();
  const [isSelect, setIsSelect] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCities, setFilteredCities] = useState<CityInterface[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const openDropdown = () => {
    setShowDropdown(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowDropdown(true);
     setIsSelect(false);
  };

  const handleOptionSelect = (option: string) => {
    setInputValue(option);
    setShowDropdown(false);
      setIsSelect(true);
    dispatch(
      editEmployerManageProfileFields({
        city: option ?? "",
      })
    );
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
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
    dispatch(editEmployerManageProfileFields({ city: "" }));
  };

  useEffect(() => {
    if (employerManageProfileFields?.state) {
      const selectedState = manageProfilePreFillDataState.find(
        (state: any) =>
          state.name.toLowerCase() ===
          employerManageProfileFields.state.toLowerCase()
      );
      if (selectedState) {
        const filteredCities = manageProfilePreFillDataCity.filter(
          (city: any) => city.stateId === selectedState.id
        );
        setFilteredCities(filteredCities);
      }
    }
  }, [
    employerManageProfileFields?.state,
    manageProfilePreFillDataState,
    manageProfilePreFillDataCity,
  ]);

  useEffect(() => {
    if (employerManageProfileFields?.city) {
      setInputValue(employerManageProfileFields.city);
    } else {
      setInputValue("");
    }
  }, [employerManageProfileFields?.city]);
   useEffect(() => {
     employerManageProfileFields.city && setIsSelect(true);
   }, []);
  return (
    <div className=" relative  sm:w-[100%] w-[250px] col-span-2 sm:col-span-1">
      <label
        htmlFor="EmployerPostJobCity"
        className="postJobInputTitle pb-1 block  font-medium text-gray-700"
      >
        Organization City *
      </label>
      <div className="relative">
        <input
          placeholder="Choose City..."
          autoComplete="off"
          disabled={employerManageProfileFields.state.trim() === ""}
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
            disabled={employerManageProfileFields.state.trim() === ""}
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
        <ul className=" postjobHandleScrollbar max-h-[300px] overflow-y-auto absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {inputValue
            ? manageProfilePreFillDataCity
                .filter((option: CityInterface) =>
                  option.name.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((option: CityInterface, index: number) => (
                  <li
                    key={index}
                    className="cursor-pointer hover:bg-gray-100 py-1 px-3"
                    onClick={() => handleOptionSelect(option.name)}
                  >
                    {option.name}
                  </li>
                ))
            : manageProfilePreFillDataCity.map(
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
