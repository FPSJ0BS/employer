import React from "react";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import MobileMenu from "@/01 - New Code/Headers/MobileMenu";
import { useParams } from "react-router-dom";
import DashboardHeader from "@/01 - New Code/Headers/DashboardHeader";
import Loader from "../../../../../public/assets/Loader";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getjobDetail } from "../../../../api/apiAxios";
import { useSelector, useDispatch } from "react-redux";
import {
  patchEditJobAxios,
  getStateListAxios,
  getJobType,
  getBoardLevelType,
  getQualificationsData,
  getSelectionProcessData,
  getCategories,
  getSubCategories,
  getCityListAxios,
} from "../../../../api/apiAxios";
import {
  setStatesData,
  setAllJobTypes,
  setBoardLevel,
  setQualification,
  setSelectionProcess,
  setCategoryData,
  editEmployerEditJob,
  setSubCategoryData,
  setCitiesData,
  setProcessCitiesData,
} from "../../Redux/EmployerEditJob";

import { EditJobJobTitle } from "./Edit Job Inputs/editJobJobTitle";
import { EditJobDesignation } from "./Edit Job Inputs/editJobDesignation";
import { EditJobJobType } from "./Edit Job Inputs/editJobJobType";
import { EditJobJobLevel } from "./Edit Job Inputs/editJobJobLevel";
import { EditJobNoOfRequirement } from "./Edit Job Inputs/editJobNoOfRequirement";
import { EditJobCategory } from "./Edit Job Inputs/editJobCategory";
import { EditJobSubject } from "./Edit Job Inputs/editJobSubject";
import { EditJobState } from "./Edit Job Inputs/editJobState";
import { EditJobCity } from "./Edit Job Inputs/editJobCity";
import { EditJobExperience } from "./Edit Job Inputs/editJobExperience";
import { EditJobQualification } from "./Edit Job Inputs/editJobQualification";
import { EditJobSalaryRange } from "./Edit Job Inputs/editJobSalaryRange";
import { EditJobSelectionProcess } from "./Edit Job Inputs/editJobSelectionProcess";
import { EditJobProcessLocation } from "./Edit Job Inputs/editJobProcessLocation";
import { EditJobProcessState } from "./Edit Job Inputs/editJobProcessState";
import { EditJobProcessCity } from "./Edit Job Inputs/editJobProcessCity";
import { EditJobRemarks } from "./Edit Job Inputs/editJobRemarks";
import { EditJobDescriptionInput } from "./Edit Job Inputs/editJobDescriptionInput";
import { EditJobDocsRequired } from "./Edit Job Inputs/editJobDocsRequired";
import PostJobImage from "../../../../../public/assets/storyset/Blog post-pana.png";
import DefaultAvatar from "../../../../../public/assets/icons/user.png";
import { CustomizedSnackbarTwo } from "../../../Reusable Components/Snackbar/snackbarNew";

export const EditJObSingle = () => {
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
  const { employerEditJob } = useSelector(
    (state: any) => state.employerEditJob
  );
  const { profileImage } = useSelector(
    (state) => state.instituteProfileImageSlice
  );
  const { imageUrl } = useSelector((state) => state.login);

  useEffect(() => {
    console.log("editjob", employerEditJob);
  }, [employerEditJob]);

  const navigate = useNavigate();

  const params = useParams();
  const id = params.id;

  const [checkingNull, setCheckingNull] = useState(false);

  const [loading, setLoading] = useState(true);
  const [jobData, setjobData] = useState([]);
  const [imageSrc, setImageSrc] = useState<string>("");

  // Storing Fetched Data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          editJob,
          getState,
          getJobTypeData,
          getBoardLevelData,
          getQualification,
          getSelectionProcess,
          getCatData,
        ] = await Promise.all([
          getjobDetail(id),
          getStateListAxios(),
          getJobType(),
          getBoardLevelType(),
          getQualificationsData(),
          getSelectionProcessData(),
          getCategories(),
        ]);

        if (
          editJob?.data?.status &&
          getState?.data?.status &&
          getJobTypeData?.data?.status &&
          getBoardLevelData?.data?.status &&
          getQualification?.data?.status &&
          getSelectionProcess?.data?.status &&
          getCatData?.data?.status
        ) {
          setjobData(editJob?.data?.data[0]);

          const {
            job_title,
            job_designation,
            job_type,
            job_level,
            no_of_requirement,
            catID,
            functionID,
            state,
            city,
            min_experience,
            max_experience,
            qualification,
            min_salary,
            max_salary,
            salary_type,
            selection_process,
            process_location,
            process_state,
            remarks,
            process_city,
            job_description,
            doc_required,
          } = editJob?.data?.data[0];

          dispatch(
            editEmployerEditJob({
              job_title,
              job_designation,
              job_type,
              job_level,
              no_of_requirement,
              catID,
              functionID,
              state,
              city,
              min_experience,
              max_experience,
              qualification,
              min_salary,
              max_salary,
              salary_type,
              selection_process,
              process_location: process_location,
              process_state,
              process_city,
              remarks,
              job_description,
              doc_required,
            })
          );

          const fetchingSubcategories = async () => {
            if (catID ?? false) {
              try {
                const response = await getSubCategories(parseInt(catID));
                if (response?.data?.status) {
                  const subCatData = response?.data?.data;
                  // console.log('subcatdata',subCatData, response, functionID);
                  dispatch(setSubCategoryData(subCatData));
                }
              } catch (error) {
                console.log(error);
              }
            }
          };

          const fetchCity = async () => {
            const statesData = await getState?.data?.data;
            const cityData = await statesData?.find(
              (stateName) => stateName.name === state
            );

            const processCityData = await statesData?.find(
              (stateName) => stateName.name === process_state
            );

            const cityIDNew = await cityData?.id;
            const processCityIDNew = await processCityData?.id;

            try {
              const res = await getCityListAxios(cityIDNew);
              if (res?.data.status) {
                const dataCity = res?.data?.data;

                dispatch(setCitiesData(dataCity));
              }
            } catch (error) {
              console.log(error);
            }

            try {
              const res = await getCityListAxios(processCityIDNew);
              if (res?.data.status) {
                const dataCity = res?.data?.data;

                dispatch(setProcessCitiesData(dataCity));
              }
            } catch (error) {
              console.log(error);
            }
          };

          await dispatch(setStatesData(getState?.data?.data));
          await dispatch(setAllJobTypes(getJobTypeData?.data?.data));
          await dispatch(setBoardLevel(getBoardLevelData?.data?.data));
          await dispatch(setQualification(getQualification?.data?.data));
          await dispatch(setSelectionProcess(getSelectionProcess?.data?.data));
          await dispatch(setCategoryData(getCatData?.data?.data));

          await fetchingSubcategories();
          await fetchCity();
          // Setting loader Conditions --->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    setImageSrc(localStorage.getItem("insProfileImage"));

    fetchData();
  }, [id]);

  const formatDate = (timestamp) => {
    const dateObject = new Date(timestamp);
    const formattedDate = dateObject.toLocaleDateString();
    return formattedDate;
  };

  // Edit Job API HIt

  const handleEditJob = async (e) => {
    e.preventDefault();

    const editPostData = {
      job_title: employerEditJob.job_title,
      job_designation: employerEditJob.job_designation,
      job_type: employerEditJob.job_type,
      job_level: employerEditJob.job_level,
      no_of_requirement: employerEditJob.no_of_requirement,
      catID: employerEditJob.catID,
      functionID: employerEditJob.functionID,
      state: employerEditJob.state,
      city: employerEditJob.city,
      min_experience: employerEditJob.min_experience,
      max_experience: employerEditJob.max_experience,
      experience_unit: "Year",
      qualification: employerEditJob.qualification,
      min_salary: employerEditJob.min_salary,
      max_salary: employerEditJob.max_salary,
      salary_type: employerEditJob.salary_type,
      selection_process: employerEditJob.selection_process,
      process_location: employerEditJob.process_location,
      process_state: employerEditJob.process_state,
      process_city: employerEditJob.process_city,
      remarks: employerEditJob.remarks,
      job_description: employerEditJob.job_description,
      doc_required: employerEditJob.doc_required,
    };
    try {
      const res = await patchEditJobAxios(id, editPostData);
    

      if (res.data.status) {
        const onSuccessMessage = await res?.data?.message;
        await setSnackbarSuccessMessage(onSuccessMessage);
        await setSnackbarSuccessOpen(true);
        // await EditPostQuestionsApi()
        // await postQuestionsApi()
        setTimeout(() => {
          navigate(`/candidates-single-v1/${id}/""`);
        }, 1500);
      } else{
        const onErrorMessage = await res?.data?.message;
        await setSnackbarErrorMessage(onErrorMessage);
        setSnackbarErrorOpen(true);
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

      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Job Detail Section --> */}
      {loading ? (
        <Loader />
      ) : (
        <section className="candidate-detail-section">
          <div className="upper-box h-[200px] flex flex-col justify-center items-center">
            <div className="auto-container">
              <div className="candidate-block-five">
                <div className="inner-box">
                  <div className="content">
                    <figure className="image">
                      {profileImage && (
                        <img src={`${imageUrl}${profileImage}`} alt="avatar" />
                      )}
                      {!profileImage && (
                        <img src={DefaultAvatar} alt="avatar" />
                      )}
                    </figure>
                    <h4 className="name">
                      {jobData?.job_title &&
                        jobData?.job_title.charAt(0).toUpperCase() +
                          jobData?.job_title.slice(1)}
                    </h4>

                    <ul className="candidate-info">
                      <li>
                        <span className="icon flaticon-map-locator"></span>
                        {jobData?.city}, {jobData?.state}
                      </li>
                      <li>
                        <span className="icon flaticon-money"></span> ₹
                        {jobData?.max_salary} - ₹ {jobData?.min_salary}
                      </li>
                      <li>
                        <span className="icon flaticon-clock"></span>{" "}
                        {jobData?.min_salary}
                      </li>
                      <li>
                        <span className="icon flaticon-clock"></span>{" "}
                        {formatDate(jobData?.created_at)}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/*  <!-- Candidate block Five --> */}
            </div>
          </div>
          {/* <!-- Upper Box --> */}

          <div className="candidate-detail-outer">
            <div className="auto-container">
              <div className="row flex ">
                <div className="content-column col-lg-8 col-md-12 col-sm-12">
                  <div className="job-detail">
                    <div className=" bg-[#faf9f8] w-auto h-[200px] rounded-md flex justify-between items-center px-[50px] mt-4 mb-[50px]">
                      <h2 className=" text-[25px] font-semibold">
                        Edit Job Details
                      </h2>
                      <img
                        className="w-[300px]"
                        src={PostJobImage}
                        alt="psotjob"
                      />
                    </div>

                    {/* Edit Job Fields Start ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}

                    <form
                      onSubmit={(e) => handleEditJob(e)}
                      className="flex flex-col gap-4 ml-5"
                    >
                      <div className=" grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 lg:gap-x-[20px] gap-y-[30px] place-items-center  ">
                        <EditJobJobTitle />
                        <EditJobDesignation />
                        <EditJobJobType />
                        <EditJobJobLevel />
                        <EditJobNoOfRequirement />
                        <EditJobCategory />
                        <EditJobSubject />
                        <EditJobState />
                        <EditJobCity />
                        <EditJobExperience />
                        <EditJobQualification />
                        <EditJobSelectionProcess />
                        <EditJobSalaryRange />
                        <EditJobProcessLocation />
                        <EditJobProcessState />
                        <EditJobProcessCity />
                        <EditJobRemarks />
                      </div>
                      <div>
                        <EditJobDescriptionInput />
                      </div>

                      <div>
                        <EditJobDocsRequired />
                      </div>

                      <div className=" flex justify-center items-center flex-col gap-2">
                        <button
                          className={`${
                            !checkingNull ? "bg-mainBgColor" : "bg-mainBgColor"
                          }  p-[20px] text-white rounded-lg `}
                        >
                          Update Job
                        </button>
                      </div>
                    </form>

                    {/* Edit Job Fields End ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                  </div>
                </div>
                {/* End .content-column */}

                <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                  <aside className="sidebar">
                    <div className="sidebar-widget ml-[50px]">
                      <div className="widget-content ">
                        <ul className="job-overview">
                          <li>
                            <i className="icon icon-calendar"></i>
                            <h5>Experience:</h5>
                            <span>
                              {jobData?.min_experience} -{" "}
                              {jobData?.max_experience} Years
                            </span>
                          </li>

                          <li>
                            <i className="icon icon-location"></i>
                            <h5>City, State:</h5>
                            <span>
                              {jobData?.city &&
                                jobData?.city.charAt(0).toUpperCase() +
                                  jobData?.city.slice(1)}
                              ,{" "}
                              {jobData?.state &&
                                jobData?.state.charAt(0).toUpperCase() +
                                  jobData?.state.slice(1)}
                            </span>
                          </li>

                          <li>
                            <i className="icon icon-rate"></i>
                            <h5>Salary:</h5>
                            <span>
                              ₹{jobData?.min_salary} - ₹{jobData?.max_salary}
                            </span>
                          </li>

                          <li>
                            <i className="icon icon-salary"></i>
                            <h5>Interview Process</h5>
                            <span>{jobData?.selection_process}</span>
                          </li>

                          {/* <li>
                            <i className="icon icon-user-2"></i>
                            <h5>Gender:</h5>
                            <span>
                              {jobData?.gender &&
                                jobData?.gender.charAt(0).toUpperCase() +
                                  jobData?.gender.slice(1)}
                            </span>
                          </li> */}

                          {/* <li>
                            <i className="icon icon-language"></i>
                            <h5>Job Status:</h5>
                            <span>{jobData?.job_status}</span>
                          </li> */}

                          <li>
                            <i className="icon icon-degree"></i>
                            <h5>Job Type:</h5>
                            <span>{jobData?.job_type}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* End .sidebar-widget contact-widget */}
                  </aside>
                  {/* End .sidebar */}
                </div>
                {/* End .sidebar-column */}
              </div>
            </div>
          </div>
          {/* <!-- job-detail-outer--> */}
        </section>
      )}
      {/* <!-- End Job Detail Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};
