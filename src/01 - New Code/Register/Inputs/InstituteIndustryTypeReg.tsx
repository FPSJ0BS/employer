import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postAuthRegister } from "../../Employer/Redux/Authentication";
import { CategoryInterface } from "../../Employer/Redux/EmployerSlice";

export const InstituteInsdustryTypeInputReg = () => {
  const { categoryData, authRegister } = useSelector(
    (state: any) => state.autheticationSlice
  );

  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openDropdown = () => {
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

    dispatch(
      postAuthRegister({
        nt_id: id.toString(),
        categoryName: option,
      })
    );
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest(".postjobHandleScrollbar")
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
    dispatch(
      postAuthRegister({
        nt_id: "",
        categoryName: "",
      })
    );
  };

  return (
    <div className="relative sm:w-full w-64">
      <label
        htmlFor="AuthRegisterationIndustry"
        className="postJobInputTitle pb-1 block font-medium text-gray-700"
      >
        Industry *
      </label>
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
          onClick={clearInput}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
        {inputValue ? (
          <button
            className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none z-10"
            onClick={clearInput}
            aria-label="Clear input"
            type="button"
          >
            
          </button>
        ) : (
          <button
            className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
            aria-label="Open input"
            type="button"
            onClick={() => openDropdown()}
          >
            
          </button>
        )}
      </div>
      {showDropdown && (
        <ul className="postjobHandleScrollbar max-h-72 overflow-y-auto absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
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
                    className="cursor-pointer hover:bg-gray-100 py-1 px-3 leading-[1.2em]"
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
                  className="cursor-pointer hover:bg-gray-100 py-1 px-3 leading-[1.2em]"
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
