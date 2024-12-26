import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from '../../../../../../public/assets/Loader.jsx'
import { BorderBeam } from "../../../../../01 - New Code/MagicUI/BorderBeam/border-beam.tsx";
import { CalendarClock, CheckCheck, CircleXIcon, Download, Phone, X } from "lucide-react";
import { ScheduleInterviewDateTime } from "../../../../../01 - New Code/Employer/candidates-single-v1/Edit Job/Candidates/input/scheduleInterviewDateTime.tsx";
import { ScheduleInterviewType } from "../../../../../01 - New Code/Employer/candidates-single-v1/Edit Job/Candidates/input/scheduleInterviewType.tsx";
import { ScheduleInterviewInterviewer } from "../../../../../01 - New Code/Employer/candidates-single-v1/Edit Job/Candidates/input/scheduleInterviewInterviewer.tsx";
import { ScheduleInterviewNote } from "../../../../../01 - New Code/Employer/candidates-single-v1/Edit Job/Candidates/input/scheduleInterviewNote.tsx";
import { getAllStatus, getjobDetail, postChangeCandidateScheduleInterview, postChangeCandidateStatus, postViewMobileAndEmail } from "../../../../../api/apiAxios.ts";
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
    if(email){
        const emailParts = email.split('@');
    const username = emailParts[0];
    const domain = emailParts[1];
    const visibleLength = Math.ceil(username.length * 0.3);
    const maskedUsername = username.slice(0, visibleLength) + '******';
    return maskedUsername + '@' + domain;
    }
};



  const [visibleEmails, setVisibleEmails] = useState({});

  const toggleMask = async (id, emailId, email,faculityID,candidateId) => {

    try {
      const res = await postViewMobileAndEmail({
        applyID: id,
        view_field: emailId,
        log_type: "job_applied",
        faculityID,
        jobID:candidateId
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

  const toggleMaskMobile = async (id, mobileId, index,faculityID,candidateId) => {
    try {
      const res = await postViewMobileAndEmail({
        applyID: id,
        view_field: mobileId,
        log_type: "job_applied",
        faculityID,
        jobID:candidateId
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



      {leaderSet ? <Loader /> : <div className='flex flex-col gap-4 min-h-[100vh] w-[100%] 2xl:w-[950px] mt-4 '>


        {applicationsArray?.length < 1 ? (<div className=' flex flex-col justify-center items-center z-30'> <h2 className=' font-medium text-[20px]'>No Data, Keep Searching!!!</h2> <img className=' w-[40%]' src={NODATAPIC} alt='No Data' /></div>) : (applicationsArray?.map((application, index) => {

          return (

            <div key={application?.applyID}
              className=" cursor-default relative transition-all duration-500 hover:translate-y-2 w-[100%] 2xl:w-[120%] min-h-[250px] bg-neutral-50 rounded-lg shadow-xl flex flex-row items-center justify-start gap-4 p-3 before:absolute before:w-full hover:before:top-0 before:duration-500 before:-top-1 before:h-1 "
            >

              {schedulePopup[index] && (
                <div className='z-50 flex flex-col gap-3 justify-center items-center shadow-2xl absolute right-[21vw] xl:right-[21vw] 2xl:right-[19vw] rounded-[10px] w-[500px] min-h-[270px] bg-white border-1 border-solid border-gray-300'>
                  <BorderBeam />
                  <div className=' absolute right-2 top-2'>
                    <X onClick={() => closeAllPopups()} className='text-red-500 cursor-pointer' />
                  </div>


                  <form onSubmit={(e) => ScheduleInterviewApi(e, application?.faculityID, application?.applyID)} className='w-[100%] flex justify-center items-center gap-3 flex-col'>
                    <div className='flex w-[80%] gap-3'>
                      <ScheduleInterviewDateTime />
                      <ScheduleInterviewType />
                    </div>

                    <div className='flex w-[80%] gap-3'>
                      <ScheduleInterviewInterviewer />
                      <ScheduleInterviewNote />
                    </div>

                    <button
                      className="hover:text-white relative px-8 py-2 isolation-auto z-10  before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-[#A12347] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center  text-sm font-semibold  bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {loaderSchedule ? (<LoaderCircleButton />) : 'Schedule Interview'}
                    </button>
                  </form>




                </div>
              )}

              {interviewDetailsPopup[index] && (
                <div className='postjobHandleScrollbar z-50 flex flex-col gap-3 justify-start items-start p-[15px] shadow-2xl absolute right-[21vw] xl:right-[21vw] 2xl:right-[19vw] rounded-[10px] w-[300px] h-[270px] overflow-y-auto bg-white border-1 border-solid border-gray-300'>
                  {/* <BorderBeam /> */}
                  <div className=' absolute right-2 top-2'>
                    <X onClick={() => closeAllInterviewDetailsPopups()} className='text-red-500 cursor-pointer' />
                  </div>

                  <div className=' pt-[30px] flex flex-col justify-start gap-3'>
                    <div className=' flex gap-2 justify-start items-start w-[100%] border-dashed border-b-[1px] border-l-0 border-r-0 border-t-0 pb-1 border-gray-600'>
                      <h3 className=' font-semibold'>Interview Date:</h3>
                      <h3>{application?.m_interview_date === null ? 'Not Scheduled' : formatDate(application?.m_interview_date)}</h3>
                    </div>

                    <div className=' flex gap-2 justify-start items-start w-[100%] border-dashed border-b-[1px] border-l-0 border-r-0 border-t-0 pb-1 border-gray-600'>
                      <h3 className=' font-semibold'>Interview Time:</h3>
                      <h3>{application?.m_interview_time === null ? 'Not Scheduled' : application?.m_interview_time}</h3>
                    </div>

                    <div className=' flex gap-2 justify-start items-start w-[100%] border-dashed border-b-[1px] border-l-0 border-r-0 border-t-0 pb-1 border-gray-600'>
                      <h3 className=' font-semibold'>Interview Type:</h3>
                      <h3>{application?.m_interview_event_type === null ? 'Not Scheduled' : application?.m_interview_event_type}</h3>
                    </div>

                    <div className=' flex gap-2 justify-start items-start w-[100%] border-dashed border-b-[1px] border-l-0 border-r-0 border-t-0 pb-1 border-gray-600'>
                      <h3 className=' font-semibold'>Interviewer Name:</h3>
                      <div className=' w-[30%]'><h3>{application?.m_interview_interviewer === null ? 'Not Scheduled' : application?.m_interview_interviewer}</h3></div>
                    </div>

                    <div className=' flex gap-3 justify-start items-start'>
                      <h3 className=' font-semibold'>Interview Note:</h3>
                      <p>{application?.m_interview_note === null ? 'Not Scheduled' : application?.m_interview_note}</p>
                    </div>



                  </div>




                </div>
              )}

              <div className=' flex w-[100%]  min-h-[250px] pt-[20px] pb-4 gap-[10px]'>
                <div className='w-[10%]  flex flex-col justify-top gap-4'>

                  <img className='w-[80px] h-[80px] rounded-[50%]' src={DefaultAvatar} />
                  <a href={`tel:${application?.mobile}`}>
                    <div className='text-[#458d76] hover:text-white cursor-pointer w-[100%] border-1 border-solid border-[#458d76] hover:bg-[#458d76] rounded-[6px] h-[30px] flex justify-center items-center gap-2'>

                      <Phone className='w-[15px] ' />
                      <h3 className=' font-semibold '>Call</h3>
                    </div>

                  </a>


                  {application?.cv_doc?.trim() !== "" && <div onClick={() => handleOpenNewPage(application?.faculityID, application?.cv_doc)} className='text-[#003566] hover:text-white cursor-pointer w-[100%] border-1 border-solid border-[#003566] hover:bg-[#003566] rounded-[6px] h-[30px] flex justify-center items-center gap-2'>

                    <Download className='w-[17px] ' />
                    <h3 className=' font-semibold '>CV</h3>

                  </div>}

                </div>

                <div className='ml-1 -mr-1 w-[1%] my-[0px] border-l-[1px] border-r-0 border-t-0 border-b-0 border-dashed border-gray-500'></div>

                <div className=' flex flex-col gap-2 w-[19%] justify-start items-start  '>

                  <h2 className=' capitalize font-semibold text-[#438e76] text-[22px]'>{application?.name}</h2>
                  <h3 className='font-semibold mt-2'>Experience: <span className='font-normal'>{application?.experience} Years</span></h3>
                  <h3 className='font-semibold'>Location: <span className='font-normal capitalize'>{application?.state}, {application?.city}</span></h3>
                  <h3 key={index} className='font-semibold W-[50%]'>
                    Mobile:&nbsp;
                    <span className='font-normal lowercase break-words'>
                      {visibleMobiles[index] ? application.mobile : maskMobile(application.mobile)}
                      <br />
                      <span
                        className='bg-[#9b2226] px-2 rounded-md text-[13px] cursor-pointer text-white capitalize  mt-2'
                        onClick={visibleMobiles[index] ? () => toggleMaskMobile(application?.applyID, "mobile", index,application?.faculityID, application?.jobID) : () => toggleMaskMobile(application?.applyID, "mobile", index,application?.faculityID, application?.jobID)}
                        style={{ cursor: visibleMobiles[index] ? 'pointer' : 'pointer' }}
                      >
                        {visibleMobiles[index] ? 'Hide Mobile' : 'View Mobile'}
                      </span>
                    </span>
                  </h3>
                  {/* <h3 className='font-semibold'>Email: <span className='font-normal'>{application?.email === null ? 'Not Provided' : application?.email}</span></h3> */}
                  <h3 className='font-semibold'>Language: <span className='font-normal'>{application?.language === null ? 'Not Provided' : application?.language}</span></h3>
                  <h3 className='font-semibold'>Age: <span className='font-normal'>{application?.dob === null ? 'Not Provided' : calculateAge(application?.dob)}</span></h3>
                  <h3 className='font-semibold'>Current Employer: <span className='font-normal capitalize'>{application?.current_employer?.trim() === '' ? 'Not Provided' : application?.current_employer}</span></h3>



                </div>

                <div className='ml-1 -mr-1 w-[1%] my-[0px] border-l-[1px] border-r-0 border-t-0 border-b-0 border-dashed border-gray-500'></div>

                <div className=' flex flex-col gap-2 w-[19%] pt-[10px]'>
                  <h3 key={index} className='font-semibold W-[50%]'>
                    Email:&nbsp;
                    <span className='font-normal lowercase break-words'>
                      {visibleEmails[index] ? application.email : maskEmail(application.email)}
                      <span
                        className='bg-[#9b2226] px-2 rounded-md text-[13px] cursor-pointer text-white capitalize ml-1 mt-2'
                        onClick={visibleEmails[index] ? () => toggleMask(application?.applyID, "email", index, application?.faculityID, application?.jobID,) : () => toggleMask(application?.applyID, "email", index, application?.faculityID, application?.jobID,)}
                        style={{ cursor: visibleEmails[index] ? 'pointer' : 'pointer' }}
                      >
                        {visibleEmails[index] ? 'Hide Email' : 'View Email'}
                      </span>
                    </span>
                  </h3>
                  <h3 className='font-semibold'>University: <span className='font-normal capitalize'>{application?.university}</span></h3>
                  <h3 className='font-semibold'>Passing Year: <span className='font-normal capitalize'>{application?.passing_year}</span></h3>

                  <h3 className='font-semibold'>Notice Period: <span className='font-normal'>{application?.duration_notice_period === null ? 'Not Provided' : application?.duration_notice_period}</span></h3>
                  <h3 className='font-semibold'>Current Salary: <span className='font-normal'>{application?.salary === null ? 'Not Provided' : application?.salary} {application?.salary === null ? '' : 'LPA'}</span></h3>
                  <h3 className='font-semibold'>Expected Salary: <span className='font-normal'>{application?.expected_salary === null ? 'Not Provided' : application?.expected_salary} {application?.expected_salary === null ? '' : 'LPA'}</span></h3>






                </div>

                <div className='ml-1 -mr-1 w-[1%] my-[0px] border-l-[1px] border-r-0 border-t-0 border-b-0 border-dashed border-gray-500'></div>

                <div className=' flex flex-col gap-2 w-[19%] pt-[10px]'>

                  <h3 className='font-semibold'>Interview Date: <span className='font-normal'>{application?.m_interview_date === null ? 'Not Scheduled' : formatDate(application?.m_interview_date)}</span></h3>
                  <h3 className='font-semibold'>Interview Time: <span className='font-normal'>{application?.m_interview_time === null ? 'Not Scheduled' : application?.m_interview_time}</span></h3>
                  <h3 className='font-semibold'>Interview Type: <span className='font-normal'>{application?.m_interview_event_type === null ? 'Not Scheduled' : application?.m_interview_event_type}</span></h3>
                  <h3 className='font-semibold'>Interview Note: <span className='font-normal'>{application?.m_interview_note === null ? 'Not Scheduled' : application?.m_interview_note}</span></h3>
                  <div onClick={() => toggleInterviewDetailsPopup(index)} type="button" className='text-white text-center hover:text-white cursor-pointer min-w-[50%] px-2 py-1 border-1 border-solid border-[#023e8a] bg-[#023e8a] rounded-[6px] min-h-[35px] flex justify-center items-center gap-2'>


                    <h3 className='text-[15px] font-semibold '>View More<br /> Interview Details</h3>

                  </div>
                  {/* <h3 className='font-semibold'>Status: <span className='font-normal'>{application?.cv_doc}</span></h3> */}


                </div>

                <div className='ml-1 -mr-1 w-[1%] my-[0px] border-l-[1px] border-r-0 border-t-0 border-b-0 border-dashed border-gray-500'></div>

                <div className=' flex flex-col gap-[25px] w-[29%] justify-center items-center'>

                  <div className=' w-[100%] bg-[#264653] flex flex-col gap-0 justify-center items-center rounded-lg'>
                    <h3 className='  font-semibold text-white underline pt-1'>Status:</h3>
                    <span className='font-normal text-white'>{application?.status}</span>
                  </div>

                  {/* <div className='w-[100%]'>

                    <CandidateStatusForApi candidaiteId={application?.applyID} getCandidateList={getCandidateList2} />

                  </div> */}
                  {/* <div className='text-white hover:text-white cursor-pointer min-w-[50%] px-4 border-1 border-solid border-[#432818] bg-[#432818] rounded-[6px] h-[35px] flex justify-center items-center gap-2'>

                                        <CalendarClock className='w-[18px] ' />
                                        <h3 className=' font-semibold '>Schedule Interview</h3>

                                    </div> */}


                  <div onClick={() => toggleSchedulePopup(index)} type="button" className='text-white hover:text-white cursor-pointer min-w-[50%] px-4 border-1 border-solid border-[#432818] bg-[#432818] rounded-[6px] h-[35px] flex justify-center items-center gap-2'>

                    <CalendarClock className='w-[18px] ' />
                    <h3 className=' font-semibold '>{application?.status === "Interview scheduled" ? "Edit Interview Details" : "Schedule Interview"}</h3>

                  </div>

                  <div className='flex flex-col gap-3 w-[100%] justify-center items-center'>
                    <div className='w-[100%] flex gap-2'>
                      <div onClick={() => handleStatusChange('Rejected', application?.applyID, application?.status)} className={`${application?.status === 'Rejected' ? 'bg-[#a45e5c] text-white cursor-default' : 'cursor-pointer'} text-[#a45e5c] hover:text-white  w-[50%] border-1 border-solid border-[#a45e5c] hover:bg-[#a45e5c] rounded-[6px] h-[30px] flex justify-center items-center gap-2`}>
                        {rejectLoader[application?.applyID] ? (
                          <LoaderCircleButton />
                        ) : (
                          <>
                            <CircleXIcon className='w-[17px]' />
                            <h3 className='font-semibold'>Reject</h3>
                          </>
                        )}
                      </div>

                      <div onClick={() => handleStatusChangeAccept('Profile Shortlisted', application?.applyID, application?.status)} className={`${application?.status === 'Profile Shortlisted' ? 'bg-[#458d76] text-white cursor-default' : 'cursor-pointer'} text-[#458d76] hover:text-white cursor-pointer w-[50%] border-1 border-solid border-[#458d76] hover:bg-[#458d76] rounded-[6px] h-[30px] flex justify-center items-center gap-2`}>


                        {acceptLoader[application?.applyID] ? (
                          <LoaderCircleButton />
                        ) : (
                          <>
                            <CheckCheck className='w-[18px]' />
                            <h3 className='font-semibold'>{application?.status === 'Profile Shortlisted' ? 'Shortlisted' : 'Shortlist'}</h3>
                          </>
                        )}

                      </div>
                    </div>


                  </div>

                </div>

              </div>

            </div>

          )
        }))}





      </div>}

      {applicationsArray?.length > 0 && <div className='w-[100%] flex justify-center items-center mt-[50px]'>
        <PaginationCandidate />
      </div>}
    </>
  );
};

export default Applicants;
