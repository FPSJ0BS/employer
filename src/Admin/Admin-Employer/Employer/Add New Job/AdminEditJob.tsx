import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AdminAddJobTitle } from "./Inputs/AdminAddJobTitle";
import { AdminEmployer } from "./Inputs/AdminEmployer";
import { AdminCategory } from "./Inputs/AdminCategory";
import { AdminSubject } from "./Inputs/AdminSubject";
import { AdminMinimumQualification } from "./Inputs/AdminMinimumQualification";
import { AdminJobType } from "./Inputs/AdminJobType";
import { AdminJobLevel } from "./Inputs/AdminJobLevel";
import { AdminNoOfRequirement } from "./Inputs/AdminNoOfRequirement";
import { AdminExperienceMinMax } from "./Inputs/AdminExperienceMinMax";
import { AdminSalaryType } from "./Inputs/AdminSalaryType";
import { AdminSalaryMinMax } from "./Inputs/AdminSalaryMinMax";
import { AdminState } from "./Inputs/AdminState";
import { AdminCity } from "./Inputs/AdminCity";
import { AdminSelectionProcess } from "./Inputs/AdminSelectionProcess";
import { AdminProcessAddress } from "./Inputs/AdminProcessAddress";
import { AdminProcessState } from "./Inputs/AdminProcessState";
import { AdminProcessCity } from "./Inputs/AdminProcessCity";
import { AdminStatus } from "./Inputs/AdminStatus";
import { AdminPremiumStatus } from "./Inputs/AdminPremiumStatus";
import { AdminRemarks } from "./Inputs/AdminRemarks";

interface AdminEditJobProps {}

export const AdminEditJob: React.FC<AdminEditJobProps> = (
  {
    /* Destructure props here if any */
  }
) => {
  const { adminEditJob } = useSelector((state: any) => state.adminSlice);

  useEffect(() => {
    console.log(adminEditJob);
  }, [adminEditJob]);

  return (
    <div
      className={` w-[100%] h-[100%] flex  flex-col py-[3vh] pr-[5vw] relative`}
    >
      {/* <h1 className=" text-[2vw] text-black font-semibold">Employer</h1>
          <Divider orientation='horizontal' className=" bg-black"/> */}
      <div className=" h-[7%] w-[100%] flex justify-end items-center border-b-[2px] border-t-0 border-r-0 border-l-0 border-solid border-gray-300"></div>

      <div className="h-[93%] gap-y-8 p-4 grid grid-cols-4 place-content-start place-items-center">
        
        <AdminAddJobTitle />
        <AdminEmployer />
        <AdminCategory />
        <AdminSubject />
        <AdminMinimumQualification />
        <AdminJobType />
        <AdminJobLevel />
        <AdminNoOfRequirement />
        <AdminExperienceMinMax />
        <AdminSalaryType />
        <AdminSalaryMinMax />
        <AdminState />
        <AdminCity />
        <AdminSelectionProcess />
        <AdminProcessAddress />
        <AdminProcessState />
        <AdminProcessCity />
        <AdminStatus />
        <AdminPremiumStatus />
        <AdminRemarks />
     

        
      </div>
    </div>
  );
};
