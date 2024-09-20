import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { TextInputValidEmployer } from "../../Employer/functions/employerFunctions";
// import { postAuthRegister } from "../../Employer/Redux/Authentication";
import { editEmployerManageProfileFields } from "../../../Redux/CompanyProfile";
import { TextInputValidEmployer } from "../../../functions/employerFunctions";

export const OrganizationName = () => {
  const { employerManageProfileFields } = useSelector(
    (state: any) => state.employerManageProfile
  );


  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // if (TextInputValidEmployer(inputValue)) {
    //   if (inputValue ?? false) {
    //     dispatch(
    //       editEmployerManageProfileFields({
    //         fullName: inputValue,
    //       })
    //     );
    //   } else {
    //     dispatch(
    //       editEmployerManageProfileFields({
    //         fullName: "",
    //       })
    //     );
    //   }
    // }
  };

  return (
    <div className="z-50 sm:w-[100%] w-[250px] flex flex-col gap-2 col-span-2 sm:col-span-2">
      <label
        htmlFor="authRegisterorganizationName"
        className=" postJobInputTitle font-medium text-gray-700"
      >
        Organization Name *
      </label>
      <input
      
        disabled
        autoComplete="off"
        required
        // onChange={(e) => handleChange(e)}
        type="text"
        id="authRegisterorganizationName"
        name="InstituteName"
        className=" p-2  sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        value={employerManageProfileFields?.organizationName}
      />
    </div>
  );
};
