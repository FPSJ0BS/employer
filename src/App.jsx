import Aos from "aos";
import "aos/dist/aos.css";
import "./styles/index.scss";
import { useEffect, useLayoutEffect, useState } from "react";
import ScrollToTop from "./components/common/ScrollTop";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

if (typeof window !== "undefined") {
  import("bootstrap");
}
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import JobListPage3 from "./pages/job-list/job-list-v3";
import JobListPage4 from "./pages/job-list/job-list-v4";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import CandidateSingleDynamicV1 from "./01 - New Code/Employer/candidates-single-v1";
import DashboardEmploeeDBPage from "./pages/employers-dashboard/dashboard";
import CompanyProfileEmploeeDBPage from "./pages/employers-dashboard/company-profile";
import LetterEmploeeDBPage from "./pages/employers-dashboard/letter";
import WalletEmploeeDBPage from "./pages/employers-dashboard/wallet";
import GenerateEmploeeDBPage from "./pages/employers-dashboard/generate";
import PostJobsEmploeeDBPage from "./pages/employers-dashboard/post-jobs";
import ManageJobsEmploeeDBPage from "./pages/employers-dashboard/manage-jobs";
import AllApplicantsEmploeesPage from "./pages/employers-dashboard/all-applicants";
import ShortListedResumeEmploeeDBPage from "./pages/employers-dashboard/shortlisted-resumes";
import PackageEmploeeDBPage from "./pages/employers-dashboard/packages";
import MessageEmploeeDBPage from "./pages/employers-dashboard/messages";
import ResumeAlertsEmploeeDBPage from "./pages/employers-dashboard/resume-alerts";
import ChangePasswordEmploeeDBPage from "./pages/employers-dashboard/change-password";
import CheckoutPage from "./pages/shop/checkout";
import { Login } from "./01 - New Code/Login/Login";
import { LoginEmail } from "./01 - New Code/Login/LoginEmail";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "./redux/Login/loginSlice";
import { ForgotPassword } from "./01 - New Code/Login/ForgotPassword";
import { getProfile } from "./api/apiAxios";
import { setProfileImageSliceFunc } from "./redux/InstituteDashboard/instituteProfileImageSlice";
import { EditJObSingle } from "./01 - New Code/Employer/candidates-single-v1/Edit Job/editJobSingle";
import { PaymentPage } from "./01 - New Code/Employer/Packages/Payment/PaymentPage";
import { HomeTest } from "./01 - New Code/Home/Home-Test/HomeTest";
import { setInstituteId } from "./redux/Login/loginSlice";

// Admin api - start


import { Page404 } from "./01 - New Code/404Page/404Page.tsx";

import { RegisterNew } from "./01 - New Code/Register/RegisterNew";
import { ManageProfileNew } from "./01 - New Code/Employer/Company Profile/ManageProfileNew/ManageProfileNew.tsx";
import { editEmployerManageProfileFields } from "./01 - New Code/Employer/Redux/CompanyProfile.tsx";

import { SingleProfile } from "./01 - New Code/Employer/Company Profile/SingleProfile/SingleProfile.tsx";
import SuggestedCandidateEmploeeDBPage from "./pages/employers-dashboard/suggested-candidate/index.jsx";
import WhatsAppButton from "./components/WhatsappIcon/WhatsappIcon.tsx";
import Faq from "./01 - New Code/FAQ/Faq.tsx";
import DashboardPopup from "./01 - New Code/Employer/Dashboard/components/DashboardPopup.tsx";
import BuyPlanPopup from "./01 - New Code/Employer/Dashboard/components/BuyPlanPopup";

function App() {

  const { login } = useSelector((state) => state.login);
  const { employerManageProfileFields } = useSelector(
    (state) => state.employerManageProfile
  );
  const { authRegister } = useSelector((state) => state.autheticationSlice);
  
  const dispatch = useDispatch();

  useEffect(() => {
    Aos.init({
      duration: 1400,
      once: true,
    });
  }, []);

  const [phoneVerified, setPhoneVerified] = useState(0);

  useLayoutEffect(() => {
    const gettingProfile = async () => {
      try {
        const res = await getProfile();
        if (res?.data?.status) {
          const profileAllData = await res?.data?.data;
          
      
          const profileImageData = profileAllData?.employerDetails[0]?.empimage;
          await localStorage.setItem("insProfileImage", profileImageData);
          await dispatch(setProfileImageSliceFunc(profileImageData));
          await dispatch(setInstituteId(profileAllData?.userData[0]?.employerID));

          const phoneVerify = await parseInt(
            profileAllData?.userData[0]?.phone_verified
          );
          const emailVerify = await parseInt(
            profileAllData?.userData[0]?.email_verified
          );
         
          const email = await profileAllData?.userData[0]?.email;
          const gst = await profileAllData?.userData?.gst;
          const organization_description = await profileAllData?.userData?.organization_description;
          const address = await profileAllData?.userData?.address;
          const city = await profileAllData?.userData?.city;
          const state = await profileAllData?.userData?.state;
          const employerID = await profileAllData?.userData[0]?.employerID;
          dispatch(setInstituteId(profileAllData?.userData[0]?.employerID))
          const firstName = await profileAllData?.employerDetails[0]
            ?.contact_person_first_name;
          const lastName = await profileAllData?.employerDetails[0]
            ?.contact_person_last_name;

      
          await setPhoneVerified(phoneVerify);
          dispatch(
            editEmployerManageProfileFields({
              phoneNumberVerified: parseInt(phoneVerify),
              emailVerified: parseInt(emailVerify),
              email,
              firstName,
              lastName,
              employerID,
              
              
            })
          );
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    const headerToken = localStorage.getItem("header");
    if (headerToken) {
      dispatch(setLogin(true));
    }
    const profileImage = localStorage.getItem("insProfileImage");
    if (profileImage) {
      dispatch(setProfileImageSliceFunc(profileImage));
    }
    gettingProfile();
  }, [login]);

  useEffect(() => {
    const isModal = localStorage.getItem("isModal");
    if (!isModal && employerManageProfileFields.emailVerified === 0) {
      localStorage.setItem("isModal", "true");
    }
  }, [employerManageProfileFields.emailVerified, authRegister]);

  const { dashboardPopup, buyPlanPopup } = useSelector(
    (state) => state.employerSliceNew
  );

  return (
    <>
      <WhatsAppButton />
      {dashboardPopup && <DashboardPopup  />}
      {buyPlanPopup && <BuyPlanPopup  />}
      <div className="page-wrapper data-scroll-container">
        <BrowserRouter>
          <Routes>
            <Route path="/">
              {/* Redirect to employers-dashboard if login is true */}
              {login ? (
                <Route path="/" element={<Navigate to="/employers-dashboard/dashboard" replace />} />
              ) : (
                <Route path="/" element={<HomeTest />} />
              )}

              {/* 404 and Home Routes */}
              <Route path="*" element={<Page404 />} />
              {/* <Route path="home-new" element={<HomeNew />} />
              <Route path="home-test" element={<HomeTest />} />
              <Route path="gsap-test" element={<Gsaptest />} /> */}

              {/* Authentication Routes */}
              {!login ? (
                <>
                  <Route path="login-otp" element={<Login />} />
                  <Route path="login-email" element={<LoginEmail />} />
                  <Route path="register" element={<RegisterNew />} />
                  <Route path="forgot-password" element={<ForgotPassword />} />
                  <Route path="faq" element={<Faq />} />
                </>
              ) : (
                <>
                  <Route path="edit-job/:id" element={<EditJObSingle />} />
                  <Route path="job-list" element={<JobListPage3 />} />
                  <Route
                    path="candidates-single-v1/:jobID/:status"
                    element={<CandidateSingleDynamicV1 />}
                  />
                  <Route path="manage-profile" element={<ManageProfileNew />} />
                  <Route path="single-profile" element={<SingleProfile />} />

                  {/* Employer Dashboard Routes */}
                  <Route path="employers-dashboard/*">
                    {employerManageProfileFields?.phoneNumberVerified === 0 ? (
                      <Route
                        path="*"
                        element={<Navigate to="/manage-profile" replace />}
                      />
                    ) : (
                      <>
                        <Route path="dashboard" element={<DashboardEmploeeDBPage />} />
                        <Route path="company-profile" element={<CompanyProfileEmploeeDBPage />} />
                        <Route path="letter/template" element={<LetterEmploeeDBPage />} />
                        <Route path="wallet" element={<WalletEmploeeDBPage />} />
                        <Route path="letter/generate" element={<GenerateEmploeeDBPage />} />
                        <Route path="post-jobs" element={<PostJobsEmploeeDBPage />} />
                        <Route path="manage-jobs" element={<ManageJobsEmploeeDBPage />} />
                        <Route path="suggested-candidate/:jobID" element={<SuggestedCandidateEmploeeDBPage />} />
                        <Route path="all-applicants" element={<AllApplicantsEmploeesPage />} />
                        <Route path="shortlisted-resumes" element={<ShortListedResumeEmploeeDBPage />} />
                        <Route path="packages" element={<PackageEmploeeDBPage />} />
                        <Route path="messages" element={<MessageEmploeeDBPage />} />
                        <Route path="resume-alerts" element={<ResumeAlertsEmploeeDBPage />} />
                        <Route path="change-password" element={<ChangePasswordEmploeeDBPage />} />
                        <Route path="payment-page/:id" element={<PaymentPage />} />
                        <Route path="job-list-v4" element={<JobListPage4 />} />
                      </>
                    )}
                  </Route>

                  <Route path="checkout" element={<CheckoutPage />} />
                </>
              )}

            </Route>
          </Routes>
          <ScrollTopBehaviour />
        </BrowserRouter>



        {/* Toastify */}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          limit={3}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        {/* <!-- Scroll To Top --> */}
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;
