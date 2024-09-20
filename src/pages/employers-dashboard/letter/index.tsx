import MetaComponent from "@/components/common/MetaComponent";
import React from "react";
import Template from "../../../01 - New Code/Employer/Letters/Template";

const metadata = {
  title: " Letter || FPS JOBS & Tallento.AI",
  description: "Best education Job Portal In India",
};

const LetterEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Template />
    </>
  );
};

export default LetterEmploeeDBPage;
