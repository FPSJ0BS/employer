import React from "react";
import MobileMenu from "../../../Headers/MobileMenu";
import DashboardHeader from "../../../Headers/DashboardHeader";
import LoginPopup from "../../../../components/common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../Headers/DashboardEmployerSidebar";

import CopyrightFooter from "../../../../components/dashboard-pages/CopyrightFooter";
import MenuToggler from "../../../../components/dashboard-pages/MenuToggler";
import SuggestedCandidate from "./SuggestedCandidate";
const index = () => {
  return (
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
          {/* <BreadCrumb title="Manage jobs!" /> */}
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget ">
               <SuggestedCandidate/>
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default index;
