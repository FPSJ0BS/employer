import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Reject from "../../../../../../public/Employer/Manage Profile/reject.png";
import Check from "../../../../../../public/assets/icons/check.png";
import { validatePhoneNumber } from "../../../functions/employerFunctions";
import { editEmployerManageProfileFields } from "../../../Redux/CompanyProfile";

export const PhoneNumber = () => {
  const { employerManageProfileFields } = useSelector(
    (state: any) => state.employerManageProfile
  );

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (validatePhoneNumber(inputValue)) {
      const phoneNumber = inputValue ? parseInt(inputValue) : null;
      dispatch(editEmployerManageProfileFields({ phoneNumber }));
    } else {
      dispatch(editEmployerManageProfileFields({ phoneNumber: null }));
    }
  };

  return (
    <div className="z-40 sm:w-[100%] w-[250px] flex flex-col gap-2 col-span-2">
      <label
        htmlFor="authRegisterInstName"
        className=" postJobInputTitle font-medium text-gray-700"
      >
        Mobile Number *
      </label>
      <div className=" flex justify-center items-center gap-2 w-[100%]">
        <input
          disabled
          autoComplete="off"
          required
          onChange={(e) => handleChange(e)}
          type="string"
          id="authRegisterInstName"
          name="InstituteName"
          className=" p-2 w-[20%] sm:w-[10%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          value="+91"
        />
        <input
          disabled={employerManageProfileFields?.phoneNumberVerified === 1}
          placeholder="Enter Phone Number"
          autoComplete="off"
          required
          onChange={(e) => handleChange(e)}
          type="number"
          id="authRegisterInstNamee"
          name="InstituteName"
          className=" p-2 w-[50%] sm:w-[60%] border-[1px] focus:border-[2px] border-gray-300 rounded-md shadow-sm focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          value={employerManageProfileFields?.phoneNumber}
        />
        <div className="sm:w-[30%] flex justify-center items-center gap-2">
          <span>
            {employerManageProfileFields?.phoneNumberVerified === 0 ? (
              <img className="w-[30px]" src={Reject} alt="reject" />
            ) : (
              <img className="w-[30px]" src={Check} alt="reject" />
            )}
          </span>
          {employerManageProfileFields?.phoneNumberVerified === 0
            ? "Not Verified"
            : "Verified"}
        </div>
      </div>
    </div>
  );
};
