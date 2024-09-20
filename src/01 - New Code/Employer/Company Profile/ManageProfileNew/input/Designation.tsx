import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextInputValidEmployer } from "../../../functions/employerFunctions";
import { editEmployerManageProfileFields } from "../../../Redux/CompanyProfile";


export const Designation = () => {
  const { employerManageProfileFields } = useSelector(
    (state: any) => state.employerManageProfile
  );

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

      const inputValue = e.target.value;

      if (TextInputValidEmployer(inputValue)) {
        if (inputValue ?? false) {
          dispatch(
            editEmployerManageProfileFields({
                designation: inputValue,
            })
          );
        } else {
          dispatch(
            editEmployerManageProfileFields({
                designation: "",
            })
          );
        }
      }
    
  };

  return (
    <div className="z-40 sm:w-[100%] w-[250px] flex flex-col gap-2 col-span-2 sm:col-span-1">
      <label
        htmlFor="manageProfileDesignation"
        className=" postJobInputTitle font-medium text-gray-700"
      >
        Designation 
      </label>
      <input

        autoComplete="off"
 
        onChange={(e) => handleChange(e)}
        type="text"
        id="manageProfileDesignation"
        name="InstituteName"
        className=" p-2  sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        value={employerManageProfileFields.designation}
      />
    </div>
  );
};
