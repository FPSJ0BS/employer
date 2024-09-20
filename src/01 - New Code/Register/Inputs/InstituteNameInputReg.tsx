import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextInputValidEmployer } from "../../Employer/functions/employerFunctions";
import { postAuthRegister } from "../../Employer/Redux/Authentication";

export const InstituteNameInputReg = () => {
  const { authRegister } = useSelector(
    (state: any) => state.autheticationSlice
  );

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

      const inputValue = e.target.value;

      if (TextInputValidEmployer(inputValue)) {
        if (inputValue ?? false) {
          dispatch(
            postAuthRegister({
                institute_name: inputValue,
            })
          );
        } else {
          dispatch(
            postAuthRegister({
                institute_name: "",
            })
          );
        }
      }
    
  };

  return (
    <div className=" sm:w-[100%] w-[250px] flex flex-col gap-2">
      <label
        htmlFor="authRegisterInstName"
        className=" postJobInputTitle font-medium text-gray-700"
      >
        Organization Name *
      </label>
      <input
      placeholder="Enter Organization name..."
        autoComplete="off"
        required
        onChange={(e) => handleChange(e)}
        type="text"
        id="authRegisterInstName"
        name="InstituteName"
        className=" p-2  sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        value={authRegister.institute_name}
      />
    </div>
  );
};
