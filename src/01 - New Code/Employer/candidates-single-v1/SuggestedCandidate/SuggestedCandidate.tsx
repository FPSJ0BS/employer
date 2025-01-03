import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import "../Edit Job/Candidates/candidatesApplied.scss";
import {
  BASE_URL,
  getjobDetail,
  getProfile,
  postViewMobileAndEmail,
  suggestedProfileQuery,
} from "../../../../api/apiAxios";
import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { PaginationC } from "../Edit Job/Candidates/ui/PaginationC";
import { editEmployerCandidateData } from "../../Redux/EmployerCandidate.tsx";
import Loader from "../../../../../public/assets/Loader.jsx";

import DefaultAvatar from "../../../../../public/assets/icons/user.png";

import { CustomizedSnackbarTwo } from "../../../Reusable Components/Snackbar/snackbarNew";

import NODATAPIC from "../../../../../public/assets/storyset/Innovation-pana.png";
import { showFirstAndLastLetter } from "../../../../utils/showFirstAndLastLetter";
import { Download, Phone } from "lucide-react";
import OpenToWork from "../../../../../public/assets/profile/opentowork.png";
import "./suggestedProfile.scss";
import { toast } from "react-toastify";
const SuggestedCandidate = () => {
  const notifySuccess = () =>
    toast.success("Request added, We will update you soon...");
  const location = useLocation();
  const [totalDataShow, setTotalDataShow] = useState(null);

  const candidateId = location.pathname.split("/").pop();
  const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
  const [snackbarSuccessMessage, setSnackbarSuccessMessage] = useState("");
  const [jobData, setjobData] = useState<any>({});
  const maskEmail = (email) => {
    if (email) {
      const emailParts = email.split("@");
      const username = emailParts[0];
      const domain = emailParts[1];
      const visibleLength = Math.ceil(username?.length * 0.3);
      const maskedUsername = username.slice(0, visibleLength) + "******";
      return maskedUsername + "@" + domain;
    }
  };

  const [visibleEmails, setVisibleEmails] = useState({});

  const toggleMask = async (id, emailId, email, faculityID) => {
    try {
      const res = await postViewMobileAndEmail({
        // applyID: id,
        view_field: emailId,
        log_type: "suggested_candidate",
        faculityID,
        jobID: candidateId,
      });

      if (res?.data?.status) {
        setVisibleEmails((prev) => ({
          ...prev,
          [email]: !prev[email],
        }));
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const maskMobile = (mobile: number) => {
    if (mobile) {
      const visibleLength = 3; // Number of visible digits
      const maskedMobile = mobile?.slice(0, visibleLength) + "*******";
      return maskedMobile;
    }
  };

  const [visibleMobiles, setVisibleMobiles] = useState({});

  const toggleMaskMobile = async (id, mobileId, index, faculityID) => {
    try {
      const res = await postViewMobileAndEmail({
        // applyID: id,
        view_field: mobileId,
        log_type: "suggested_candidate",
        faculityID,
        jobID: candidateId,
      });

      if (res?.data?.status) {
        setVisibleMobiles((prev) => ({
          ...prev,
          [index]: !prev[index],
        }));
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const params = useParams();
  const handleSuccessCloseSnackbar = () => {
    setSnackbarSuccessOpen(false);
  };
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
  const [snackbarErrorMessage, setSnackbarErrorMessage] = useState("");
  const handleErrorCloseSnackbar = () => {
    setSnackbarErrorOpen(false);
  };
  console.log(params);

  // Snackbar end ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const dispatch = useDispatch();
  const [applicationsArray, setApplicationsArray] = useState([]);
  const [leaderSet, setLoaderSet] = useState(false);
  const { employerEditJob } = useSelector(
    (state: any) => state.employerEditJob
  );
  const {
    employerCandidateData,
    isApplyData,
    allQualificationDataToFilter,
    allTeachingDataToFilter,
  } = useSelector((state: any) => state.employerCandidate);
  const {
    pageNumber,
    sortDataLength,
    minimumSalary,
    maximumSalary,
    minimumExperience,
    maximumExperience,
    noticePeriod,
  } = employerCandidateData;
  const getCandidateList = async () => {
    const qual =
      allQualificationDataToFilter && allQualificationDataToFilter?.length > 0
        ? allQualificationDataToFilter?.[
            allQualificationDataToFilter?.length - 1
          ]
        : "";
    const teachingLevel =
      allTeachingDataToFilter && allTeachingDataToFilter?.length > 0
        ? allTeachingDataToFilter?.[allTeachingDataToFilter?.length - 1]
        : "";
    setLoaderSet(true);
    try {
      const authorizationToken: any = localStorage.getItem("header");
      const storedDataObject = JSON.parse(authorizationToken);

      if (!authorizationToken) {
        // Handle the case where the token is not available
        console.error("Authorization token not available");
        return;
      }

      // const data = !isApplyData
      //   ? {
      //       page: pageNumber,
      //       limit: sortDataLength,
      //       category: Number(jobData?.catID) ? Number(jobData?.catID) : "",
      //       job_function: Number(jobData?.functionID)
      //         ? Number(jobData?.functionID)
      //         : null,
      //       min_experience: Number(jobData?.min_experience)
      //         ? Number(jobData?.min_experience)
      //         : null,
      //       max_experience: Number(jobData?.max_experience)
      //         ? Number(jobData?.max_experience)
      //         : null,
      //       min_salary: Number(jobData?.min_salary)
      //         ? Number(jobData?.min_salary)
      //         : null,
      //       max_salary: Number(jobData?.max_salary)
      //         ? Number(jobData?.max_salary)
      //         : null,
      //       duration_notice_period: noticePeriod,
      //       job_level: jobData?.job_level ? jobData?.job_level : "",
      //       city: jobData?.city ? jobData?.city : "",
      //       state: jobData?.state ? jobData?.state : "",
      //       qualification: String(jobData?.qualification)
      //         ? String(jobData?.qualification)
      //         : "",
      //     }
      //   : {
      //       page: pageNumber,
      //       limit: sortDataLength,
      //       category: Number(employerEditJob?.catID)
      //         ? Number(employerEditJob?.catID)
      //         : "",
      //       job_function: Number(employerEditJob?.functionID)
      //         ? Number(employerEditJob?.functionID)
      //         : null,
      //       min_experience: Number(minimumExperience)
      //         ? Number(minimumExperience)
      //         : null,
      //       max_experience: Number(maximumExperience)
      //         ? Number(maximumExperience)
      //         : null,
      //       min_salary: Number(minimumSalary) ? Number(minimumSalary) : null,
      //       max_salary: Number(maximumSalary) ? Number(maximumSalary) : null,
      //       duration_notice_period: noticePeriod,
      //       job_level: teachingLevel ? teachingLevel : "",
      //       city: employerEditJob?.city ? employerEditJob?.city : "",
      //       state: employerEditJob?.state ? employerEditJob?.state : "",
      //       qualification: String(qual) ? String(qual) : "",
      //     };
      const response = await axios.post(
        `${BASE_URL}/suggested-profile/list`,
        {
          page: pageNumber,
          limit: sortDataLength,
          category: jobData?.catID ? Number(jobData?.catID) : "",
          job_function: Number(jobData?.functionID)
            ? Number(jobData?.functionID)
            : null,
          min_experience: Number(jobData?.min_experience)
            ? Number(jobData?.min_experience)
            : null,
          max_experience: Number(jobData?.max_experience)
            ? Number(jobData?.max_experience)
            : null,
          min_salary: Number(jobData?.min_salary)
            ? Number(jobData?.min_salary)
            : null,
          max_salary: Number(jobData?.max_salary)
            ? Number(jobData?.max_salary)
            : null,
          duration_notice_period: jobData?.noticePeriod,
          job_level: jobData?.job_level ? jobData?.job_level : "",
          city: jobData?.city ? jobData?.city : "",
          state: jobData?.state ? jobData?.state : "",
          qualification: String(jobData?.qualification)
            ? String(jobData?.qualification)
            : "",
        },
        {
          headers: {
            Authorization: `Bearer ${storedDataObject}`,
          },
        }
      );

      if (response.data.status) {
        const totalData = await response?.data?.total_data;
        setTotalDataShow(totalData);
        const data = await response?.data?.data;

        await setApplicationsArray(data);
        dispatch(
          editEmployerCandidateData({
            totalCount: Math.round(
              totalData / employerCandidateData?.sortDataLength
            ),
            statusChangeApi: employerCandidateData?.status,
          })
        );
        setLoaderSet(false);
      } else {
        console.log("total data", response);

        setLoaderSet(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await getjobDetail(params?.jobID);
      if (res?.data?.status) {
        console.log(res?.data?.data[0], ".......");
        setjobData(res?.data?.data[0]);
      }
    };
    if (params?.jobID) {
      fetchData();
    }
  }, [params?.jobID]);

  useEffect(() => {
    if (Object.keys(jobData)?.length > 0) {
      getCandidateList();
    }
  }, [jobData, pageNumber]);

  const handleOpenNewPage = (id, cv) => {
    const link = document.createElement("a");
    link.href = cv;
    link.target = "_blank";
    link.download = "resume.pdf"; // You can set a default file name here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [popupState, setPopupState] = useState(false);

  const [formData, setFormData] = useState({
    jobID: 7080,
    employerID: 42,
    note: "",
  });

  const querySubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await getProfile();

      if (res?.status) {
        const employerID = res?.data?.data?.employerDetails?.employerID;

        setFormData({
          ...formData,
          jobID: Number(candidateId),
          employerID,
        });
      } else {
        console.log("profior", res);
      }
    } catch (error) {}

    try {
      const res = await suggestedProfileQuery(formData);
      if (res?.status) {
        console.log(res, "resformdata");
        closePopup();
        notifySuccess();
      }

      if (res?.status) {
      }
    } catch (error) {
      console.log("error suggested Profile", error);
    }
  };

  const closePopup = () => {
    setFormData({
      ...formData,
      note: "",
    });

    setPopupState(false);
  };

  return (
    <div className="p-3">
      {popupState && (
        <div className=" absolute  h-full w-full z-50 flex justify-center items-start top-10">
          <div className=" bg-white min-h-[100px] w-[600px] shadow-lg rounded-lg fixed p-5">
            <RxCross1
              onClick={() => closePopup()}
              size={20}
              className=" absolute right-2 top-2 cursor-pointer"
            />
            <form
              onSubmit={(e) => querySubmit(e)}
              className=" flex flex-col gap-2 "
            >
              <textarea
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    note: e.target.value,
                  })
                }
                value={formData?.note}
                className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none"
                placeholder="Enter your text here..."
              ></textarea>
              <div className=" w-full p-0 m-0 flex items-center justify-center ">
                <button className=" bg-black w-[30%] text-white rounded-lg ">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className=" flex justify-between items-center flex-row-reverse">
        <div className=" flex gap-3 items-end">
          <p className="text-l font-medium">
            {` *The suggested profile`}{" "}
            <span className=" font-bold underline ">limit</span> for you is
            currently{" "}
            <span className=" font-bold underline">{totalDataShow}</span>.
            Request for more profile....
          </p>
          <button
            onClick={() => setPopupState(true)}
            className=" bg-red-500 w-[150px] font-medium text-white rounded-lg"
          >
            Click Here
          </button>
        </div>

        <h2 className="text-xl font-semibold mt-2">Candidate Suggestions</h2>
      </div>
      <>
        <CustomizedSnackbarTwo
          open={snackbarSuccessOpen}
          autoCloseDuration={4000} // milliseconds
          onClose={handleSuccessCloseSnackbar}
          message={snackbarSuccessMessage}
          severity="success" // or 'success', 'warning', 'info'
          backgroundColor="#344e41" // Custom background color
        />

        <CustomizedSnackbarTwo
          open={snackbarErrorOpen}
          autoCloseDuration={4000} // milliseconds
          onClose={handleErrorCloseSnackbar}
          message={snackbarErrorMessage}
          severity="error" // or 'success', 'warning', 'info'
          backgroundColor="#9d0208" // Custom background color
        />

        {/* <div className=" flex items-end border-b-[2px] border-l-0 border-r-0 border-t-0 border-solid border-gray-600 w-[100%] pb-4">
        {
          <div className="w-[80%] flex gap-4 items-end">
            <div
              onClick={() => {
                dispatch(openFilterSuggestedModal());
                dispatch(
                  editEmployerCandidateData({
                    minimumSalary: null,
                    maximumSalary: null,
                    minimumExperience: null,
                    maximumExperience: null,
                    noticePeriod: "",
                    pageNumber: 1,
                  })
                );
                dispatch(
                  editEmployerEditJob({
                    catID: null,
                    functionID: null,
                    state: "",
                    city: "",
                  })
                );
                dispatch(clearAllFilters());
                dispatch(setHeaderShow(false));
                dispatch(setApplyData(false));
              }}
              className=" cursor-pointer rounded-[5px] text-white bg-[#023047] h-[30px] w-[100px]  flex justify-center items-center"
            >
              Filter
            </div>
            {
              <div className="flex justify-center items-end  w-[20%]  ">
                <div className="w-[100%] flex justify-end items-center mt-4">
                  {(employerCandidateData?.sortDataLength > 10 ||
                    allQualificationDataToFilter.length > 0 ||
                    employerCandidateData?.minimumSalary !== null ||
                    employerCandidateData?.maximumSalary !== null ||
                    employerCandidateData?.minimumExperience !== null ||
                    employerCandidateData?.maximumExperience !== null ||
                    employerEditJob?.catID !== null ||
                    employerEditJob?.functionID !== null ||
                    employerEditJob?.state !== "" ||
                    employerEditJob?.city !== "" ||
                    allTeachingDataToFilter.length > 0 ||
                    employerCandidateData?.noticePeriod.trim() !== "") && (
                    <button
                      type="button"
                      onClick={async () => {
                        await dispatch(
                          editEmployerCandidateData({
                            minimumSalary: null,
                            maximumSalary: null,
                            minimumExperience: null,
                            maximumExperience: null,
                            noticePeriod: "",
                            pageNumber: 1,
                          })
                        );
                        await dispatch(
                          editEmployerEditJob({
                            catID: null,
                            functionID: null,
                            state: "",
                            city: "",
                          })
                        );
                        await dispatch(clearAllFilters());
                        dispatch(setApplyData(false));
                      }}
                      className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                    >
                      <svg
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          strokeWidth="2"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        ></path>
                      </svg>
                      Clear Filter
                    </button>
                  )}
                </div>
              </div>
            }
          </div>
        }
      </div> */}

        {leaderSet ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[100vh] w-full mt-4 ">
            {applicationsArray?.length < 1 ? (
              <div className=" flex flex-col justify-center items-center z-30">
                {" "}
                <h2 className=" font-medium text-[20px]">
                  No Data, Keep Searching!!!
                </h2>{" "}
                <img className=" w-[40%]" src={NODATAPIC} alt="No Data" />
              </div>
            ) : (
              applicationsArray?.map((application: any, index) => {
                return (
                  <div
                    key={application?.applyID}
                    className=" cursor-default relative transition-all duration-500 hover:translate-y-2 w-full min-h-[250px] bg-neutral-50 rounded-lg shadow-xl flex flex-row items-center justify-start gap-4 p-3 before:absolute before:w-full hover:before:top-0 before:duration-500 before:-top-1 before:h-1 "
                  >
                    {/* {schedulePopup[index] && (
                    <div className="z-50 flex flex-col gap-3 justify-center items-center shadow-2xl absolute right-[21vw] xl:right-[21vw] 2xl:right-[19vw] rounded-[10px] w-[500px] min-h-[270px] bg-white border-1 border-solid border-gray-300">
                      <BorderBeam />
                      <div className=" absolute right-2 top-2">
                        <X
                          onClick={() => closeAllPopups()}
                          className="text-red-500 cursor-pointer"
                        />
                      </div>

                      <form
                        onSubmit={(e) =>
                          ScheduleInterviewApi(
                            e,
                            application?.faculityID,
                            application?.applyID
                          )
                        }
                        className="w-[100%] flex justify-center items-center gap-3 flex-col"
                      >
                        <div className="flex w-[80%] gap-3">
                          <ScheduleInterviewDateTime />
                          <ScheduleInterviewType />
                        </div>

                        <div className="flex w-[80%] gap-3">
                          <ScheduleInterviewInterviewer />
                          <ScheduleInterviewNote />
                        </div>

                        <button className="hover:text-white relative px-8 py-2 isolation-auto z-10  before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-[#A12347] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center  text-sm font-semibold  bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                          {loaderSchedule ? (
                            <LoaderCircleButton />
                          ) : (
                            "Schedule Interview"
                          )}
                        </button>
                      </form>
                    </div>
                  )} */}

                    {/* {interviewDetailsPopup[index] && (
                    <div className="postjobHandleScrollbar z-50 flex flex-col gap-3 justify-start items-start p-[15px] shadow-2xl absolute right-[21vw] xl:right-[21vw] 2xl:right-[19vw] rounded-[10px] w-[300px] h-[270px] overflow-y-auto bg-white border-1 border-solid border-gray-300">
                      <BorderBeam />
                      <div className=" absolute right-2 top-2">
                        <X
                          onClick={() => closeAllInterviewDetailsPopups()}
                          className="text-red-500 cursor-pointer"
                        />
                      </div>

                      <div className=" pt-[30px] flex flex-col justify-start gap-3">
                        <div className=" flex gap-2 justify-start items-start w-[100%] border-dashed border-b-[1px] border-l-0 border-r-0 border-t-0 pb-1 border-gray-600">
                          <h3 className=" font-semibold">Interview Date:</h3>
                          <h3>
                            {application?.m_interview_date === null
                              ? "Not Scheduled"
                              : formatDate(application?.m_interview_date)}
                          </h3>
                        </div>

                        <div className=" flex gap-2 justify-start items-start w-[100%] border-dashed border-b-[1px] border-l-0 border-r-0 border-t-0 pb-1 border-gray-600">
                          <h3 className=" font-semibold">Interview Time:</h3>
                          <h3>
                            {application?.m_interview_time === null
                              ? "Not Scheduled"
                              : application?.m_interview_time}
                          </h3>
                        </div>

                        <div className=" flex gap-2 justify-start items-start w-[100%] border-dashed border-b-[1px] border-l-0 border-r-0 border-t-0 pb-1 border-gray-600">
                          <h3 className=" font-semibold">Interview Type:</h3>
                          <h3>
                            {application?.m_interview_event_type === null
                              ? "Not Scheduled"
                              : application?.m_interview_event_type}
                          </h3>
                        </div>

                        <div className=" flex gap-2 justify-start items-start w-[100%] border-dashed border-b-[1px] border-l-0 border-r-0 border-t-0 pb-1 border-gray-600">
                          <h3 className=" font-semibold">Interviewer Name:</h3>
                          <div className=" w-[30%]">
                            <h3>
                              {application?.m_interview_interviewer === null
                                ? "Not Scheduled"
                                : application?.m_interview_interviewer}
                            </h3>
                          </div>
                        </div>

                        <div className=" flex gap-3 justify-start items-start">
                          <h3 className=" font-semibold">Interview Note:</h3>
                          <p>
                            {application?.m_interview_note === null
                              ? "Not Scheduled"
                              : application?.m_interview_note}
                          </p>
                        </div>
                      </div>
                    </div>
                  )} */}

                    <div className=" flex w-[100%]  min-h-[250px] pt-[20px] pb-4 gap-[10px]">
                      <div className="w-[20%]  flex flex-col justify-top gap-4">
                        <div className="relative w-[80px] h-[80px]">
                          {application?.work_status === 1 && (
                            <img
                              className="baseImage w-[80px] h-[80px] rounded-[50%] absolute top-0 left-0 "
                              src={OpenToWork}
                            />
                          )}
                          <img
                            className="opentoworkimage w-[80px] h-[80px] rounded-[50%] absolute top-0 left-0 "
                            src={
                              application?.image
                                ? application?.image
                                : DefaultAvatar
                            }
                          />
                        </div>

                        <a href={`tel:${application?.mobile}`}>
                          <div className="text-[#458d76] hover:text-white cursor-pointer w-[100%] border-1 border-solid border-[#458d76] hover:bg-[#458d76] rounded-[6px] h-[30px] flex justify-center items-center gap-2">
                            <Phone className="w-[15px] " />
                            <h3 className=" font-semibold ">Call</h3>
                          </div>
                        </a>

                        {application?.cv_doc?.trim() !== "" && (
                          <div
                            onClick={() =>
                              handleOpenNewPage(
                                application?.faculityID,
                                application?.cv_doc
                              )
                            }
                            className="text-[#003566] hover:text-white cursor-pointer w-[100%] border-1 border-solid border-[#003566] hover:bg-[#003566] rounded-[6px] h-[30px] flex justify-center items-center gap-2"
                          >
                            <Download className="w-[17px] " />
                            <h3 className=" font-semibold ">CV</h3>
                          </div>
                        )}
                      </div>

                      <div className="ml-1 -mr-1 w-[1%] my-[0px] border-l-[1px] border-r-0 border-t-0 border-b-0 border-dashed border-gray-500"></div>

                      <div className=" flex flex-col gap-2 w-[40%] justify-start items-start  ">
                        <h2 className=" capitalize font-semibold text-[#438e76] text-[22px]">
                          {showFirstAndLastLetter(application?.name)}
                        </h2>
                        <h3 className="font-semibold mt-2">
                          Experience:{" "}
                          <span className="font-normal">
                            {application?.experience} Years
                          </span>
                        </h3>
                        <h3 className="font-semibold">
                          Location:{" "}
                          <span className="font-normal capitalize">
                            {application?.state}, {application?.city}
                          </span>
                        </h3>
                        {/* <h3 key={index} className="font-semibold W-[50%]">
                        Mobile:&nbsp;
                        <span className="font-normal lowercase break-words">
                          {visibleMobiles[index]
                            ? application.mobile
                            : maskMobile(application.mobile)}
                          <br />
                          <span
                            className="bg-[#9b2226] px-2 rounded-md text-[13px] cursor-pointer text-white capitalize  mt-2"
                            onClick={
                              visibleMobiles[index]
                                ? null
                                : () =>
                                    toggleMaskMobile(
                                      application?.applyID,
                                      "mobile",
                                      index
                                    )
                            }
                            style={{
                              cursor: visibleMobiles[index]
                                ? "default"
                                : "pointer",
                            }}
                          >
                            {visibleMobiles[index]
                              ? "View Mobile"
                              : "View Mobile"}
                          </span>
                        </span>
                      </h3> */}
                        <h3 className="font-semibold">
                          Language:{" "}
                          <span className="font-normal">
                            {application?.language === null
                              ? "Not Provided"
                              : application?.language}
                          </span>
                        </h3>
                        {/* <h3 className="font-semibold">
                        Age:{" "}
                        <span className="font-normal">
                          {application?.dob === null
                            ? "Not Provided"
                            : calculateAge(application?.dob)}
                        </span>
                      </h3> */}
                        <h3 className="font-semibold">
                          Current Employer:{" "}
                          <span className="font-normal capitalize">
                            {application?.current_employer?.trim() === ""
                              ? "Not Provided"
                              : application?.current_employer}
                          </span>
                        </h3>
                        <h3 key={index} className="font-semibold W-[50%]">
                          Mobile:&nbsp;
                          <span className="font-normal lowercase break-words">
                            {visibleMobiles[index]
                              ? application.mobile
                              : maskMobile(application.mobile)}
                            <br />
                            <span
                              className="bg-[#9b2226] px-2 rounded-md text-[13px] cursor-pointer text-white capitalize  mt-2"
                              onClick={
                                visibleMobiles[index]
                                  ? null
                                  : () =>
                                      toggleMaskMobile(
                                        application?.applyID,
                                        "mobile",
                                        index,
                                        application?.faculityID
                                      )
                              }
                              style={{
                                cursor: visibleMobiles[index]
                                  ? "default"
                                  : "pointer",
                              }}
                            >
                              {visibleMobiles[index]
                                ? "View Mobile"
                                : "View Mobile"}
                            </span>
                          </span>
                        </h3>
                      </div>

                      <div className="ml-1 -mr-1 w-[1%] my-[0px] border-l-[1px] border-r-0 border-t-0 border-b-0 border-dashed border-gray-500"></div>

                      <div className=" flex flex-col gap-2 w-[40%] pt-[10px]">
                        <h3 key={index} className="font-semibold W-[50%]">
                          Email:&nbsp;
                          <span className="font-normal lowercase break-words">
                            {visibleEmails[index]
                              ? application.email
                              : maskEmail(application.email)}
                            <br />
                            <span
                              className="bg-[#9b2226] px-2 rounded-md text-[13px] cursor-pointer text-white capitalize ml-1 mt-2 "
                              onClick={
                                visibleEmails[index]
                                  ? null
                                  : () =>
                                      toggleMask(
                                        application?.applyID,
                                        "email",
                                        index,
                                        application?.faculityID
                                      )
                              }
                              style={{
                                cursor: visibleEmails[index]
                                  ? "default"
                                  : "pointer",
                              }}
                            >
                              {visibleEmails[index]
                                ? "View Email"
                                : "View Email"}
                            </span>
                          </span>
                        </h3>
                        <h3 className="font-semibold">
                          University:{" "}
                          <span className="font-normal capitalize">
                            {application?.university}
                          </span>
                        </h3>
                        <h3 className="font-semibold">
                          Passing Year:{" "}
                          <span className="font-normal capitalize">
                            {application?.passing_year}
                          </span>
                        </h3>
                        <h3 className="font-semibold">
                          Notice Period:{" "}
                          <span className="font-normal">
                            {application?.duration_notice_period === null
                              ? "Not Provided"
                              : application?.duration_notice_period}
                          </span>
                        </h3>
                        <h3 className="font-semibold">
                          Current Salary:{" "}
                          <span className="font-normal">
                            {application?.salary === null
                              ? "Not Provided"
                              : application?.salary}{" "}
                            {application?.salary === null ? "" : "LPA"}
                          </span>
                        </h3>
                        <h3 className="font-semibold">
                          Expected Salary:{" "}
                          <span className="font-normal">
                            {application?.expected_salary === null
                              ? "Not Provided"
                              : application?.expected_salary}{" "}
                            {application?.expected_salary === null ? "" : "LPA"}
                          </span>
                        </h3>
                      </div>

                      {/* <div className=" flex flex-col gap-2 w-[19%] pt-[10px]">
                      <h3 className="font-semibold">
                        Interview Date:{" "}
                        <span className="font-normal">
                          {application?.m_interview_date === null
                            ? "Not Scheduled"
                            : formatDate(application?.m_interview_date)}
                        </span>
                      </h3>
                      <h3 className="font-semibold">
                        Interview Time:{" "}
                        <span className="font-normal">
                          {application?.m_interview_time === null
                            ? "Not Scheduled"
                            : application?.m_interview_time}
                        </span>
                      </h3>
                      <h3 className="font-semibold">
                        Interview Type:{" "}
                        <span className="font-normal">
                          {application?.m_interview_event_type === null
                            ? "Not Scheduled"
                            : application?.m_interview_event_type}
                        </span>
                      </h3>
                      <h3 className="font-semibold">
                        Interviewer Name:{" "}
                        <span className="font-normal">
                          {application?.m_interview_interviewer === null
                            ? "Not Scheduled"
                            : application?.m_interview_interviewer}
                        </span>
                      </h3>
                      {application?.m_interview_date !== null &&
                        application?.m_interview_time !== null &&
                        application?.m_interview_event_type !== null &&
                        application?.m_interview_note !== null && (
                          <div
                            onClick={() => toggleInterviewDetailsPopup(index)}
                            className="text-white text-center hover:text-white cursor-pointer min-w-[50%] px-2 py-1 border border-solid border-[#023e8a] bg-[#023e8a] rounded-[6px] min-h-[35px] flex justify-center items-center gap-2"
                          >
                            <h3 className="text-[15px] font-semibold">
                              View More
                              <br /> Interview Details
                            </h3>
                          </div>
                        )}

                      <h3 className='font-semibold'>Status: <span className='font-normal'>{application?.cv_doc}</span></h3>
                    </div> */}

                      {/* <div className=" flex flex-col gap-[25px] w-[29%] justify-center items-center">
                      <div className=" w-[100%] bg-[#264653] flex flex-col justify-center items-center rounded-lg">
                        <h3 className="  font-semibold text-white underline pt-1">
                          Status:
                        </h3>
                        <span className="font-normal text-white">
                          {application?.status}
                        </span>
                      </div>

                      <div className="w-[100%]">
                        <CandidateStatusForApi
                          candidaiteId={application?.applyID}
                          getCandidateList={getCandidateList2}
                        />
                      </div>
                      <div className='text-white hover:text-white cursor-pointer min-w-[50%] px-4 border-1 border-solid border-[#432818] bg-[#432818] rounded-[6px] h-[35px] flex justify-center items-center gap-2'>

                                        <CalendarClock className='w-[18px] ' />
                                        <h3 className=' font-semibold '>Schedule Interview</h3>

                                    </div>

                      <div
                        onClick={() => toggleSchedulePopup(index)}
                        type="button"
                        className="text-white hover:text-white cursor-pointer min-w-[50%] px-4 border-1 border-solid border-[#432818] bg-[#432818] rounded-[6px] h-[35px] flex justify-center items-center gap-2"
                      >
                        <CalendarClock className="w-[18px] " />
                        <h3 className=" font-semibold ">
                          {application?.status === "Interview scheduled"
                            ? "Edit Interview Details"
                            : "Schedule Interview"}
                        </h3>
                      </div>

                      <div className="flex flex-col gap-3 w-[100%] justify-center items-center">
                        <div className="w-[100%] flex gap-2">
                          <div
                            onClick={() =>
                              handleStatusChange(
                                "Rejected",
                                application?.applyID,
                                application?.status
                              )
                            }
                            className={`${
                              application?.status === "Rejected"
                                ? "bg-[#a45e5c] text-white cursor-default"
                                : "cursor-pointer"
                            } text-[#a45e5c] hover:text-white  w-[50%] border-1 border-solid border-[#a45e5c] hover:bg-[#a45e5c] rounded-[6px] h-[30px] flex justify-center items-center gap-2`}
                          >
                            {rejectLoader[application?.applyID] ? (
                              <LoaderCircleButton />
                            ) : (
                              <>
                                <CircleXIcon className="w-[17px]" />
                                <h3 className="font-semibold">Reject</h3>
                              </>
                            )}
                          </div>

                          <div
                            onClick={() =>
                              handleStatusChangeAccept(
                                "Profile Shortlisted",
                                application?.applyID,
                                application?.status
                              )
                            }
                            className={`${
                              application?.status === "Profile Shortlisted"
                                ? "bg-[#458d76] text-white cursor-default"
                                : "cursor-pointer"
                            } text-[#458d76] hover:text-white cursor-pointer w-[50%] border-1 border-solid border-[#458d76] hover:bg-[#458d76] rounded-[6px] h-[30px] flex justify-center items-center gap-2`}
                          >
                            {acceptLoader[application?.applyID] ? (
                              <LoaderCircleButton />
                            ) : (
                              <>
                                <CheckCheck className="w-[18px]" />
                                <h3 className="font-semibold">
                                  {application?.status === "Profile Shortlisted"
                                    ? "Shortlisted"
                                    : "Shortlist"}
                                </h3>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div> */}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {applicationsArray?.length > 0 && (
          <div className="w-[100%] flex justify-center items-center mt-[50px]">
            <PaginationC />
          </div>
        )}
      </>
    </div>
  );
};

export default SuggestedCandidate;
