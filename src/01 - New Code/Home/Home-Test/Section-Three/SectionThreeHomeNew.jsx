import { useRef, useEffect } from "react";

import VideoFile from '../../../../../public/assets/video/Unlock Your Dream Job with Tallento.ai_ Revolutionizing Job Hunting   _ FPSJOB.mp4'

export const SectionThreeHomeNew = ({ setonMouseEnterVideoPageThree, setonMouseLeaveVideoPageThree }) => {




    return (
        <>
            <div id="SectionThreeTest" className=" bg-[#111] ">

                <div className="hidden sm:block  mt-[-400px] min-h-[100vh] w-[100%] bg-[#FAF8F2] rounded-t-[100px] pb-[200px] ">

                    <div id="SectionThreeOurServices" className=" flex gap-[40px] items-center pt-[100px] pl-[100px]">
                        <div className=" flex items-center gap-2">
                            <span className=" h-[40px] w-[40px] bg-black rounded-[50%]"></span>
                            <span className="h-[40px] w-[40px] bg-[#B9E901] rounded-[50%]"></span>
                        </div>
                        <h4 className=" cursor-default text-[1.9vw] text-black font-bold z-20">WHY CHOOSE US FOR YOUR JOB SEARCH?</h4>
                    </div>
                    {/* <div onMouseEnter={setonMouseEnterVideoPageThree} onMouseLeave={setonMouseLeaveVideoPageThree} id="hero-shape" >
                        <div id="hero-1"></div>
                        <div id="hero-2"></div>
                            <div id="hero-3"></div>
                        </div> */}

                    <div className="w-[100%] flex justify-center py-[50px] ">
                        <video onMouseEnter={setonMouseEnterVideoPageThree} onMouseLeave={setonMouseLeaveVideoPageThree} id="video-section-3" autoPlay loop muted controls className="w-[90%] h-[80%] rounded-3xl" src={VideoFile}></video>
                    </div>

                </div>



            </div>

            {/* Mobile */}

            <div id="SectionThreeTestMob" className=" bg-[#111] ">

                <div className="sm:hidden block pt-[50px]  mt-[-100px] min-h-[100vh] w-[100%] bg-[#FAF8F2] rounded-t-[30px] pb-[200px] ">

                    <div id="SectionThreeOurServicesMob" className=" flex items-center gap-[20px] pl-1">
                        <div className=" flex items-center gap-2">
                            <span className=" w-[20px] h-[20px] bg-black rounded-[50%]"></span>
                            <span className="w-[20px] h-[20px] bg-[#B9E901] rounded-[50%]"></span>
                        </div>
                        <h4 className=" text-[20px] text-black font-bold ">WHY CHOOSE US FOR YOUR JOB SEARCH?</h4>
                    </div>
                    {/* <div onMouseEnter={setonMouseEnterVideoPageThree} onMouseLeave={setonMouseLeaveVideoPageThree} id="hero-shape" >
                        <div id="hero-1"></div>
                        <div id="hero-2"></div>
                            <div id="hero-3"></div>
                        </div> */}

                    <div className="w-[100%] flex justify-center py-[50px] ">
                        <video onMouseEnter={setonMouseEnterVideoPageThree} onMouseLeave={setonMouseLeaveVideoPageThree} id="video-section-3" autoPlay loop muted controls className="w-[90%] h-[80%] rounded-3xl" src={VideoFile}></video>
                    </div>

                </div>



            </div>
        </>
    )
}