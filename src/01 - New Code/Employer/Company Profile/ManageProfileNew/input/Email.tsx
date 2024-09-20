import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { editEmployerManageProfileFields } from "../../../Redux/CompanyProfile";


export const Email = () => {
  const { employerManageProfileFields } = useSelector(
    (state: any) => state.employerManageProfile
  );

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

        if (inputValue ?? false) {
          dispatch(
            editEmployerManageProfileFields({
                email: inputValue,
            })
          );
        } else {
          dispatch(
            editEmployerManageProfileFields({
                email: "",
            })
          );
        }
      
  };

  return (
    <div className="z-40 sm:w-[100%] w-[250px] flex flex-col gap-2 col-span-2 ">
      <label
        htmlFor="manageProfileEmail"
        className=" postJobInputTitle font-medium text-gray-700"
      >
        Official E-mail *
      </label>
      <input
      disabled
        autoComplete="off"
        required
        onChange={(e) => handleChange(e)}
        type="email"
        id="manageProfileEmail"
        name="InstituteName"
        className=" p-2  sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        value={employerManageProfileFields.email}
      />
    </div>
  );
};
