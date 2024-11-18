

import { Link } from "react-router-dom";
import {
  blogItems,
  candidateItems,
  employerItems,
  findJobItems,
  homeItems,
  pageItems,
  shopItems,
} from "../../data/mainMenuData";
import {
  isActiveParent,
  isActiveLink,
  isActiveParentChaild,
} from "../../utils/linkActiveChecker";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";


const HeaderNavContent = () => {
  const {login} = useSelector(state => state.login);  
  const { pathname } = useLocation();
  const navigate = useNavigate()
  const changePage = () => {
    // Programmatically redirect to '/home-3'
    navigate("/home-3");
  };
  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          {/* current dropdown */}
          {!login && <li
            className={`${
              isActiveParent(homeItems, pathname) ? "current" : ""
            } dropdown`}
          >
            <Link to="/" onClick={changePage}>
              Home
            </Link>
          </li>}
          {/* End homepage menu items */}

          {/* <li
            className={`${isActiveParent(findJobItems, pathname) ? "current" : ""
              } dropdown has-mega-menu`}
            id="has-mega-menu"
          >

            <Link to="job-list" onClick={changePage}>
              Find Jobs
            </Link>

          </li> */}
          {/* End findjobs menu items */}
          {login && (
            <span
              className=" cursor-pointer"
              onClick={() => navigate("/employers-dashboard/dashboard")}
            >
              Dashboard
            </span>
          )}

          <li
            className={`ml-0 ${
              isActiveParent(employerItems, pathname) ||
              pathname?.split("/")[1] === "employers-dashboard"
                ? "current"
                : ""
            } dropdown`}
          >
            <ul>
              {/* {employerItems.map((item) => (
                <li className="dropdown" key={item.id}>
                  <span
                    className={
                      isActiveParentChaild(item.items, pathname)
                        ? "current"
                        : ""
                    }
                  >
                    {item.title}
                  </span>
                  <ul>
                    {item.items.map((menu, i) => (
                      <li
                        className={
                          isActiveLink(menu.routePath, pathname)
                            ? "current"
                            : ""
                        }
                        key={i}
                      >
                        <Link to={menu.routePath}>{menu.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))} */}
              {/* <li
                className={  `${pathname?.includes("/employers-dashboard") ? "current" : ""} ml-0`}
              >
                {login ? (<Link to="/employers-dashboard/dashboard">
                  Employers Dashboard
                </Link>)
                  :
                (<Link to="/register">
                  Employers Register
                </Link>)}
              </li> */}
            </ul>
          </li>

          {/* End Employers menu items */}

          {/* <li
            className={`${isActiveParent(candidateItems, pathname) ||
              pathname?.split("/")[1] === "candidates-dashboard"
              ? "current"
              : ""
                ? "current"
                : ""
              } dropdown`}
          >
            <span>Candidates</span>
            <ul>
              {candidateItems.map((item) => (
                <li className="dropdown" key={item.id}>
                  <span
                    className={
                      isActiveParentChaild(item.items, pathname)
                        ? "current"
                        : ""
                    }
                  >
                    {item.title}
                  </span>
                  <ul>
                    {item.items.map((menu, i) => (
                      <li
                        className={
                          isActiveLink(menu.routePath, pathname)
                            ? "current"
                            : ""
                        }
                        key={i}
                      >
                        <Link to={menu.routePath}>{menu.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li
                className={
                  pathname?.includes("/candidates-dashboard/")
                    ? "current"
                    : ""
                }
              >
                <Link to="/candidates-dashboard/dashboard">
                  Candidates Dashboard
                </Link>
              </li>
            </ul>
          </li> */}

          {/* End Candidates menu items */}

          {/* <li
            className={`${isActiveParentChaild(blogItems, pathname) ? "current" : ""
              } dropdown`}
          >
            <span>Blog</span>
            <ul>
              {blogItems.map((item, i) => (
                <li
                  className={
                    isActiveLink(item.routePath, pathname) ? "current" : ""
                  }
                  key={i}
                >
                  <Link to={item.routePath}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li> */}
          {/* End Blog menu items */}

          {/* <li
            className={`ml-0 ${isActiveParentChaild(pageItems, pathname) ||
              isActiveParentChaild(shopItems[0].items, pathname)
              ? "current "
              : ""
              } dropdown`}
          >
            <span>Pages</span>
            <ul className="ml-0">
              {shopItems.map((item) => (
                <li className="dropdown ml-0" key={item.id}>
                  <span
                    className={`${isActiveParentChaild(shopItems[0].items, pathname)
                      ? "current "
                      : ""
                      }`}
                  >
                    {item.title}
                  </span>
                  <ul>
                    {item.items.map((menu, i) => (
                      <li
                        className={
                          `${isActiveLink(menu.routePath, pathname)
                            ? "current"
                            : ""} ml-0`
                        }
                        key={i}
                      >
                        <Link to={menu.routePath}>{menu.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              
              {pageItems.map((item, i) => (
                <li
                  className={
                    `${isActiveLink(item.routePath, pathname) ? "current" : ""} ml-0`
                  }
                  key={i}
                >
                  <Link to={item.routePath}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li> */}

          {/* End Pages menu items */}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;
