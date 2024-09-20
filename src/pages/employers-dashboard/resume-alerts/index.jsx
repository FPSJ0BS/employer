
import ResumeAlerts from "@/components/dashboard-pages/employers-dashboard/resume-alerts";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Resume Alerts || FPS JOBS & Tallento.AI",
  description: "Best education Job Portal In India",
};

const ResumeAlertsEmploeeDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <ResumeAlerts />
    </>
  );
};

export default ResumeAlertsEmploeeDBPage
