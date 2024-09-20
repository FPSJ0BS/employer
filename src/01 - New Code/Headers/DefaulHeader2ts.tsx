
import React from "react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import employerMenuData from "../../data/employerMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import TallentoIcon from '../../../public/assets/Home-new/FPS and Tallento_OLD.png'
import DefaultAvatar from '../../../public/assets/icons/user.png'
import LogoutButton from "../Reusable Components/Logout Button/LogoutButton";


const DefaulHeader2 = () => {
  const [navbar, setNavbar] = useState(false);
  const { login } = useSelector(state => state.login);
  const { profileImage } = useSelector(state => state.instituteProfileImageSlice)
  const {imageUrl} = useSelector(state => state.login)

  

  const { pathname } = useLocation();



  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

 

  return (
    // <!-- Main Header-->
    <header
      className={`main-header  ${navbar ? "fixed-header animated slideInDown" : ""
        }`}
    >
      {/* <!-- Main box --> */}
      <div className="main-box">
        {/* <!--Nav Outer --> */}
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

          <HeaderNavContent />
          {/* <!-- Main Menu End--> */}
        </div>
        {/* End .nav-outer */}

        <div className="outer-box">
          {/* <!-- Add Listing --> */}
          {/* <Link to="/candidates-dashboard/cv-manager" className="upload-cv">
            Upload your CV
          </Link> */}
          {/* <!-- Login/Register --> */}
          {!login && <div className="btn-box">

            <Link
              to="/login-otp"
              className="theme-btn btn-style-three"
            >
              Login / Register
            </Link>
            <Link
              to="/register"
              className="theme-btn btn-style-one"
            >
              Job Post
            </Link>

          </div>}

          {login && <div className="dropdown dashboard-option flex gap-4 items-center">
            <a
              className="dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {profileImage && <img
                alt="avatar"
                className="thumb "
                src={`${imageUrl}${profileImage}`}

              /> }

              {!profileImage && <img
                alt="avatar"
                className="thumb "
                src={DefaultAvatar}

              />}
              <span className="name">My Account</span>
            </a>


            <ul className="dropdown-menu">
              {employerMenuData.map((item) => (
                <li
                  className={`${isActiveLink(
                    item.routePath,
                    pathname
                  )
                    ? "active"
                    : ""
                    } mb-1`}
                  key={item.id}
                >
                  <Link to={item.routePath}>
                    <i
                      className={`la ${item.icon}`}
                    ></i>{" "}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
        
            <LogoutButton />
          </div>}
          {/* End dropdown */}
        </div>
      </div>
    </header>
  );
};

export default DefaulHeader2;
