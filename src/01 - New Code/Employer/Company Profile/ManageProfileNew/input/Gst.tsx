import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { editEmployerManageProfileFields } from "../../../Redux/CompanyProfile";

export const Gst = () => {
  const { employerManageProfileFields } = useSelector(
    (state: any) => state.employerManageProfile
  );

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    dispatch(
      editEmployerManageProfileFields({
        gst: inputValue,
      })
    );
  };

  return (
    <div className="z-40 sm:w-[100%] w-[250px] flex flex-col gap-2 col-span-2 sm:col-span-1">
      <label
        htmlFor="manageProfileGst"
        className=" postJobInputTitle font-medium text-gray-700"
      >
        GST
      </label>
      <input
        placeholder="Enter GST Number..."
        autoComplete="off"
        onChange={(e) => handleChange(e)}
        type="text"
        id="manageProfileGst"
        name="InstituteName"
        className=" p-2  sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        value={employerManageProfileFields.gst}
      />
    </div>
  );
};
