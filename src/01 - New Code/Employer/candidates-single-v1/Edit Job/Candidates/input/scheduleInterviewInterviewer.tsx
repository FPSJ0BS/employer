import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { editEmployerCandidateData } from "../../../../Redux/EmployerCandidate";

export const ScheduleInterviewInterviewer = () => {
  const { employerCandidateData } = useSelector(
    (state: any) => state.employerCandidate
  );

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    console.log(inputValue);

    if (inputValue ?? false) {
      dispatch(
        editEmployerCandidateData({
          interviewer: inputValue,
        })
      );
    } else {
      dispatch(
        editEmployerCandidateData({
          interviewer: "",
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
        Interviewer Name *
      </label>
      <input
        required
        id="selectDate&Time"
        onChange={(e) => handleChange(e)}
        className=" p-2 h-[40px] sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        placeholder="Enter Interviewer Name..."
        type="text"
        value={employerCandidateData?.interviewer}
      />
    </div>
  );
};
