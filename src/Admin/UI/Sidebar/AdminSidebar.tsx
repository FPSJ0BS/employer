import React, { useState } from "react";
import {
  MoreVertical,
  ChevronLast,
  ChevronFirst,
  TextSelect,
} from "lucide-react";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOpenClose } from "../../Redux/AdminSlice";
import { Link } from "react-router-dom";

export const AdminSidebar: React.FC = () => {
  const dispatch = useDispatch();

  const { sidebarOpenClose } = useSelector((state: any) => state.adminSlice);

  const setingSidebarOpenClose = () => {
    dispatch(setSidebarOpenClose(!sidebarOpenClose));
  };

  return (
    <aside
      className={`h-screen ${
        sidebarOpenClose ? "w-[17%]" : "w-[5%]"
      }  absolute `}
    >
      <nav className="h-full flex flex-col  border-r shadow-sm  dark:bg-backgroundThree ">
        <div className="p-4 flex justify-between items-center ">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={` overflow-hidden transition-all ${
              sidebarOpenClose ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setingSidebarOpenClose()}
            className="p-1.5 mr-[20px] absolute right-0 top-6 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {sidebarOpenClose ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Search */}

        <div
          className={` w-[100%] flex justify-center ${
            sidebarOpenClose ? " block" : " hidden"
          }`}
        >
          <input
            placeholder="Search"
            className="bg-[#f1f5f7] border-2 border-[#3e3e3e] rounded-lg text-black px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
            type="text"
          />
        </div>

        <ul className="flex-1 px-3 ">
          <li className=" cursor-pointer text-[20px] capitalize flex flex-col justify-start items-start mt-[50px] ml-[10px] gap-[15px] h-[100%]">
            <div className=" flex flex-col justify-start items-start gap-4 ">
              {sidebarOpenClose ? (
                <div className=" flex gap-2">
                  <TextSelect className="w-[30px] h-[30px]" />
                  <Link to="admin/employer">
                    <span className="text-black">Dashboard</span>
                  </Link>
                </div>
              ) : (
                <Grid item>
                  <Tooltip
                    title="Employer"
                    placement="right"
                    arrow
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, 25],
                            },
                          },
                        ],
                      },
                    }}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                  >
                    <TextSelect className="w-[30px] h-[30px]" />
                  </Tooltip>
                </Grid>
              )}

              {sidebarOpenClose ? (
                <div className=" flex gap-2">
                  <TextSelect className="w-[30px] h-[30px]" />
                  <Link to="admin/employer/edit-job">
                    <span className="text-black">Edit Job</span>
                  </Link>
                </div>
              ) : (
                <Grid item>
                  <Tooltip
                    title="Employer"
                    placement="right"
                    arrow
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, 25],
                            },
                          },
                        ],
                      },
                    }}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                  >
                    <TextSelect className="w-[30px] h-[30px]" />
                  </Tooltip>
                </Grid>
              )}
            </div>
          </li>
        </ul>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${
                sidebarOpenClose ? "w-52 ml-3" : "w-0"
              }
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
