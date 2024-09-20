import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { menuToggle } from "../../features/toggle/toggleSlice";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { useDispatch } from "react-redux";

const MenuItem = ({ items }: any) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  // menu togggle handler
  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };
  return (
    <li
      className={`ml-2 ${
        isActiveLink(items?.routePath, pathname) ? "active" : ""
      } mb-1`}
      key={items?.id}
      onClick={menuToggleHandler}
    >
      <Link
        to={items?.routePath}
        style={isActiveLink(items?.routePath, pathname) ? {
          background: "rgba(25, 103, 210, 0.1)",
          color: "#dd4975",
        }:{}}
      >
        {items?.name}
      </Link>
    </li>
  );
};

const ExpandableMenuItem = ({ config }: any) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <li onClick={handleClick} className={`ml-0  mb-1`}>
        <Link to={""}>
          <i className={`la ${config?.icon}`}></i>
          <div className="flex flex-row justify-between flex-1 items-center">
            {config?.name} {open ? <ExpandLess /> : <ExpandMore />}
          </div>
        </Link>
      </li>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {config.Children &&
          config.Children.map((childConfig: any) => (
            <MenuItem items={childConfig} />
          ))}
      </Collapse>
    </>
  );
};
export default ExpandableMenuItem;
