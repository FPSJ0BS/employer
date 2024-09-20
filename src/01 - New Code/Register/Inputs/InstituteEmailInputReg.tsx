import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { postAuthRegister } from "../../Employer/Redux/Authentication";

export const InstituteEmailInputReg = () => {
  const { authRegister } = useSelector(
    (state: any) => state.autheticationSlice
  );

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

      const inputValue = e.target.value;

    
        if (inputValue ?? false) {
          dispatch(
            postAuthRegister({
                email_id: inputValue,
            })
          );
        } else {
          dispatch(
            postAuthRegister({
                email_id: "",
            })
          );
        }

    
  };

  return (
    <div className=" sm:w-[100%] w-[250px] flex flex-col gap-2 ">
      <label
        htmlFor="authRegisterEmail"
        className=" postJobInputTitle font-medium text-gray-700"
      >
        Official Email Id *
      </label>
      <input
      placeholder="Enter Official Email-Id..."
        autoComplete="off"
        required
        onChange={(e) => handleChange(e)}
        type="email"
        id="authRegisterEmail"
        name="InstituteName"
        className=" p-2  sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        value={authRegister.email_id}
      />
    </div>
  );
};



