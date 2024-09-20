
import TestImage4 from '../../../../../public/assets/Home-new/FPS_Job Provider.png'
import TestImage5 from '../../../../../public/assets/Home-new/fps google.png'
import TestImage6 from '../../../../../public/assets/Home-new/Find & engage 1.png'
import { AnimatedBeamMultipleInputDemo } from "../../../MagicUI/AnimatedBeam/Beam.tsx"

export const SectionNineHomeTest = ({ setnMouseEnterPages }) => {



    return (
        <>
            <div onMouseEnter={setnMouseEnterPages} className=" sm:block hidden cursor-default bg-[#FAF8F2] mt-[-400px] h-[350vh] w-[100%]" id="SectionNineHomeTest">

                <div id="SectionNineOurServices" className="text-new h-[50vh] w-[100%] flex justify-center items-center">
                    <div className=" flex gap-[40px] items-center ">
                        <div className=" flex items-center gap-2">
                            <span className=" h-[40px] w-[40px] bg-black rounded-[50%]"></span>
                            <span className="h-[40px] w-[40px] bg-[#B9E901] rounded-[50%]"></span>
                        </div>
                        <h4 className=" text-[2.2vw] text-black font-bold z-20 uppercase leading-[1.4em]">AI-powered job portal adapts to modern recruitment demands,<br /> offering efficient, flexible, and insightful hiring solutions</h4>
                    </div>
                </div>

                <div className="cards-new h-[100vh] w-[100%] flex justify-center items-center" id="card-one-new">
                    <div className="w-[90%] bg-[#111] h-[80%] flex gap-[100px] justify-center items-center rounded-[20px]">
                        <img className="w-[40%] pt-4" src={TestImage4} />
                        <h2  className="w-[40%] text-white text-[2vw] text-left">Attracting the best talent is  crucial for maintaining a competitive advantage with FPS Jobs and Tallento.ai, harnessing the power of AI and human expertise, you can boost your <span className="bglinergrad font-semibold">recruiters productivity by 10x.</span></h2>
                    </div>
                </div>

                <div className="cards-new h-[100vh] w-[100%] flex justify-center items-center" id="card-two-new">
                    <div className="w-[90%] bg-[#111] h-[80%] flex  justify-center items-center rounded-[20px] gap-[100px]">
                        <div>
                            <h2 className="text-white text-[2.4vw] text-center">Find <span className="bglinergrad font-semibold">great talent in days,</span> not months.</h2>
                            <p className=' text-white text-[1.2vw] pt-4 text-left'>We're redefining how talent is sourced, engaged, and hired.<br /> Our AI-powered talent engagement platform automates<br /> sourcing and outreach, freeing your recruiters to focus<br /> on the human side of recruiting. Designed by educators,<br /> for the education sector.</p>
                        </div>
                        <img className="w-[40%] " src={TestImage5} />
                    </div>
                </div>

                <div className="cards-new h-[100vh] w-[100%] flex justify-center items-center bg-[#FAF8F2]" id="card-three-new">
                    <div className="w-[90%] bg-[#111] h-[80%] flex  justify-center items-center rounded-[20px] gap-[100px]">
                        {/* <img className="w-[40%]" src={TestImage6} /> */}
                        <AnimatedBeamMultipleInputDemo />

                        <div>
                            <h2 className="text-white text-[2.4vw] text-left">Find & engage with the <span className="bglinergrad font-semibold">best<br /> talent </span>across the internet in just<br /> a few clicks.</h2>
                            <p className=' text-white text-[1.2vw] pt-4 text-left'>We’re reinventing what it means to source, engage, and hire<br /> top talent. Our AI-powered talent engagement platform<br /> automates sourcing and outreach, giving your recruiters the<br /> bandwidth to focus on the human side of recruiting. Built by<br /> recruiters for recruiters.</p>
                        </div>
                    </div>
                </div>

            </div>


            {/* mobile */}

            <div onMouseEnter={setnMouseEnterPages} className="pt-[100px] sm:hidden block cursor-default bg-[#FAF8F2] mt-[-400px] min-h-[100px] w-[100%]" id="SectionNineHomeTestMob">

                <div id="SectionNineOurServicesMob" className="text-new  w-[100%] flex justify-center items-center">
                    <div className=" flex flex-col justify-center gap-[30px] items-center ">
                        <div className=" flex items-center gap-2">
                            <span className=" h-[20px] w-[20px] bg-black rounded-[50%]"></span>
                            <span className="h-[20px] w-[20px] bg-[#B9E901] rounded-[50%]"></span>
                        </div>
                        <h4 className=" text-[20px] text-black font-bold z-20 uppercase pl-4">AI powered recruitment software that take into account the newest hiring methods</h4>
                    </div>
                </div>

                <div className="cards-new mt-[50px] mb-[30px] w-[100%] flex justify-center items-center" id="card-one-newMob">
                    <div className="w-[90%] py-[50px] bg-[#111]  flex flex-col justify-center items-center rounded-[20px]">
                        <h2 className="px-2 text-white text-[20px] text-center">Getting the best talent is key to maintaining competitive advantage today. Fps Jobs makes your <span className="bglinergrad font-semibold">recruiters 10x productive.</span></h2>
                        <img className="w-[80%] pt-4" src={TestImage4} />
                    </div>
                </div>

                <div className="cards-new mb-[30px] w-[100%] flex justify-center items-center" id="card-two-newMob">
                    <div className="w-[90%] py-[50px] bg-[#111] h-[80%] flex flex-col justify-center items-center rounded-[20px] gap-[20px]">
                        <div>
                            <h2 className="text-white text-[20px] text-center">Find <span className="bglinergrad font-semibold">great talent<br /> in days,</span> not months.</h2>
                            <p className='px-[20px] text-white text-[15px] pt-4 text-left'>We’re reinventing what it means to source, engage, and hire top talent. Our AI-powered talent engagement platform automates sourcing and outreach, giving your recruiters the bandwidth to focus on the human side of recruiting. Built by recruiters for recruiters.</p>
                        </div>
                        <img className="w-[80%] " src={TestImage5} />
                    </div>
                </div>

                <div className="cards-new  w-[100%] flex justify-center items-center" id="card-three-newMob">
                    <div className="py-[50px] w-[90%] bg-[#111] h-[80%] flex flex-col justify-center items-center rounded-[20px] gap-[20px]">
                        <div className=' flex flex-col items-center'>
                            <h2 className="text-white text-[15px] text-left px-2">Find & engage with the <span className="bglinergrad font-semibold">best<br /> talent </span>across the internet in just<br /> a few clicks.</h2>
                            <p className='px-[20px] text-white text-[15px] pt-4 text-left'>We’re reinventing what it means to source, engage, and hire top talent. Our AI-powered talent engagement platform automates sourcing and outreach, giving your recruiters the bandwidth to focus on the human side of recruiting. Built by recruiters for recruiters.</p>
                        </div>
                        <img className="w-[80%]" src={TestImage4} />

                    </div>
                </div>

            </div>
        </>
    )
}