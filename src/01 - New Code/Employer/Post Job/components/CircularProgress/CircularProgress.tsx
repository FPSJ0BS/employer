import React from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export const CircularProgressBar = () => {
  const { employerManageProfileFields } = useSelector(
    (state) => state.employerManageProfile
  );

  const totalJobs = employerManageProfileFields?.totalJobs;
  const currentJobs = employerManageProfileFields?.jobsAvailable;

  const progressValue = (currentJobs / totalJobs) * 100; 

  return (
    <>
      
      <CircularProgress
        value={progressValue ? progressValue : 0}
        color="#cc5475"
        size="45px"
        thickness="10px"
      >
        
        <CircularProgressLabel className="text-[20px]">
          {currentJobs ? currentJobs : 0}
        </CircularProgressLabel>
      </CircularProgress>
    </>
  );
};
