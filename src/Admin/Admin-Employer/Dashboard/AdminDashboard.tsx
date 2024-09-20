import React, { FC, useEffect, useState } from "react";
import AdminSidebar from "../../UI/Sidebar/AdminSidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import DarkModeSwitch from "../../UI/DarkModeSwitch/DarkModeSwitch";
import { AdminModal } from "../../UI/Modal/Modal";

export const AdminDashboard: FC = () => {
  const { sidebarOpenClose, modal } = useSelector(
    (state: any) => state.adminSlice
  );
  const modalState = modal?.state;

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else{
      document.documentElement.classList.remove("dark");

    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark")
   
  }

  return (
    <div className="h-[100vh] w-[100vw] relative dark:bg-backgroundTwo">
      {modalState && <AdminModal />}

      <AdminSidebar />

      {/* <div className=" absolute z-50 right-2 top-2">
        <DarkModeSwitch sethandleThemeSwitch = {handleThemeSwitch}/>
      </div> */}

      <main
        className={` ${
          sidebarOpenClose ? "ml-[17%] w-[88%]" : "ml-[5%] w-[100%]"
        }   h-[100%] flex flex-col justify-end `}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
