import React, { useEffect, useRef } from "react";
import amity from "../../../../../public/assets/Home-new/LogoImages/Amity University.png"
import bits from "../../../../../public/assets/Home-new/LogoImages/bits-pillani-2-1.webp"
import cmi from "../../../../../public/assets/Home-new/LogoImages/cmi-header.png"
import manipal from "../../../../../public/assets/Home-new/LogoImages/Manipal (2).png"
import nimh from "../../../../../public/assets/Home-new/LogoImages/Natinal Insittute of Mental.png"
import pu from "../../../../../public/assets/Home-new/LogoImages/pu-logo.png"
import srm from "../../../../../public/assets/Home-new/LogoImages/srm-logo-white.png"
import Ukolkata from "../../../../../public/assets/Home-new/LogoImages/University of KolkATA.png"


import "./LogoSlider.css";

const LogoSlider = () => {
  const sliderRef = useRef(null);

  const logos = [amity,bits,cmi,manipal,nimh,pu,srm,Ukolkata];

  useEffect(() => {
    const slider = sliderRef.current;
    let interval;

    const startSliding = () => {
      interval = setInterval(() => {
        if (slider) {
          slider.scrollLeft += slider.clientWidth / 5; 
          if (slider.scrollLeft >= slider.scrollWidth / 2) {
           
            slider.scrollLeft = 0;
          }
        }
      }, 2000);
    };

    const stopSliding = () => clearInterval(interval);

    slider.addEventListener("mouseenter", stopSliding);
    slider.addEventListener("mouseleave", startSliding);

    startSliding();

    return () => {
      stopSliding();
      slider.removeEventListener("mouseenter", stopSliding);
      slider.removeEventListener("mouseleave", startSliding);
    };
  }, []);

  return (
    <div
      ref={sliderRef}
      className="flex overflow-hidden items-center scroll-smooth w-full"
    >
      {/* Duplicate logos for infinite scrolling */}
      {[...logos, ...logos].map((logo, index) => (
        <img
          key={index}
          src={logo}
          alt={`Logo ${index + 1}`}
          className="logoHome transition-transform duration-300 hover:scale-110 w-[200px]"
        />
      ))}
    </div>
  );
};

export default LogoSlider;
