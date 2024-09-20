import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { editEmployerCandidateData } from "../../../../Redux/EmployerCandidate";
import { Input } from "@chakra-ui/react";

export const ScheduleInterviewDateTime = () => {
  const { employerCandidateData } = useSelector(
    (state: any) => state.employerCandidate
  );

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    console.log(inputValue);

    if (inputValue ?? false) {
      const dateObj = new Date(inputValue);
      const date = dateObj.toISOString().split("T")[0];
      const time = dateObj.toTimeString().split(" ")[0].substring(0, 5);

      dispatch(
        editEmployerCandidateData({
          date: date,
          time: time,
        })
      );
    } else {
      dispatch(
        editEmployerCandidateData({
          date: "",
          time: "",
        })
      );
    }
  };

  return (
    <div className="z-40 sm:w-[70%] w-[250px] flex flex-col gap-2">
      <label
        htmlFor="selectDate&Time"
        className=" postJobInputTitle font-medium text-gray-700"
      >
        Select Date and Time *
      </label>
      <Input
        required
        id="selectDate&Time"
        onChange={(e) => handleChange(e)}
        className=" p-2 h-[40px] sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        placeholder="Select Date and Time"
        size="md"
        type="datetime-local"
      />
    </div>
  );
};
