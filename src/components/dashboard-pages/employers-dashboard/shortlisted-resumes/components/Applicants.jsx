import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from '../../../../../../public/assets/Loader.jsx'
import { BorderBeam } from "../../../../../01 - New Code/MagicUI/BorderBeam/border-beam.tsx";
import { CalendarClock, CheckCheck, CircleXIcon, Download, Phone, X } from "lucide-react";
import { ScheduleInterviewDateTime } from "../../../../../01 - New Code/Employer/candidates-single-v1/Edit Job/Candidates/input/scheduleInterviewDateTime.tsx";
import { ScheduleInterviewType } from "../../../../../01 - New Code/Employer/candidates-single-v1/Edit Job/Candidates/input/scheduleInterviewType.tsx";
import { ScheduleInterviewInterviewer } from "../../../../../01 - New Code/Employer/candidates-single-v1/Edit Job/Candidates/input/scheduleInterviewInterviewer.tsx";
import { ScheduleInterviewNote } from "../../../../../01 - New Code/Employer/candidates-single-v1/Edit Job/Candidates/input/scheduleInterviewNote.tsx";
import { doGetShareProfile, getAllStatus, getjobDetail, postChangeCandidateScheduleInterview, postChangeCandidateStatus, postViewMobileAndEmail } from "../../../../../api/apiAxios.ts";
import { CustomizedSnackbarTwo } from "../../../../../01 - New Code/Reusable Components/Snackbar/snackbarNew";
import { useDispatch, useSelector } from "react-redux";
import { editEmployerCandidateData, setAllStatusData } from "../../../../../01 - New Code/Employer/Redux/EmployerCandidate.tsx";
import { LoaderCircleButton } from "../../../../../01 - New Code/Employer/candidates-single-v1/Edit Job/Candidates/ui/loaderCircleButton";
import DefaultAvatar from '../../../../../../public/assets/icons/user.png'
import { CandidateStatusForApi } from "../../../../../01 - New Code/Employer/candidates-single-v1/Edit Job/Candidates/input/candidateStatusForApi.tsx";
import axios from "axios";
import { BASE_URL } from '../../../../../api/apiAxios.ts'
import qs from 'qs';
import NODATAPIC from "../../../../../../public/assets/storyset/Innovation-pana.png"
import { PaginationCandidate } from "../../../../../01 - New Code/Employer/candidates-single-v1/Edit Job/Candidates/input/pagination.tsx";
import CandidateUI from "@/01 - New Code/Employer/candidates-single-v1/Edit Job/Candidates/CandidateUI.tsx";

const Applicants = () => {

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

  const dispatch = useDispatch()
  const { employerCandidateData, employerCandidateSearchBox, applyFiler, cityDataToFilter, PreferedCityDataToFilter, allQualificationDataToFilter } = useSelector((state) => state.employerCandidate);
  const { jobID, status } = useParams();

  const [applicationsArray, setApplicationsArray] = useState([])
  const [leaderSet, setLoaderSet] = useState(false)

  // const laoder for schedule interview

  const [loaderSchedule, setLoaderSchedule] = useState(false)

  // ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


  const ScheduleInterviewApi = async (e, facId, applyIDD) => {

    e.preventDefault()

    try {
      setLoaderSchedule(true)
      const res = await postChangeCandidateScheduleInterview({
        apply_id: applyIDD.toString(),
        candidate_id: facId.toString(),
        job_id: jobID,
        date: employerCandidateData.date,
        time: employerCandidateData.time,
        event_type: employerCandidateData.interviewType,
        interviewer: employerCandidateData.interviewer,
        note: employerCandidateData.note
      })

      if (res.data.status) {
        await setSnackbarSuccessMessage('Interview is Scheduled Successfully...')
        await setSnackbarSuccessOpen(true);
        await closeAllPopups();
        setLoaderSchedule(false)
        getCandidateList()
      } else {
        const errMessage = res?.data?.message
        await setSnackbarErrorMessage(errMessage);
        await setSnackbarErrorOpen(true);
        await closeAllPopups();
        setLoaderSchedule(false)

      }

    } catch (error) {
      console.log(error);
    }

  }

  // Schedule Interview Popup ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


  const [schedulePopup, setSchedulePopup] = useState(Array(applicationsArray.length).fill(false));

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

    setSchedulePopup(prevState => {
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


  const [interviewDetailsPopup, setInterviewDetailsPopup] = useState(Array(applicationsArray.length).fill(false));

  const toggleInterviewDetailsPopup = async (index) => {

    await setSchedulePopup(Array(applicationsArray.length).fill(false));

    setInterviewDetailsPopup(prevState => {
      const newPopupState = Array(prevState.length).fill(false);
      newPopupState[index] = true;
      return newPopupState;
    });

  };

  const closeAllInterviewDetailsPopups = async () => {
    await setInterviewDetailsPopup(Array(applicationsArray.length).fill(false));
    await setSchedulePopup(Array(applicationsArray.length).fill(false));


  };

  // ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleOpenNewPage = (id, cv) => {
    const link = document.createElement('a');
    link.href = cv;
    link.download = 'resume.pdf'; // You can set a default file name here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCandidateList2 = async () => {
    // setLoaderSet(true)


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
        maximumAge
      } = employerCandidateData;

      const response = await axios.get(`${BASE_URL}/job/${jobID}/applied-candidate-list`, {
        headers: {
          Authorization: `Bearer ${storedDataObject}`,
        },
        params: {
          page: pageNumber,
          limit: sortDataLength,
          status,
          location: JSON.stringify(cityDataToFilter),
          preferred_location: JSON.stringify(PreferedCityDataToFilter),
          min_salary: minimumSalary || "",
          max_salary: maximumSalary || "",
          qualification: JSON.stringify(allQualificationDataToFilter),
          min_experience: minimumExperience,
          max_experience: maximumExperience,
          min_age: minimumAge,
          max_age: maximumAge,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        },
      });


      if (response?.data?.status) {

        const totalData = await response?.data?.total_data;
        const data = await response?.data?.data;
        console.log('filter response->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', response);
        await setApplicationsArray(data);
        dispatch(
          editEmployerCandidateData({
            totalData: Math.round(totalData / employerCandidateData?.sortDataLength),
            statusChangeApi: employerCandidateData?.status
          })
        );
        setLoaderSet(false)
      } else {
        console.log('filter response', response);
        setLoaderSet(false)
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  // ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // Reject State and Loader ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

  const [rejectLoader, setRejectLoader] = useState({});

  const handleStatusChange = async (optionn, apply, status) => {

    if (status === 'Rejected') {
      return
    }


    setRejectLoader(prevState => ({ ...prevState, [apply]: true }));
    try {
      const res = await postChangeCandidateStatus({
        applyID: apply,
        new_status: optionn.toString(),
      });

      if (res?.data.status) {

        setRejectLoader(false);
        getCandidateList();
      } else {

        setRejectLoader(false);
      }
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {

      setRejectLoader(prevState => ({ ...prevState, [apply]: false }));
    }, 2000);
  };

  // Accept State and Loader ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

  const [acceptLoader, setAcceptLoader] = useState({});

  const handleStatusChangeAccept = async (optionn, apply, status) => {

    if (status === 'Selected') {
      return
    }
    if (status === 'applied') {
      return
    }
    setAcceptLoader(prevState => ({ ...prevState, [apply]: true }));
    try {
      const res = await postChangeCandidateStatus({
        applyID: apply,
        new_status: optionn.toString(),
      });

      if (res?.data.status) {

        setAcceptLoader(false);
        getCandidateList();
      } else {

        setAcceptLoader(false);
      }
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {

      setAcceptLoader(prevState => ({ ...prevState, [apply]: false }));
    }, 2000);
  };

  // ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  useEffect(() => {


    getCandidateList()

  }, [employerCandidateSearchBox.search])

  const getCandidateList = async () => {
    setLoaderSet(true)
    try {
      const authorizationToken = localStorage.getItem("header");
      const storedDataObject = JSON.parse(authorizationToken);

      if (!authorizationToken) {
        // Handle the case where the token is not available
        console.error("Authorization token not available");
        return;
      }

      const response = await axios.get(`${BASE_URL}/job/sheduled-interview-list?search=${employerCandidateSearchBox.search}`, {
        headers: {
          Authorization: `Bearer ${storedDataObject}`,
        },
      });

      if (response.data.status) {


        const data = await response?.data?.data;
        console.log(response?.data?.data);

        await setApplicationsArray(data);


        setLoaderSet(false)
      } else {


        setLoaderSet(false)
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };


  // const candidate = candidates.find((item) => item.id == id) || candidate[0];


  useEffect(() => {
    // setLoaderState(true);
    const fetchData = async () => {
      try {
        const jobDetailResponse = await getjobDetail(jobID);
        if (jobDetailResponse?.data?.status) {
          const jobData = await jobDetailResponse?.data?.data[0];


          await fetchData2(jobData?.catID);


        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [jobID]);

  const fetchData2 = async (cat) => {


    try {

      const [allStatusList] = await Promise.all([

        getAllStatus(cat)

      ]);

      // Check if all responses are OK
      if (allStatusList?.data?.status) {



        const allStatus = allStatusList?.data?.data
        console.log('all status', allStatus, cat);

        await dispatch(setAllStatusData(allStatus))



      } else {
        console.log('error in api');

      }

    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCandidateList()
  }, [])

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

  const maskEmail = (email) => {
    if (email) {
      const emailParts = email.split('@');
      const username = emailParts[0];
      const domain = emailParts[1];
      const visibleLength = Math.ceil(username.length * 0.3);
      const maskedUsername = username.slice(0, visibleLength) + '******';
      return maskedUsername + '@' + domain;
    }
  };



  const [visibleEmails, setVisibleEmails] = useState({});

  const toggleMask = async (id, emailId, email, faculityID, candidateId) => {

    try {
      const res = await postViewMobileAndEmail({
        applyID: id,
        view_field: emailId,
        log_type: "job_applied",
        faculityID,
        jobID: candidateId
      })

      if (res?.data?.status) {
        setVisibleEmails((prev) => ({
          ...prev,
          [email]: !prev[email]
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
      const maskedMobile = mobile.slice(0, visibleLength) + '*******';
      return maskedMobile;
    }
  };

  const [visibleMobiles, setVisibleMobiles] = useState({});

  const toggleMaskMobile = async (id, mobileId, index, faculityID, candidateId) => {
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
          [index]: !prev[index]
        }));
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

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



      {leaderSet ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-4 min-h-[100vh] w-[100%] mt-4">
          {applicationsArray?.length < 1 ? (
            <div className="flex flex-col justify-center items-center z-30">
              <h2 className="font-medium text-[20px]">No Data, Keep Searching!!!</h2>
              <img
                className="w-[40%]"
                src={NODATAPIC}
                alt="No Data"
              />
            </div>
          ) : (
            <CandidateUI
              interviewDetailsPopup={interviewDetailsPopup}
              closeAllInterviewDetailsPopups={closeAllInterviewDetailsPopups}
              formatDate={formatDate}
              toggleInterviewDetailsPopup={toggleInterviewDetailsPopup}
              getShareProfile={getShareProfile}
              visibleEmails={visibleEmails}
              maskEmail={maskEmail}
              toggleMask={toggleMask}
              visibleMobiles={visibleMobiles}
              maskMobile={maskMobile}
              toggleMaskMobile={toggleMaskMobile}
              applicationsArray={applicationsArray}
              getCandidateList2={getCandidateList2}
              handleStatusChange={handleStatusChange}
              handleStatusChangeAccept={handleStatusChangeAccept}
              rejectLoader={rejectLoader}
              acceptLoader={acceptLoader}
              schedulePopup={schedulePopup}
              closeAllPopups={closeAllPopups}
              ScheduleInterviewApi={ScheduleInterviewApi}
              loaderSchedule={loaderSchedule}
              toggleSchedulePopup={toggleSchedulePopup}
            />
          )}
        </div>
      )}


      {applicationsArray?.length > 0 && <div className='w-[100%] flex justify-center items-center mt-[50px]'>
        <PaginationCandidate />
      </div>}
    </>
  );
};

export default Applicants;
