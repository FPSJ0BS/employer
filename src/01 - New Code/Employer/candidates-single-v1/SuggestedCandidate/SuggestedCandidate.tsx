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
import { Dot, Download, Phone } from "lucide-react";
import OpenToWork from "../../../../../public/assets/profile/opentowork.png";
import "./suggestedProfile.scss";
import { toast } from "react-toastify";
import BuildingIcon from "../../../../../public/assets/candidates/office-building.png";
import EducationIcon from "../../../../../public/assets/candidates/education.png";
import LanguageIcon from "../../../../../public/assets/candidates/translate.png";




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
  const { id } = useParams();
  console.log("id",params?.jobID);

  // Snackbar end ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const dispatch = useDispatch();
  const [applicationsArray, setApplicationsArray] = useState([]);
  console.log('applicationsArray',applicationsArray);
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
          jobId : params?.jobID,
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
        console.log("response",response);
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

  console.log('applicationsArrayapplicationsArray',applicationsArray);

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
          <div className="flex flex-col gap-4  w-full mt-4 -ml-8 sm:ml-0">
            {applicationsArray?.length < 1 ? (
              <div className=" flex flex-col justify-center items-center z-30">
                {" "}
                <h2 className=" font-medium text-[20px]">
                  No Data, Keep Searching!!!
                </h2>{" "}
                <img className=" w-[40%]" src={NODATAPIC} alt="No Data" />
              </div>
            ) : (
              applicationsArray?.map((application, index) => {
                return (
                  <>
                    {" "}
                    <div
                      key={application?.faculityID}
                      style={{ position: "relative" }}
                      className=" flex-col cursor-default relative transition-all duration-500 hover:translate-y-2 w-full min-h-[50px] bg-[#fafafa] rounded-[20px] shadow-xl flex  items-start justify-start gap-4  before:absolute before:w-full hover:before:top-0 before:duration-500 before:-top-1 before:h-1 "
                    >

                      <div className=" px-3  w-full min-h-[100px] py-4 gap-2 flex flex-col lg:flex-row items-center border-b-2 border-solid border-[#e4e4e4] border-t-0 border-r-0 border-l-0">
                        <div className=" w-full lg:w-[70%] h-full flex  items-center gap-2 ">
                          <div className=" lg:w-[10%] h-full flex justify-start items-center">
                            <img
                              alt="profile-image"
                              className="w-[80px] h-[80px] rounded-[50%]"
                              src={application?.image || DefaultAvatar}
                            />
                          </div>
                          <div className=" lg:w-[90%] h-full flex flex-col justify-center items-start gap-2">
                            <div className="flex items-center">
                            <h2 className="font-semibold text-[20px] capitalize">
                                {application?.name
                                  ? `${application.name.slice(
                                      0,
                                      3
                                    )}${"*".repeat(
                                      application.name.length - 3
                                    )}`
                                  : ""}
                              </h2>
                              
                             
                            </div>
                            <div className="flex w-fit gap-4 text-[#636363] text-[15px]">
                             {application?.gender && <div className="flex gap-0 items-center  text-[14px]">
                                <Dot /> {application?.gender}
                              </div>}
                              <div className="flex gap-0 items-center  text-[14px]">
                                <Dot /> {application?.city},{" "}
                                {application?.state}
                              </div>
                              {application?.salary && <div className="flex gap-0 items-center  text-[14px]">
                                <Dot /> {application?.salary} LPA
                              </div>}
                            </div>
                            {application?.profile_match && <div
                        className={`${
                          application?.profile_match < 50
                            ? "bg-[#ffc300] text-black"
                            : application?.profile_match < 75
                            ? "bg-[#ff7b00] text-black"
                            : "bg-[#55a630] text-black"
                        } px-3 rounded-[30px] text-[14px] font-semibold cursor-default`}
                      >
                        Profile Matched {application?.profile_match}%
                      </div>}
                          </div>
                        </div>
                        <div className=" w-full lg:w-[30%] h-full flex flex-col gap-2 items-start">
                         
                          <div className=" flex">
                            <h3 key={index} className="font-semibold W-[50%]">
                              <span className="font-normal lowercase break-words">
                                {visibleMobiles[index]
                                  ? application.mobile
                                  : maskMobile(application.mobile)}
                                <br />
                                <span
                                  className="bg-[#9b2226] px-2 rounded-md text-[13px] cursor-pointer text-white capitalize  mt-2"
                                  onClick={
                                    visibleMobiles[index]
                                      ? () =>
                                          toggleMaskMobile(
                                            application?.applyID,
                                            "mobile",
                                            index,
                                            application?.faculityID
                                          )
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
                                      ? "pointer"
                                      : "pointer",
                                  }}
                                >
                                  {visibleMobiles[index]
                                    ? "Hide Mobile"
                                    : "View Mobile"}
                                </span>
                              </span>
                            </h3>

                            <h3 key={index} className="font-semibold W-[50%]">
                              <span className="font-normal lowercase break-words">
                                {visibleEmails[index]
                                  ? application.email
                                  : maskEmail(application.email)}
                                <br />
                                <span
                                  className="bg-[#9b2226] px-2 rounded-md text-[13px] cursor-pointer text-white capitalize ml-1 mt-2"
                                  onClick={
                                    visibleEmails[index]
                                      ? () =>
                                          toggleMask(
                                            application?.applyID,
                                            "email",
                                            index,
                                            application?.faculityID
                                          )
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
                                      ? "pointer"
                                      : "pointer",
                                  }}
                                >
                                  {visibleEmails[index]
                                    ? "Hide Email"
                                    : "View Email"}
                                </span>
                              </span>
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}

                      <div className=" flex flex-col gap-2 w-full px-3 pb-2 ">
                        {application?.education_data?.length > 0 && (
                          <div className="flex items-start justify-start w-full">
                            <div className="flex gap-3 w-[18%]">
                              <div className=" w-fit">
                                <img
                                  alt="building"
                                  width={"28px"}
                                  src={BuildingIcon}
                                />
                              </div>
                              <div className="flex justify-start items-start w-fit">
                                <p className=" text-[#464646] font-semibold leading-[1.2em] sm:leading-[1.8em]">
                                  Current Education
                                </p>
                              </div>
                            </div>

                            <div className="w-[82%] flex flex-col gap-0 items-start">
                              <div className=" flex items-center gap-2 w-fit">
                                <p className=" text-[#464646] font-medium m-0">
                                  {
                                    application?.education_data[0]
                                      ?.institute_name
                                  }
                                </p>

                                <div className="flex gap-0 items-center text-[#464646] font-normal">
                                  <Dot className=" -mr-1" /> Joined in{" "}
                                  {application?.education_data[0]?.start_date}
                                </div>
                              </div>
                              <p className=" text-[#464646] font-normal m-0">
                                {application?.education_data[0]?.course_txt}
                              </p>
                            </div>
                          </div>
                        )}

                        {application?.experience_data?.length > 0 && (
                          <div className="flex items-start justify-start w-full">
                            <div className="flex gap-3 w-[18%]">
                              <div className=" w-fit">
                                <img
                                  alt="building"
                                  width={"25px"}
                                  src={EducationIcon}
                                />
                              </div>
                              <div className="flex justify-start items-center w-fit">
                                <p className=" text-[#464646] font-semibold leading-[1.2em] sm:leading-[1.8em]">
                                  Current Working
                                </p>
                              </div>
                            </div>

                            <div className="w-[82%] flex flex-col gap-0">
                              <div className=" flex items-center gap-2 w-fit">
                                <p className=" text-[#464646] font-medium m-0">
                                  {
                                    application?.experience_data[0]
                                      ?.organization
                                  }
                                </p>

                                <div className="flex gap-0 items-center text-[#464646] font-normal">
                                  <Dot className=" -mr-1" /> Joined in{" "}
                                  {application?.experience_data[0]?.start_date}
                                </div>
                              </div>
                              <p className=" text-[#464646] font-normal m-0">
                                {application?.experience_data[0]?.designation}
                              </p>
                            </div>
                          </div>
                        )}

                        {application?.language_data?.length > 0 && (
                          <div className="flex items-start justify-start w-full">
                            <div className="flex gap-3 w-[18%]">
                              <div className=" w-fit">
                                <img
                                  alt="building"
                                  width={"25px"}
                                  src={LanguageIcon}
                                />
                              </div>
                              <div className="flex justify-start items-center w-fit">
                                <p className=" text-[#464646] font-semibold leading-[1.2em] sm:leading-[1.8em]">
                                  Language
                                </p>
                              </div>
                            </div>

                            <div className="w-[82%] flex flex-col gap-0">
                              <div className=" flex items-center gap-2 w-fit">
                                {application?.language_data?.map(
                                  (item, index) => {
                                    return (
                                      <div
                                        key={index}
                                        className="flex gap-0 items-center text-[#464646] font-normal -ml-2"
                                      >
                                        <Dot className=" -mr-1" />{" "}
                                        {item?.language_text}
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Skills */}

                     {application?.skill_data.length > 0 &&  <div className="px-3 flex flex-wrap gap-x-4 gap-y-4 min-h-[50px] -mt-5">
                        {application?.skill_data?.map((item, index) => {
                          return (
                            <p
                              className="bg-[#fae0cc] px-4 py-0 rounded-[30px] m-0 text-[#a05c2f] font-medium"
                              key={index}
                            >
                              {item?.skill}
                            </p>
                          );
                        })}
                      </div>}

                      
                    </div>
                  </>
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
