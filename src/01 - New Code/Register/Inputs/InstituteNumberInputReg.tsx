import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postAuthRegister } from "../../Employer/Redux/Authentication";
import { validatePhoneNumber } from "../../Employer/functions/employerFunctions";

export const InstituteNumberInputReg = () => {
  const { authRegister } = useSelector(
    (state: any) => state.autheticationSlice
  );

  const [phoneNumber, setPhoneNumber] = useState("");
  const [checkPhone, setCheckPhone] = useState(true)

  const dispatch = useDispatch();

  const handelinginstituteNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPhoneNumber(inputValue);
    if (validatePhoneNumber(inputValue)) {
      const phoneNumber = inputValue ? inputValue : "";
      dispatch(postAuthRegister({ mobile_number: phoneNumber }));
      setCheckPhone(true)
    } else {
      dispatch(postAuthRegister({ mobile_number: "" }));
      setCheckPhone(false)
    }
  };

  return (
    <div className="sm:w-[100%] w-[250px] flex flex-col gap-2 relative">
      <label
        htmlFor="authRegisterInstNumber"
        className="postJobInputTitle font-medium text-gray-700"
      >
        Organization Phone Number *
      </label>
      <input
      placeholder="Enter Official Phone Number"
        autoComplete="off"
        required
        onChange={(e) => handelinginstituteNumber(e)}
        type="number"
        id="authRegisterInstNumber"
        name="InstituteNumber"
        className="p-2 sm:w-[100%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        value={phoneNumber}
      />
      {!checkPhone && ( // Display error message when phone number is invalid
        <p className="text-red-800 ">
          Please enter a valid 10-digit phone number starting with 6, 7, 8, or
          9.
        </p>
      )}
    </div>
  );
};
