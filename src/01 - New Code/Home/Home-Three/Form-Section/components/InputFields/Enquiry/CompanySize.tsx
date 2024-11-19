import React from "react";
import { FormDataType } from "../../../FormSection";

type OrganizationNameProps = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
};

export const CompanySize: React.FC<OrganizationNameProps> = ({
  formData,
  setFormData,
}) => {
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value;
    setFormData({
      ...formData,
      company_size: selectedRole,
    });
  };

  return (
    <div className="w-full flex flex-col gap-4 ">
      {/* Dropdown for selecting the role */}
      <select
        id="company_size"
        name="company_size"
        value={formData?.company_size || ""}
        onChange={handleRoleChange}
        required
        className=" p-2  w-[100%] border-t-0 border-l-0 border-r-0 border-b-[3px] focus:border-[2px] border-gray-300 rounded-md focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
      >
        <option value="" disabled>
          Select Company Size
        </option>
        <option value="0-10">0-10</option>
        <option value="11-50">11-50</option>
        <option value="51-100">51-100</option>
        <option value="101-500">101-500</option>
        <option value="501-1000">501-1000</option>
        <option value="1000+">1000+</option>
        
      </select>
    </div>
  );
};
