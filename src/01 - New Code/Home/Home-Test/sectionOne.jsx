
import './testcsssass.scss'


export const SectionOne = ({ setonMouseEnterPageOne, setonMouseEnterPageOneSearchBox }) => {


    return (
        <>
            <div onMouseEnter={setonMouseEnterPageOne} data-scroll-section id='SectionOneTest' className=" hidden  relative scroll h-[100vh] w-[100%] gap-4  text-white sm:flex flex-col justify-center items-center leading-[8.5vw]">





                <h1 data-scroll id="page1h1Main" className=' cursor-default text-[7.5vw] font-bold'>FPS JOBS</h1>
                <h1 data-scroll id="page1h2Main" className=' cursor-default text-[7.5vw] font-bold'>TALLENTO.AI</h1>

                <div id='page1gethetop' className=' cursor-default'>
                    <p className=' text-[20px] text-white leading-8'>Get the top <span className='textAnimationSection3Heading font-semibold'>1%</span> filtered candidates <span className='textAnimationSection3Heading font-semibold'>3x</span> faster with FPSJOBS + Tallento.ai. <br />You can focus on onboarding while we find the perfect fit.</p>
                </div>


            </div>

            {/* mobile */}

            <div onMouseEnter={setonMouseEnterPageOne} data-scroll-section id='SectionOneTest' className=" sm:hidden  relative scroll h-[100vh] w-[100%] gap-4  text-white flex flex-col justify-center items-center leading-[8.5vw] pt-[100px]">

                <h1 data-scroll id="page1h1MainMob" className=' cursor-default text-[12vw] font-bold'>FPS JOBS</h1>
                <h1 data-scroll id="page1h2MainMob" className=' cursor-default text-[12vw] font-bold'>TALLENTO.AI</h1>

                <div id='page1gethetopMob' className=' cursor-default'>
                    <p className='px-[20px] text-[18px] text-white leading-8'>Get the top <span className='textAnimationSection3Heading font-semibold'>1%</span> filtered candidates <span className='textAnimationSection3Heading font-semibold'>3x</span> faster with FPSJOBS + Tallento.ai. <br />You can focus on onboarding while we find the perfect fit.</p>
                </div>

            </div>
        </>
    )
}