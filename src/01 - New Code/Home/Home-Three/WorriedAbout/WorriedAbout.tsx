import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const WorriedAbout = () => {
  const { login } = useSelector((state) => state.login);

  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center w-full mt-[40px] md:mt-[80px] mb-[30px]">
      <div className=" flex-col sm:flex-row  h-[150px] sm:h-[250px] w-full md:w-[80%] flex  justify-between items-center sm:bg-[url('/assets/Home-new/WorriedAbout.png')] bg-contain bg-center bg-no-repeat  sm:px-10  ">
        <p className=" hidden md:block text-[25px] sm:text-[22px] xl:text-[30px] leading-[1.2em] font-bold text-black">
          Worried about creating employee documents?
          <br /> Let us handle it!
        </p>
        <p className=" md:hidden text-center text-[22px] sm:text-[22px]  leading-[1.2em] font-bold text-black">
          Worried about creating employee documents? Let us handle it!
        </p>
        <button
          onClick={() => {
            if (login) {
              navigate("/employers-dashboard/letter/generate"); 
            } else{
              navigate("/register"); 

            }
          }}
          className="bg-[#D94452] w-[150px] xl:w-[200px] text-[14px] xl:text-[16px] rounded-[15px] text-white font-semibold h-[40px] xl:h-[50px] px-1"
        >
          Get Started Now
        </button>
      </div>
    </div>
  );
};

export default WorriedAbout;
