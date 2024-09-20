import MobileMenu from "../../Headers/MobileMenu";
import DashboardHeader from "../../Headers/DashboardHeader";
import LoginPopup from "../../../components/common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../Headers/DashboardEmployerSidebar";
import BreadCrumb from "../../../components/dashboard-pages/BreadCrumb";
import CopyrightFooter from "../../../components/dashboard-pages/CopyrightFooter";
import PackageDataTable from "./components/PackageDataTable";
import MenuToggler from "../../../components/dashboard-pages/MenuToggler";
import {BuyPackageModal} from './components/BuyPackageModal.tsx' 
import { useSelector } from "react-redux";

const Index = () => {

  const { modal } = useSelector((state) => state.employerPackages);


  return (
    <>
      {modal &&  <BuyPackageModal />}
      <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}


      <DashboardEmployerSidebar />
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          {/* <BreadCrumb title="Packages!" /> */}
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}
        </div>
        <div className=" rounded-[20px] mx-6 px-6 w-auto  py-[50px] bg-white flex justify-center items-center">
          <PackageDataTable />
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    </>
    // End page-wrapper
  );
};

export default Index;
