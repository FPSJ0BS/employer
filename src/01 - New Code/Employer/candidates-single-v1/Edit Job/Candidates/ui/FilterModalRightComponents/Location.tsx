import React from "react";
import { EditJobState } from "../../../Edit Job Inputs/editJobState";
import { EditJobCity } from "../../../Edit Job Inputs/editJobCity";

const Location = ({ isClear }: any) => {
  return (
    <>
      <EditJobState isClear={isClear} />
      <EditJobCity />
    </>
  );
};

export default Location;
