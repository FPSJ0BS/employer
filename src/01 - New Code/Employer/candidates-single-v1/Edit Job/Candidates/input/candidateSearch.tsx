import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextInputValidEmployer } from "../../../../functions/employerFunctions";
import { editEmployerCandidateSearchBox } from "../../../../Redux/EmployerCandidate";
import { useNavigate, useParams } from "react-router-dom";

export const CandidateSearch = () => {
  const { jobID, status } = useParams();
  const navigate = useNavigate()

 
  const { employerCandidateSearchBox } = useSelector((state: any) => state.employerCandidate);

  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    if(status === "applied"){
      navigate(`/candidates-single-v1/${jobID}/""`)

    }
    const inputValue = e.target.value;

    if (TextInputValidEmployer(inputValue)) {
      if (inputValue ?? false) {
        dispatch(
          editEmployerCandidateSearchBox({
            search: inputValue,
          })
        );
      } else {
        dispatch(
          editEmployerCandidateSearchBox({
            search: "",
          })
        );
      }
    }
  };

  return (
    <div className=" sm:w-[20%] w-[250px] flex flex-col gap-2 ">
      <label
        htmlFor="EmployerCandidateSearchBox"
        className=" postJobInputTitle font-medium text-gray-700 "
      >
        Search
      </label>
      <input
      autoComplete="off"
      placeholder="Search..."
        onChange={(e) => handleChange(e)}
        type="text"
        id="EmployerCandidateSearchBox"
        name="jobTitle"
        className=" p-2 h-[30px] sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        value={employerCandidateSearchBox?.search}
      />
    </div>
  );
};
