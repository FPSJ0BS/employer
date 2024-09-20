import { useState } from "react"



export const SectionTwo = ({ setonMouseEnterPageTwo, setonMouseEnterBulletPoints, setonMouseLeaveBulletPoints, setonMouseEnterFPsJobs, setonMouseLeaveFPsJobs, setonMouseClickFPsJobs,




}) => {
    const [bulletOne, setBulletOne] = useState(false)
    const [bulletTwo, setBulletTwo] = useState(false)
    const [bulletThree, setBulletThree] = useState(false)
    const [bulletFour, setBulletFour] = useState(false)
    const [bulletFive, setBulletFive] = useState(false)
    const [bulletSix, setBulletSix] = useState(false)

    return (
        <>
            <div className=" hidden sm:block min-h-[120vh] w-[100%] bg-black cursor-default">

                <div data-scroll-section onMouseEnter={setonMouseEnterPageTwo} id="SectionTwoTest" className="pb-[200px] flex flex-col gap-[80px] p-[100px] min-h-[120%] w-[100%] bg-[#111] rounded-t-[100px] ">

                    <div id="SectionTwoOurServices" className=" flex gap-[40px] items-center">
                        <div className=" flex items-center gap-2">
                            <span className=" h-[40px] w-[40px] bg-white rounded-[50%]"></span>
                            <span className="h-[40px] w-[40px] bg-[#B9E901] rounded-[50%]"></span>
                        </div>
                        <h4 className=" text-[1.9vw] text-white font-bold ">OUR SERVICES</h4>
                    </div>

                    <div id="SectionTwoFindOut" className=" cursor-default">
                        <h2 className=" text-[20px] sm:text-[70px] text-white font-semibold ">Find out what we do at<br /><span onClick={setonMouseClickFPsJobs} onMouseEnter={setonMouseEnterFPsJobs} onMouseLeave={setonMouseLeaveFPsJobs} id="SectionTwoFpsJobs" className=" cursor-pointer">FPS JOBS</span></h2>
                    </div>

                    <div className=" text-white flex flex-col gap-[40px] ">

                        {/* Bullet point one */}

                        <div onMouseEnter={setonMouseEnterBulletPoints} onMouseLeave={setonMouseLeaveBulletPoints} className=" mainDinForDropdown hover-div-test min-h-[10vh] w-[70vw] relative overflow-hidden border-b-[1px] border-t-0 border-r-0 border-l-0 border-solid">
                            <div onMouseEnter={() => setBulletOne(true)} onMouseLeave={() => setBulletOne(false)}>
                                <div className="-z-[10] ser-hover-div bg-[#5F20EA] absolute top-[100%] h-[100%] w-[100%] hover-div-test flex items-center justify-between border-[#333] border-b-[1px] border-t-[0px] border-l-[0px] border-r-[0px]  border-solid ">
                                </div>
                                <div className=" flex items-center gap-[100px]">
                                    <p className=" text-[40px] text-white">01</p>
                                    <h3 className="text-[40px]">Job Requirement Collection</h3>
                                </div>
                                <span className="h-[50px] w-[50px] bg-white rounded-[50%] mr-[300px] "></span>
                                {bulletOne && <p className="bulletDropDown text-white pb-[20px] text-[20px] xl:pl-[10.8vw] 2xl:pl-[9vw] pr-[10vw] leading-[1.4em]">We gather detailed job descriptions, including role responsibilities, qualifications, salary range, and interview process.</p>}
                            </div>
                        </div>

                        {/* Bullet point Two */}

                        <div onMouseEnter={setonMouseEnterBulletPoints} onMouseLeave={setonMouseLeaveBulletPoints} className="hover-div-test min-h-[10vh] w-[70vw] relative overflow-hidden border-b-[1px] border-t-0 border-r-0 border-l-0 border-solid">
                            <div onMouseEnter={() => setBulletTwo(true)} onMouseLeave={() => setBulletTwo(false)}>
                                <div className="-z-[10] ser-hover-div bg-[#5F20EA] absolute top-[100%] h-[100%] w-[100%] hover-div-test flex items-center justify-between border-[#333] border-b-[1px] border-t-[0px] border-l-[0px] border-r-[0px] pb-2 border-solid ">
                                </div>
                                <div className=" flex items-center gap-[100px]">
                                    <p className=" text-[40px] text-white">02</p>
                                    <h3 className="text-[40px]">Job Posting and Candidate Sourcing</h3>
                                </div>

                                <span className="h-[50px] w-[50px] bg-white rounded-[50%] mr-[300px] "></span>
                                {bulletTwo && <p className="bulletDropDown text-white pb-[20px] text-[20px] xl:pl-[11.2vw] 2xl:pl-[9.5vw] pr-[10vw] leading-[1.4em]">We post jobs on our portal and source candidates from our extensive database. We also leverage our network to attract qualified candidates.</p>}
                            </div>
                        </div>

                        {/* Bullet point Three */}

                        <div onMouseEnter={setonMouseEnterBulletPoints} onMouseLeave={setonMouseLeaveBulletPoints} className="hover-div-test min-h-[10vh] w-[70vw] relative overflow-hidden border-b-[1px] border-t-0 border-r-0 border-l-0 border-solid">
                            <div onMouseEnter={() => setBulletThree(true)} onMouseLeave={() => setBulletThree(false)}>
                                <div className="-z-[10] ser-hover-div bg-[#5F20EA] absolute top-[100%] h-[100%] w-[100%] hover-div-test flex items-center justify-between border-[#333] border-b-[1px] border-t-[0px] border-l-[0px] border-r-[0px] pb-2 border-solid ">
                                </div>
                                <div className=" flex items-center gap-[100px]">
                                    <p className=" text-[40px] text-white">03</p>
                                    <h3 className="text-[40px]">Screening and Shortlisting</h3>
                                </div>

                                <span className="h-[50px] w-[50px] bg-white rounded-[50%] mr-[300px] "></span>
                                {bulletThree && <p className="bulletDropDown text-white pb-[20px] text-[20px] xl:pl-[11.5vw] 2xl:pl-[9.5vw] pr-[10vw] leading-[1.2em]">We review applications and shortlist candidates based on your criteria. Our process involves initial screening through phone or online communication to confirm qualifications, interest, and availability.</p>}
                            </div>
                        </div>

                        {/* Bullet point Four */}

                        <div onMouseEnter={setonMouseEnterBulletPoints} onMouseLeave={setonMouseLeaveBulletPoints} className="hover-div-test min-h-[10vh] w-[70vw] relative overflow-hidden border-b-[1px] border-t-0 border-r-0 border-l-0 border-solid">
                            <div onMouseEnter={() => setBulletFour(true)} onMouseLeave={() => setBulletFour(false)}>
                                <div className="-z-[10] ser-hover-div bg-[#5F20EA] absolute top-[100%] h-[100%] w-[100%] hover-div-test flex items-center justify-between border-[#333] border-b-[1px] border-t-[0px] border-l-[0px] border-r-[0px] pb-2 border-solid ">
                                </div>
                                <div className=" flex items-center gap-[100px]">
                                    <p className=" text-[40px] text-white">04</p>
                                    <h3 className="text-[40px]">Interview Scheduling and Communication</h3>
                                </div>

                                <span className="h-[50px] w-[50px] bg-white rounded-[50%] mr-[300px] "></span>
                                {bulletFour && <p className="bulletDropDown text-white pb-[20px] text-[20px] xl:pl-[11.5vw] 2xl:pl-[9.5vw] pr-[10vw] leading-[1.2em]">We coordinate interviews with candidates, ensuring a smooth and efficient process.</p>}
                            </div>
                        </div>

                        {/* Bullet point Five */}

                        <div onMouseEnter={setonMouseEnterBulletPoints} onMouseLeave={setonMouseLeaveBulletPoints} className="hover-div-test min-h-[10vh] w-[70vw] relative overflow-hidden border-b-[1px] border-t-0 border-r-0 border-l-0 border-solid">
                            <div onMouseEnter={() => setBulletFive(true)} onMouseLeave={() => setBulletFive(false)}>
                                <div className="-z-[10] ser-hover-div bg-[#5F20EA] absolute top-[100%] h-[100%] w-[100%] hover-div-test flex items-center justify-between border-[#333] border-b-[1px] border-t-[0px] border-l-[0px] border-r-[0px] pb-2 border-solid ">
                                </div>
                                <div className=" flex items-center gap-[100px]">
                                    <p className=" text-[40px] text-white">05</p>
                                    <h3 className="text-[40px]">Final Selection and Offer Negotiation</h3>
                                </div>

                                <span className="h-[50px] w-[50px] bg-white rounded-[50%] mr-[300px] "></span>
                                {bulletFive && <p className="bulletDropDown text-white pb-[20px] text-[20px] xl:pl-[11.5vw] 2xl:pl-[9.5vw] pr-[10vw]">We assist with the selection process, negotiating terms and salaries with the selected candidates. However, please note that we do not conduct background verification as part of our process.</p>}
                            </div>
                        </div>

                        {/* Bullet point Six */}

                        <div onMouseEnter={setonMouseEnterBulletPoints} onMouseLeave={setonMouseLeaveBulletPoints} className="hover-div-test min-h-[10vh] w-[70vw] relative overflow-hidden border-b-[1px] border-t-0 border-r-0 border-l-0 border-solid">
                            <div onMouseEnter={() => setBulletSix(true)} onMouseLeave={() => setBulletSix(false)}>
                                <div className="-z-[10] ser-hover-div bg-[#5F20EA] absolute top-[100%] h-[100%] w-[100%] hover-div-test flex items-center justify-between border-[#333] border-b-[1px] border-t-[0px] border-l-[0px] border-r-[0px] pb-2 border-solid ">
                                </div>
                                <div className=" flex items-center gap-[100px]">
                                    <p className=" text-[40px] text-white">06</p>
                                    <h3 className="text-[40px]">Onboarding Assistance</h3>
                                </div>

                                <span className="h-[50px] w-[50px] bg-white rounded-[50%] mr-[300px] "></span>
                                {bulletSix && <p className="bulletDropDown text-white pb-[20px] text-[20px] xl:pl-[11.5vw] 2xl:pl-[9.5vw] pr-[10vw] leading-[1.2em]">Once the candidate is selected, we support the onboarding process, ensuring a smooth transition into your organization.</p>}
                            </div>
                        </div>



                        {/* <div onMouseEnter={setonMouseEnterBulletPoints} onMouseLeave={setonMouseLeaveBulletPoints} className="hover-div-test h-[10vh] relative overflow-hidden border-b-1 border-t-0 border-r-0 border-l-0 border-solid">
       <div className="ser-hover-div bg-[#5F20EA] absolute top-[100%] h-[100%] w-[100%] hover-div-test flex items-center justify-between border-[#333] border-b-[1px] border-t-[0px] border-l-[0px] border-r-[0px] pb-2 border-solid ">


           <div className=" flex items-center gap-[100px]">
               <p className=" text-[50px] text-white">01</p>
               <h3 className="text-[50px]">Market Research</h3>
           </div>

           <span className="h-[50px] w-[50px] bg-white rounded-[50%] mr-[300px] "></span>

       </div>
       <div className=" flex items-center gap-[100px]">
           <p className=" text-[50px] text-white">01</p>
           <h3 className="text-[50px]">Market Research</h3>
       </div>

       <span className="h-[50px] w-[50px] bg-white rounded-[50%] mr-[300px] "></span>
   </div> */}

                    </div>

                </div>

            </div>

            {/* Mobile */}

            <div className=" block sm:hidden min-h-[100vh] w-[100%]  bg-black cursor-default">

                <div data-scroll-section onMouseEnter={setonMouseEnterPageTwo} id="SectionTwoTestMob" className="pt-[30px] pb-[200px] flex flex-col gap-[40px] p-[20px] min-h-[100vh] w-[100%] bg-[#111] ">

                    <div id="SectionTwoOurServicesMob" className=" flex items-center gap-[20px]">
                        <div className=" flex items-center gap-2">
                            <span className=" w-[20px] h-[20px] bg-white rounded-[50%]"></span>
                            <span className="w-[20px] h-[20px] bg-[#B9E901] rounded-[50%]"></span>
                        </div>
                        <h4 className=" text-[20px] text-white font-bold ">OUR SERVICES</h4>
                    </div>

                    <div id="SectionTwoFindOutMob" className=" cursor-default">
                        <h2 className=" text-[26px] sm:text-[70px] text-white font-semibold ">Find out what we do at<br /><span onClick={setonMouseClickFPsJobs} onMouseEnter={setonMouseEnterFPsJobs} onMouseLeave={setonMouseLeaveFPsJobs} id="SectionTwoFpsJobs" className=" cursor-pointer">FPS JOBS</span></h2>
                    </div>

                    <div className=" text-white flex flex-col gap-[40px] ">

                        <div onMouseEnter={setonMouseEnterBulletPoints} onMouseLeave={setonMouseLeaveBulletPoints} className="hover-div-test h-[10vh] w-[90vw] relative overflow-hidden border-b-[1px] border-t-0 border-r-0 border-l-0 border-solid">
                            <div className="-z-[10] ser-hover-div bg-[#5F20EA] absolute top-[100%] h-[100%] w-[100%] hover-div-test flex items-center justify-between border-[#333] border-b-[1px] border-t-[0px] border-l-[0px] border-r-[0px]  border-solid ">
                            </div>
                            <div className=" flex items-center gap-[20px]">
                                <p className=" text-[20px] text-white">01</p>
                                <h3 className="text-[20px]">Job Requirement Collection</h3>
                            </div>

                            <span className="h-[50px] w-[50px] bg-white rounded-[50%] mr-[300px] "></span>
                        </div>

                        <div onMouseEnter={setonMouseEnterBulletPoints} onMouseLeave={setonMouseLeaveBulletPoints} className="hover-div-test h-[10vh] w-[90vw] relative overflow-hidden border-b-[1px] border-t-0 border-r-0 border-l-0 border-solid">
                            <div className="-z-[10] ser-hover-div bg-[#5F20EA] absolute top-[100%] h-[100%] w-[100%] hover-div-test flex items-center justify-between border-[#333] border-b-[1px] border-t-[0px] border-l-[0px] border-r-[0px] pb-2 border-solid ">
                            </div>
                            <div className=" flex items-center gap-[20px]">
                                <p className=" text-[20px] text-white">02</p>
                                <h3 className="text-[20px]">Job Posting and Candidate Sourcing</h3>
                            </div>

                            <span className="h-[50px] w-[50px] bg-white rounded-[50%] mr-[300px] "></span>
                        </div>

                        <div onMouseEnter={setonMouseEnterBulletPoints} onMouseLeave={setonMouseLeaveBulletPoints} className="hover-div-test h-[10vh] w-[90vw] relative overflow-hidden border-b-[1px] border-t-0 border-r-0 border-l-0 border-solid">
                            <div className="-z-[10] ser-hover-div bg-[#5F20EA] absolute top-[100%] h-[100%] w-[100%] hover-div-test flex items-center justify-between border-[#333] border-b-[1px] border-t-[0px] border-l-[0px] border-r-[0px] pb-2 border-solid ">
                            </div>
                            <div className=" flex items-center gap-[20px]">
                                <p className=" text-[20px] text-white">03</p>
                                <h3 className="text-[20px]">Screening and Shortlisting</h3>
                            </div>

                            <span className="h-[50px] w-[50px] bg-white rounded-[50%] mr-[300px] "></span>
                        </div>

                        <div onMouseEnter={setonMouseEnterBulletPoints} onMouseLeave={setonMouseLeaveBulletPoints} className="hover-div-test h-[10vh] w-[90vw] relative overflow-hidden border-b-[1px] border-t-0 border-r-0 border-l-0 border-solid">
                            <div className="-z-[10] ser-hover-div bg-[#5F20EA] absolute top-[100%] h-[100%] w-[100%] hover-div-test flex items-center justify-between border-[#333] border-b-[1px] border-t-[0px] border-l-[0px] border-r-[0px] pb-2 border-solid ">
                            </div>
                            <div className=" flex items-center gap-[20px]">
                                <p className=" text-[20px] text-white">04</p>
                                <h3 className="text-[20px]">Interview Scheduling and Communication</h3>
                            </div>

                            <span className="h-[50px] w-[50px] bg-white rounded-[50%] mr-[300px] "></span>
                        </div>

                        <div onMouseEnter={setonMouseEnterBulletPoints} onMouseLeave={setonMouseLeaveBulletPoints} className="hover-div-test h-[10vh] w-[90vw] relative overflow-hidden border-b-[1px] border-t-0 border-r-0 border-l-0 border-solid">
                            <div className="-z-[10] ser-hover-div bg-[#5F20EA] absolute top-[100%] h-[100%] w-[100%] hover-div-test flex items-center justify-between border-[#333] border-b-[1px] border-t-[0px] border-l-[0px] border-r-[0px] pb-2 border-solid ">
                            </div>
                            <div className=" flex items-center gap-[20px]">
                                <p className=" text-[20px] text-white">05</p>
                                <h3 className="text-[20px]">Final Selection and Offer Negotiation</h3>
                            </div>

                            <span className="h-[50px] w-[50px] bg-white rounded-[50%] mr-[300px] "></span>
                        </div>



                        {/* <div onMouseEnter={setonMouseEnterBulletPoints} onMouseLeave={setonMouseLeaveBulletPoints} className="hover-div-test h-[10vh] relative overflow-hidden border-b-1 border-t-0 border-r-0 border-l-0 border-solid">
<div className="ser-hover-div bg-[#5F20EA] absolute top-[100%] h-[100%] w-[100%] hover-div-test flex items-center justify-between border-[#333] border-b-[1px] border-t-[0px] border-l-[0px] border-r-[0px] pb-2 border-solid ">


<div className=" flex items-center gap-[100px]">
<p className=" text-[50px] text-white">01</p>
<h3 className="text-[50px]">Market Research</h3>
</div>

<span className="h-[50px] w-[50px] bg-white rounded-[50%] mr-[300px] "></span>

</div>
<div className=" flex items-center gap-[100px]">
<p className=" text-[50px] text-white">01</p>
<h3 className="text-[50px]">Market Research</h3>
</div>

<span className="h-[50px] w-[50px] bg-white rounded-[50%] mr-[300px] "></span>
</div> */}

                    </div>

                </div>

            </div>
        </>
    )
}