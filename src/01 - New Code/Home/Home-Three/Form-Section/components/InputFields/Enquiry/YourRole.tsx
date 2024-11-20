import React from "react";
import { FormDataType } from "../../../FormSection";

type OrganizationNameProps = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
};

export const YourRole: React.FC<OrganizationNameProps> = ({
  formData,
  setFormData,
}) => {
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value;
    setFormData({
      ...formData,
      person_job_role: selectedRole,
    });
  };

  return (
    <div className="w-full flex flex-col gap-4 ">
      {/* Dropdown for selecting the role */}
      <select
        id="YourRole"
        name="YourRole"
        value={formData?.person_job_role || ""}
        onChange={handleRoleChange}
        required
        className=" p-2  w-[100%] border-t-0 border-l-0 border-r-0 border-b-[3px] focus:border-[2px] border-gray-300 rounded-md focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
      >
        <option value="" disabled>
          Select your role
        </option>
        <option value="HR">HR</option>
        <option value="Owner">Owner</option>
        <option value="Hiring Manager">Hiring Manager</option>
        <option value="Consultancy">Consultancy</option>
        <option value="Others">Others</option>
      </select>
    </div>
  );
};
