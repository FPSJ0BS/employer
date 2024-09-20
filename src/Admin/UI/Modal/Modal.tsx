import React from "react";
import CloseIcon from '../../../../public/assets/icons/remove.png'
import { useDispatch } from "react-redux";
import { closeAdminModal } from "../../Redux/AdminSlice";

export const AdminModal = () => {

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(closeAdminModal())
  }

  return (
    <div className="absolute h-full w-full bg-gray-600 bg-opacity-50 z-50 ">
      <div className=" h-[100%] w-[100%] flex justify-center items-center ">
        <div className=" bg-white h-[300px] w-[500px] rounded-lg relative">
          <div onClick={() => closeModal()} className=" absolute right-1 top-1">
            <img src={CloseIcon} alt="close" className=" w-[30px] cursor-pointer" />
          </div>

          <div className=" w-[100%] h-[100%] flex justify-center items-center flex-col gap-6">
            <h2 className=" text-[1.5vw] text-center">
              Are you sure you want to delete this item?
            </h2>

            <div className=" flex gap-[100px]">
              <div className="w-full h-20 flex items-center justify-center cursor-pointer">
                <div className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group">
                  <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-green-700 group-hover:h-full"></span>
                  <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="none"
                      className="w-5 h-5 text-green-400"
                    >
                      <path
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                        stroke-width="2"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                      ></path>
                    </svg>
                  </span>
                  <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="none"
                      className="w-5 h-5 text-green-400"
                    >
                      <path
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                        stroke-width="2"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                      ></path>
                    </svg>
                  </span>
                  <span className="relative w-[50px] text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200">
                    Exit
                  </span>
                </div>
              </div>

              <div className="w-full h-20 flex items-center justify-center cursor-pointer">
                <div className="border-2 border-red-800 border-solid relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-white dark:text-red-800 dark:hover:text-gray-200 dark:shadow-none group">
                  <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-red-800 group-hover:h-full"></span>
                  <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                    <svg
                      className="lucide lucide-x w-5 h-5 text-red-800"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </span>
                  <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                    <svg
                      className="lucide lucide-x w-5 h-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </span>
                  <span className=" relative w-[50px] text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200">
                    Delete
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
