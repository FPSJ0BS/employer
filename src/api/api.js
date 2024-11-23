// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = 'http://localhost:3000/institute';
const authorizationToken = localStorage.getItem('header');
const Fcm = localStorage.getItem('Fcm');


export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["Login","LoginEmail", "LoginVerify", 'RecentApplications', 'State', 'City', 'Job Detail', 'Profile'],
  endpoints: (build) => ({

    postLoginEmail: build.mutation({
      query: (email, pwd) => ({
        url: 'login/signInwithEmail',
        method: 'POST',
        body: { 
          email,
          pwd,
          fcm_token: Fcm
         },
      }),
      invalidatesTags: ["LoginEmail"],
    }),
    
    postLogin: build.mutation({
      query: (phoneNumber) => ({
        url: 'login/mobile-send-otp',
        method: 'POST',
        body: { mobile_number: phoneNumber },
      }),
      invalidatesTags: ["Login"],
    }),

    postLoginVerify: build.mutation({
      query: (phoneNumber, hash, otp) => ({
        url: 'login/mobile-verify-otp',
        method: 'POST',
        body: {
          mobile_number: phoneNumber,
          hash: hash,
          otp: otp,
          fcm_token: 'fps',
        },
      }),
      invalidatesTags: ["LoginVerify"],
    }),

    getRecentApplications: build.query({
      query: () => ({
        url: 'job/jobs',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      }),
      invalidatesTags: ["RecentApplications"],
    }),

    getState: build.query({
      query: () => ({
        url: 'state',
        method: 'GET',
      }),
      invalidatesTags: ["State"],
    }),

    getCity: build.query({
      query: (cityId) => ({
        url: `cities/${cityId}`,
        method: 'GET',
      }),
      invalidatesTags: ["City"],
    }),

    getJobDetail: build.query({
      query: (id) => ({
        url: `job/jobs/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      }),
      invalidatesTags: ["Job Detail"],
    }),

    getProfile: build.query({
      query: () => ({
        url: `profile`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      }),
      invalidatesTags: ["Profile"],
    }),

  }),
});

export const { 
  usePostLoginMutation, 
  usePostLoginVerifyMutation, 
  useGetRecentApplicationsQuery,
  useGetStateQuery,
  useGetCityQuery, 
  useGetJobDetailQuery,
  useGetProfileQuery,
  usePostLoginEmailMutation
  
} = api;
