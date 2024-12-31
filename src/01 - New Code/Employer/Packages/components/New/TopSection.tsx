import React, { useState } from "react";

const TopSection = () => {
  const [selectedOption, setSelectedOption] = useState("Select Plan");
  return (
    <div className=" flex flex-col gap-3 justify-center items-center">
      <div className="flex items-center justify-center bg-gray-100  rounded-[30px] space-x-4  border-none mb-4">
        {/* Select Plan Button */}
        <button
          className={`flex items-center px-5 py-2 rounded-[30px] font-medium  transition focus:outline-none focus:ring-2 ${
            selectedOption === "Select Plan"
              ? "bg-blue-500 text-white focus:ring-blue-300"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 "
          }`}
          onClick={() => setSelectedOption("Select Plan")}
        >
          Select Plan
        </button>

        {/* Checkout Button */}
        <button
          className={`flex items-center px-5 py-2 rounded-[30px] font-medium  transition focus:outline-none focus:ring-2 ${
            selectedOption === "Checkout"
              ? "bg-blue-500 text-white focus:ring-blue-300"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setSelectedOption("Checkout")}
        >
          Checkout
        </button>

        {/* Check Credit Button (Independent) */}
        <button
          className="flex items-center px-5 py-2 rounded-[30px] bg-green-500 text-white font-medium  hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-300"
          onClick={() => alert("Check Credit button clicked")}
        >
          Check Credit
        </button>
      </div>

      <h2 className=" text-[30px] font-semibold text-center">
        Recruitment Simplified with Tallento: Find Talent, Faster!
      </h2>
      <p className=" text-center px-[100px] text-[16px]">
        Streamline your hiring process with Taliento, the ultimate recruitment
        solution. From sourcing top talent to seamless onboarding, we make
        finding the right candidates quick, efficient, and hassle-free.
      </p>
    </div>
  );
};

export default TopSection;
