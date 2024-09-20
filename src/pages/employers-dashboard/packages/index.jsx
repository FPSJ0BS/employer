
import Packages from "@/01 - New Code/Employer/Packages";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Packages || FPS JOBS & Tallento.AI",
  description: "Best education Job Portal In India",
};

const PackageEmploeeDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Packages />
    </>
  );
};

export default PackageEmploeeDBPage
