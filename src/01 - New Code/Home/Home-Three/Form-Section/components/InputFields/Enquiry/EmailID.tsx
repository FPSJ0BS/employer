import React from "react";
import { FormDataType } from "../../../FormSection";


type EmailIdProps = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
};


export const EmailId: React.FC<EmailIdProps> = ({ formData, setFormData }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

      const inputValue = e.target.value;

      setFormData({
        ...formData,
        EmailId : inputValue
      })
       
      
    
  };

  return (
    <div className=" w-full flex flex-col gap-2">
      {/* <label
        htmlFor="contactPersonName"
        className=" postJobInputTitle font-medium text-gray-700 lg:mr-[-200px]"
      >
        First Name *
      </label> */}
      <input
      placeholder="Enter Email Id..."

        autoComplete="off"
        required
        onChange={(e) => handleChange(e)}
        type="email"
        id="OrganizationName"
        name="OrganizationName"
        className=" p-2  w-[100%] border-t-0 border-l-0 border-r-0 border-b-[3px] focus:border-[2px] border-gray-300 rounded-md focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        value={formData?.EmailId}
      />
    </div>
  );
};


// InstituteContactPersonNameInputReg