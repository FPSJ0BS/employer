import React from "react";
import NavbarNew from "../Home/Home-New/components/Navbar/Navbar.jsx";
import Image404 from "../../../public/assets/storyset/404 error with people holding the numbers-pana.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Page404 = () => {
  const { login } = useSelector((state) => state.login);

  return (
    <div className="h-[100vh] w-[100%]">
      <NavbarNew />

      <div className="w-[100%] h-[100%] flex justify-center items-center flex-col">
        <img
          className="w-[100vw] mb-[-20px] sm:w-[80vw] sm:mb-[-60px] lg:w-[60vw] lg:mb-[-60px] xl:w-[50vw] xl:mb-[-60px] 2xl:w-[40vw] 2xl:mb-[-60px]"
          alt="404"
          src={Image404}
        />
        {login ? (
          <div className="w-full h-40 flex items-center justify-center cursor-pointer">
            <div className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow text-[#be5b75] transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group">
              <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-[#be5b75] group-hover:h-full"></span>
              <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                  className="w-5 h-5 text-[#be5b75]"
                >
                  <path
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
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
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </span>

              <Link to="/employers-dashboard/dashboard">
                <span className="text-[#be5b75] relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200">
                  Go to Dashboard
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full h-40 flex items-center justify-center cursor-pointer">
            <div className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow text-[#be5b75] transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group">
              <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-[#be5b75] group-hover:h-full"></span>
              <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                  className="w-5 h-5 text-[#be5b75]"
                >
                  <path
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
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
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </span>
              <Link to="/">
                <span className="text-[#be5b75] relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200">
                  Go to Home
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
