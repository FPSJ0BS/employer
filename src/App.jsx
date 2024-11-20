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
import Home from "./pages";
import HomePage1 from "./pages/home/home-1";
import HomePage2 from "./pages/home/home-2";
import HomePage3 from "./pages/home/home-3";
import HomePage4 from "./pages/home/home-4";
import HomePage5 from "./pages/home/home-5";
import HomePage6 from "./pages/home/home-6";
import HomePage7 from "./pages/home/home-7";
import HomePage8 from "./pages/home/home-8";
import HomePage9 from "./pages/home/home-9";
import HomePage10 from "./pages/home/home-10";
import HomePage11 from "./pages/home/home-11";
import HomePage12 from "./pages/home/home-12";
import HomePage13 from "./pages/home/home-13";
import HomePage14 from "./pages/home/home-14";
import HomePage15 from "./pages/home/home-15";
import HomePage16 from "./pages/home/home-16";
import HomePage17 from "./pages/home/home-17";
import JobListPage1 from "./pages/job-list/job-list-v1";
import JobListPage2 from "./pages/job-list/job-list-v2";
import JobListPage3 from "./pages/job-list/job-list-v3";
import JobListPage4 from "./pages/job-list/job-list-v4";
import JobListPage5 from "./pages/job-list/job-list-v5";
import JobListPage6 from "./pages/job-list/job-list-v6";
import JobListPage7 from "./pages/job-list/job-list-v7";
import JobListPage8 from "./pages/job-list/job-list-v8";
import JobListPage9 from "./pages/job-list/job-list-v9";
import JobListPage10 from "./pages/job-list/job-list-v10";
import JobListPage11 from "./pages/job-list/job-list-v11";
import JobListPage12 from "./pages/job-list/job-list-v12";
import JobListPage13 from "./pages/job-list/job-list-v13";
import JobListPage14 from "./pages/job-list/job-list-v14";
import JobSingleDynamicV1 from "./pages/job-single/job-single-v1";
import JobSingleDynamicV2 from "./pages/job-single/job-single-v2";
import JobSingleDynamicV3 from "./pages/job-single/job-single-v3";
import JobSingleDynamicV4 from "./pages/job-single/job-single-v4";
import JobSingleDynamicV5 from "./pages/job-single/job-single-v5";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import EmployerListPage1 from "./pages/employers-list/employers-list-v1";
import EmployerListPage2 from "./pages/employers-list/employers-list-v2";
import EmployerListPage3 from "./pages/employers-list/employers-list-v3";
import EmployerListPage4 from "./pages/employers-list/employers-list-v4";
import EmployersSingleV1 from "./pages/employers-single/employers-single-v1";
import EmployersSingleV2 from "./pages/employers-single/employers-single-v2";
import EmployersSingleV3 from "./pages/employers-single/employers-single-v3";
import CandidateListPage1 from "./pages/candidates-list/candidates-list-v1";
import CandidateListPage2 from "./pages/candidates-list/candidates-list-v2";
import CandidateListPage3 from "./pages/candidates-list/candidates-list-v3";
import CandidateListPage4 from "./pages/candidates-list/candidates-list-v4";
import CandidateListPage5 from "./pages/candidates-list/candidates-list-v5";
import CandidateSingleDynamicV1 from "./01 - New Code/Employer/candidates-single-v1";
import CandidateSingleDynamicV2 from "./pages/candidates-single/candidates-single-v2";
import CandidateSingleDynamicV3 from "./pages/candidates-single/candidates-single-v3";
import BlogListpage1 from "./pages/blog/blog-list-v1";
import BlogListpage2 from "./pages/blog/blog-list-v2";
import BlogListpage3 from "./pages/blog/blog-list-v3";
import BlogDetailsDynamic from "./pages/blog/blog-details";
import AboutPage from "./pages/others/about";
import PricingPage from "./pages/others/pricing";
import FaqPage from "./pages/others/faq";
import TermsPage from "./pages/others/terms";
import InvoicePage from "./pages/others/invoice";
import ContactPage from "./pages/others/contact";
import NotFoundPage from "./pages/others/404";
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
import DashboardPage from "./pages/candidates-dashboard/dashboard";
import AppliedJobsPage from "./pages/candidates-dashboard/applied-jobs";
import ChangePasswordPage from "./pages/candidates-dashboard/change-password";
import CVMannagerPage from "./pages/candidates-dashboard/cv-manager";
import JobAlertPage from "./pages/candidates-dashboard/job-alerts";
import MessageesPage from "./pages/candidates-dashboard/messages";
import MyProfilePage from "./pages/candidates-dashboard/my-profile";
import MyResumePage from "./pages/candidates-dashboard/my-resume";
import PackagePage from "./pages/candidates-dashboard/packages";
import ShortListedJobsPage from "./pages/candidates-dashboard/short-listed-jobs";
import RegisterPage from "./pages/others/register";
import ShopListPage from "./pages/shop/shop-list";
import ShopSingleDyanmic from "./pages/shop/shop-single";
import CartPage from "./pages/shop/cart";
import CheckoutPage from "./pages/shop/checkout";
import OrderCompletedPage from "./pages/shop/order-completed";

import { Login } from "./01 - New Code/Login/Login";
import { LoginEmail } from "./01 - New Code/Login/LoginEmail";
import { Register } from "./01 - New Code/Register/Register";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "./redux/Login/loginSlice";
import { ForgotPassword } from "./01 - New Code/Login/ForgotPassword";
import { getProfile } from "./api/apiAxios";
import { setProfileImageSliceFunc } from "./redux/InstituteDashboard/instituteProfileImageSlice";
import { EditJObSingle } from "./01 - New Code/Employer/candidates-single-v1/Edit Job/editJobSingle";
import { PaymentPage } from "./01 - New Code/Employer/Packages/Payment/PaymentPage";
import { HomeTest } from "./01 - New Code/Home/Home-Test/HomeTest";
import { setInstituteId } from "./redux/Login/loginSlice";

import { HomeNew } from "./01 - New Code/Home/Home-New/Home-New";

import Gsaptest from "./01 - New Code/gsap test/gsaptest";

// Admin api - start

import { AdminDashboard } from "./Admin/Admin-Employer/Dashboard/AdminDashboard";
import { AdminEmployer } from "./Admin/Admin-Employer/Employer/AdminEmployer";
import { EditEmployer } from "./Admin/Admin-Employer/Employer/Edit Employer/EditEmployer";

import { AdminEditJob } from "./Admin/Admin-Employer/Employer/Add New Job/AdminEditJob";

import { Page404 } from "./01 - New Code/404Page/404Page.tsx";

import { RegisterNew } from "./01 - New Code/Register/RegisterNew";
import { ManageProfileNew } from "./01 - New Code/Employer/Company Profile/ManageProfileNew/ManageProfileNew.tsx";
import { editEmployerManageProfileFields } from "./01 - New Code/Employer/Redux/CompanyProfile.tsx";

import { SingleProfile } from "./01 - New Code/Employer/Company Profile/SingleProfile/SingleProfile.tsx";
import { EMailModalTwo } from "./01 - New Code/UI/Modal/EMailModal2.tsx";
import SuggestedCandidateEmploeeDBPage from "./pages/employers-dashboard/suggested-candidate/index.jsx";
import WhatsAppButton from "./components/WhatsappIcon/WhatsappIcon.tsx";
import { CustomizedSnackbarTwo } from "./01 - New Code/Reusable Components/Snackbar/snackbarNew.tsx";
import  Faq  from "./01 - New Code/FAQ/Faq.tsx";

function App() {

  const { login } = useSelector((state) => state.login);
  const { employerManageProfileFields } = useSelector(
    (state) => state.employerManageProfile
  );
  const { authRegister } = useSelector((state) => state.autheticationSlice);
  useEffect(() => {
    console.log("employerManageProfileFields", employerManageProfileFields);
    console.log(
      "phoneNumberVerified:",
      employerManageProfileFields?.phoneNumberVerified
    );
    console.log("emailVerified:", employerManageProfileFields?.emailVerified);
  }, [employerManageProfileFields]);
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
          console.log("profile", profileAllData);
          const profileImageData = profileAllData?.employerDetails?.empimage;
          await localStorage.setItem("insProfileImage", profileImageData);
          await dispatch(setProfileImageSliceFunc(profileImageData));
          await dispatch(setInstituteId(profileAllData?.userData?.employerID));

          const phoneVerify = await parseInt(
            profileAllData?.userData?.phone_verified
          );
          const emailVerify = await parseInt(
            profileAllData?.userData?.email_verified
          );
          const email = await profileAllData?.userData?.email;
          const firstName = await profileAllData?.employerDetails
            ?.contact_person_first_name;
          const lastName = await profileAllData?.employerDetails
            ?.contact_person_last_name;

          console.log(profileAllData);
          await setPhoneVerified(phoneVerify);
          dispatch(
            editEmployerManageProfileFields({
              phoneNumberVerified: parseInt(phoneVerify),
              emailVerified: parseInt(emailVerify),
              email,
              firstName,
              lastName,
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
    console.log(localStorage.getItem("isModal"));
    if (!isModal && employerManageProfileFields.emailVerified === 0) {
      localStorage.setItem("isModal", "true");
    }
  }, [employerManageProfileFields.emailVerified, authRegister]);



  return (
    <>
<WhatsAppButton />

      <div className="page-wrapper data-scroll-container">
        {employerManageProfileFields.emailVerified === 0 &&
          JSON.parse(localStorage.getItem("isModal")) && <EMailModalTwo />}
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

              {/* Static Pages */}
              {/* <Route path="about" element={<AboutPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="faq" element={<FaqPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="invoice" element={<InvoicePage />} />
              <Route path="contact" element={<ContactPage />} /> */}

              {/* Shop Routes */}
              {/* <Route path="shop">
                <Route path="shop-list" element={<ShopListPage />} />
                <Route path="shop-single/:id" element={<ShopSingleDyanmic />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="order-completed" element={<OrderCompletedPage />} />
              </Route> */}

              {/* Admin Routes */}
              {/* <Route element={<AdminDashboard />}>
                <Route path="/admin" element={<Navigate to="./employer" replace />} />
                <Route path="/admin/employer" element={<AdminEmployer />} />
                <Route path="/admin/employer/edit-employer" element={<EditEmployer />} />
                <Route path="/admin/employer/edit-job" element={<AdminEditJob />} />
              </Route> */}
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
