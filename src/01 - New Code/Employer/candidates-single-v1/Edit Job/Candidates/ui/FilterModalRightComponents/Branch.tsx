import React, { useEffect } from "react";
import { EditJobCategory } from "../../../Edit Job Inputs/editJobCategory";
import { EditJobSubject } from "../../../Edit Job Inputs/editJobSubject";


const Branch = ({ isClear }:any) => {
  return (
    <div>
      <EditJobCategory isClear={isClear} />
      <EditJobSubject />
    </div>
  );
};

export default Branch;
