import React from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export const CircularProgressBar = () => {
  const { employerManageProfileFields } = useSelector(
    (state) => state.employerManageProfile
  );

  const totalJobs = employerManageProfileFields?.totalJobs; // Assuming this is the initial total number of jobs
  const currentJobs = employerManageProfileFields?.jobsAvailable; // Current remaining jobs

  const progressValue = (currentJobs / totalJobs) * 100; // Calculate the percentage

  return (
    <>
      
      <CircularProgress
        value={progressValue ? progressValue : 0}
        color="#cc5475"
        size="100px"
        thickness="10px"
      >
        
        <CircularProgressLabel>
          {currentJobs ? currentJobs : 0}
        </CircularProgressLabel>
      </CircularProgress>
    </>
  );
};
