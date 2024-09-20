import { useRef } from "react";
import gsap, { Bounce } from "gsap";
import { useGSAP } from "@gsap/react";


function Gsaptest() {

    const container = useRef();

    useGSAP(() => {

      gsap.to(".box", {rotation: 180, x:300, duration:2, backgroundColor: 'red'}); 
  
    }, { scope: container })


    return (
        <div ref={container} className=' flex justify-center items-center h-[100vh]'>


            <div  className="box bg-black h-[100px] w-[100px] ">
                test

            </div>
        </div>
    )
}

export default Gsaptest