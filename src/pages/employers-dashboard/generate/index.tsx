import MetaComponent from "@/components/common/MetaComponent";
import React from "react";

import Generate from "../../../01 - New Code/Employer/Letters/Generate";

const metadata = {
  title: " Generate || FPS JOBS & Tallento.AI",
  description: "Best education Job Portal In India",
};

const GenerateEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Generate />
    </>
  );
};

export default GenerateEmploeeDBPage;
