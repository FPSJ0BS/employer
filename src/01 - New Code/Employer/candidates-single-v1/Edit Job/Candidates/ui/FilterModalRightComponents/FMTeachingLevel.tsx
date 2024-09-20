import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCityList, getTeachingLevel } from "../../../../../../../api/apiAxios";
import { addTeachingToFilter, removeTeachingFromFilter, setAllCityData, setAllTeachingData } from "../../../../../Redux/EmployerCandidate";

export const FMTeachingLevel = () => {
  const dispatch = useDispatch();
  const [citiesData, setCitiesData] = useState([]);

  const { allTeachingData, allTeachingDataToFilter } = useSelector((state) => state.employerCandidate);

  useEffect(() => {
    console.log("citydata", allTeachingDataToFilter, allTeachingData);
  }, [allTeachingDataToFilter]);

  useEffect(() => {
    const mainCityArray = addCheckedField(allTeachingData);
    setCitiesData(mainCityArray);
  }, [allTeachingData, allTeachingDataToFilter]);

  const addCheckedField = (citiesArray) => {
    return citiesArray.map((city) => ({
      ...city,
      checked: allTeachingDataToFilter.includes(city.level),
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
      dispatch(removeTeachingFromFilter(name));
    } else {
      dispatch(addTeachingToFilter(name));
    }
  };

  

  return (
    <>
      <div className="h-[20%] border-b-2 border-l-0 border-r-0 border-t-0 border-solid border-gray-500 pb-4 flex flex-col gap-2">
        <h2 className="text-[20px] font-semibold">Current Location</h2>
        
        

      </div>

      <div className="postjobHandleScrollbar overflow-y-auto h-[75%] my-4 grid grid-cols-3 gap-y-3">
        {citiesData.map(({ id, level, checked }) => (
          <div key={id}>
            <label className="font-medium text-black">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => handleCheckboxChange(id, level)}
                className="mr-2"
              />
              {level}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};
