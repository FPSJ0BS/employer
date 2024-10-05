import React from "react";
import VideoFile from "../../../../../public/assets/video/Unlock Your Dream Job with Tallento.ai_ Revolutionizing Job Hunting   _ FPSJOB.mp4";

const VideoSection = () => {
  return (
    <div className="w-[100%] flex justify-center py-[20px] md:py-[50px] ">
      <video
  
        id="video-section-3"
        autoPlay
        loop
        muted
        controls
        className="w-[80%]   rounded-3xl"
        src={VideoFile}
      ></video>
    </div>
  );
};

export default VideoSection;
