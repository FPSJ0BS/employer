import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import employerMenuData from "../../data/employerMenuData";
import HeaderNavContent from "./HeaderNavContent";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { useDispatch, useSelector } from "react-redux";
import TallentoIcon from "../../../public/FPS and Tallento_OLD-d1a356fe.png.jpg";
import { useLocation } from "react-router-dom";
import DefaultAvatar from "../../../public/assets/icons/user.png";
import LogoutButton from "../Reusable Components/Logout Button/LogoutButton";
import { Phone } from "lucide-react";
// import LogoutIcon from '../../../public/assets/logout.png'
import ExpandableMenuItem from "../Headers/ExpandableMenuItem";
const DashboardHeader = () => {
  const { profileImage } = useSelector(
    (state) => state.instituteProfileImageSlice
  );

  console.log('profileImage',profileImage);
  const { imageUrl } = useSelector((state) => state.login);
  const { pathname } = useLocation();
  const [navbar, setNavbar] = useState(false);
  const dispatch = useDispatch();
  const changeBackground = () => {
    if (window.scrollY >= 0) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  // menu togggle handler
  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };

  return (
    // <!-- Main Header-->
    <header
      className={`main-header header-shaddow  ${navbar ? "fixed-header " : ""}`}
    >
      <div className="container-fluid">
        {/* <!-- Main box --> */}
        <div className="main-box">
          {/* <!--Nav Outer --> */}
          <div className="nav-outer ">
            <div className="logo-box">
              <div className="logo">
                <Link to="/">
                  <img className="w-[150px]" src={TallentoIcon} alt="brand" />
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

            <HeaderNavContent />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">
            <div>
              <div className=" flex justify-center items-center gap-2">
                <h3>
                  Have a Query?
                  <br />
                  9:30AM - 6:30PM
                </h3>
              </div>
            </div>

            <div className=" ml-4">
              <div className=" flex justify-center items-center gap-2">
                <Phone className=" text-[#588d78]" />
                <h3 className="">
                  9783143666
                  <br />
                  9728987999{" "}
                </h3>
              </div>
            </div>
            {/* <button className="menu-btn">
                            <span className="count">1</span>
                            <span className="icon la la-heart-o"></span>
                        </button> */}
            {/* wishlisted menu */}

            {/* <button className="menu-btn">
                            <span className="icon la la-bell"></span>
                        </button> */}
            {/* End notification-icon */}

            {/* <!-- Dashboard Option --> */}

            <div className="dropdown dashboard-option flex items-center gap-4">
              <a
                className="dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {profileImage ? (
                  <img
                    alt="avatar"
                    className="thumb "
                    src={`${imageUrl}${profileImage}`}
                  />
                ) : (
                  <img alt="avatar" className="thumb " src={DefaultAvatar} />
                )}
                <span className="name">My Account</span>
              </a>

              <ul className="dropdown-menu">
                {employerMenuData?.map((item) =>
                  item?.Children && item?.Children.length > 0 ? (
                    <></>
                  ) : (
                    <li
                      className={`ml-0 ${
                        isActiveLink(item.routePath, pathname) ? "active" : ""
                      } mb-1`}
                      key={item?.id}
                      onClick={menuToggleHandler}
                    >
                      <Link to={item?.routePath}>
                        <i className={`la ${item.icon}`}></i> {item?.name}
                      </Link>
                    </li>
                  )
                )}
              </ul>
              <LogoutButton />
            </div>
            {/* End dropdown */}
          </div>
          {/* End outer-box */}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
