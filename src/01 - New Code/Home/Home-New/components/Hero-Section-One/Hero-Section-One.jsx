import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


function HeroSectionOne() {
  const heroSectionOneRef = useRef();
  const { contextSafe } = useGSAP({ scope: heroSectionOneRef });



  const onMouseEnter = contextSafe(() => {

    gsap.to("#cursorMain", {
      scale: 1,
      opacity: 1,
      width: '7.5vw',
      height: '7.5vw',
      text: "Click Me!"
    });
  });

  const onMouseLeave = contextSafe(() => {

    gsap.to("#cursorMain", {
      // scale: 0.5,
      // opacity: 0
      width: '1vw',
      height: '1vw',
      text: '',
      zIndex: 50,
    

    });
  });




  return (





    <div ref={heroSectionOneRef} onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter} id="page1" className='  relative h-[100vh] w-[100%] bg-[#111] text-white flex flex-col justify-center items-center leading-[8.5vw]'>

      <div id="cursorMain" className="  h-[7.5vw] w-[7.5vw] bg-[#ff5f38] rounded-[50%] fixed z-20 flex items-center justify-center text-[1vw] font-medium">FPS JOBS</div>

      

    </div>

  )
}

export default HeroSectionOne