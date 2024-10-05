import React, { useState } from "react";
import { FormDataType } from "../../../FormSection";
import { useDispatch } from "react-redux";
import { validatePassword } from "../../../../../../Employer/functions/employerFunctions";

type EmailIdProps = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
};

export const Password: React.FC<EmailIdProps> = ({ formData, setFormData }) => {
  
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
  
    const [passValue, setPassValue] = useState("");
    const [checkPassword, setCheckPassword] = useState(true);
  
   
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    
    setPassValue(inputValue);
    if (validatePassword(inputValue)) {
      const pass = inputValue ? inputValue : "";
      setFormData({
        ...formData,
        password: pass,
      });
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
  };

 

  return (
    <div className="sm:w-[100%] w-[250px] flex flex-col gap-1  relative">
      {/* <div className=" absolute w-[200px] h-[200px] bg-black left-[-17vw]">

    </div> */}
      {/* <label
        htmlFor="EmployerPostJobInstitutePassword"
        className="postJobInputTitle pb-1 block font-medium text-gray-700"
      >
        Password *
      </label> */}
      <div className="relative">
        <input
          placeholder="Enter Password..."
          autoComplete="off"
          required
          type={showPassword ? "text" : "password"}
          id="EmployerPostJobInstitutePassword"
          name="EmployerPostJobInstitutePassword"
          value={passValue}
          onChange={handleChange}
          className="  p-2  w-[100%] border-t-0 border-l-0 border-r-0 border-b-[3px] focus:border-[2px] border-gray-300 rounded-md focus:outline-none border-solid focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />

        <button
          className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
          aria-label="Toggle password visibility"
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-eye-off"
            >
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
              <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
              <line x1="2" x2="22" y1="2" y2="22" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-eye"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
      {/* <p className=" mt-[-10px] absolute bottom-[-60px] left-3">
      *Your password must be 6 to 15 characters long and include at least one
      number and one special character.
    </p> */}
      {!checkPassword && ( // Display error message when phone number is invalid
        <p className="text-red-800 ">
          *Your password must be 6 to 15 characters long and include at least
          one alphabet, one number and one special character.
        </p>
      )}
    </div>
  );
};

// InstituteContactPersonNameInputReg
