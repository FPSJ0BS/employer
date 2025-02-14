import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import "./candidatesApplied.scss";
import {
  BASE_URL,
  doGetShareProfile,
  postViewMobileAndEmail,
} from "../../../../../api/apiAxios.ts";
import { useLocation, useParams } from "react-router-dom";
import { ShowDataLength } from "./input/pageData.tsx";
import { useSelector, useDispatch } from "react-redux";
import { CadidateStatus } from "./input/candidateStatus.tsx";
import { PaginationCandidate } from "./input/pagination.tsx";
import {
  clearAllFilters,
  editEmployerCandidateData,
} from "../../../Redux/EmployerCandidate.tsx";
import Loader from "../../../../../../public/assets/Loader.jsx";
import { CandidateStatusForApi } from "./input/candidateStatusForApi.tsx";
import { postChangeCandidateStatus } from "../../../../../api/apiAxios.ts";
import DefaultAvatar from "../../../../../../public/assets/icons/user.png";
import {
  Phone,
  CircleXIcon,
  Download,
  CheckCheck,
  CalendarClock,
  X,
} from "lucide-react";
import { LoaderCircleButton } from "./ui/loaderCircleButton.tsx";
import { BorderBeam } from "../../../../MagicUI/BorderBeam/border-beam";

import { ScheduleInterviewDateTime } from "./input/scheduleInterviewDateTime.tsx";
import { ScheduleInterviewType } from "./input/scheduleInterviewType.tsx";
import { ScheduleInterviewInterviewer } from "./input/scheduleInterviewInterviewer.tsx";
import { ScheduleInterviewNote } from "./input/scheduleInterviewNote.tsx";
import { postChangeCandidateScheduleInterview } from "../../../../../api/apiAxios.ts";
import { CustomizedSnackbarTwo } from "../../../../Reusable Components/Snackbar/snackbarNew";
import { CandidateSearch } from "./input/candidateSearch.tsx";
import { openFilterModal } from "../../../Redux/EmployerCandidate.tsx";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import NODATAPIC from "../../../../../../public/assets/storyset/Innovation-pana.png";
import { setDashboardPopupFields, setHeaderShow, setToggleDashboardPopup } from "../../../Redux/EmployerSlice.tsx";
import { formatAMPM } from "../../../../../utils/formatAMPM.ts";
import CandidateUI from "./CandidateUI";

export const CandidatesApplied = () => {
  const location = useLocation();

  // Split the pathname and extract the second part which contains the ID (7080)
  const parts = location.pathname.split('/');
  const candidateId = parts[2]; // This will be "7080"

  const navigate = useNavigate();

  // Snackbar start ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // Snackbar Success

  const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
  const [snackbarSuccessMessage, setSnackbarSuccessMessage] = useState("");

  const handleSuccessCloseSnackbar = () => {
    setSnackbarSuccessOpen(false);
  };

  // Snackbar Error

  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
  const [snackbarErrorMessage, setSnackbarErrorMessage] = useState("");

  const handleErrorCloseSnackbar = () => {
    setSnackbarErrorOpen(false);
  };

  // Snackbar end ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const dispatch = useDispatch();
  const { jobID, status } = useParams();

  const [applicationsArray, setApplicationsArray] = useState([]);

  const [leaderSet, setLoaderSet] = useState(false);
  const {
    employerCandidateData,
    employerCandidateSearchBox,
    applyFiler,
    cityDataToFilter,
    PreferedCityDataToFilter,
    allQualificationDataToFilter,
    allTeachingDataToFilter,
  } = useSelector((state) => state.employerCandidate);
  // useEffect(() => {
  //   if (status === "applied") {
  //     dispatch(
  //       editEmployerCandidateData({
  //         status:"Applied",
  //       })
  //     );
  //   }
  // }, [status]);

  useEffect(() => {
    getCandidateList();
  }, [
    employerCandidateSearchBox?.search,
    employerCandidateData?.status,
    employerCandidateData?.sortDataLength,
    employerCandidateData?.pageNumber,
  ]);

  const clearingAllFilter = async () => {
    await dispatch(
      editEmployerCandidateData({
        sortDataLength: 10,
        pageNumber: 1,
        status: "",
        totalData: null,
        minimumSalary: null,
        maximumSalary: null,
        minimumExperience: null,
        maximumExperience: null,
        minimumAge: null,
        maximumAge: null,
        noticePeriod: "",
        applicationWithinDays: null,
      })
    );
    await clearFilterHitApi();

    if (status === "applied") {
      await navigate(`/candidates-single-v1/${jobID}/""`);
    }
    await dispatch(clearAllFilters());
  };

  const clearFilterHitApi = async () => {
    setLoaderSet(true);
    try {
      const authorizationToken = localStorage.getItem("header");
      const storedDataObject = JSON.parse(authorizationToken);

      if (!authorizationToken) {
        // Handle the case where the token is not available
        console.error("Authorization token not available");
        return;
      }

      const response = await axios.get(
        `${BASE_URL}/job/${jobID}/applied-candidate-list?page=${employerCandidateData?.pageNumber}&limit=${employerCandidateData?.sortDataLength}`,
        {
          headers: {
            Authorization: `Bearer ${storedDataObject}`,
          },
        }
      );

      if (response.data.status) {
        const totalData = await response?.data?.total_data;

        const data = await response?.data?.data;
        console.log(data);
        await setApplicationsArray(data);
        dispatch(
          editEmployerCandidateData({
            totalData: Math.round(
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

  const getCandidateList = async () => {
    console.log("object...........1");
    setLoaderSet(true);
    try {
      const authorizationToken = localStorage.getItem("header");
      const storedDataObject = JSON.parse(authorizationToken);

      if (!authorizationToken) {
        // Handle the case where the token is not available
        console.error("Authorization token not available");
        return;
      }
      const _status =
        status === "applied"
          ? ["Applied"]
          : status === "new"
            ? ["Applied", "Resume Reviewed", "Reviewed By FPS"]
            : employerCandidateData?.status
              ? [employerCandidateData?.status]
              : [];

      const response = await axios.get(
        `${BASE_URL}/job/${jobID}/applied-candidate-list?page=${employerCandidateData?.pageNumber
        }&limit=${employerCandidateData?.sortDataLength
        }&status=${JSON.stringify(_status)}&search=${employerCandidateSearchBox?.search || ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${storedDataObject}`,
          },
        }
      );

      if (response.data.status) {
        const totalData = await response?.data?.total_data;
        const data = await response?.data?.data;
        console.log(data);
        console.log(
          Math.round(totalData / employerCandidateData?.sortDataLength)
        );
        await setApplicationsArray(data);
        dispatch(
          editEmployerCandidateData({
            totalData: Math.round(
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

  const getCandidateList2 = async () => {
    // setLoaderSet(true)
    console.log("object...........2");
    console.log(
      "initiated ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    );

    try {
      const authorizationToken = localStorage.getItem("header");
      const storedDataObject = JSON.parse(authorizationToken);

      if (!authorizationToken) {
        // Handle the case where the token is not available
        console.error("Authorization token not available");
        return;
      }
      const {
        pageNumber,
        sortDataLength,
        status,
        minimumSalary,
        maximumSalary,
        minimumExperience,
        maximumExperience,
        minimumAge,
        maximumAge,
        noticePeriod,
        applicationWithinDays,
      } = employerCandidateData;

      const response = await axios.get(
        `${BASE_URL}/job/${jobID}/applied-candidate-list`,
        {
          headers: {
            Authorization: `Bearer ${storedDataObject}`,
          },
          params: {
            page: pageNumber,
            limit: sortDataLength,
            status: status ? JSON.stringify([status]) : [],
            location: JSON.stringify(cityDataToFilter),
            preferred_location: JSON.stringify(PreferedCityDataToFilter),
            min_salary: minimumSalary || "",
            max_salary: maximumSalary || "",
            qualification: JSON.stringify(allQualificationDataToFilter),
            min_experience: minimumExperience,
            max_experience: maximumExperience,
            min_age: minimumAge,
            max_age: maximumAge,
            teaching_level: JSON.stringify(allTeachingDataToFilter),
            duration_notice_period: noticePeriod,
            application_within_days: applicationWithinDays,
          },
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: "repeat" });
          },
        }
      );

      if (response?.data?.status) {
        const totalData = await response?.data?.total_data;
        const data = await response?.data?.data;
        console.log("filter response", response);
        await setApplicationsArray(data);
        dispatch(
          editEmployerCandidateData({
            totalData: Math.round(
              totalData / employerCandidateData?.sortDataLength
            ),
            statusChangeApi: employerCandidateData?.status,
          })
        );
        setLoaderSet(false);
      } else {
        console.log("filter response", response);
        setLoaderSet(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  useEffect(() => {
    getCandidateList2();
  }, [applyFiler]);
  const handleOpenNewPage = (id, cv) => {
    const link = document.createElement("a");
    link.href = cv;
    link.target = "_blank";
    link.download = "resume.pdf"; // You can set a default file name here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();

    // Pad single digits with leading zero
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  // Reject State and Loader ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

  const [rejectLoader, setRejectLoader] = useState({});

  const handleStatusChange = async (optionn, apply, status) => {
    if (status === "Rejected") {
      return;
    }

    setRejectLoader((prevState) => ({ ...prevState, [apply]: true }));
    try {
      const res = await postChangeCandidateStatus({
        applyID: apply,
        new_status: optionn.toString(),
      });

      if (res?.data.status) {
        setRejectLoader(false);
        getCandidateList2();
        console.log("schedule interbiews", res);
      } else {
        console.log("schedule interbiews", res);

        setRejectLoader(false);
      }
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setRejectLoader((prevState) => ({ ...prevState, [apply]: false }));
    }, 2000);
  };

  // Accept State and Loader ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

  const [acceptLoader, setAcceptLoader] = useState({});

  const handleStatusChangeAccept = async (optionn, apply, status) => {
    if (status === "Selected") {
      return;
    }
    if (status === "applied") {
      return;
    }
    setAcceptLoader((prevState) => ({ ...prevState, [apply]: true }));
    try {
      const res = await postChangeCandidateStatus({
        applyID: apply,
        new_status: optionn.toString(),
      });

      if (res?.data.status) {
        console.log("schedule interbiews", res);

        setAcceptLoader(false);
        getCandidateList2();
      } else {
        console.log("schedule interbiews", res);

        setAcceptLoader(false);
      }
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setAcceptLoader((prevState) => ({ ...prevState, [apply]: false }));
    }, 2000);
  };

  // Schedule Interview Popup ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [schedulePopup, setSchedulePopup] = useState(
    Array(applicationsArray.length).fill(false)
  );

  const toggleSchedulePopup = async (index) => {
    await setInterviewDetailsPopup(Array(applicationsArray.length).fill(false));

    await dispatch(
      editEmployerCandidateData({
        date: "",
        time: "",
        interviewType: "",
        interviewer: "",
        note: "",
      })
    );

    setSchedulePopup((prevState) => {
      const newPopupState = Array(prevState.length).fill(false);
      newPopupState[index] = true;
      return newPopupState;
    });
  };

  const closeAllPopups = async () => {
    await setInterviewDetailsPopup(Array(applicationsArray.length).fill(false));
    await setSchedulePopup(Array(applicationsArray.length).fill(false));

    await dispatch(
      editEmployerCandidateData({
        date: "",
        time: "",
        interviewType: "",
        interviewer: "",
        note: "",
      })
    );
  };

  // Interview Details Popup ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [interviewDetailsPopup, setInterviewDetailsPopup] = useState(
    Array(applicationsArray.length).fill(false)
  );

  const toggleInterviewDetailsPopup = async (index) => {
    await setSchedulePopup(Array(applicationsArray.length).fill(false));

    setInterviewDetailsPopup((prevState) => {
      const newPopupState = Array(prevState.length).fill(false);
      newPopupState[index] = true;
      return newPopupState;
    });
  };

  const closeAllInterviewDetailsPopups = async () => {
    await setInterviewDetailsPopup(Array(applicationsArray.length).fill(false));
    await setSchedulePopup(Array(applicationsArray.length).fill(false));
  };

  // const laoder for schedule interview

  const [loaderSchedule, setLoaderSchedule] = useState(false);

  const ScheduleInterviewApi = async (e, facId, applyIDD) => {
    e.preventDefault();

    try {
      setLoaderSchedule(true);
      const res = await postChangeCandidateScheduleInterview({
        apply_id: applyIDD.toString(),
        candidate_id: facId.toString(),
        job_id: jobID.toString(),
        date: employerCandidateData.date,
        time: employerCandidateData.time,
        event_type: employerCandidateData.interviewType,
        interviewer: employerCandidateData.interviewer,
        note: employerCandidateData.note,
      });

      if (res.data.status) {
        console.log("schedule interbiews", res);
        await setSnackbarSuccessMessage(
          "Interview is Scheduled Successfully..."
        );
        await setSnackbarSuccessOpen(true);
        await closeAllPopups();
        setLoaderSchedule(false);
        await getCandidateList();
      } else {
        console.log("schedule interbiews", res);

        const errMessage = res?.data?.message;
        await setSnackbarErrorMessage(errMessage);
        await setSnackbarErrorOpen(true);
        await closeAllPopups();
        setLoaderSchedule(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const maskEmail = (email) => {
    if (email) {
      const emailParts = email.split("@");
      const username = emailParts[0];
      const domain = emailParts[1];
      const visibleLength = Math.ceil(username.length * 0.3);
      const maskedUsername = username.slice(0, visibleLength) + "******";
      return maskedUsername + "@" + domain;
    }
  };

  const [visibleEmails, setVisibleEmails] = useState({});

  const toggleMask = async (id, emailId, email, faculityID) => {
    try {
      const res = await postViewMobileAndEmail({
        applyID: id,
        view_field: emailId,
        log_type: "job_applied",
        faculityID,
        jobID: candidateId
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

  const maskMobile = (mobile) => {
    if (mobile) {
      const visibleLength = 3; // Number of visible digits
      const maskedMobile = mobile.slice(0, visibleLength) + "*******";
      return maskedMobile;
    }
  };

  const [visibleMobiles, setVisibleMobiles] = useState({});

  const toggleMaskMobile = async (id, mobileId, index, faculityID) => {
    try {
      const res = await postViewMobileAndEmail({
        applyID: id,
        view_field: mobileId,
        log_type: "job_applied",
        faculityID,
        jobID: candidateId
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

  useEffect(() => {

    dispatch(
      setDashboardPopupFields({
        heading: "Are you sure you want to Cancel?",
        buttonTextOne: "Reschedule",
        buttonTextTwo: "Cancel Interview",
        iconOnePercentage: "25%",
        iconTwoPercentage: "25%",
        btnOneTextPl: "50px",
        btnOneTextPr: "30px",
        btnTwoTextPl: "40px",
        btnTwoTextPr: "0px",
      })
    );
  }, [])


  const getShareProfile = async (facID) => {

    try {


      const res = await doGetShareProfile(facID);
      if (res?.data?.status) {

        const url = res?.data?.data?.url;
        window.open(url, "_blank");
      }



    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <CustomizedSnackbarTwo
        open={snackbarSuccessOpen}
        autoCloseDuration={4000}
        onClose={handleSuccessCloseSnackbar}
        message={snackbarSuccessMessage}
        severity="success"
        backgroundColor="#344e41"
      />

      <CustomizedSnackbarTwo
        open={snackbarErrorOpen}
        autoCloseDuration={4000}
        onClose={handleErrorCloseSnackbar}
        message={snackbarErrorMessage}
        severity="error"
        backgroundColor="#9d0208"
      />

      <div className=" flex items-end border-b-[2px] border-l-0 border-r-0 border-t-0 border-solid border-gray-600 w-[100%] pb-4">
        {
          <div className="w-[80%] flex gap-4 items-end">
            <div
              onClick={() => {
                dispatch(openFilterModal());
                dispatch(setHeaderShow(false));
              }}
              className=" cursor-pointer rounded-[5px] text-white bg-[#023047] h-[30px] w-[100px]  flex justify-center items-center"
            >
              Filter
            </div>
            <CandidateSearch />
            <ShowDataLength jobID={jobID} />
            <CadidateStatus jobID={jobID} status={status} />
          </div>
        }

        {
          <div className="flex justify-center items-end  w-[20%]  ">
            <div className="w-[100%] flex justify-end items-center mt-4">
              {(employerCandidateData?.pageNumber > 1 ||
                employerCandidateData?.sortDataLength > 10 ||
                employerCandidateData?.status !== "" ||
                cityDataToFilter.length > 0 ||
                allQualificationDataToFilter.length > 0 ||
                PreferedCityDataToFilter.length > 0 ||
                allQualificationDataToFilter.length > 0 ||
                employerCandidateData?.minimumSalary !== null ||
                employerCandidateData?.maximumSalary !== null ||
                employerCandidateData?.minimumExperience !== null ||
                employerCandidateData?.maximumExperience !== null ||
                employerCandidateData?.minimumAge !== null ||
                employerCandidateData?.maximumAge !== null ||
                allTeachingDataToFilter.length > 0 ||
                employerCandidateData?.noticePeriod.trim() !== "" ||
                employerCandidateData?.applicationWithinDays !== null) && (
                  <button
                    type="button"
                    onClick={() => clearingAllFilter()}
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

      {leaderSet ? (
        <Loader />
      ) : (
        <>
          <CandidateUI interviewDetailsPopup = {interviewDetailsPopup} closeAllInterviewDetailsPopups = {closeAllInterviewDetailsPopups} formatDate = {formatDate} toggleInterviewDetailsPopup = {toggleInterviewDetailsPopup} getShareProfile = {getShareProfile} visibleEmails = {visibleEmails} maskEmail = {maskEmail} toggleMask = {toggleMask} visibleMobiles = {visibleMobiles} maskMobile = {maskMobile} toggleMaskMobile = {toggleMaskMobile} applicationsArray={applicationsArray} getCandidateList2={getCandidateList2} handleStatusChange={handleStatusChange} handleStatusChangeAccept={handleStatusChangeAccept} rejectLoader={rejectLoader} acceptLoader={acceptLoader} schedulePopup={schedulePopup} closeAllPopups={closeAllPopups} ScheduleInterviewApi={ScheduleInterviewApi} loaderSchedule={loaderSchedule} toggleSchedulePopup={toggleSchedulePopup} />
          
        </>
      )}

      {applicationsArray?.length > 0 && (
        <div className="w-[100%] flex justify-center items-center mt-[50px]">
          <PaginationCandidate />
        </div>
      )}
    </>
  );
};
