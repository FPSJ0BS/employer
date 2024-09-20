import HeroSectionOne from "./components/Hero-Section-One/Hero-Section-One"
import { HeroSectionTwo } from "./components/Section-two/Hero-Section-two";
import NavbarNew from "./components/Navbar/Navbar"
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP, TextPlugin);



export const HomeNew = () => {

    const container = useRef();

    // 1 - > Implementing Loading Animation Page-1 ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // useGSAP(() => {
    //     var tl = gsap.timeline();

    //     tl.to("#cursorMain", {
    //         autoAlpha: 0
            
    //     })
    //         .from("#page1", {
    //             opacity: 0,
    //             duration: 0.2,
    //             delay: 0.2
    //         })
    //         .from("#page1", {
    //             transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
    //             borderRadius: "150px",
    //             duration: 2,
    //             ease: "expo.out"
    //         })
    //         .from("nav", {
    //             opacity: 0,
    //             delay: -0.2
    //         })
    //         .from("#page1 h1, #page1 p", {
    //             opacity: 0,
    //             duration: 0.5,
    //             stagger: 0.2
    //         })
    //         .to("#page1h1", {
    //             delay: 2,
    //             duration: 2,
    //             text: "TALLENTO.AI",
    //         }, '-=2')
    //         .to("#page1h2", {
    //             delay: 1,
    //             duration: 2,
    //             text: "FPS JOBS",
    //         }, '-=2')
    //         .to("#cursorMain", {
    //             autoAlpha: 1,
    //             text: "Click Me!",

    //             // Show cursorPage1 after the animation
    //         });
    // });


    // 2 - > Implementing Mouse Follower ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/

    const { contextSafe } = useGSAP({ scope: container });

    const onMouseMove = contextSafe((e) => {
        gsap.to("#cursorMain", {
            x: e.pageX - 800,
            y: e.pageY - 400,
            stagger: 0.15,
            ease: "none",
            duration: 0.5,
            overwrite: "auto",
        });
    });

    // 3 - > Mouse Enter Mouse Leave code in Hero-section-one component ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    // 4 - > Scroll Trigger - page 2 animation -->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.


    useGSAP(() => {

        gsap.to("#page2", {
            scrollTrigger: {
                trigger: '#page1',
                markers: true,
                start: 'center center'
            },
            y: -100,
        })

    });


    return (

        <div ref={container} onMouseMove={onMouseMove} className=" ">

            <NavbarNew />
            <HeroSectionOne />
            <HeroSectionTwo />

        </div>

    )
}