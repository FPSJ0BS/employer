import { useRef, useEffect } from "react";
import TestImage2 from '../../../../../public/assets/Home-new/ai Resume.png'
export const SectionFiveHomeNew = ({ setnMouseEnterPages }) => {




    return (
        <div onMouseEnter={setnMouseEnterPages} id="SectionFiveTest" className="  h-[100vh] xl:mb-[-100px] 2xl:mb-[0px]">

            <div className="sectionFive-rounded-div-wrapper w-[100%] h-[100px] relative overflow-hidden ]">

                <div className="sectionFive-rounded-div w-[150%] h-[750%] rounded-[50%] bg-[#111] absolute left-[50%] ">

                </div>

            </div>


            {/* <div id="SectionFiveTest-part1" className=" hidden cursor-default bg-[#111]  min-h-[100vh] w-[100%] sm:flex justify-center items-center px-[5vw]">


                <div className=" flex flex-col justify-center items-center w-[50%] ">
                    <div id="pinblack1" className="  opacity-1 flex flex-col justify-start text-white gap-4 ">
                        <div className="flex flex-col gap-2 border-b-[1px] border-l-0 border-t-0 border-r-0 border-solid border-gray-500 pb-4">
                            <h2 className=" text-[40px] font-semibold">AI interviews</h2>
                            <p className="text-white font-normal">Wave goodbye to the old-school hassle of scheduling interviews. Welcome to a<br /> new era of hiring with our video interview software, designed to cut through the<br /> noise and zoom straight to the best.</p>
                        </div>
                        <div className=" flex flex-col gap-2 justify-start">
                            <div className=" flex justify-start items-center gap-4">
                                <svg className=" h-[25px] w-[25px]" data-style="utkgnx-161uaf5 utkgnx-1374l6k utkgnx-1374l6k 14bja7p-1q64x7k 1k5266c-jid85m 1k5266c-irv8el pskfds-1q64x7k" fill="none" viewBox="0 0 24 24" role="img"><g><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM15.2197 8.96967L10.75 13.4393L8.78033 11.4697C8.48744 11.1768 8.01256 11.1768 7.71967 11.4697C7.42678 11.7626 7.42678 12.2374 7.71967 12.5303L10.2197 15.0303C10.5126 15.3232 10.9874 15.3232 11.2803 15.0303L16.2803 10.0303C16.5732 9.73744 16.5732 9.26256 16.2803 8.96967C15.9874 8.67678 15.5126 8.67678 15.2197 8.96967Z" fill="#396FCD"></path></g></svg>
                                <p className=" text-[17px] text-white font-medium">Auto-scheduling with on-the-fly questions</p>
                            </div>
                            <div className=" flex justify-start items-center gap-4">
                                <svg className=" h-[25px] w-[25px]" data-style="utkgnx-161uaf5 utkgnx-1374l6k utkgnx-1374l6k 14bja7p-1q64x7k 1k5266c-jid85m 1k5266c-irv8el pskfds-1q64x7k" fill="none" viewBox="0 0 24 24" role="img"><g><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM15.2197 8.96967L10.75 13.4393L8.78033 11.4697C8.48744 11.1768 8.01256 11.1768 7.71967 11.4697C7.42678 11.7626 7.42678 12.2374 7.71967 12.5303L10.2197 15.0303C10.5126 15.3232 10.9874 15.3232 11.2803 15.0303L16.2803 10.0303C16.5732 9.73744 16.5732 9.26256 16.2803 8.96967C15.9874 8.67678 15.5126 8.67678 15.2197 8.96967Z" fill="#396FCD"></path></g></svg>
                                <p className=" text-[17px] text-white font-medium">Provision to add custom questions</p>
                            </div>
                            <div className=" flex justify-start items-center gap-4">
                                <svg className=" h-[25px] w-[25px]" data-style="utkgnx-161uaf5 utkgnx-1374l6k utkgnx-1374l6k 14bja7p-1q64x7k 1k5266c-jid85m 1k5266c-irv8el pskfds-1q64x7k" fill="none" viewBox="0 0 24 24" role="img"><g><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM15.2197 8.96967L10.75 13.4393L8.78033 11.4697C8.48744 11.1768 8.01256 11.1768 7.71967 11.4697C7.42678 11.7626 7.42678 12.2374 7.71967 12.5303L10.2197 15.0303C10.5126 15.3232 10.9874 15.3232 11.2803 15.0303L16.2803 10.0303C16.5732 9.73744 16.5732 9.26256 16.2803 8.96967C15.9874 8.67678 15.5126 8.67678 15.2197 8.96967Z" fill="#396FCD"></path></g></svg>
                                <p className=" text-[17px] text-white font-medium">Clean panel with screen-share, speech-to-text,<br /> coding-friendly interface</p>
                            </div>
                            <div className=" flex justify-start items-center gap-4">
                                <svg className=" h-[25px] w-[25px]" data-style="utkgnx-161uaf5 utkgnx-1374l6k utkgnx-1374l6k 14bja7p-1q64x7k 1k5266c-jid85m 1k5266c-irv8el pskfds-1q64x7k" fill="none" viewBox="0 0 24 24" role="img"><g><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM15.2197 8.96967L10.75 13.4393L8.78033 11.4697C8.48744 11.1768 8.01256 11.1768 7.71967 11.4697C7.42678 11.7626 7.42678 12.2374 7.71967 12.5303L10.2197 15.0303C10.5126 15.3232 10.9874 15.3232 11.2803 15.0303L16.2803 10.0303C16.5732 9.73744 16.5732 9.26256 16.2803 8.96967C15.9874 8.67678 15.5126 8.67678 15.2197 8.96967Z" fill="#396FCD"></path></g></svg>
                                <p className=" text-[17px] text-white font-medium">Unbiased evaluation and scoring</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" flex justify-center items-center w-[50%] pl-[5vw]">
                    <div id="pinblack2" className=" ">
                        <img className=" w-[40vw]" src={TestImage2} />
                    </div>
                </div>


            </div> */}


            <div id="SectionFiveTest-part1" className="pt-4 hidden cursor-default bg-[#111]  min-h-[100vh] w-[100%] sm:flex justify-center items-center px-[5vw]">


                <div className=" flex flex-col justify-center items-center w-[50%] ">
                    <div id="pinblack1" className="  opacity-1 flex flex-col justify-start text-white gap-4 ">
                        <div className="flex flex-col gap-2 border-b-[1px] border-l-0 border-t-0 border-r-0 border-solid border-gray-500 pb-4">
                            <h2 className=" text-[40px] font-semibold ">AI Interviews for the Education Sector</h2>
                            <p className="text-white font-normal">The education sector has unique hiring challenges, with candidates often required to complete written exams, demo lectures, and interview processes. Our AI-powered video interview software is designed to make education hiring more efficient and less stressful for both recruiters and candidates.</p>
                        </div>
                        <div className=" flex flex-col gap-4 justify-start">
                            <div className=" flex justify-start items-center gap-4">
                                <svg className=" h-[60px] w-[60px]" data-style="utkgnx-161uaf5 utkgnx-1374l6k utkgnx-1374l6k 14bja7p-1q64x7k 1k5266c-jid85m 1k5266c-irv8el pskfds-1q64x7k" fill="none" viewBox="0 0 24 24" role="img"><g><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM15.2197 8.96967L10.75 13.4393L8.78033 11.4697C8.48744 11.1768 8.01256 11.1768 7.71967 11.4697C7.42678 11.7626 7.42678 12.2374 7.71967 12.5303L10.2197 15.0303C10.5126 15.3232 10.9874 15.3232 11.2803 15.0303L16.2803 10.0303C16.5732 9.73744 16.5732 9.26256 16.2803 8.96967C15.9874 8.67678 15.5126 8.67678 15.2197 8.96967Z" fill="#396FCD"></path></g></svg>
                                <p className=" text-[15px] text-white font-medium">Auto-Scheduling with Adaptive Questions: Eliminate the hassle of scheduling interviews. Our software automatically arranges interviews based on candidate availability and can adapt questions to align with the specific requirements of educational roles.</p>
                            </div>
                            <div className=" flex justify-start items-center gap-4">
                                <svg className=" h-[70px] w-[70px]" data-style="utkgnx-161uaf5 utkgnx-1374l6k utkgnx-1374l6k 14bja7p-1q64x7k 1k5266c-jid85m 1k5266c-irv8el pskfds-1q64x7k" fill="none" viewBox="0 0 24 24" role="img"><g><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM15.2197 8.96967L10.75 13.4393L8.78033 11.4697C8.48744 11.1768 8.01256 11.1768 7.71967 11.4697C7.42678 11.7626 7.42678 12.2374 7.71967 12.5303L10.2197 15.0303C10.5126 15.3232 10.9874 15.3232 11.2803 15.0303L16.2803 10.0303C16.5732 9.73744 16.5732 9.26256 16.2803 8.96967C15.9874 8.67678 15.5126 8.67678 15.2197 8.96967Z" fill="#396FCD"></path></g></svg>
                                <p className=" text-[15px] text-white font-medium">Custom Questions for Education: Customize your interview process by adding questions relevant to your school's teaching philosophy, curriculum, or specific classroom scenarios. This feature allows you to evaluate candidates on their ability to meet your unique educational standards.</p>
                            </div>
                            <div className=" flex justify-start items-center gap-4">
                                <svg className=" h-[60px] w-[60px]" data-style="utkgnx-161uaf5 utkgnx-1374l6k utkgnx-1374l6k 14bja7p-1q64x7k 1k5266c-jid85m 1k5266c-irv8el pskfds-1q64x7k" fill="none" viewBox="0 0 24 24" role="img"><g><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM15.2197 8.96967L10.75 13.4393L8.78033 11.4697C8.48744 11.1768 8.01256 11.1768 7.71967 11.4697C7.42678 11.7626 7.42678 12.2374 7.71967 12.5303L10.2197 15.0303C10.5126 15.3232 10.9874 15.3232 11.2803 15.0303L16.2803 10.0303C16.5732 9.73744 16.5732 9.26256 16.2803 8.96967C15.9874 8.67678 15.5126 8.67678 15.2197 8.96967Z" fill="#396FCD"></path></g></svg>
                                <p className=" text-[15px] text-white font-medium">User-Friendly Interface: Our platform is designed with educators in mind. The interface supports screen-sharing, enabling candidates to present demo lectures, and offers speech-to-text functionality for easy transcription and note-taking.</p>
                            </div>
                            <div className=" flex justify-start items-center gap-4">
                                <svg className=" h-[60px] w-[60px]" data-style="utkgnx-161uaf5 utkgnx-1374l6k utkgnx-1374l6k 14bja7p-1q64x7k 1k5266c-jid85m 1k5266c-irv8el pskfds-1q64x7k" fill="none" viewBox="0 0 24 24" role="img"><g><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM15.2197 8.96967L10.75 13.4393L8.78033 11.4697C8.48744 11.1768 8.01256 11.1768 7.71967 11.4697C7.42678 11.7626 7.42678 12.2374 7.71967 12.5303L10.2197 15.0303C10.5126 15.3232 10.9874 15.3232 11.2803 15.0303L16.2803 10.0303C16.5732 9.73744 16.5732 9.26256 16.2803 8.96967C15.9874 8.67678 15.5126 8.67678 15.2197 8.96967Z" fill="#396FCD"></path></g></svg>
                                <p className=" text-[15px] text-white font-medium">Unbiased Evaluation and Scoring: Ensure fair assessments with our AI-driven evaluation system. This system reduces bias in scoring, providing a consistent and objective way to evaluate candidates' skills and suitability for the role</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" flex justify-center items-center w-[50%] pl-[5vw]">
                    <div id="pinblack2" className=" ">
                        <img className=" w-[60vw]" src={TestImage2} />
                    </div>
                </div>


            </div>

            {/* Mobile */}

            <div id="SectionFiveTest-part1Mob" className=" sm:hidden cursor-default bg-[#111]  min-h-[100vh] w-[100%] flex flex-col justify-center items-center px-[5vw]">

                <div className=" flex justify-center items-center w-[100%] ">
                    <div id="pinblack2Mob" className=" flex justify-center items-center">
                        <img className=" w-[90%]" src={TestImage2} />
                    </div>
                </div>

                <div className=" flex flex-col justify-center items-center w-[100%] ">
                    <div id="pinblack1Mob" className="  opacity-1 flex flex-col justify-start text-white gap-4 ">
                        <div className="flex flex-col gap-2 border-b-[1px] border-l-0 border-t-0 border-r-0 border-solid border-gray-500 pb-4">
                            <h2 className=" text-[40px] font-semibold text-center">AI interviews</h2>
                            <p className="text-white font-normal">Wave goodbye to the old-school hassle of scheduling interviews. Welcome to a new era of hiring with our video interview software, designed to cut through the noise and zoom straight to the best.</p>
                        </div>
                        <div className=" flex flex-col gap-2">
                            <div className=" flex justify-start items-center gap-4">
                                <svg className=" h-[25px] w-[25px]" data-style="utkgnx-161uaf5 utkgnx-1374l6k utkgnx-1374l6k 14bja7p-1q64x7k 1k5266c-jid85m 1k5266c-irv8el pskfds-1q64x7k" fill="none" viewBox="0 0 24 24" role="img"><g><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM15.2197 8.96967L10.75 13.4393L8.78033 11.4697C8.48744 11.1768 8.01256 11.1768 7.71967 11.4697C7.42678 11.7626 7.42678 12.2374 7.71967 12.5303L10.2197 15.0303C10.5126 15.3232 10.9874 15.3232 11.2803 15.0303L16.2803 10.0303C16.5732 9.73744 16.5732 9.26256 16.2803 8.96967C15.9874 8.67678 15.5126 8.67678 15.2197 8.96967Z" fill="#396FCD"></path></g></svg>
                                <p className=" text-[17px] text-white font-medium">Auto-scheduling with on-the-fly questions</p>
                            </div>
                            <div className=" flex justify-start items-center gap-4">
                                <svg className=" h-[25px] w-[25px]" data-style="utkgnx-161uaf5 utkgnx-1374l6k utkgnx-1374l6k 14bja7p-1q64x7k 1k5266c-jid85m 1k5266c-irv8el pskfds-1q64x7k" fill="none" viewBox="0 0 24 24" role="img"><g><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM15.2197 8.96967L10.75 13.4393L8.78033 11.4697C8.48744 11.1768 8.01256 11.1768 7.71967 11.4697C7.42678 11.7626 7.42678 12.2374 7.71967 12.5303L10.2197 15.0303C10.5126 15.3232 10.9874 15.3232 11.2803 15.0303L16.2803 10.0303C16.5732 9.73744 16.5732 9.26256 16.2803 8.96967C15.9874 8.67678 15.5126 8.67678 15.2197 8.96967Z" fill="#396FCD"></path></g></svg>
                                <p className=" text-[17px] text-white font-medium">Provision to add custom questions</p>
                            </div>
                            <div className=" flex justify-start items-center gap-4">
                                <svg className=" h-[45px] w-[45px]" data-style="utkgnx-161uaf5 utkgnx-1374l6k utkgnx-1374l6k 14bja7p-1q64x7k 1k5266c-jid85m 1k5266c-irv8el pskfds-1q64x7k" fill="none" viewBox="0 0 24 24" role="img"><g><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM15.2197 8.96967L10.75 13.4393L8.78033 11.4697C8.48744 11.1768 8.01256 11.1768 7.71967 11.4697C7.42678 11.7626 7.42678 12.2374 7.71967 12.5303L10.2197 15.0303C10.5126 15.3232 10.9874 15.3232 11.2803 15.0303L16.2803 10.0303C16.5732 9.73744 16.5732 9.26256 16.2803 8.96967C15.9874 8.67678 15.5126 8.67678 15.2197 8.96967Z" fill="#396FCD"></path></g></svg>
                                <p className=" text-[17px] text-white font-medium">Clean panel with screen-share, speech-to-text, coding-friendly interface</p>
                            </div>
                            <div className=" flex justify-start items-center gap-4">
                                <svg className=" h-[25px] w-[25px]" data-style="utkgnx-161uaf5 utkgnx-1374l6k utkgnx-1374l6k 14bja7p-1q64x7k 1k5266c-jid85m 1k5266c-irv8el pskfds-1q64x7k" fill="none" viewBox="0 0 24 24" role="img"><g><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM15.2197 8.96967L10.75 13.4393L8.78033 11.4697C8.48744 11.1768 8.01256 11.1768 7.71967 11.4697C7.42678 11.7626 7.42678 12.2374 7.71967 12.5303L10.2197 15.0303C10.5126 15.3232 10.9874 15.3232 11.2803 15.0303L16.2803 10.0303C16.5732 9.73744 16.5732 9.26256 16.2803 8.96967C15.9874 8.67678 15.5126 8.67678 15.2197 8.96967Z" fill="#396FCD"></path></g></svg>
                                <p className=" text-[17px] text-white font-medium">Unbiased evaluation and scoring</p>
                            </div>
                        </div>
                    </div>
                </div>




            </div>










        </div>
    )
}