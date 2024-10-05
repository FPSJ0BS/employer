import { CursorTest } from "./cursorTest";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import NavbarNew from "../Home-New/components/Navbar/Navbar";
import { SectionOne } from "./sectionOne";
import { SectionTwo } from "./sectionTwo";
import { SectionThreeHomeNew } from "./Section-Three/SectionThreeHomeNew";
import { SectionFourHomeNew } from "./Section-Four/SectionFourHomeNew";
import { SectionFiveHomeNew } from "./Section-Five/SectionFiveHomeNew";
import { SectionSixHomeNew } from "./Section-Six/SectionSixHomeNew";
import { SectionNineHomeTest } from "./Section-Nine/SectionNineHomeNew";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MobileMenu from "../../Headers/MobileMenu";
import FooterNew from "../Home-New/components/Navbar/Footer";
import FormSection from "../Home-Three/Form-Section/FormSection.tsx"
import FindOutSection from "../Home-Three/FindOutSection/FindOutSection.tsx"
import WorriedAbout from "../Home-Three/WorriedAbout/WorriedAbout.tsx"
import AIPowered from "../Home-Three/AIPowered/AIPowered.tsx"
import FindGreatTalent from "../Home-Three/FindGreatTalent/FindGreatTalent.tsx"
import TopTalent from "../Home-Three/TopTalent/TopTalent.tsx"
import VideoSection from "../Home-Three/VideoSection/VideoSection.tsx"
import FuelBottomLine from "../Home-Three/FuelBottomLine/FuelBottomLine.tsx"
import WantToSearchForTheJob from "../Home-Three/WantToSearchForTheJob/WantToSearchForTheJob.tsx"

export const HomeTest = () => {
  const containerTest = useRef();
  // useEffect(()=>{
  //     const scroll = new LocomotiveScroll({
  //         el: document.querySelector('[data-scroll-container]'),
  //         smooth: true
  //     });
  // },[])

  const [CX, setCX] = useState(30);
  const [CY, setCY] = useState(30);

  const { contextSafe } = useGSAP({ scope: containerTest });

  // Loading Aniamtion ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  useGSAP(() => {
    var tl = gsap.timeline();

    tl.to("#cursorTest", {
      autoAlpha: 0,
    })
      .to("#sectiononesearchbox", {
        autoAlpha: 0,
      })
      .from("#SectionOneTest", {
        opacity: 0,
        duration: 0.2,
        delay: 0.2,
      })
      .from("#SectionOneTest", {
        transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
        borderRadius: "150px",
        duration: 2,
        ease: "expo.out",
      })
      // .from("nav", {
      //   opacity: 0,
      //   delay: -0.2,
      // })
      .from("#SectionOneTest h1", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
      })
      .to("#page1h1Main", {
        delay: 0.5,
        duration: 2,
        text: "Hiring made super-easy with",
        fontSize: "4.7vw",
      })
      .to(
        "#page1h2Main",
        {
          delay: 2.5,
          duration: 2,
          fontSize: "4.2vw",
          text: {
            value:
              "<h2 class='heading1class'>THE POWER OF <span class='textAnimationSection3Heading'>AI</span> and <span class='textAnimationSection3Heading'>HUMANS!</span></h2>",
            delimiter: " ",
          },
        },
        "-=3"
      )
      .to("#sectiononesearchbox", {
        autoAlpha: 1,
        stagger: 0.2,
        // Show cursorPage1 after the animation
      })
      .from("#SectionOneTest p", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
      })
      .to("#cursorTest", {
        autoAlpha: 1,
        // text: "Click Me!",

        // Show cursorPage1 after the animation
      });
  });

  // Navigation aniamtion ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // useGSAP(() => {
  //     let navtl = gsap.timeline({ paused: true })

  //     navtl.to(".menu-overlay-new", {
  //         duration: 1,
  //         clipPath: "polygon(0 0, 100% 0, 100% 100% , 0 100% )",
  //         ease: 'power2.out'

  //     })
  //         .from('.menu-link-new, .btn-new', {
  //             opacity: 0,
  //             y: 60,
  //             stagger: 0.05,
  //             duration: 0.75,
  //             ease: "power1.inOut"
  //         }, '<')
  //         .to('.video-preview-new', {
  //             duration: 1,
  //             height: '200px',
  //             ease: "power2.out"
  //         })
  //         .to('.menu-divider-new', {
  //             duration: 2,
  //             width: '100%',
  //             ease: "power4.out"
  //         })

  //     navtl.play();

  // }, { scope: contextSafe })

  // navigation ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const showAnim = gsap
    .from("#nav-new", {
      yPercent: -100,
      paused: true,
      duration: 0.8,
    })
    .progress(1);

  ScrollTrigger.create({
    trigger: "#fullnewhomenew",
    start: "top top",
    end: "max",
    onUpdate: (self) => {
      self.direction === -1 ? showAnim.play() : showAnim.reverse();
    },
  });

  // Mouse Movement ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const onMouseMove = contextSafe((e) => {
    gsap.to("#cursorTest", {
      x: e.clientX - CX,
      y: e.clientY - CY,
      stagger: 0.15,
      ease: "none",
      duration: 0.5,
      overwrite: "auto",
    });
  });

  // All Page 1 Animations ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const onMouseEnterPageOne = contextSafe(() => {
    // setCX(110);
    // setCY(110)

    // gsap.to("#cursorTest", {

    //     // opacity: 0
    //     width: '7.5vw',
    //     height: '7.5vw',
    //     text: 'Click Me!',

    // });

    setCX(30);
    setCY(30);

    gsap.to("#cursorTest", {
      width: "1vw",
      height: "1vw",
      text: "",
    });
  });

  // useGSAP(() => {

  //     gsap.to("#page1h1Main", {
  //         scrollTrigger: {
  //             trigger: '#SectionOneTest',
  //             // markers: true,
  //             start: '-40 center',
  //             scrub: 2,

  //         },
  //         x: -400,
  //     })

  // });

  // useGSAP(() => {

  //     gsap.to("#page1h2Main", {
  //         scrollTrigger: {
  //             trigger: '#SectionOneTest',
  //             // markers: true,
  //             start: '-40 center',
  //             scrub: 2,

  //         },
  //         x: 600,
  //         duration: 1
  //     })

  // });

  // Mouse Enter Searchbox

  const onMouseEnterPageOneSearchBox = contextSafe(() => {
    setCX(30);
    setCY(30);

    gsap.to("#cursorTest", {
      width: "1vw",
      height: "1vw",
      text: "",
    });
  });

  // All Page 2 Animations ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // useGSAP(() => {
  //   gsap.to("#SectionTwoTest", {
  //     scrollTrigger: {
  //       trigger: "#SectionOneTest",
  //       // markers: true,
  //       start: "-40 center",
  //       scrub: 2,
  //     },
  //     y: -400,
  //   });
  // });

  // Our Services

  // useGSAP(() => {
  //   gsap.from("#SectionTwoOurServices", {
  //     scrollTrigger: {
  //       trigger: "#SectionOneTest",
  //       // markers: true,
  //       start: "-10 center",
  //       end: "120 center",
  //       ease: "power1.out",
  //       scrub: 2,
  //     },
  //     x: -400,
  //   });
  // });

  // Find OUt More

  useGSAP(() => {
    gsap.from("#SectionTwoFindOut", {
      scrollTrigger: {
        trigger: "#SectionOneTest",
        start: "150 center",

        toggleActions: "restart none none reset",
        ease: "power1.out",
        // markers: true
      },
      y: 400,
    });
  });

  // Mouse Follower

  const onMouseEnterPageTwo = contextSafe(() => {
    setCX(30);
    setCY(30);

    gsap.to("#cursorTest", {
      width: "1vw",
      height: "1vw",
      text: "",
    });
  });

  // FPS JOBS text aniamtion on click

  const onMouseEnterFPsJobs = contextSafe(() => {
    setCX(150);
    setCY(150);

    gsap.to("#cursorTest", {
      width: "7.5vw",
      height: "7.5vw",
      text: "Click Me!",
    });
  });

  const onMouseLeaveFPsJobs = contextSafe(() => {
    setCX(30);
    setCY(30);

    gsap.to("#cursorTest", {
      width: "1vw",
      height: "1vw",
      text: "",
    });
  });

  const [currentText, setCurrentText] = useState("FPS JOBS");

  const onMouseClickFPsJobs = () => {
    const newText = currentText === "TALLENTO.AI" ? "FPS JOBS" : "TALLENTO.AI";
    gsap.to("#SectionTwoFpsJobs", {
      duration: 2,
      text: newText,
    });
    setCurrentText(newText);
  };

  // Bullet POints Animation

  const onMouseEnterBulletPoints = contextSafe((e) => {
    const target = e.currentTarget; // Get the specific element that triggered the event
    gsap.to(target.querySelector(".ser-hover-div"), {
      top: "0%",
    });
  });

  const onMouseLeaveBulletPoints = contextSafe((e) => {
    const target = e.currentTarget; // Get the specific element that triggered the event
    gsap.to(target.querySelector(".ser-hover-div"), {
      top: "100%",
    });
  });

  // Bullet point one->>

  const onMouseEnterBullPointOne = contextSafe(() => {
    setCX(-100);
    setCY(70);

    gsap.to("#cursorTest", {
      width: "300px",
      height: "150px",
      text: "We gather detailed job descriptions, including role responsibilities, qualifications, salary range, and interview process.",
      backgroundColor: "#ff5f38",
      borderRadius: " 15px",
      borderTopLeftRadius: "0px",
      paddingLeft: "10px",
      paddingRight: "10px",
      delay: 0.2,
      duration: 1,
    });
  });

  const onMouseLeaveBullPointOne = contextSafe(() => {
    setCX(30);
    setCY(30);

    gsap.to("#cursorTest", {
      width: "0vw",
      height: "0vw",
      text: "",
      backgroundColor: "#ff5f38",
      borderRadius: "50%",
    });
  });

  // All Page 3 Animations ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  useGSAP(() => {
    gsap.to("#SectionThreeTest", {
      scrollTrigger: {
        trigger: "#SectionTwoTest",
        // markers: true,
        start: "600 center",
        end: "900 center",
        scrub: 2,
        ease: "power1.out",
      },
      y: -400,
    });
  });

  // WHy CHoose us

  useGSAP(() => {
    gsap.from("#SectionThreeOurServices", {
      scrollTrigger: {
        trigger: "#SectionThreeTest",
        // markers: true,
        start: "-420 center",
        end: "-220 center",
        ease: "power1.out",
        scrub: 2,
      },
      x: -400,
    });
  });

  // Blob aniamtion

  // useGSAP(() => {

  //     gsap.from("#hero-shape", {
  //         scrollTrigger: {
  //             trigger: '#SectionThreeTest',
  //             // markers: true,
  //             start: '-420 center',
  //             end: '-220 center',
  //             ease: "power1.out",
  //             scrub: 2,

  //         },
  //         x: 400,
  //     })

  // });

  // Video Animation

  useGSAP(() => {
    gsap.from("#video-section-3", {
      scrollTrigger: {
        trigger: "#SectionThreeTest",
        // markers: true,
        start: "-420 center",
        end: "-220 center",
        ease: "power1.out",
        scrub: 2,
      },
      y: 200,
    });
  });

  const onMouseEnterVideoPageThree = contextSafe(() => {
    setCX(30);
    setCY(30);

    gsap.to("#cursorTest", {
      width: "1vw",
      height: "1vw",
      text: "",
      backgroundColor: "#000",
    });
  });

  const onMouseLeaveVideoPageThree = contextSafe(() => {
    setCX(30);
    setCY(30);

    gsap.to("#cursorTest", {
      width: "1vw",
      height: "1vw",
      text: "",
      backgroundColor: "#ff5f38",
    });
  });

  // Section -4 ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

  useGSAP(() => {
    gsap.to(".sectionfour-rounded-div-wrapper", {
      scrollTrigger: {
        trigger: "#SectionFourTest",
        // markers: true,
        start: "-120% center",
        end: "-70% center",
        scrub: true,
      },
      height: 0,
      marginTop: 0,
    });
  });

  // useGSAP(() => {

  //     gsap.to("#SectionFourTest", {
  //         scrollTrigger: {
  //             trigger: '#SectionFourTest',
  //             // markers: true,
  //             start: '20 70%',
  //             end: '50% 50%',
  //             scrub: 2,

  //         },

  //         marginTop: '-400px'
  //     })

  // });

  // heading aniamtion strategic

  useGSAP(() => {
    gsap.to(".SectionFour-content-2 .SectionFour-text-area-hover h1", {
      scrollTrigger: {
        trigger: "#SectionFourTest",
        start: "-100% 50%",
        end: "80% 50%",
        // markers: true,
        scrub: 1,
      },

      width: "100%",
      delay: 1,
    });
  });

  useGSAP(() => {
    gsap.to(".SectionFour-content-2 .SectionFour-text-area-hover h2", {
      scrollTrigger: {
        trigger: "#SectionFourTest",
        start: "-100% 50%",
        end: "80% 50%",
        // markers: true,
        scrub: 1,
      },

      width: "100%",
      delay: -1.4,
    });
  });

  // Section -5 --->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

  useGSAP(() => {
    gsap.to(".sectionFive-rounded-div-wrapper", {
      scrollTrigger: {
        trigger: "#SectionFiveTest",
        // markers: true,
        start: "-140% center",
        end: "-90% center",
        scrub: 1,
      },
      height: 0,
      marginTop: 0,
    });
  });

  useGSAP(() => {
    let section4 = gsap.timeline({
      scrollTrigger: {
        trigger: "#SectionFiveTest-part1",
        // markers: true,
        start: "-165% top",
        end: "-90% center",
        scrub: 2,
      },
    });
    section4.from("#pinblack1", {
      x: "-40vw",
      opacity: 0,
    });
    // .to("#pinblack2", {
    //     x: '40vw',
    //     opacity: 0
    // })
  });

  //    Section-6

  useGSAP(() => {
    let section45 = gsap.timeline({
      scrollTrigger: {
        trigger: "#SectionSixTest",
        // markers: true,
        start: "-40% center",
        end: "110% center",
        scrub: 2,
      },
    });
    section45.from("#pinblack3", {
      x: "40vw",
      opacity: 0,
    });
    // .to("#pinblack4", {
    //     x: '-40vw',
    //     opacity: 0
    // })
  });

  useGSAP(() => {
    let SectionSixTestpart2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#SectionSixTest-part2",
        // markers: true,
        start: "-150% center",
        end: "-70% center",
        scrub: 2,
      },
    });
    SectionSixTestpart2.from("#pinblack6", {
      x: "40vw",
      opacity: 0,
    });
    // .to("#pinblack5", {
    //     x: '-40vw',
    //     opacity: 0
    // })
  });

  useGSAP(() => {
    let SectionSixTestpart3 = gsap.timeline({
      scrollTrigger: {
        trigger: "#SectionSixTest-part3",
        // markers: true,
        start: "-120% center",
        end: "-70% center",
        scrub: 2,
      },
    });
    SectionSixTestpart3.from("#pinblack88", {
      x: "-40vw",
      opacity: 0,
    });
    // .to("#pinblack77", {
    //     x: '40vw',
    //     opacity: 0
    // })
  });

  // Section 9 ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

  useGSAP(() => {
    gsap.to("#SectionNineOurServices", {
      scrollTrigger: {
        trigger: "#SectionNineOurServices",
        // markers: true,
        start: "0% 50%",
        end: "30% 50%",
        scrub: 2,
        // pin: true,
      },
      y: "-200px",
    });
  });

  useGSAP(() => {
    gsap.to("#card-one-new", {
      scrollTrigger: {
        trigger: "#card-one-new",
        // markers: true,
        start: "-40% 50%",
        end: "20% 50%",
        scrub: 2,
        // pin: true,
      },
      y: "-400px",
    });
  });

  useGSAP(() => {
    gsap.to("#card-two-new", {
      scrollTrigger: {
        trigger: "#card-two-new",
        // markers: true,
        start: "-90% 50%",
        end: "-30% 50%",
        scrub: 2,
        // pin: true,
      },
      y: "-400px",
    });
  });

  useGSAP(() => {
    gsap.to("#card-three-new", {
      scrollTrigger: {
        trigger: "#card-three-new",
        // markers: true,
        start: "-90% 50%",
        end: "-40% 50%",
        scrub: 2,
        // pin: true,
      },
      y: "-400px",
    });
  });

  useGSAP(() => {
    gsap.to("#SectionNineHomeTest", {
      scrollTrigger: {
        trigger: "#card-three-new",
        // markers: true,
        start: "-70% 50%",
        end: "10% 50%",
        scrub: 2,
        // pin: true,
      },
      height: "230vh",
    });
  });

  // Section -8 ------------------------------------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

  useGSAP(() => {
    gsap.to(".sectionSeven-rounded-div-wrapper", {
      scrollTrigger: {
        trigger: "#SectionSevenTest",
        // markers: true,
        start: "-130% center",
        end: "-65% center",
        scrub: 1,
      },
      height: 0,
      marginTop: 0,
    });
  });

  // Mouse Movement

  const onMouseEnterPageSeven = contextSafe(() => {
    setCX(120);
    setCY(120);

    gsap.to("#cursorTest", {
      // opacity: 0
      width: "5.5vw",
      height: "5.5vw",
      text: "< >",
    });
  });

  const onMouseLeavePageSeven = contextSafe(() => {
    setCX(200);
    setCY(50);

    gsap.to("#cursorTest", {
      width: "1vw",
      height: "1vw",
      text: "",
      backgroundColor: "#ff5f38",
    });
  });

  return (
    <div
      id="fullnewhomenew"
      className=" "
      ref={containerTest}
      onMouseMove={onMouseMove}
    >
      <CursorTest />
      <div className=" hidden md:block">
        <NavbarNew />
      </div>

      <div className=" md:hidden homeMobNav">
        <MobileMenu />
      </div>

      {/* <SectionOne
        setonMouseEnterPageOne={onMouseEnterPageOne}
        setonMouseEnterPageOneSearchBox={onMouseEnterPageOneSearchBox}
      /> */}
      <FormSection />
      <FindOutSection />
      <WorriedAbout />
      <AIPowered />
      <FindGreatTalent />
      <TopTalent />
      <VideoSection />
      <FuelBottomLine />
      <WantToSearchForTheJob />
      {/* <SectionTwo
        setonMouseEnterPageTwo={onMouseEnterPageTwo}
        setonMouseEnterBulletPoints={onMouseEnterBulletPoints}
        setonMouseLeaveBulletPoints={onMouseLeaveBulletPoints}
        setonMouseEnterFPsJobs={onMouseEnterFPsJobs}
        setonMouseLeaveFPsJobs={onMouseLeaveFPsJobs}
        setonMouseClickFPsJobs={onMouseClickFPsJobs}
        setOnMouseEnterBullPointOne={onMouseEnterBullPointOne}
        setOnMouseLeaveBullPointOne={onMouseLeaveBullPointOne}
      /> */}
      {/* <SectionThreeHomeNew
        setonMouseEnterVideoPageThree={onMouseEnterVideoPageThree}
        setonMouseLeaveVideoPageThree={onMouseLeaveVideoPageThree}
      /> */}

      {/* <SectionNineHomeTest setnMouseEnterPages={onMouseEnterPageOneSearchBox} />

      <SectionFourHomeNew setnMouseEnterPages={onMouseEnterPageOneSearchBox} />

      <SectionFiveHomeNew setnMouseEnterPages={onMouseEnterPageOneSearchBox} /> */}

      {/* <SectionSixHomeNew /> */}
      <FooterNew />

      {/* <SectionSevenHomeNew setonMouseEnterPageSeven={onMouseEnterPageSeven} onMouseLeavePageSeven={onMouseLeavePageSeven} /> */}
      {/* <SectionEightHOmeTest setonMouseEnterPageSeven={onMouseEnterPageSeven} onMouseLeavePageSeven={onMouseLeavePageSeven} /> */}
    </div>
  );
};
