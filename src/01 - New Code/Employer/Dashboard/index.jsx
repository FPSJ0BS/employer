import React from "react";
import MobileMenu from "../../Headers/MobileMenu";
import DashboardHeader from "../../Headers/DashboardHeader";
import LoginPopup from "../../../components/common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../Headers/DashboardEmployerSidebar";
import BreadCrumb from "../../../components/dashboard-pages/BreadCrumb";
import TopCardBlock from "./components/TopCardBlock";
import Applicants from "./components/Applicants";
import CopyrightFooter from "../../../components/dashboard-pages/CopyrightFooter";
import MenuToggler from "../../../components/dashboard-pages/MenuToggler";
import { getDashboardStats, getRecentApplications, getProfile } from "../../../api/apiAxios";
import { useEffect, useState } from "react";
import Loader from "../../../../public/assets/Loader";
import DashboardPopup from "./components/DashboardPopup"
import { useSelector } from "react-redux";

export const Index = () => {

  const [data, setData] = useState([]);
  const [recentAppData, setRecentAppData] = useState([]);
  const [loaderSet, setLoaderSet] = useState(true)

  useEffect(() => {
    setLoaderSet(true)
    const fetchData = async () => {
      try {
        const [recentApplicationApiResponse, getprof, dashStats] =
          await Promise.all([
            getRecentApplications(10, 1, ""),
            getProfile(),
            getDashboardStats(),
            // Call your second API function here
          ]);

        // Check if both responses are successful
        if (recentApplicationApiResponse?.data?.status && getprof?.data?.status && dashStats.data?.status) {
          console.log('Data loaded successfully from both APIs', dashStats?.data?.data);

          const recentAppResponse = recentApplicationApiResponse?.data?.data;
          const stats = dashStats?.data?.data;
          console.log('daxh stats', stats);
          setData(stats);
          setRecentAppData(recentAppResponse)
          setLoaderSet(false);


        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
 


  return (
    <div className="page-wrapper dashboard relative">

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
      {loaderSet ? <Loader /> : <section className="user-dashboard">
        <div className="dashboard-outer ">
          {/* <BreadCrumb title="Dashboard Home!" /> */}
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="">
            <TopCardBlock topBLock={data} />
          </div>
          {/* End .row top card block */}

          {recentAppData?.length > 0 && <div className="row">
            <div className="col-lg-12">
              {/* <!-- applicants Widget --> */}
              <div className="applicants-widget ls-widget">
                <div className="widget-content">

                  {/* used Tailwind for below */}

                  <div className=" 
                    w-[100%]
                  ">
                    {/* <!-- Candidate block three --> */}
                    <Applicants recentAppData={recentAppData} dataApp={data} />
                  </div>


                </div>
              </div>
            </div>
            {/* End .col */}
          </div>}
          {/* End .row profile and notificatins */}
        </div>
        {/* End dashboard-outer */}
      </section>}
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default Index;
