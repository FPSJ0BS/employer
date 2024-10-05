import React from "react";
import { JobDescriptionInput } from "./PostBoxFormInput/jobDescriptionInput";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderEmployer } from "../../../../../public/assets/LoaderEmployer";
import QuestionsComponent from "./Questions-Post/questions-post";

import { PostJobJobTitle } from "./PostBoxFormInput/postJobJobTitle";
import { PostJobState } from "./PostBoxFormInput/postJobState";

import { PostJobSubject } from "./PostBoxFormInput/postJobSubject";
import { PostJobNoOfRequirement } from "./PostBoxFormInput/postJobNoOfRequirement";
import { PostJobCity } from "./PostBoxFormInput/postJobCity";
import { PostJobJobType } from "./PostBoxFormInput/postJobJobType";
import { PostJobJobLevel } from "./PostBoxFormInput/postJobJobLevel";
import { PostJobExperience } from "./PostBoxFormInput/postJobExperience";
import { PostJobQualification } from "./PostBoxFormInput/postJobQualification";
import { PostJobDesignation } from "./PostBoxFormInput/postJobDesignation";
import { PostJobSalaryRange } from "./PostBoxFormInput/postJobSalaryRange";
import { PostJobSelectionProcess } from "./PostBoxFormInput/postJobSelectionProcess";
import { PostJobProcessLocation } from "./PostBoxFormInput/postJobProcessLocation";
import { PostJobProcessState } from "./PostBoxFormInput/postJobProcessState";
import { PostJobProcessCity } from "./PostBoxFormInput/postJobProcessCity";
import { PostJobRemarks } from "./PostBoxFormInput/postJobRemarks";
import { PostJobDocsRequired } from "./PostBoxFormInput/postJobDocsRequired";
import { postPostJobAxios } from "../../../../api/apiAxios";
import { CustomizedSnackbarTwo } from "../../../Reusable Components/Snackbar/snackbarNew";
import PostJobImage from "../../../../../public/assets/storyset/Blog post-pana.png";
import { postEmployerPostJob } from "../../Redux/EmployerSlice";
import { useDispatch } from "react-redux";
import { CircularProgressBar } from "./CircularProgress/CircularProgress";
import { setWalletData } from "../../Redux/Wallet";
import { PostJobCategory } from "./PostBoxFormInput/postJobCategory";
import { Tooltip } from "@mui/material";
import { PostJobProcessLocationOther } from "./PostBoxFormInput/postJobProcessLocationOther";

const PostBoxForm = () => {
  const dispatch = useDispatch();
  // Snackbar start ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // Snackbar Success

  const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
  const [snackbarSuccessMessage, setSnackbarSuccessMessage] = useState("");
  const { walletDetailsData } = useSelector((state: any) => state.wallet);
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

  const { employerPostJob } = useSelector(
    (state: any) => state.employerSliceNew
  );

  const { instituteId } = useSelector((state) => state.login);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // const allConditionsTrue = employerPostJob.state.trim() !== "" && employerPostJob.job_title.trim() !== "";
    // console.log('allConditionsTrue' ,allConditionsTrue);
    // console.log('isFormValid' ,isFormValid);
    // if (allConditionsTrue) {
    //   setIsFormValid(true);
    // }

    console.log("employer post job", employerPostJob);
  }, [employerPostJob]);

  const navigate = useNavigate();

  const [checkingjobdescvalidity, setJobDescValidity] = useState(false);
  const [LoaderValid, setLoaderValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [questions, setQuestions] = useState([]);
  const [jobId, setJobId] = useState("");

  const postJobFormSubmit = async (e: any) => {
    e.preventDefault();
    setLoaderValid(true);
    // const parse = JSON.parse(localStorage.getItem("walletData") || "");
    // const _data: any = {
    //   ...walletDetailsData,
    //   currentBalance: Number(walletDetailsData?.currentBalance) - 10,
    //   Status: "Debit",
    //   dateTransaction: String(new Date()),
    // };
    // dispatch(setWalletData(_data));
    // localStorage.setItem("wallet", JSON.stringify(_data));
    // localStorage.setItem("walletData", JSON.stringify([...parse,_data]));
    // navigate(-1)
    try {
      const res = await postPostJobAxios(
        employerPostJob?.job_title,
        instituteId,
        employerPostJob?.catID,
        employerPostJob?.functionID,
        employerPostJob?.no_of_requirement,
        employerPostJob?.state,
        employerPostJob?.city,
        employerPostJob?.job_type,
        employerPostJob?.job_level,
        employerPostJob?.min_experience,
        employerPostJob?.max_experience,
        "Year",
        employerPostJob?.qualification,
        employerPostJob?.job_description,
        employerPostJob?.doc_required,
        employerPostJob?.job_designation,
        employerPostJob?.min_salary.toString(),
        employerPostJob?.max_salary.toString(),
        employerPostJob?.salary_type,
        employerPostJob?.selection_process,
        employerPostJob?.process_location,
        employerPostJob?.process_state,
        employerPostJob?.process_city,
        employerPostJob?.remarks
      );

      if (res?.data?.status) {
        const jobId = await res?.data?.data[0]?.job_id;
        const onSuccessMessage = await res?.data?.message;
        await setSnackbarSuccessMessage(onSuccessMessage);
        await setSnackbarSuccessOpen(true);
        await resetFields();

        setTimeout(() => {
          navigate(`/candidates-single-v1/${jobId}/""`);
        }, 2000);
      } else {
        const onErrorMessage = await res?.data?.message;
        await setSnackbarErrorMessage(onErrorMessage);
        setSnackbarErrorOpen(true);
      }
    } catch (error) {
      await setSnackbarErrorMessage("network Error");
      setSnackbarErrorOpen(true);
    }
  };

  const resetFields = () => {
    dispatch(
      postEmployerPostJob({
        job_title: "",
        catID: null,
        functionID: null,
        no_of_requirement: null,
        state: "",
        city: "",
        job_type: "",
        job_level: "",
        min_experience: null,
        max_experience: null,
        experience_unit: "",
        qualification: null,
        job_description: "",
        doc_required: "",
        job_designation: "",
        min_salary: null,
        max_salary: null,
        salary_type: "",
        selection_process: "",
        process_location: "",
        process_state: "",
        process_city: "",
        remarks: "",
      })
    );
  };

  const [processLoc, setProcessLoc] = useState(false);
 

  return (
    <div className="pb-[20px] w-[100%] sm:px-[5px]">
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
        autoCloseDuration={6000} // milliseconds
        onClose={handleErrorCloseSnackbar}
        message={snackbarErrorMessage}
        severity="error" // or 'success', 'warning', 'info'
        backgroundColor="#9d0208" // Custom background color
      />

      {errorMessage.trim() !== "" && (
        <div className=" pb-[50px]">
          <h2 className=" font-bold text-red-700">Error {errorMessage}</h2>
        </div>
      )}

      {LoaderValid ? (
        <LoaderEmployer />
      ) : (
        <form
          onSubmit={(e) => postJobFormSubmit(e)}
          className="flex flex-col gap-1"
        >
          <div className=" bg-[#faf9f8] w-[100%] h-[200px] rounded-md flex-col sm:flex-row flex justify-between items-center px-[50px] my-4">
            <h2 className=" pt-3 sm:pt-0 text-[25px] font-semibold">
              Post Job
            </h2>
            {/* <img className="w-[300px]" src={PostJobImage} alt="psotjob" /> */}
            <div className=" flex flex-col justify-center items-center font-medium gap-2">
              <h2 className=" text-[20px]">Available Jobs</h2>
              <CircularProgressBar />
            </div>
          </div>
          <div>
            <h2 className="text-2xl mt-3" style={{ color: "#dd4975" }}>
              Basic Details
            </h2>
            <div className="bg-gray-300 w-full h-[1px] mt-2 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PostJobJobTitle />
              <PostJobState  setProcessLoc = {setProcessLoc}/>
              <PostJobCity setProcessLoc = {setProcessLoc}/>
              <PostJobProcessLocation setProcessLoc = {setProcessLoc} />
             {processLoc && <PostJobProcessLocationOther />}
              <PostJobExperience />
              <PostJobQualification />
            </div>

            <h2 className="text-2xl mt-3" style={{ color: "#dd4975" }}>
              Targeting
            </h2>
            <div className="bg-gray-300 w-full h-[1px] mt-2 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PostJobJobLevel />
              <PostJobDesignation />
              <PostJobJobType />
              <PostJobNoOfRequirement />
              <PostJobCategory />
              <PostJobSubject />
              <PostJobSalaryRange />
              <PostJobSelectionProcess />
              <PostJobProcessState />
              <PostJobProcessCity />
            </div>
            <div className="flex w-[100%] mt-2">
              <PostJobDocsRequired />
            </div>
            {(employerPostJob?.job_title &&
              employerPostJob?.state &&
              employerPostJob?.city &&
              employerPostJob?.job_type &&
              employerPostJob?.job_level &&
              employerPostJob?.min_experience &&
              employerPostJob?.max_experience &&
              employerPostJob?.job_designation,
            employerPostJob?.min_salary?.toString() &&
              employerPostJob?.max_salary?.toString()) ? (
              <div className="flex w-[100%]">
                <JobDescriptionInput type={true} />
              </div>
            ) : (
              <Tooltip
                title="Please enter Job Title, Category, Subject, state, city ,exp, salary,Qualification, Job Level, Job Type , Designation"
                arrow
                sx={{ background: "#353535", color: "#ffff" }}
              >
                <div className="flex w-[100%]">
                  <JobDescriptionInput type={false} />
                </div>
              </Tooltip>
            )}
          </div>

          {/* <div className="w-[100%] mb-6 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 lg:gap-x-[20px] gap-y-[20px] sm:gap-x-[20px] place-items-center place-content-center ">
            <PostJobJobTitle />
            <PostJobDesignation />
            <PostJobJobType />
            <PostJobJobLevel />
            <PostJobNoOfRequirement />
            <PostJobCategory />
            <PostJobSubject />
            <PostJobState />
            <PostJobCity />
            <PostJobSalaryRange />
            <PostJobExperience />
            <PostJobQualification />
            <PostJobSelectionProcess />
            <PostJobProcessLocation />
            <PostJobProcessState />
            <PostJobProcessCity />
          </div>
          <div className=" flex justify-center items-start w-[100%]">
            <JobDescriptionInput />
          </div>

          <div className=" flex justify-center items-start w-[100%]">
            <PostJobDocsRequired />
          </div> */}

          <div className=" flex justify-end items-center">
            <button
              disabled={isFormValid}
              className={` ${
                isFormValid ? " bg-gray-600" : "bg-mainBgColor"
              } p-[10px] text-white rounded-lg `}
            >
              Post New Job
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PostBoxForm;
