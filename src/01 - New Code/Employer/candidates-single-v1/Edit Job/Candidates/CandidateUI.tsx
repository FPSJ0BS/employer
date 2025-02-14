import React from "react";
import NODATAPIC from "../../../../../../public/assets/storyset/Innovation-pana.png";
import {
  Building2,
  CalendarClock,
  CheckCheck,
  CircleXIcon,
  Dot,
  X,
} from "lucide-react";
import { CandidateStatusForApi } from "./input/candidateStatusForApi";
import { LoaderCircleButton } from "./ui/loaderCircleButton";
import { BorderBeam } from "../../../../MagicUI/BorderBeam/border-beam";
import { ScheduleInterviewDateTime } from "./input/scheduleInterviewDateTime";
import { ScheduleInterviewType } from "./input/scheduleInterviewType";
import { ScheduleInterviewInterviewer } from "./input/scheduleInterviewInterviewer";
import { ScheduleInterviewNote } from "./input/scheduleInterviewNote";
import BuildingIcon from "../../../../../../public/assets/candidates/office-building.png";
import EducationIcon from "../../../../../../public/assets/candidates/education.png";
import LanguageIcon from "../../../../../../public/assets/candidates/translate.png";
import DefaultAvatar from "../../../../../../public/assets/icons/user.png";

const CandidateUI = ({
  applicationsArray,
  getCandidateList2,
  handleStatusChange,
  handleStatusChangeAccept,
  rejectLoader,
  acceptLoader,
  schedulePopup,
  closeAllPopups,
  ScheduleInterviewApi,
  loaderSchedule,
  toggleSchedulePopup,
  visibleMobiles,
  maskMobile,
  toggleMaskMobile,
  visibleEmails,
  maskEmail,
  toggleMask,
  getShareProfile,
  toggleInterviewDetailsPopup,
  interviewDetailsPopup,
  closeAllInterviewDetailsPopups,
  formatDate,
}) => {
  return (
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
                key={application?.applyID}
                style={{ position: "relative" }}
                className=" flex-col cursor-default relative transition-all duration-500 hover:translate-y-2 w-full min-h-[250px] bg-[#fafafa] rounded-[20px] shadow-xl flex  items-start justify-start gap-4  before:absolute before:w-full hover:before:top-0 before:duration-500 before:-top-1 before:h-1 "
              >
                {schedulePopup[index] && (
                  <div className="z-50 flex flex-col gap-3 justify-center items-center shadow-2xl absolute top-[15%] right-[21vw] xl:right-[21vw] 2xl:right-[19vw] rounded-[10px] w-[500px] min-h-[270px] bg-white border-1 border-solid border-gray-300">
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
                )}

                {interviewDetailsPopup[index] && (
                  <div className="postjobHandleScrollbar z-50 flex flex-col gap-3 justify-start items-start p-[15px] shadow-2xl absolute right-[21vw] top-[20%] xl:right-[21vw] 2xl:right-[30vw] rounded-[10px] w-[300px] h-[270px] overflow-y-auto bg-white border-1 border-solid border-gray-300">
                    {/* <BorderBeam /> */}
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
                )}

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
                        <h2 className=" font-semibold text-[20px] capitalize">
                          {application?.name}
                        </h2>
                        <button
                          onClick={() =>
                            getShareProfile(application?.faculityID)
                          }
                          className=" bg-[#fae8fd] rounded-[30px] text-[#7d348c] px-3  text-[15px] font-medium"
                        >
                          View full profile!
                        </button>
                      </div>
                      <div className="flex w-fit gap-4 text-[#636363] text-[15px]">
                        {application?.gender && (
                          <div className="flex gap-0 items-center  text-[14px]">
                            <Dot /> {application?.gender}
                          </div>
                        )}
                        <div className="flex gap-0 items-center  text-[14px]">
                          <Dot /> {application?.city}, {application?.state}
                        </div>
                        <div className="flex gap-0 items-center  text-[14px]">
                          <Dot /> {application?.salary} LPA
                        </div>
                      </div>
                     
                    </div>
                  </div>
                  <div className=" w-full lg:w-[30%] h-full flex flex-col gap-2 items-start">
                    <CandidateStatusForApi
                      candidaiteId={application?.applyID}
                      getCandidateList={getCandidateList2}
                      status={application?.status}
                    />
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
                            {visibleEmails[index] ? "Hide Email" : "View Email"}
                          </span>
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Stats */}

                <div className=" flex flex-col gap-2 w-full px-3">
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
                            {application?.education_data[0]?.institute_name}
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
                            {application?.experience_data[0]?.organization}
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
                          {application?.language_data?.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className="flex gap-0 items-center text-[#464646] font-normal -ml-2"
                              >
                                <Dot className=" -mr-1" /> {item?.language_text}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Skills */}

                <div className="px-3 flex flex-wrap gap-x-4 gap-y-4 -mt-5">
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
                </div>

                {/* Bottom Section */}
                <div className="px-3 min-h-[100px] w-full bg-white rounded-b-[20px] border-t-2 border-b-0 border-r-0 border-l-0 border-[#ebebeb] border-solid flex flex-col justify-center gap-2 py-2 lg:py-0 lg:flex-row lg:justify-between items-center">
                  <div className="lg:w-[70%] flex items-center gap-2">
                    <button
                      onClick={() => toggleSchedulePopup(index)}
                      className={`text-white hover:text-white cursor-pointer ${
                        application?.status === "Interview Scheduled"
                          ? "w-[50%]"
                          : "w-[30%]"
                      }  px-4 border-1 border-solid border-[#432818] bg-[#432818]  h-[50px] rounded-[30px] flex justify-center items-center gap-2`}
                    >
                      <CalendarClock className="w-[18px] " />
                      <h3 className=" font-semibold ">
                        {application?.status === "Interview Scheduled"
                          ? "Edit Interview Details"
                          : "Schedule Interview"}
                      </h3>
                    </button>
                    {application?.m_interview_date !== null &&
                      application?.m_interview_time !== null &&
                      application?.m_interview_event_type !== null &&
                      application?.m_interview_note !== null && (
                        <div className="flex flex-col gap-2 w-full">
                          <div
                            onClick={() => toggleInterviewDetailsPopup(index)}
                            className="text-white text-center hover:text-white cursor-pointer w-[50%] px-2 py-1 border border-solid border-[#023e8a] bg-[#023e8a] rounded-[30px] h-[50px] flex justify-center items-center gap-2"
                          >
                            <h3 className="text-[15px] font-semibold">
                              View More
                              <br /> Interview Details
                            </h3>
                          </div>
                        </div>
                      )}
                  </div>
                  <div className="w-[70%] lg:w-[30%] flex gap-2 items-center h-full">
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
                          ? "bg-[#f8dfe1] text-[#C4474D] cursor-default"
                          : "cursor-pointer"
                      } text-[#c4474d] hover:text-[#c4474d] bg-[#f8dfe1]  w-[50%] border-1 border-solid border-[#f8dfe1] hover:bg-[#f8dfe1] rounded-[30px] h-[50px] flex justify-center items-center gap-2`}
                    >
                      {rejectLoader[application?.applyID] ? (
                        <LoaderCircleButton />
                      ) : (
                        <>
                          <CircleXIcon className="w-[17px]" />
                          <h3 className="font-semibold">
                            {application?.status === "Rejected"
                              ? "Rejected"
                              : "Reject"}
                          </h3>
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
                          ? "bg-[#f2fef8] text-[##48995f] cursor-default"
                          : "cursor-pointer"
                      } text-[#48995f] hover:text-[#48995f] cursor-pointer w-[50%] border-1 border-solid border-[#48995f] hover:bg-[#f2fef8] rounded-[30px] h-[50px] flex justify-center items-center gap-2`}
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
              </div>
            </>
          );
        })
      )}
    </div>
  );
};

export default CandidateUI;
