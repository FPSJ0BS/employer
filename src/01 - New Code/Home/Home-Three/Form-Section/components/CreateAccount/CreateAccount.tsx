import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface CreateAccount  {
    name : string
}

const CreateAccount : React.FC<CreateAccount> = ({name}) => {
  const { login } = useSelector((state) => state.login);
  const navigate = useNavigate()
  return (
    <div className=" my-3 w-full flex flex-col gap-3 items-center justify-center ">

        <p className=" mb-0">Or</p>


      <div className=" w-full flex gap-2 items-center ">
        <div className={` border-1 border-solid ${name === "email ID" ? "w-[20%]" : "w-[10%]"}`}></div>
        <div className={`${name === "email ID" ? "w-[60%]" : "w-[80%]"} flex items-center justify-center`}><p className=" mb-0 font-semibold text-black ">Don’t have a registered  {`${name}`}?</p></div>
        <div className={` border-1 border-solid ${name === "email ID" ? "w-[20%]" : "w-[10%]"}`}></div>
      </div>

      <button disabled = {login} onClick={() => navigate("/register")} className=" border-[#D94452] w-[80%] border-1 border-solid py-1 rounded-[30px] font-semibold">Create Account</button>


    </div>
  );
};

export default CreateAccount;
