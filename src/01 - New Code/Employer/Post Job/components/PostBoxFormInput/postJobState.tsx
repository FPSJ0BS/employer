import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  postEmployerPostJob,
  setCitiesData,
  StateInterface,
} from "../../../Redux/EmployerSlice";
import { getCityListAxios } from "../../../../../api/apiAxios";
import { RootState } from "../../../Redux/store"; // Adjust the import according to your store configuration

export const PostJobState: React.FC = ({setProcessLoc}) => {
  const { PostJobPreFillDataState } = useSelector(
    (state: RootState) => state.employerSliceNew
  );
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isSelect, setIsSelect] = useState(false);
  const [displayedOptions, setDisplayedOptions] = useState<StateInterface[]>(
    []
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const lazyLoadCount = 50;

  const openDropdown = useCallback(() => {
    setDisplayedOptions(PostJobPreFillDataState.slice(0, lazyLoadCount));
    setShowDropdown(true);
  }, [PostJobPreFillDataState]);

  const handleInputChange = useCallback(
    debounce((value: string) => {
      setInputValue(value);
      const filteredOptions = PostJobPreFillDataState.filter(
        (option: StateInterface) =>
          option.name.toLowerCase().includes(value.toLowerCase())
      );
      setDisplayedOptions(filteredOptions.slice(0, lazyLoadCount));
      setShowDropdown(true);
      setIsSelect(false);
    }, 100),
    [PostJobPreFillDataState]
  );

  const handleOptionSelect = async (option: string, id: number) => {
    setInputValue(option);
    setShowDropdown(false);
    setIsSelect(true);
    const cityData = await fetchCity(id);
    if (cityData?.data?.data) {
      dispatch(setCitiesData(cityData.data.data));
    }

    dispatch(
      postEmployerPostJob({
        state: option,
      })
    );
  };

  const fetchCity = async (id: number) => {
    try {
      const res = await getCityListAxios(id);
      if (res) {
        return res;
      }
    } catch (error) {
      console.error(error);
    }
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
    dispatch(
      postEmployerPostJob({
        state: "",
        city: "",
        process_location: "",
      })
    );
    setProcessLoc(false)
  };

  const handleScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setDisplayedOptions((prevOptions) => [
          ...prevOptions,
          ...PostJobPreFillDataState.slice(
            prevOptions.length,
            prevOptions.length + lazyLoadCount
          ),
        ]);
      }
    }
  };
  console.log(isSelect);
  return (
    <div className="relative sm:w-[100%] w-[250px]">
      <label
        htmlFor="EmployerPostJobState"
        className="postJobInputTitle pb-1 block font-medium text-gray-700"
      >
        State *
      </label>
      <div className="relative">
        <input
          placeholder="Choose State..."
          autoComplete="off"
          required
          ref={inputRef}
          type="text"
          id="EmployerPostJobState"
          name="EmployerPostJobState"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onClick={openDropdown}
          className="mt-1 p-2 w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
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
            aria-label="Open dropdown"
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
        <ul
          className="postjobHandleScrollbar max-h-[300px] overflow-y-auto absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg"
          ref={listRef}
          onScroll={handleScroll}
        >
          {displayedOptions.map((option: StateInterface, index: number) => (
            <li
              key={index}
              className="cursor-pointer hover:bg-gray-100 py-1 px-3"
              onClick={() => handleOptionSelect(option.name, option.id)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Utility function for debouncing
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>): void => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
