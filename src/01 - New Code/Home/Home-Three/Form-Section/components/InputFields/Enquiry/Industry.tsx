import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CategoryInterface } from "../../../../../../Employer/Redux/EmployerSlice";

import { FormDataType } from "../../../FormSection";
import { getCategories } from "../../../../../../../api/apiAxios";
import { setAuthCategoryData } from "../../../../../../Employer/Redux/Authentication";

type OrganizationNameProps = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
};

export const Industry: React.FC<OrganizationNameProps> = ({
  formData,
  setFormData,
}) => {
  const { categoryData, authRegister } = useSelector(
    (state: any) => state.autheticationSlice
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();

        if (response?.data?.status) {
          const categoryList = response?.data?.data;

          dispatch(setAuthCategoryData(categoryList));

          //   setLoaderState(false);
        } else {
          //   setLoaderState(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // setLoaderState(false);
      }
    };

    fetchData();
  }, []);

  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openDropdown = () => {
    console.log("open");
    setShowDropdown(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    setInputValue(value);
    setShowDropdown(true);
  };

  const handleOptionSelect = async (option: string, id: number) => {
    setInputValue(option);
    setShowDropdown(false);
    
    setFormData({
      ...formData,
      industry: id,
    });
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
    setInputValue("");
    setShowDropdown(true);

    setFormData({
      ...formData,
      industry: null,
    });
  };

  return (
    <div className=" relative  w-[100%] ">
      {/* <label
        htmlFor="AuthRegisterationIndustry"
        className="postJobInputTitle pb-1 block  font-medium text-gray-700"
      >
        Industry *
      </label> */}
      <div className="relative">
        <input
          placeholder="Select Industry Type..."
          autoComplete="off"
          required
          ref={inputRef}
          type="text"
          id="AuthRegisterationIndustry"
          name="AuthRegisterationIndustry"
          value={inputValue}
          onChange={handleInputChange}
          onClick={openDropdown}
          className="mt-1 p-2  w-[100%] border-t-0 border-l-0 border-r-0 border-b-[3px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
        {inputValue ? (
          <button
            className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none z-0"
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
            className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none "
            aria-label="open input"
            type="button"
            onClick={() => openDropdown()}
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
            ? categoryData
                .filter((option: CategoryInterface) =>
                  option.category
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())
                )
                .map((option: CategoryInterface, index: number) => (
                  <li
                    key={index}
                    className="cursor-pointer hover:bg-gray-100 py-1 px-3"
                    onClick={() =>
                      handleOptionSelect(option.category, option.ID)
                    }
                  >
                    {option.category}
                  </li>
                ))
            : categoryData.map((option: CategoryInterface, index: number) => (
                <li
                  key={index}
                  className="cursor-pointer hover:bg-gray-100 py-1 px-3"
                  onClick={() => handleOptionSelect(option.category, option.ID)}
                >
                  {option.category}
                </li>
              ))}
        </ul>
      )}
    </div>
  );
};
