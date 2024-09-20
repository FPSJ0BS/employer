"use client";
import React, { forwardRef, useRef } from "react";


import { SmileIcon } from "lucide-react";
import { cn } from ".././../.././lib/utils";
import { AnimatedBeam } from "./AnimatedBeam";
import Linkedin from "../../../../public/assets/icons/linkedin.png"
import Instagram from "../../../../public/assets/icons/instagram.png"
import Facebook from "../../../../public/assets/icons/facebook.png"
import WhatsApp from "../../../../public/assets/icons/whatsapp.png"
import FPS from "../../../../public/assets/Home-new/fps icon.png"
import Tallento from "../../../../public/assets/Home-new/tallento logo icon.png"
import User from "../../../../public/assets/Home-new/employee.png"
import { LinkedinIcon } from "lucide-react";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-full border-0 border-border  p-0 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

export function AnimatedBeamMultipleInputDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg  bg-background p-10 md:shadow-xl"
      ref={containerRef}
    >
      <div className="flex h-full w-full flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center gap-6 ">
          <Circle ref={div1Ref}>
            <img src={Linkedin} className="w-[50px] " alt="linkedin"/>
          </Circle>
          <Circle ref={div2Ref}>
            <img src={Instagram} className="w-[50px] " alt="linkedin"/>
          </Circle>
          <Circle ref={div3Ref}>
            <img src={Facebook} className="w-[45px] " alt="linkedin"/>
          </Circle>
          <Circle ref={div4Ref}>
            <img src={WhatsApp} className="w-[45px] " alt="linkedin"/>
          </Circle>
          {/* <Circle ref={div5Ref}>
            <SmileIcon className="h-6 w-6" />
          </Circle> */}
        </div>
        <div className="flex flex-col justify-center">
        <Circle ref={div6Ref}>
            <img src={FPS} className="w-[50px] ml-[30px] mr-[10px]" alt="FPS JOBS"/>
            <img src={Tallento} className="w-[50px] " alt="Tallento"/>
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
        <Circle ref={div7Ref}>
            <img src={User} className="w-[50px] " alt="linkedin"/>
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
      />
      {/* <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div6Ref}
      /> */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
      />
    </div>
  );
}
