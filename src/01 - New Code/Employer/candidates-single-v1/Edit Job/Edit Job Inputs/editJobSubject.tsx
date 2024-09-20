import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editEmployerEditJob } from "../../../Redux/EmployerEditJob";
import { SubCategoryInterface } from "../../../Redux/EmployerEditJob";

export const EditJobSubject = () => {
  const { subCategoryData, employerEditJob } = useSelector(
    (state: any) => state.employerEditJob
  );

  const dispatch = useDispatch();
   const [isSelect, setIsSelect] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getSubCat = async () => {
      if (subCategoryData && employerEditJob?.functionID) {
        const category = await subCategoryData?.find(
          (cat) => cat.ID === employerEditJob?.functionID
        );

        console.log(
          "subcatname",
          category,
          employerEditJob?.functionID,
          subCategoryData
        );
        const categoryName = await category?.function;
        await setInputValue(categoryName);
         if (categoryName) {
           setIsSelect(true);
         }
      }
    };

    getSubCat();
  }, [subCategoryData]);

  const openDropdown = () => {
    setShowDropdown(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
      setIsSelect(false);
    setInputValue(value);
    setShowDropdown(true);
  };

  const handleOptionSelect = (option: string, id: number) => {
    setInputValue(option);
    setShowDropdown(false);
      setIsSelect(true);
    dispatch(
      editEmployerEditJob({
        functionID: id,
      })
    );
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
        functionID: null,
      })
    );
  };

  useEffect(() => {
    if (employerEditJob.catID === null) {
      setInputValue("");
    }
  }, [employerEditJob.catID]);

  return (
    <div className=" relative  sm:w-[100%] w-[200px] ">
      <label
        htmlFor="EditJobSubject"
        className="postJobInputTitle pb-1 block  font-medium text-gray-700"
      >
        Subject *
      </label>
      <div className="relative">
        <input
          disabled={employerEditJob.catID === null}
          autoComplete="off"
          required
          ref={inputRef}
          type="text"
          id="EditJobSubject"
          name="EditJobSubject"
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
            ? subCategoryData
                .filter((option: SubCategoryInterface) =>
                  option.function
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())
                )
                .map((option: SubCategoryInterface, index: number) => (
                  <li
                    key={index}
                    className="cursor-pointer hover:bg-gray-100 py-1 px-3"
                    onClick={() =>
                      handleOptionSelect(option.function, option.ID)
                    }
                  >
                    {option.function}
                  </li>
                ))
            : subCategoryData.map(
                (option: SubCategoryInterface, index: number) => (
                  <li
                    key={index}
                    className="cursor-pointer hover:bg-gray-100 py-1 px-3"
                    onClick={() =>
                      handleOptionSelect(option.function, option.ID)
                    }
                  >
                    {option.function}
                  </li>
                )
              )}
        </ul>
      )}
    </div>
  );
};
