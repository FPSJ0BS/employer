

import {

  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";

import mobileMenuData from "../../../data/mobileMenuData";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import {
  isActiveLink,
  isActiveParentChaild,
} from "../../../utils/linkActiveChecker";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Index = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const { login } = useSelector(state => state.login);


  return (
    <div
      className="offcanvas offcanvas-start mobile_menu-contnet flex flex-col justify-between"
      tabIndex="-1"
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      <SidebarHeader />
      {/* End pro-header */}


      <Sidebar>
        {/* <Menu>
            {mobileMenuData.map((item) => (
              <SubMenu
                className={
                  isActiveParentChaild(item.items, pathname)
                    ? "menu-active"
                    : ""
                }
                label={item.label}
                key={item.id}
              >
                {item?.items?.map((menuItem, i) => (
                  <MenuItem

                  onClick={()=>navigate(menuItem.routePath)}
                    className={
                      isActiveLink(menuItem.routePath, pathname)
                        ? "menu-active-link"
                        : ""
                    }
                    key={i}
                    // routerLink={<Link to={menuItem.routePath} />}
                  >
                    {menuItem.name}
                  </MenuItem>
                ))}
              </SubMenu>
            ))}
          </Menu> */}

        <div className="h-[220px] w-[100%] flex flex-col pl-[50px] pt-[20px] gap-[20px] items-start">


          {login && <Link to="/">
            <h3 className="text-black text-[25px] text-semi-bold">Home</h3>
          </Link>}

          {login && <Link to="/employers-dashboard/dashboard">
            <h3 className="text-black text-[25px] text-semi-bold">Dashboard</h3>
          </Link>}

          {!login && <Link to="/login-otp">
            <h3 className="text-black text-[25px] text-semi-bold">Login</h3>
          </Link>}

          {!login && <Link to="/register">
            <h3 className="text-black text-[25px] text-semi-bold">Register</h3>
          </Link>}

        </div>
      </Sidebar>


      <SidebarFooter />
    </div>
  );
};

export default Index;