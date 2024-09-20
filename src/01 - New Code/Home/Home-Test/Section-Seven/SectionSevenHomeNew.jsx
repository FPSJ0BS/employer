import { Swiper, SwiperSlide } from 'swiper/react';
import NikeLogo from '../../../../../public/assets/Home-new/Nike.svg'

// Import Swiper styles
import 'swiper/css';


export const SectionSevenHomeNew = ({ setonMouseEnterPageSeven, onMouseLeavePageSeven }) => {


    return (
        <div id="SectionSevenTest" className=" hidden sm:flex cursor-default bg-[#FAF8F2] h-[100vh] w-[100%] ">

            <div className=" sectionSeven-rounded-div-wrapper w-[100%] h-[100px] relative overflow-hidden ">

                <div className="bg-[#111] sectionSeven-rounded-div bottom-0 absolute left-[50%] w-[150%] h-[750%] rounded-[50%]">

                </div>

            </div>

            <div className=' flex justify-center items-center flex-col h-[100%] gap-[100px]'>
                <div id="SectionSevenOurReviews" className=" flex gap-[40px] justify-start items-center  pl-[100px] w-[100%]">
                    <div className=" flex items-center gap-2">
                        <span className=" h-[40px] w-[40px] bg-black rounded-[50%]"></span>
                        <span className="h-[40px] w-[40px] bg-[#B9E901] rounded-[50%]"></span>
                    </div>
                    <h4 className=" text-[1.9vw] text-black font-bold z-20">SEE WHAT OUR CLIENT SAYS ABOUT US</h4>
                </div>

                <div onMouseEnter={setonMouseEnterPageSeven} onMouseLeave={onMouseLeavePageSeven} className=' w-[100%] flex justify-center items-center '>

                    <div className='flex justify-center items-center px-[10vw] w-[100%]' >
                        <Swiper
                            slidesPerView="4"
                            centeredSlides={false}
                            spaceBetween={100}
                        >
                            <SwiperSlide className='  w-[30%]'>
                                <div className='pl-4 border-l-[2px] border-t-0 border-b-0 border-r-0 border-solid border-[#bfbbb6]'>

                                    <img className=' w-[15vw]' src={NikeLogo} />
                                    <p>
                                        Retained Production support across retail and events in NY, CHI, LA. Creative Design, Design Management, Production/Project Management, and execution of work  from concept to installation across the Country.
                                    </p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='  w-[30%]'>
                                <div className='pl-4 border-l-[2px] border-t-0 border-b-0 border-r-0 border-solid border-[#bfbbb6]'>

                                    <img className=' w-[15vw]' src={NikeLogo} />
                                    <p>
                                        Retained Production support across retail and events in NY, CHI, LA. Creative Design, Design Management, Production/Project Management, and execution of work  from concept to installation across the Country.
                                    </p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='  w-[30%]'>
                                <div className='pl-4 border-l-[2px] border-t-0 border-b-0 border-r-0 border-solid border-[#bfbbb6]'>

                                    <img className=' w-[15vw]' src={NikeLogo} />
                                    <p>
                                        Retained Production support across retail and events in NY, CHI, LA. Creative Design, Design Management, Production/Project Management, and execution of work  from concept to installation across the Country.
                                    </p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='  w-[30%]'>
                                <div className='pl-4 border-l-[2px] border-t-0 border-b-0 border-r-0 border-solid border-[#bfbbb6]'>

                                    <img className=' w-[15vw]' src={NikeLogo} />
                                    <p>
                                        Retained Production support across retail and events in NY, CHI, LA. Creative Design, Design Management, Production/Project Management, and execution of work  from concept to installation across the Country.
                                    </p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='  w-[30%]'>
                                <div className='pl-4 border-l-[2px] border-t-0 border-b-0 border-r-0 border-solid border-[#bfbbb6]'>

                                    <img className=' w-[15vw]' src={NikeLogo} />
                                    <p>
                                        Retained Production support across retail and events in NY, CHI, LA. Creative Design, Design Management, Production/Project Management, and execution of work  from concept to installation across the Country.
                                    </p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='  w-[30%]'>
                                <div className='pl-4 border-l-[2px] border-t-0 border-b-0 border-r-0 border-solid border-[#bfbbb6]'>

                                    <img className=' w-[15vw]' src={NikeLogo} />
                                    <p>
                                        Retained Production support across retail and events in NY, CHI, LA. Creative Design, Design Management, Production/Project Management, and execution of work  from concept to installation across the Country.
                                    </p>
                                </div>
                            </SwiperSlide>

                            {/* Add more slides as needed */}
                        </Swiper>
                    </div>
                </div>
            </div>




        </div>
    )
}