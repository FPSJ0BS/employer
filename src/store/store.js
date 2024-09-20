import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "../features/job/jobSlice";
import toggleSlice from "../features/toggle/toggleSlice";
import filterSlice from "../features/filter/filterSlice";
import employerSlice from "../features/employer/employerSlice";
import employerFilterSlice from "../features/filter/employerFilterSlice";
import candidateSlice from "../features/candidate/candidateSlice";
import candidateFilterSlice from "../features/filter/candidateFilterSlice";
import shopSlice from "../features/shop/shopSlice";
import loginSlice from "@/redux/Login/loginSlice";
import instituteProfileImageSlice from "@/redux/InstituteDashboard/instituteProfileImageSlice";
import postJobSlice from "@/redux/InstituteDashboard/postJobSlice";
import editJobSlice from "@/redux/InstituteDashboard/editJobSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import adminSlice from '../Admin/Redux/AdminSlice'
import employerSliceNew from "../01 - New Code/Employer/Redux/EmployerSlice"
import autheticationSlice from "../01 - New Code/Employer/Redux/Authentication"
import employerEditJob from "../01 - New Code/Employer/Redux/EmployerEditJob"
import employerManageProfile from "../01 - New Code/Employer/Redux/CompanyProfile"
import employerCandidate from "../01 - New Code/Employer/Redux/EmployerCandidate"
import employerPackages from "../01 - New Code/Employer/Redux/EmployerPackages";
import employerManageJobs from "../01 - New Code/Employer/Redux/EmployerManageJobs";
import letter from '../01 - New Code/Employer/Redux/Latter'
import wallet from "../01 - New Code/Employer/Redux/Wallet";
import { api } from "@/api/api";


export const store = configureStore({
    reducer: {
        job: jobSlice,
        toggle: toggleSlice,
        filter: filterSlice,
        employer: employerSlice,
        employerFilter: employerFilterSlice,
        candidate: candidateSlice,
        candidateFilter: candidateFilterSlice,
        shop: shopSlice,
        login: loginSlice,
        instituteProfileImageSlice,
        postJob: postJobSlice,
        editJob: editJobSlice,
        adminSlice,
        employerSliceNew,
        autheticationSlice,
        employerEditJob,
        employerManageProfile,
        employerCandidate,
        employerPackages,
        employerManageJobs,
        letter,
        wallet,
        [api.reducerPath]: api.reducer,
    },
    middleware:(getDefault) => getDefault().concat(api.middleware),
});

setupListeners(store.dispatch);
