import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCityList } from "../../../../../../../api/apiAxios";
import { addCityToFilter, removeCityFromFilter, setAllCityData } from "../../../../../Redux/EmployerCandidate";

export const FMCurrentLocation = () => {
  const dispatch = useDispatch();
  const [citiesData, setCitiesData] = useState([]);

  const { allCityData, cityDataToFilter } = useSelector((state) => state.employerCandidate);

  // useEffect(() => {
  //   console.log("citydata", cityDataToFilter, allCityData);
  // }, [cityDataToFilter]);

  useEffect(() => {
    const mainCityArray = addCheckedField(allCityData);
    setCitiesData(mainCityArray);
  }, [allCityData, cityDataToFilter]);

  const addCheckedField = (citiesArray) => {
    return citiesArray.map((city) => ({
      ...city,
      checked: cityDataToFilter.includes(city.name),
    }));
  };

  const handleCheckboxChange = (id, name) => {
    setCitiesData((prevCitiesData) =>
      prevCitiesData.map((city) =>
        city.id === id ? { ...city, checked: !city.checked } : city
      )
    );

    const selectedCity = citiesData.find((city) => city.id === id);
    if (selectedCity?.checked) {
      dispatch(removeCityFromFilter(name));
    } else {
      dispatch(addCityToFilter(name));
    }
  };

  const onSearchChange = async (e) => {
    const value = e.target.value;

    try {
      const res = await getAllCityList(value);

      if (res?.data?.status) {
        const allCityArray = await res?.data?.data;
        await dispatch(setAllCityData(allCityArray));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-[20%] border-b-2 border-l-0 border-r-0 border-t-0 border-solid border-gray-500 pb-4 flex flex-col gap-2">
        <h2 className="text-[20px] font-semibold">Current Location</h2>
        
        <div className="sm:w-[100%] w-[250px] flex flex-col gap-2">
          <input
            onChange={(e) => onSearchChange(e)}
            autoComplete="off"
            placeholder="Search Current Location..."
            required
            type="text"
            id="EmployerPostJobJobTitle"
            name="jobTitle"
            className="p-2 sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>

      </div>

      <div className="postjobHandleScrollbar overflow-y-auto h-[75%] my-4 grid grid-cols-3 gap-y-3">
        {citiesData.map(({ id, name, checked }) => (
          <div key={id}>
            <label className="font-medium text-black">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => handleCheckboxChange(id, name)}
                className="mr-2"
              />
              {name}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};
