import { Link, Navigate } from "react-router-dom";
import { getRecentApplications } from "@/api/apiAxios";
import { useState, useEffect } from "react";
import Loader from "../../../../../public/assets/Loader";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { getDashboardStats } from "@/api/apiAxios";
import { useSelector, useDispatch } from "react-redux";
import DefaultAvatar from "../../../../../public/assets/icons/user.png";
import { PaginationCandidate } from "./pagination.tsx";

import { editEmployerManageJobsFields } from "../../Redux/EmployerManageJobs.tsx";
import { JobsSearch } from "./inputs/searchJobs.tsx";
import { SortDataLength } from "./inputs/sortDatalength.tsx";
import { EyeIcon, PencilLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NODATAPIC from "../../../../../public/assets/storyset/Innovation-pana.png";
import { formatAMPM } from "../../../../utils/formatAMPM.ts";
const JobListingsTable = () => {
  const dispatch = useDispatch();
  const [loderState, setLoaderState] = useState(true);
  const [jobAllDetails, setAllJobDetails] = useState([]);
  const [searchJobs, setSearchJobs] = useState("");
  const [page, setPage] = useState(1);
  const [pageLength, setPageLength] = useState("");
  const { imageUrl } = useSelector((state) => state.login);
  const { profileImage } = useSelector(
    (state) => state.instituteProfileImageSlice
  );
  const navigate = useNavigate();
  const [ascending, setAscending] = useState(true);
  const [statusAscending, setStatusAscending] = useState(true);
  const [orderType, setOrderType] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const { employerManageJobsFields } = useSelector(
    (state) => state.employerManageJobs
  );

  useEffect(() => {
    setLoaderState(true);
    const _getJobDetails = async () => {
      try {
        const res = await getRecentApplications(
          employerManageJobsFields?.sortData,
          employerManageJobsFields?.pageNumber,
          employerManageJobsFields?.search,
          orderBy,
          orderType
        );
        const status = res?.data?.status;
        if (status) {
          const data = await res?.data?.data;
          // const sortedDataDesc = data.sort(
          //   (a, b) => new Date(b.created_at) - new Date(a.created_at)
          // );
          await setAllJobDetails(data);
          const totalCount = await res?.data?.total_data;
          await dispatch(
            editEmployerManageJobsFields({
              totalData: Math.round(
                totalCount / employerManageJobsFields?.sortData
              ),
            })
          );
          setLoaderState(false);
        } else {
          console.log("Backend Response Failure");
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    _getJobDetails();
  }, [
    employerManageJobsFields?.pageNumber,
    employerManageJobsFields?.sortData,
    employerManageJobsFields?.search,
    statusAscending,
    ascending,
  ]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const onSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchJobs(searchValue);
  };

  // useEffect(() => {
  //   const delay = setTimeout(() => {
  //     // Your API call logic here
  //     getSearchedJobs();
  //   }, 1000); // Adjust the delay time as needed (e.g., 500 milliseconds)

  //   return () => clearTimeout(delay); // Clear the timeout on component unmount or when searchJobs changes
  // }, [searchJobs]);

  // const getSearchedJobs = async () => {
  //   setLoaderState(true)

  //   try {

  //     const authorizationToken = localStorage.getItem('header');
  //     const storedDataObject = JSON.parse(authorizationToken);

  //     if (!authorizationToken) {
  //       // Handle the case where the token is not available
  //       console.error('Authorization token not available');
  //       return;
  //     }

  //     const res = await axios.get(`https://testing.fpsjob.com/institute/job/jobs?title=${searchJobs}`, {
  //       headers: {
  //         Authorization: `Bearer ${storedDataObject}`,
  //       },
  //     });

  //     const status = res?.data?.status;
  //     if (status) {
  //       console.log(res);
  //       const data = res?.data?.data
  //       await setAllJobDetails(data)
  //       setLoaderState(false)
  //     }
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }

  // };

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      {/* <div className=" flex justify-end items-center pt-[20px] mx-[40px]">

        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField onChange={(e) => onSearchChange(e)} className=" bg-[#f1f5f7]" id="outlined-basic" label="Search Jobs" variant="outlined" />

        </Box>
      </div> */}

      <div className="w-[100%] px-[5vw] pt-5 flex gap-2 items-end">
        <JobsSearch />
        <SortDataLength />
      </div>

      {loderState ? (
        <Loader />
      ) : (
        <div className="tabs-box flex flex-col justify-center items-center pb-[40px] pt-[50px]">
          {/* End filter top bar */}

          {/* Start table widget content */}
          <div className="widget-content w-[95%] ">
            <div className="table-outer">
              <div className=" w-[100%] border-[1px] border-[#e8e8e8] border-solid rounded-lg">
                {jobAllDetails.length > 0 && (
                  <div className="w-[100%] h-[10vh] bg-[#f3fbfb] flex px-[30px] rounded-lg">
                    <div className=" w-[20%] flex justify-start items-center h-[100%] font-medium text-[16px] ">
                      <h3>CREATED ON</h3>
                      <div style={{ marginLeft: "5px" }}>
                        {ascending ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            id="arrow-down-wide-short"
                            style={{
                              width: "25px",
                              height: "25px",
                              marginRight: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setAscending(!ascending);
                              setOrderBy("created_at");
                               setOrderType("ASC");
                            }}
                          >
                            <path d="M18 7h9c.55 0 1-.45 1-1s-.45-1-1-1h-9c-.55 0-1 .45-1 1s.45 1 1 1zM18 12h7c.55 0 1-.45 1-1s-.45-1-1-1h-7c-.55 0-1 .45-1 1s.45 1 1 1zM18 17h5c.55 0 1-.45 1-1s-.45-1-1-1h-5c-.55 0-1 .45-1 1s.45 1 1 1zM18 22h3c.55 0 1-.45 1-1s-.45-1-1-1h-3c-.55 0-1 .45-1 1s.45 1 1 1zM18 27h1c.55 0 1-.45 1-1s-.45-1-1-1h-1c-.55 0-1 .45-1 1s.45 1 1 1zM9 4c-.55 0-1 .45-1 1v19.59l-2.29-2.29c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l4 4c.09.09.2.17.33.22.12.05.25.08.38.08s.26-.03.38-.08c.12-.05.23-.12.33-.22l4-4c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0l-2.29 2.29V5c0-.55-.45-1-1-1z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            id="arrow-up-wide-short"
                            style={{
                              width: "25px",
                              height: "25px",
                              marginRight: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setAscending(!ascending);
                              setOrderBy("created_at");
                              setOrderType("DESC");
                            }}
                          >
                            <path d="M18 7h9c.55 0 1-.45 1-1s-.45-1-1-1h-9c-.55 0-1 .45-1 1s.45 1 1 1zM18 12h7c.55 0 1-.45 1-1s-.45-1-1-1h-7c-.55 0-1 .45-1 1s.45 1 1 1zM18 17h5c.55 0 1-.45 1-1s-.45-1-1-1h-5c-.55 0-1 .45-1 1s.45 1 1 1zM18 22h3c.55 0 1-.45 1-1s-.45-1-1-1h-3c-.55 0-1 .45-1 1s.45 1 1 1zM18 27h1c.55 0 1-.45 1-1s-.45-1-1-1h-1c-.55 0-1 .45-1 1s.45 1 1 1zM9 27c.55 0 1-.45 1-1V6.41l2.29 2.29c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41l-4-4c-.09-.09-.2-.17-.33-.22-.12-.05-.25-.08-.38-.08s-.26.03-.38.08c-.12.05-.23.12-.33.22l-4 4c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0L8 6.41V26c0 .55.45 1 1 1z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className=" w-[30%] flex justify-start items-center h-[100%] font-medium text-[16px] ">
                      <h3>JOB TITLE</h3>
                    </div>
                    <div className=" w-[15%] flex justify-start items-center h-[100%] font-medium text-[16px] ">
                      <h3>STATUS</h3>
                      <div style={{ marginLeft: "5px" }}>
                        {statusAscending ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            id="arrow-down-wide-short"
                            style={{
                              width: "25px",
                              height: "25px",
                              marginRight: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setStatusAscending(!statusAscending);
                              setOrderBy("status");
                              setOrderType("ASC");
                            }}
                          >
                            <path d="M18 7h9c.55 0 1-.45 1-1s-.45-1-1-1h-9c-.55 0-1 .45-1 1s.45 1 1 1zM18 12h7c.55 0 1-.45 1-1s-.45-1-1-1h-7c-.55 0-1 .45-1 1s.45 1 1 1zM18 17h5c.55 0 1-.45 1-1s-.45-1-1-1h-5c-.55 0-1 .45-1 1s.45 1 1 1zM18 22h3c.55 0 1-.45 1-1s-.45-1-1-1h-3c-.55 0-1 .45-1 1s.45 1 1 1zM18 27h1c.55 0 1-.45 1-1s-.45-1-1-1h-1c-.55 0-1 .45-1 1s.45 1 1 1zM9 4c-.55 0-1 .45-1 1v19.59l-2.29-2.29c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l4 4c.09.09.2.17.33.22.12.05.25.08.38.08s.26-.03.38-.08c.12-.05.23-.12.33-.22l4-4c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0l-2.29 2.29V5c0-.55-.45-1-1-1z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            id="arrow-up-wide-short"
                            style={{
                              width: "25px",
                              height: "25px",
                              marginRight: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setStatusAscending(!statusAscending);
                              setOrderBy("status");
                               setOrderType("DESC");
                            }}
                          >
                            <path d="M18 7h9c.55 0 1-.45 1-1s-.45-1-1-1h-9c-.55 0-1 .45-1 1s.45 1 1 1zM18 12h7c.55 0 1-.45 1-1s-.45-1-1-1h-7c-.55 0-1 .45-1 1s.45 1 1 1zM18 17h5c.55 0 1-.45 1-1s-.45-1-1-1h-5c-.55 0-1 .45-1 1s.45 1 1 1zM18 22h3c.55 0 1-.45 1-1s-.45-1-1-1h-3c-.55 0-1 .45-1 1s.45 1 1 1zM18 27h1c.55 0 1-.45 1-1s-.45-1-1-1h-1c-.55 0-1 .45-1 1s.45 1 1 1zM9 27c.55 0 1-.45 1-1V6.41l2.29 2.29c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41l-4-4c-.09-.09-.2-.17-.33-.22-.12-.05-.25-.08-.38-.08s-.26.03-.38.08c-.12.05-.23.12-.33.22l-4 4c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0L8 6.41V26c0 .55.45 1 1 1z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className=" w-[20%] flex justify-start items-center h-[100%] font-medium text-[16px] ">
                      <h3>ENGAGEMENT</h3>
                    </div>
                    <div className=" w-[25%] flex justify-center items-center h-[100%] font-medium text-[16px] ">
                      <h3>ACTIONS</h3>
                    </div>
                  </div>
                )}

                {jobAllDetails.length < 1 ? (
                  <div className=" flex flex-col justify-center items-center z-30">
                    {" "}
                    <h2 className=" mt-4 font-medium text-[20px]">
                      No Data, Keep Searching!!!
                    </h2>{" "}
                    <img className=" w-[40%]" src={NODATAPIC} alt="No Data" />
                  </div>
                ) : (
                  <div className="w-[100%] border-[1px] border-[#e8e8e8] border-solid rounded-lg  px-[30px]   ">
                    {jobAllDetails?.map((item) => {
                      return (
                        <div
                          key={item.jobID}
                          className="flex justify-start items-start min-h-[50px] py-4 border-b-[1px] border-l-0 border-r-0 border-t-0 border-solid border-gray-300"
                        >
                          <div className=" w-[20%] flex justify-start items-center h-[100%] font-normal text-[16px] ">
                            <h3>{`${formatDate(item?.created_at)}`}</h3>
                          </div>
                          <div className=" w-[30%] flex flex-col gap-2 justify-start items-start h-[100%] font-medium text-[16px] pr-8 text-[#458d76]">
                            <h3
                              onClick={() =>
                                navigate(
                                  `/candidates-single-v1/${item?.jobID}/""`
                                )
                              }
                              className=" cursor-pointer leading-[1.4em] capitalize "
                            >
                              {item.job_title}
                            </h3>
                            <div className=" w-[100%] flex justify-start gap-2 text-black font-normal text-[15px]">
                              <h4>
                                {item?.min_experience} - {item?.max_experience}{" "}
                                years, {item?.state} - {item?.city}
                              </h4>
                            </div>
                          </div>
                          <div
                            className={`w-[15%] flex justify-start items-center h-[100%] font-normal text-[16px] ${
                              item?.status === 1
                                ? "text-green-700"
                                : "text-red-800"
                            } font-semibold`}
                          >
                            <h3
                              className={`${
                                item?.status === 1
                                  ? "text-green-700"
                                  : "text-red-800"
                              }`}
                            >
                              {item?.status === 1 ? "Active" : "Inactive"}
                            </h3>
                          </div>
                          <div className=" w-[20%] flex justify-start items-center h-[100%] font-normal text-[16px] ">
                            <div className=" w-[100%] flex flex-col justify-start gap-2 text-black font-normal text-[15px]">
                              <h4>{item?.views} Views</h4>
                              <h4
                                onClick={() =>
                                  navigate(
                                    `/candidates-single-v1/${item?.jobID}/applied`
                                  )
                                }
                                className=" text-blue-800 hover:underline cursor-pointer"
                              >
                                {item?.total_new_application} No Activity
                                Application
                              </h4>
                              <h4
                                onClick={() =>
                                  navigate(
                                    `/employers-dashboard/suggested-candidate/${item?.jobID}`
                                  )
                                }
                                className=" text-blue-800 hover:underline cursor-pointer"
                              >
                                Suggested Candidate
                              </h4>
                            </div>
                          </div>
                          <div className=" w-[25%] flex justify-center items-center h-[100%] font-normal text-[16px] gap-3">
                            <EyeIcon
                              onClick={() =>
                                navigate(
                                  `/candidates-single-v1/${item?.jobID}/""`
                                )
                              }
                              className="w-[20px] cursor-pointer"
                            />
                            <PencilLine
                              onClick={() =>
                                navigate(`/edit-job/${item?.jobID}`)
                              }
                              className="w-[20px] cursor-pointer"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* End table widget content */}
        </div>
      )}
      <div className="flex w-[100%] justify-center items-center pb-4">
        <PaginationCandidate />
      </div>
    </>
  );
};

export default JobListingsTable;
