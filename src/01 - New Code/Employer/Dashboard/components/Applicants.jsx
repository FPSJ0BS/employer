import { useEffect, useState } from "react";
import {
  BriefcaseIcon,
  RupeeIcon,
  LoactionIcon,
  EyeIcon,
} from "../../../../../public/assets/icons/icons";
import { useGetStateQuery } from "@/api/api";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import DefaultAvatar from "../../../../../public/assets/icons/user.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const Applicants = ({ recentAppData, dataApp }) => {
  const [recentApplications, setRecentApplications] = useState([]);
  const navigate = useNavigate();

  const { imageUrl } = useSelector((state) => state.login);
  const { profileImage } = useSelector(
    (state) => state.instituteProfileImageSlice
  );

  useEffect(() => {
    setRecentApplications(recentAppData);
  }, [recentAppData]);

  // const settingStateCity = (statenum) => {
  //   let state = 'test';

  //   if (stateSuccess && stateData?.data) {
  //     const stateFilter = stateData?.data?.find((statename) => {
  //       return statename.state_id === statenum;
  //     });

  //     if (stateFilter) {
  //       state = stateFilter.state_name;
  //     }
  //   }

  //   return state;
  // };

  return (
    <div className="  w-[100%] flex flex-col justify-center items-center">
      <div className="w-[100%] py-[10px] mt-[10px] mb-[20px] flex justify-between border-b-[1px] border-l-0 border-r-0 border-t-0 border-[#c1bdbd]  border-solid">
        <h2 className=" font-medium">Job Published ({dataApp?.totalJobs})</h2>
        <h2
          onClick={() => navigate("/employers-dashboard/manage-jobs")}
          className="flex justify-center items-center cursor-pointer"
        >
          See All {">"}
        </h2>
      </div>

      <div className=" grid grid-cols-2 place-items-start place-content-center  w-[100%] gap-4 ">
        {recentApplications
          ?.slice(0, 6)
          .map(
            ({
              job_title,
              city,
              jobID,
              job_type,
              min_salary,
              max_salary,
              state,
              total_application,
              total_new_application,
              salary_type,
              total_inactive_application,
            }) => (
              <div
                key={jobID}
                className="

          border-[#f5f7fc] border-solid border-2 rounded-[12px]
            w-[100%] h-[100%]
            

            flex justify-between items-start p-[15px] cursor-default
            "
              >
                <div className="w-70% 2xl:w-[80%] h-[100%] flex flex-col gap-2 justify-between">
                  <div className="flex flex-col gap-2 justify-center">
                    <h2
                      onClick={() =>
                        navigate(`/candidates-single-v1/${jobID}/""`)
                      }
                      className=" underline  font-semibold text-[18px] capitalize pb-2 text-[#438e76] cursor-pointer"
                    >
                      {job_title}
                    </h2>

                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-map-pin"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <h2 className=" font-normal text-[15px] capitalize flex">
                        {" "}
                        {state}, {city}
                      </h2>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-briefcase-business"
                        >
                          <path d="M12 12h.01" />
                          <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                          <path d="M22 13a18.15 18.15 0 0 1-20 0" />
                          <rect width="20" height="14" x="2" y="6" rx="2" />
                        </svg>
                        <h2 className=" font-normal text-[15px] capitalize flex">
                          {" "}
                          {job_type}
                        </h2>
                      </div>

                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-badge-indian-rupee"
                        >
                          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                          <path d="M8 8h8" />
                          <path d="M8 12h8" />
                          <path d="m13 17-5-1h1a4 4 0 0 0 0-8" />
                        </svg>
                        <h2 className=" font-normal text-[15px] capitalize flex">
                          {" "}
                          {min_salary} - {max_salary} {salary_type}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-0">
                    <div className="flex gap-1 items-center pt-2 cursor-pointer">
                      <h2
                        onClick={() =>
                          navigate(`/candidates-single-v1/${jobID}/""`)
                        }
                        className=" text-[#2c5ca3] font-medium hover:underline"
                      >
                        View Candidates
                      </h2>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-right"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </div>
                    <div className="flex gap-1 items-center  cursor-pointer">
                      <h2
                        onClick={() =>
                          navigate(`/employers-dashboard/suggested-candidate/${jobID}`)
                        }
                        className=" text-[#2c5ca3] font-medium hover:underline"
                      >
                        Instant Applications
                      </h2>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-right"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="w-[49%] 2xl:w-[20%] h-[100%] flex flex-col gap-2 justify-between">
                  <div className="flex flex-col gap-2 justify-center ">
                    <h2
                      onClick={() =>
                        navigate(`/candidates-single-v1/${jobID}/new`)
                      }
                      className="hover:underline font-normal text-[16px] capitalize text-black cursor-pointer"
                    >
                      <span className="text-[#438e76] font-medium">
                        {total_inactive_application ? total_inactive_application : 0}
                      </span>{" "}
                      New
                    </h2>
                    <h2
                      onClick={() =>
                        navigate(`/candidates-single-v1/${jobID}/applied`)
                      }
                      className="hover:underline font-normal text-[16px] capitalize text-black cursor-pointer"
                    >
                      <span className="text-[#438e76] font-medium">
                        {total_new_application ? total_new_application : 0}
                      </span>{" "}
                      No Activity Application
                    </h2>
                    <h2
                      onClick={() =>
                        navigate(`/candidates-single-v1/${jobID}/""`)
                      }
                      className="hover:underline font-normal text-[16px] capitalize text-black cursor-pointer"
                    >
                      <span className="text-[#438e76] font-medium">
                        {total_application}
                      </span>{" "}
                      Total Application
                    </h2>
                  </div>

                  <div className="flex gap-1 items-center pt-2 cursor-pointer">
                    <h2
                      onClick={() =>
                        navigate(`/candidates-single-v1/${jobID}/""`)
                      }
                      className=" text-[#2c5ca3] font-medium hover:underline"
                    >
                      View Job
                    </h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-chevron-right"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default Applicants;
