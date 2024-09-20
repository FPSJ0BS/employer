
import CompanyProfile from "@/01 - New Code/Employer/Company Profile";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Company Profile || FPS JOBS & Tallento.AI",
  description: "Best education Job Portal In India",
};

const CompanyProfileEmploeeDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <CompanyProfile />
    </>
  );
};

export default CompanyProfileEmploeeDBPage
