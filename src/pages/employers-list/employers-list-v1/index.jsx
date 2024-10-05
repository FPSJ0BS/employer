
import EmployersList from "@/components/employers-listing-pages/employers-list-v1";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Employers List V1 || FPS JOBS & Tallento.AI",
  description: "Best education Job Portal In India",
};

const EmployerListPage1 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <EmployersList />
    </>
  );
};

export default EmployerListPage1