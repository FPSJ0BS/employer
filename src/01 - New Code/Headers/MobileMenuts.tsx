import { Link } from "react-router-dom";
import MobileSidebar from "./mobile-sidebar";
import TallentoIcon from '../../../public/assets/icons/Tallento LOGO.png'
import LogoutButton from "../Reusable Components/Logout Button/LogoutButton";
import { useSelector } from "react-redux";
import React from "react";

const MobileMenu = () => {
  const { login } = useSelector(state => state.login);

  return (
    // <!-- Main Header-->
    <header className="testHome main-header main-header-mobile bg-black sm:bg-white">
      <div className="auto-container">
        {/* <!-- Main box --> */}
        <div className="inner-box">
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link to="/">
                <img
                  className="w-[150px]"
                  src={TallentoIcon}
                  alt="brand"
                />
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

            <MobileSidebar />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box ml-[-20px]">
            
            {/* login popup end */}

           {login && <LogoutButton />}

            <a
              href="#"
              className="mobile-nav-toggler"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
            >
              <span className="flaticon-menu-1 text-white sm:text-black"></span>
            </a>
            {/* right humberger menu */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileMenu;
