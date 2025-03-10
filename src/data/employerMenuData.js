import { Children } from "react";

const employerMenu = [
  {
    id: 1,
    name: "Dashboard",
    icon: "la-home",
    routePath: "/employers-dashboard/dashboard",
    active: "active",
  },
  {
    id: 2,
    name: "Company Profile",
    icon: "la-user-tie",
    routePath: "/manage-profile",
    active: "",
  },
  {
    id: 3,
    name: "Post a New Job",
    icon: "la-paper-plane",
    routePath: "/employers-dashboard/post-jobs",
    active: "",
  },
  {
    id: 4,
    name: "Manage Jobs",
    icon: "la-briefcase",
    routePath: "/employers-dashboard/manage-jobs",
    active: "",
  },
  // {
  //   id: 5,
  //   name: "All Applicants",
  //   icon: "la-file-invoice",
  //   routePath: "/employers-dashboard/all-applicants",
  //   active: "",
  // },
  {
    id: 6,
    name: "Upcoming Interviews",
    icon: "la-bookmark-o",
    routePath: "/employers-dashboard/shortlisted-resumes",
    active: "",
  },
  {
    id: 7,
    name: "Subscription Packages",
    icon: "la-box",
    routePath: "/employers-dashboard/packages",
    active: "",
  },
  // {
  //   id: 8,
  //   name: "Messages",
  //   icon: "la-comment-o",
  //   routePath: "/employers-dashboard/messages",
  //   active: "",
  // },
  {
    id: 9,
    name: "Application Alerts",
    icon: "la-bell",
    routePath: "/employers-dashboard/resume-alerts",
    active: "",
  },
  {
    id: 10,
    name: "Letter",
    icon: "la-envelope",
    Children: [
      {
        id: 1,
        name: "Generate",
        routePath: "/employers-dashboard/letter/generate",
        active: "",
      },
      {
        id: 2,
        name: "Template",
        routePath: "/employers-dashboard/letter/template",
        active: "",
      },
    ],
  },
  {
    id: 11,
    name: "Change Password",
    icon: "la-lock",
    routePath: "/employers-dashboard/change-password",
    active: "",
  },
];
export default employerMenu;
