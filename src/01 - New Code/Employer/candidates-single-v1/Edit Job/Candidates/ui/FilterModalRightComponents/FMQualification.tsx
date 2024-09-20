import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addQualificationToFilter,
  removeQualificationFromFilter,
  setAllQualificationData,
} from "../../../../../Redux/EmployerCandidate";

export const FMQualification = () => {
  const dispatch = useDispatch();
  const [citiesData, setCitiesData] = useState([]);

  const { allQualificationData, allQualificationDataToFilter } = useSelector(
    (state:any) => state.employerCandidate
  );

  useEffect(() => {
    const mainCityArray = addCheckedField(allQualificationData);
    setCitiesData(mainCityArray);
    console.log('datatata', allQualificationDataToFilter);
  }, [allQualificationData, allQualificationDataToFilter]);

  const addCheckedField = (citiesArray:any) => {
    return citiesArray.map((city:any) => ({
      ...city,
      checked: allQualificationDataToFilter.includes(city.ID),
    }));
  };

  const handleCheckboxChange = (id:any) => {
    const updatedCitiesData:any = citiesData.map((city:any) =>
      city.ID === id ? { ...city, checked: !city.checked } : city
    );
    setCitiesData(updatedCitiesData);

    if (allQualificationDataToFilter.includes(id)) {
      dispatch(removeQualificationFromFilter(id));
    } else {
      dispatch(addQualificationToFilter(id));
    }
  };

  return (
    <>
      <div className="h-[20%] border-b-2 border-l-0 border-r-0 border-t-0 border-solid border-gray-500 pb-4 flex flex-col gap-2">
        <h2 className="text-[20px] font-semibold">Preferred Degree</h2>
      </div>

      <div className="postjobHandleScrollbar overflow-y-auto h-[75%] my-4 grid grid-cols-3 gap-y-3">
        {citiesData.map(({ ID, qualification, checked }) => (
          <div key={ID}>
            <label className="font-medium text-black">
              <input
                type="radio"
                checked={checked}
                onChange={() => handleCheckboxChange(ID)}
                className="mr-2"
                name="qual"
              />
              {qualification}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};
