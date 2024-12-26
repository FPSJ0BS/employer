import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editEmployerManageProfileFields } from "../../../Redux/CompanyProfile";
import {
  isValidNumber,
  validatePhoneNumber,
} from "../../../functions/employerFunctions";

export const OrganizationContactPersonNumber = () => {
  const { employerManageProfileFields } = useSelector(
    (state: any) => state.employerManageProfile
  );
  const [checkPhone, setCheckPhone] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    dispatch(
      editEmployerManageProfileFields({
        contactPersonNumber: inputValue,
      })
    );
    if (validatePhoneNumber(inputValue)) {
      setCheckPhone(false);
    } else {
      setCheckPhone(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = e.charCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  return (
    <div className="z-40 sm:w-[100%] w-[250px] flex flex-col gap-2 col-span-2 sm:col-span-1">
      <label
        htmlFor="organizationContactPersonNumber"
        className=" postJobInputTitle font-medium text-gray-700"
      >
        Contact Person Number *
      </label>
      <input
      placeholder="Enter Mobile Number..."
        autoComplete="off"
        required
        onChange={(e) => handleChange(e)}
        onKeyPress={handleKeyPress}
        type="text"
        id="organizationContactPersonNumber"
        name="InstituteName"
        className=" p-2  sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        value={employerManageProfileFields.contactPersonNumber || ""}
      />
      {checkPhone && (
        <p className="text-red-800">
          Please enter a valid 10-digit phone number starting with 6, 7, 8, or
          9.
        </p>
      )}
    </div>
  );
};
