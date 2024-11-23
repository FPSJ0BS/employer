import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { editEmployerManageProfileFields } from "../../../Redux/CompanyProfile";
import { TextInputValidEmployer } from "../../../functions/employerFunctions";

export const OtherEmployerWebsite = () => {
    const { employerManageProfileFields } = useSelector(
      (state: any) => state.employerManageProfile
    );


  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;



        dispatch(
          editEmployerManageProfileFields({
            website: inputValue,
          })
        );


  };

  return (
    <div className="z-40 sm:w-[100%] w-[250px] flex flex-col gap-2 col-span-2 sm:col-span-1">
      <label
        htmlFor="OtherEmployerWebsite"
        className=" postJobInputTitle font-medium text-gray-700"
      >
        Website URL *
      </label>
      <input
      placeholder="Enter Website URL..."
        autoComplete="off"
        required
        onChange={(e) => handleChange(e)}
        type="text"
        id="OtherEmployerWebsite"
        name="InstituteName"
        className=" p-2  sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        value={employerManageProfileFields.website}
      />
    </div>
  );
};
