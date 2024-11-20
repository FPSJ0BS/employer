import { X } from "lucide-react";
import React from "react";

interface Popup {
  heading: string;
  buttonTextOne: string;
  buttonTextTwo: string;
}

const DashboardPopup: React.FC<Popup> = ({ heading, buttonTextOne, buttonTextTwo }) => {
  return (
    <div className="flex w-full justify-center items-center h-[100vh] bg-gray-600/60 pt-[100px] fixed inset-0 z-50 realtive">
      <div className="w-[40%] min-h-[200px] bg-white text-black relative rounded-xl p-5 flex flex-col gap-5 justify-center items-center">
        <X className="absolute right-3 top-3" />
        <h2 className="text-[25px] font-semibold leading-[1.2em]">
          {" "}
          {heading}
        </h2>
        <div className="flex gap-4">
          <button
            className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group shadow-lg"
            type="button"
          >
            <div className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
                height="25px"
                width="25px"
              >
                <path
                  d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                  fill="#000000"
                ></path>
                <path
                  d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                  fill="#000000"
                ></path>
              </svg>
            </div>
            <p className="translate-x-2 font-semibold">{buttonTextOne}</p>
          </button>
          <button
            className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group shadow-lg"
            type="button"
          >
            <div className="bg-red-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
              <X />
            </div>
            <p className="translate-x-2 font-semibold">{buttonTextTwo}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPopup;
