import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  editEmployerEditJob,
  setCategoryData,
} from "../../../Redux/EmployerEditJob";
import { CategoryInterface } from "../../../Redux/EmployerEditJob";
import { setSubCategoryData } from "../../../Redux/EmployerEditJob";
import { getCategories, getSubCategories } from "../../../../../api/apiAxios";

export const EditJobCategory = ({ isClear }: { isClear?: boolean }) => {
  const [inputValue, setInputValue] = useState("");
  const [isSelect, setIsSelect] = useState(false);
  const { categoryData, employerEditJob } = useSelector(
    (state: any) => state.employerEditJob
  );

  useEffect(() => {
    const getCat = async () => {
      const category = await categoryData?.find(
        (cat) => cat.ID === employerEditJob?.catID
      );
      const categoryName = await category?.category;
      await setInputValue(categoryName);
      if (categoryName) {
        setIsSelect(true);
      }
    };

    getCat();
  }, []);

  const dispatch = useDispatch();

  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openDropdown = () => {
    setShowDropdown(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsSelect(false);
    setInputValue(value);
    setShowDropdown(true);
  };

  const handleOptionSelect = async (option: string, id: number) => {
    setInputValue(option);
    setShowDropdown(false);
    setIsSelect(true);
    const subCatData = await fetchingSubcategories(id);

    if (subCatData ?? false) {
      dispatch(setSubCategoryData(subCatData));
    }

    dispatch(
      editEmployerEditJob({
        catID: id,
      })
    );
  };

  const fetchingSubcategories = async (id: number) => {
    try {
      const response = await getSubCategories(id);
      console.log("fetch", response);
      if (response?.data.status) {
        return response?.data.data;
      }
    } catch (error) {
      console.log(error);
    }
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
        catID: null,
        functionID: null,
      })
    );
  };
  useEffect(() => {
    const fecthData = async () => {
      const res = await getCategories();
      if (res?.data?.status) {
        dispatch(setCategoryData(res?.data?.data));
      }
    };
    fecthData();
  }, []);

  useEffect(() => {
    if (isClear) {
      setInputValue("");
    }
  }, [isClear]);
  return (
    <div className=" relative  sm:w-[100%] w-[200px] ">
      <label
        htmlFor="EditJobCategory"
        className="postJobInputTitle pb-1 block  font-medium text-gray-700"
      >
        Category *
      </label>
      <div className="relative">
        <input
          autoComplete="off"
          required
          ref={inputRef}
          type="text"
          id="EditJobCategory"
          name="EditJobCategory"
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
