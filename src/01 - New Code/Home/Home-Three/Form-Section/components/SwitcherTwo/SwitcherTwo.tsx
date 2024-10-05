import React from "react";

interface SwitcherTwoProps {
  isLoginSelected: boolean;
  handleLoginChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEmailSelected: boolean;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SwitcherTwo : React.FC<SwitcherTwoProps>= ({
  isLoginSelected,
  handleLoginChange,
  isEmailSelected,
  handleEmailChange,
}) => {
  return (
    <div className="pb-2">
      <p>Login with</p>

      <div className=" w-full flex gap-4">
        <div className=" flex items-center cursor-pointer">
          <label className=" flex items-center cursor-pointer font-normal leading-[1.2em]">
            <input
              className=" mr-2 cursor-pointer"
              type="radio"
              value="Login"
              checked={isLoginSelected}
              onChange={handleLoginChange}
            />
            Mobile Number
          </label>
        </div>

        <div className=" flex items-center  cursor-pointer">
          <label className=" flex items-center cursor-pointer font-normal leading-[1.2em]">
            <input
              className=" mr-2 cursor-pointer"
              type="radio"
              value="Email"
              checked={isEmailSelected}
              onChange={handleEmailChange}
            />
            Email id & Password
          </label>
        </div>
      </div>
    </div>
  );
};

export default SwitcherTwo;
