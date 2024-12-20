import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { postEmployerPostJob } from "../../../Redux/EmployerSlice";
import { TextInputValidEmployer } from "../../../functions/employerFunctions";

export const PostJobProcessLocationOther = () => {
  const { adminEditJob } = useSelector((state: any) => state.adminSlice);

  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    const inputValue = e.target.value;

    if (TextInputValidEmployer(inputValue)) {
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
    }
  };

  return (
    <div className=" sm:w-[100%] w-[250px] flex flex-col gap-2">
      <label
        htmlFor="EmployerPostJobProcessLocationOther"
        className=" postJobInputTitle font-medium text-gray-700"
      >
        Type Your Area *
      </label>
      <input
      autoComplete="off"
      placeholder="Type Your Area..."
        onChange={(e) => handleChange(e)}
        type="text"
        id="EmployerPostJobProcessLocationOther"
        name="Designation"
        className=" p-2  sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        value={adminEditJob.process_location}
      />
    </div>
  );
};
