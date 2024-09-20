import { useRef, useEffect } from "react";

export const SectionFourHomeNew = ({ setnMouseEnterPages }) => {




    return (
        <>
            <div onMouseEnter={setnMouseEnterPages} id="SectionFourTest" className="hidden sm:block xl:mb-[-150px] 2xl:mb-[0px] h-[80vh] 2xl:h-[100vh] w-[100%] lg:mt-[440px] xl:mt-[550px] 2xl:mt-[440px]">

                {/* <div className=" sectionfour-rounded-div-wrapper w-[100%] h-[100px] relative overflow-hidden ">

                         <div className="bg-[#FAF8F2] sectionSeven-rounded-div bottom-0 absolute left-[50%] w-[150%] h-[750%] rounded-[50%]">

                        </div>

                            </div> */}

                <div className="SectionFour-content-2  xl:h-[60vh] 2xl:h-[100vh]">
                    <div className="SectionFour-text-area">
                        <h1>All the features you need</h1>
                        <br />
                        <h2>that fuel your bottom line.</h2>
                    </div>
                    <div className="SectionFour-text-area-hover">
                        <h1>All the features you need</h1>
                        <br />
                        <h2>that fuel your bottom line.</h2>
                    </div>
                </div>

            </div>

            {/* Mobile */}

            <div onMouseEnter={setnMouseEnterPages} id="SectionFourTestMob" className="mt-[100px] block sm:hidden xl:mb-[-150px] 2xl:mb-[0px] h-[20vh] sm:h-[80vh] 2xl:h-[100vh] w-[100%] lg:mt-[440px] xl:mt-[550px] 2xl:mt-[440px]">

                {/* <div className=" sectionfour-rounded-div-wrapper w-[100%] h-[100px] relative overflow-hidden ">

                        <div className="bg-[#FAF8F2] sectionSeven-rounded-div bottom-0 absolute left-[50%] w-[150%] h-[750%] rounded-[50%]">

                    </div>

            </div> */}

                <div className="SectionFour-content-2Mob  xl:h-[60vh] 2xl:h-[100vh] flex flex-col justify-center items-center gap-4">
                    <div className="text-[30px] ">
                        <h1>All the features you need</h1>
                        <br />
                        <h2>that fuel your bottom line.</h2>
                    </div>
                   
                </div>

            </div>
        </>
    )
}