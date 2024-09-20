// src/routes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeTest from './01 - New Code/Home/Home-Test/HomeTest.jsx';
import HomeNew from './01 - New Code/Home/Home-New/Home-New.jsx';
import Gsaptest from './01 - New Code/gsap test/gsaptest.jsx';
import Page404 from './01 - New Code/404Page/404Page.tsx';

import Login from "./01 - New Code/Login/Login.jsx"
import LoginEmail from "./01 - New Code/Login/LoginEmail"
import {RegisterNew} from "./01 - New Code/Register/RegisterNew.tsx"
import ForgotPassword from "./01 - New Code/Login/ForgotPassword"
import { DashboardEmploeeDBPage, CompanyProfileEmploeeDBPage, PostJobsEmploeeDBPage, ManageJobsEmploeeDBPage, AllApplicantsEmploeesPage, ShortListedResumeEmploeeDBPage, PackageEmploeeDBPage, MessageEmploeeDBPage, ResumeAlertsEmploeeDBPage, ChangePasswordEmploeeDBPage } from './pages/employers-dashboard';
import PrivateRoute from './components/privateRoute.jsx';
import ManageProfileNew from './01 - New Code/Employer/Company Profile/ManageProfileNew/ManageProfileNew.tsx';
import SingleProfile from './01 - New Code/Employer/Company Profile/SingleProfile/SingleProfile.tsx';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomeTest />} />
    <Route path="home-new" element={<HomeNew />} />
    <Route path="home-test" element={<HomeTest />} />
    <Route path="gsap-test" element={<Gsaptest />} />
    <Route path="*" element={<Page404 />} />
    <Route path="login-otp" element={<Login />} />
    <Route path="login-email" element={<LoginEmail />} />
    <Route path="register" element={<RegisterNew />} />
    <Route path="forgot-password" element={<ForgotPassword />} />
    
    <Route path="employers-dashboard/*" element={
      <PrivateRoute>
        <Routes>
          <Route path="dashboard" element={<DashboardEmploeeDBPage />} />
          <Route path="company-profile" element={<CompanyProfileEmploeeDBPage />} />
          <Route path="post-jobs" element={<PostJobsEmploeeDBPage />} />
          <Route path="manage-jobs" element={<ManageJobsEmploeeDBPage />} />
          <Route path="all-applicants" element={<AllApplicantsEmploeesPage />} />
          <Route path="shortlisted-resumes" element={<ShortListedResumeEmploeeDBPage />} />
          <Route path="packages" element={<PackageEmploeeDBPage />} />
          <Route path="messages" element={<MessageEmploeeDBPage />} />
          <Route path="resume-alerts" element={<ResumeAlertsEmploeeDBPage />} />
          <Route path="change-password" element={<ChangePasswordEmploeeDBPage />} />
        </Routes>
      </PrivateRoute>
    } />
    <Route path="manage-profile" element={<PrivateRoute><ManageProfileNew /></PrivateRoute>} />
    <Route path="single-profile" element={<PrivateRoute><SingleProfile /></PrivateRoute>} />
  </Routes>
);

export default AppRoutes;
