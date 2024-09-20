
import ManageJobs from "@/01 - New Code/Employer/Manage Job";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Manage Jobs || FPS JOBS & Tallento.AI",
  description: "Best education Job Portal In India",
};

const ManageJobsEmploeeDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <ManageJobs />
    </>
  );
};

export default ManageJobsEmploeeDBPage
