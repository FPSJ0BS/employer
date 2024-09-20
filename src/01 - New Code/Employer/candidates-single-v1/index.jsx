import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import MobileMenu from "@/01 - New Code/Headers/MobileMenu";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { Questions } from "./components/questions";
import DashboardHeader from "@/01 - New Code/Headers/DashboardHeader";

import MetaComponent from "@/components/common/MetaComponent";
import { useEffect, useState } from "react";

import { getjobDetail, getProfile } from "@/api/apiAxios";
import { useNavigate } from "react-router-dom";

import Loader from "../../../../public/assets/Loader";
import TabsEditJob from "./Edit Job/Tabs/TabEditJob";
import { useDispatch, useSelector } from "react-redux";
import DefaultAvatar from "../../../../public/assets/icons/user.png";
import { CandidateProfileModal } from "./components/CandidateProfileModal.tsx";
import {
  ArrowDown01,
  ArrowUp01Icon,
  BarChart,
  Calendar,
  CircleGauge,
  CircuitBoard,
  Landmark,
  Locate,
  Store,
  UserRoundSearch,
} from "lucide-react";
import { FilterModal } from "./Edit Job/Candidates/ui/FilterModal.tsx";
import {
  getAllCityList,
  getAllStatus,
  getQualification,
  getSalary,
  getTeachingLevel,
} from "../../../api/apiAxios.ts";
import {
  setAllCityData,
  setAllQualificationData,
  setAllSalaryData,
  setAllStatusData,
  setAllTeachingData,
  setPreferedAllCityData,
} from "../Redux/EmployerCandidate.tsx";
import { SuggestedFilter } from "./Edit Job/Candidates/ui/SuggestedFilter.jsx";

const metadata = {
  title: "Edit Job || FPS JOBS & Tallento.AI",
  description: "Best education Job Portal In India",
};

const CandidateSingleDynamicV1 = () => {
  const dispatch = useDispatch();

  const { profileImage } = useSelector(
    (state) => state.instituteProfileImageSlice
  );
  const { filterModal, filterSuggestedModal } = useSelector(
    (state) => state.employerCandidate
  );
  const { isHeaderShow } = useSelector((state) => state.employerSliceNew);
  const { imageUrl } = useSelector((state) => state.login);
  const { modal } = useSelector((state) => state.employerCandidate);

  const navigate = useNavigate();
  const [jobData, setjobData] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const [screenignQuestions, setScreeningQuestions] = useState([]);
  const [loaderState, setLoaderState] = useState(true);

  const { jobID, status } = useParams();
  // const candidate = candidates.find((item) => item.id == id) || candidate[0];

  useEffect(() => {
    setLoaderState(true);
    const fetchData = async () => {
      try {
        const jobDetailResponse = await getjobDetail(jobID);
        if (jobDetailResponse?.data?.status) {
          const jobData = await jobDetailResponse?.data?.data[0];

          await fetchData2(jobData?.catID);
          const screeningQuestionsData = jobData?.screen_questions;
          await setjobData(jobData);
          await setScreeningQuestions(screeningQuestionsData);
        }
        const profileResponse = await getProfile();

        if (jobDetailResponse?.data?.status && profileResponse?.data?.status) {
          const userProfileData = profileResponse?.data?.data?.employerDetails;

          setLoaderState(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [jobID]); // Include any dependencies that affect the data fetching process

  const fetchData2 = async (cat) => {
    try {
      const [
        allCityList,
        allSalaryList,
        allQualificationList,
        allStatusList,
        allTeachingList,
      ] = await Promise.all([
        getAllCityList(""),
        getSalary(),
        getQualification(),
        getAllStatus(cat),
        getTeachingLevel(),
      ]);

      // Check if all responses are OK
      if (
        allCityList?.data?.status &&
        allSalaryList?.data?.status &&
        allQualificationList?.data?.status &&
        allStatusList?.data?.status &&
        allTeachingList?.data?.status
      ) {
        const allCityArray = await allCityList?.data?.data;
        await dispatch(setAllCityData(allCityArray));
        await dispatch(setPreferedAllCityData(allCityArray));

        const salaryAll = await allSalaryList?.data?.data;
        await dispatch(setAllSalaryData(salaryAll));

        const qual = await allQualificationList?.data?.data;
        await dispatch(setAllQualificationData(qual));

        const allStatus = allStatusList?.data?.data;
        await dispatch(setAllStatusData(allStatus));

        const allTeaching = allTeachingList?.data?.data;
        console.log("all teaching", allTeaching);
        await dispatch(setAllTeachingData(allTeaching));
      } else {
        console.log("error in api");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const formatDate = (timestamp) => {
    const dateObject = new Date(timestamp);
    const formattedDate = dateObject.toLocaleDateString();
    return formattedDate;
  };

  const editJobOnClick = () => {
    navigate(`/edit-job/${jobID}`);
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      {/* <!-- Header Span --> */}
      {isHeaderShow && <span className="header-span"></span>}
      {isHeaderShow && <DashboardHeader />}
      {/* End Login Popup Modal */}

      {/* {!filterSuggestedModal && <span className="header-span"></span>} */}
      {/* End Login Popup Modal */}

      {/* {!filterSuggestedModal && <DashboardHeader />} */}
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {filterModal && <FilterModal />}
      {filterSuggestedModal && <SuggestedFilter />}

      {/* <!-- Job Detail Section --> */}
      {loaderState ? (
        <Loader />
      ) : (
        <section className="candidate-detail-section ">
          {modal && <CandidateProfileModal />}

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
                        {jobData?.min_salary} - ₹ {jobData?.max_salary},{" "}
                        {jobData?.salary_type}
                      </li>
                      <li>
                        <span className="icon flaticon-clock"></span>{" "}
                        {jobData?.job_type}
                      </li>
                      <li>
                        <span className="icon flaticon-clock"></span>{" "}
                        {formatDate(jobData?.created_at)}
                      </li>
                    </ul>
                  </div>
                  <div className="btn-box">
                    <button
                      onClick={() => editJobOnClick()}
                      className="theme-btn btn-style-one"
                    >
                      Edit Job
                    </button>
                  </div>
                </div>
              </div>
              {/*  <!-- Candidate block Five --> */}
            </div>
          </div>
          {/* <!-- Upper Box --> */}

          <div className="candidate-detail-outer">
            <div className="auto-container">
              <div className="row">
                <div className="content-column col-lg-8 col-md-12 col-sm-12 ">
                  <div className="job-detail">
                    {/* <!-- Job Description --> */}
                    <div className=" ">
                      {/* {ReactHtmlParser(jobData?.job_description)} */}
                    </div>
                    <TabsEditJob
                      screenignQuestions={screenignQuestions}
                      desc={ReactHtmlParser(jobData?.job_description)}
                    />

                    {/* <!-- Questions Start --> */}

                    {/* {candidateResume.map((resume) => (
                    <div
                      className={`resume-outer ${resume.themeColor}`}
                      key={resume.id}
                    >
                      <div className="upper-title">
                        <h4>{resume?.title}</h4>
                      </div>
                      {resume?.blockList?.map((item) => (
                        <div className="resume-block" key={item.id}>
                          <div className="inner">
                            <span className="name">{item.meta}</span>
                            <div className="title-box">
                              <div className="info-box">
                                <h3>{item.name}</h3>
                                <span>{item.industry}</span>
                              </div>
                              <div className="edit-box">
                                <span className="year">{item.year}</span>
                              </div>
                            </div>
                            <div className="text">{item.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))} */}
                    {/* <div className=" w-auto border-b-[px] border-dashed"></div> */}

                    {/* <div className=" bg-[#faf9f8] w-auto h-[200px] rounded-md flex justify-between items-center px-[50px] mb-3">
                    <h2 className=" text-[25px] font-semibold">Screning Questions</h2>
                    <iframe
                      className=""
                      width="200px"
                      height="200px"
                      src={Mathematics}
                    ></iframe>
                  </div> */}

                    {/* <!-- Candidate Resume End --> */}
                  </div>
                </div>
                {/* End .content-column */}

                <div className="sidebar-column col-lg-4 col-md-12 col-sm-12 w-[270px] ml-[130px]">
                  <aside className=" ">
                    <div className="sidebar-widget ">
                      <div className="widget-content">
                        <ul className="job-overview">
                          <li>
                            <i className="icon ">
                              <BarChart className="text-[#458d76]" />
                            </i>
                            <h5 className="text-[#458d76]">Job Status:</h5>
                            <span>
                              {jobData?.status === 0 ? "Inactive" : "Active"}
                            </span>
                          </li>
                          {jobData?.no_of_requirement && (
                            <li>
                              <i className="icon ">
                                <ArrowDown01 className="text-[#458d76]" />
                              </i>
                              <h5 className="text-[#458d76]">Requirement:</h5>
                              <span>{jobData?.no_of_requirement}</span>
                            </li>
                          )}

                          <li>
                            <i className="icon ">
                              <Calendar className="text-[#458d76]" />
                            </i>
                            <h5 className="text-[#458d76]">Experience:</h5>
                            <span>
                              {jobData?.min_experience} -{" "}
                              {jobData?.max_experience} Years
                            </span>
                          </li>

                          {/* <li>
                          <i className="icon icon-expiry"></i>
                          <h5>Landmark:</h5>
                          <span>{jobData?.area && jobData?.area.charAt(0).toUpperCase() + jobData?.area.slice(1)}</span>
                        </li> */}
                          {jobData?.selection_process && (
                            <li>
                              <i className="icon ">
                                <CircuitBoard className="text-[#458d76]" />
                              </i>
                              <h5 className="text-[#458d76]">
                                Interview Process
                              </h5>
                              <span>{jobData?.selection_process}</span>
                            </li>
                          )}

                          {jobData?.job_type && (
                            <li>
                              <i className="icon ">
                                <UserRoundSearch className="text-[#458d76]" />
                              </i>
                              <h5 className="text-[#458d76]">Job Type:</h5>
                              <span>{jobData?.job_type}</span>
                            </li>
                          )}

                          {jobData?.job_level && (
                            <li>
                              <i className="icon ">
                                <CircleGauge className="text-[#458d76]" />
                              </i>
                              <h5 className="text-[#458d76]">Job Level:</h5>
                              <span>{jobData?.job_level}</span>
                            </li>
                          )}
                          {jobData?.process_state && (
                            <li>
                              <i className="icon ">
                                <Landmark className="text-[#458d76]" />
                              </i>
                              <h5 className="text-[#458d76]">Process State:</h5>
                              <span>{jobData?.process_state}</span>
                            </li>
                          )}

                          {jobData?.process_city && (
                            <li>
                              <i className="icon ">
                                <Store className="text-[#458d76]" />
                              </i>
                              <h5 className="text-[#458d76]">Process City:</h5>
                              <span>{jobData?.process_city}</span>
                            </li>
                          )}

                          {jobData?.process_location && (
                            <li>
                              <i className="icon ">
                                <Locate className="text-[#458d76]" />
                              </i>
                              <h5 className="text-[#458d76]">
                                Process Location:
                              </h5>
                              <span>{jobData?.process_location}</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    {/* End .sidebar-widget conadidate overview */}

                    {/* <div className="sidebar-widget social-media-widget">
                    <h4 className="widget-title">Social media</h4>
                    <div className="widget-content">
                      <div className="social-links">
                        <Social />
                      </div>
                    </div>
                  </div> */}
                    {/* End .sidebar-widget social-media-widget */}

                    {/* <div className="sidebar-widget">
                    <h4 className="widget-title">Professional Skills</h4>
                    <div className="widget-content">
                      <ul className="job-skills">
                        <JobSkills />
                      </ul>
                    </div>
                  </div> */}

                    {/* End .sidebar-widget skill widget */}

                    {/* <div className="sidebar-widget contact-widget">
                    <h4 className="widget-title">Contact Us</h4>
                    <div className="widget-content">
                      <div className="default-form">
                        <Contact />
                      </div>
                    </div>
                  </div> */}

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

export default CandidateSingleDynamicV1;
