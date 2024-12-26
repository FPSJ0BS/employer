import MobileMenu from "../../Headers/MobileMenu";
import DashboardHeader from "../../Headers/DashboardHeader";
import LoginPopup from "../../../components/common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../Headers/DashboardEmployerSidebar";
import CopyrightFooter from "../../../components/dashboard-pages/CopyrightFooter";
import PostBoxForm from "./components/PostBoxForm";
import MenuToggler from "../../../components/dashboard-pages/MenuToggler";
import Loader from "../../../../public/assets/Loader";
import useCustomLoader from "@/hooks/useLoader";
import { useEffect } from "react";
import { getStateListAxios } from "../../../api/apiAxios";
import { setStatesData, setAllJobTypes, setBoardLevel, setQualification, setSelectionProcess, setCategoryData, postEmployerPostJob } from "../Redux/EmployerSlice";
import { useDispatch, useSelector } from "react-redux";
import { getJobType, getBoardLevelType, getQualificationsData, getSelectionProcessData, getCategories, getProfile } from "../../../api/apiAxios";
import { editEmployerManageProfileFields } from "../Redux/CompanyProfile";


const Index = () => {
  const [isLoading, setLoader] = useCustomLoader(false);
  const dispatch = useDispatch()
  const { PostJobPreFillDataState, PostJobPreFillDataCity } = useSelector((state) => state.employerSliceNew);

  // useEffect(() => {

  //   console.log('states fetched' ,PostJobPreFillDataState, PostJobPreFillDataCity);

  // }, [PostJobPreFillDataState, PostJobPreFillDataCity])


  useEffect(() => {
    const fetchData = async () => {
      setLoader(true)
      try {
        const [getState, getJobTypeData, getBoardLevelData, getQualification, getSelectionProcess, getCatData, getProfileData] = await Promise.all([
          getStateListAxios(),
          getJobType(),
          getBoardLevelType(),
          getQualificationsData(),
          getSelectionProcessData(),
          getCategories(),
          getProfile()

        ]);

        if (getState?.data?.status && getJobTypeData?.data?.status && getBoardLevelData?.data?.status && getQualification?.data?.status && getSelectionProcess?.data?.status && getCatData?.data?.status && getProfileData?.data?.status) {
          await dispatch(setStatesData(getState?.data?.data));
          await dispatch(setAllJobTypes(getJobTypeData?.data?.data));
          await dispatch(setBoardLevel(getBoardLevelData?.data?.data));
          await dispatch(setQualification(getQualification?.data?.data));
          await dispatch(setSelectionProcess(getSelectionProcess?.data?.data));
          await dispatch(setCategoryData(getCatData?.data?.data));
          const processLocationData = await getProfileData?.data?.data?.employerDetails?.address;
          const category = await getProfileData?.data?.data?.userData?.category
          const jobsAvailable = await getProfileData?.data?.data?.subscriptionData[0]?.remaining_jobs
          const totalJobs = await getProfileData?.data?.data?.subscriptionData[0]?.jobs

       
          

          await dispatch(
            editEmployerManageProfileFields({
              jobsAvailable,
              totalJobs
            })
          );

          await dispatch(
            postEmployerPostJob({
              catID: category,
            })
          );
    

          // await dispatch(
          //   postEmployerPostJob({
          //     process_location: processLocationData,
          //   })
          // );

          setLoader(false)

        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


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
          {/* <BreadCrumb title="Post a New Job!" /> */}
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <div className="tabs-box">


                  <div className="widget-content h-[100%]">

                    {/* End job steps form */}

                    {!isLoading ? <PostBoxForm /> : <Loader />}

                    {/* End post box form */}
                  </div>
                </div>
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

export default Index;
