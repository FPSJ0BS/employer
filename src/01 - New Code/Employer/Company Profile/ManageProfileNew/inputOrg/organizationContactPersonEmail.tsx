import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { TextInputValidEmployer } from "../../Employer/functions/employerFunctions";
// import { postAuthRegister } from "../../Employer/Redux/Authentication";
import { editEmployerManageProfileFields } from "../../../Redux/CompanyProfile";
import { TextInputEmailValidEmployer } from "../../../functions/employerFunctions";

export const OrganizationContactPersonEmail = () => {
  const { employerManageProfileFields } = useSelector(
    (state: any) => state.employerManageProfile
  );

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue ?? false) {
      dispatch(
        editEmployerManageProfileFields({
          contactPersonEmail: inputValue,
        })
      );
    } else {
      dispatch(
        editEmployerManageProfileFields({
          contactPersonEmail: "",
        })
      );
    }
  };

  return (
    <div className="z-40 sm:w-[100%] w-[250px] flex flex-col gap-2 col-span-2 sm:col-span-1">
      <label
        htmlFor="organizationContactEmail"
        className=" postJobInputTitle font-medium text-gray-700"
      >
        Contact Person Email *
      </label>
      <input
      placeholder="Enter Email Address..."
        autoComplete="off"
        required
        onChange={(e) => handleChange(e)}
        type="email"
        id="organizationContactEmail"
        name="InstituteName"
        className=" p-2  sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        value={employerManageProfileFields.contactPersonEmail}
      />
    </div>
  );
};
