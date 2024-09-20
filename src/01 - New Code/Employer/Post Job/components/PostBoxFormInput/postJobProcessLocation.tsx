import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { postEmployerPostJob } from "../../../Redux/EmployerSlice";
import { TextInputValidEmployer } from "../../../functions/employerFunctions";

export const PostJobProcessLocation = () => {
  const { employerPostJob } = useSelector((state: any) => state.employerSliceNew);

  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    const inputValue = e.target.value;

    if (inputValue ?? false) {
      dispatch(
        postEmployerPostJob({
          process_location: inputValue,
        })
      );
    } else {
      dispatch(
        postEmployerPostJob({
          process_location: "",
        })
      );
    }
  };

  return (
    <div className=" sm:w-[100%] w-[250px] flex flex-col gap-2">
      <label
        htmlFor="EmployerPostJobProcessLocation"
        className=" postJobInputTitle font-medium text-gray-700"
      >
        Area
      </label>
      <input
      autoComplete="off"

        placeholder="Area..."
        onChange={(e) => handleChange(e)}
        type="text"
        id="EmployerPostJobProcessLocation"
        name="ProcessLocation"
        className=" p-2  sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        value={employerPostJob.process_location}
      />
    </div>
  );
};
