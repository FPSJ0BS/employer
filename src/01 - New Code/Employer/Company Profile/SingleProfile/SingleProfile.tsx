import React from "react";
import DefaulHeader2 from "../../../Headers/DefaulHeader2ts";
import MobileMenu from "../../../Headers/MobileMenuts";
import Star from "../../../../../public/assets/icons/star.png";
import Tabs from "./ui/tabs";

export const SingleProfile = () => {
  const tags = [
    { name: "Oil & Gas", id: 1 },
    { name: "Petrochemical / Plastics / Rubber", id: 2 },
    { name: "Public", id: 3 },
    { name: "Indian MNC", id: 4 },
    { name: "B2C", id: 5 },
    { name: "B2B", id: 6 },
    { name: "Conglomerate", id: 7 },
  ];

  return (
    <div className="min-h-[100vh] w-[100%] ">
      <DefaulHeader2 />
      <MobileMenu />

      <div className=" min-h-[100%] w-full  mt-[100px]">
        <div className=" w-full h-[400px] bg-gray-500"></div>

        <div className=" min-h-[00px] w-full bg-[#f8f9fa] shadow-lg rounded-t-[50px] mt-[-100px] px-[100px]">
          <div className=" h-[200px] w-full flex">
            <div className="h-[100%] w-[60%] relative">
              <div className="w-[150px] h-[150px]  bg-white border-2 border-solid border-gray-500 rounded-2xl absolute top-[-50px]"></div>

              <div className=" w-[80%] h-[100%] ml-[150px] p-[15px] text-black flex flex-col gap-3">
                <div className=" flex gap-4 items-center">
                  <h2 className=" text-[30px] font-semibold ">
                    Reliance Industries
                  </h2>

                  <div className="flex items-center gap-2 font-medium">
                    <img src={Star} className="w-[20px]" alt="star" />
                    <h3>4.1</h3>
                    <h3 className=" text-[#989ec5]">(1443 Reviews)</h3>
                  </div>
                </div>

                <div className=" flex gap-2 flex-wrap">
                  {tags.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className=" border-1 border-[#d3d3d6] border-solid rounded-3xl px-3  "
                      >
                        {item.name}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            <div className=" w-[40%] h-[100%] "></div>
          </div>

          <div className=" mt-2 ">
            <Tabs />
          </div>
        </div>
      </div>
    </div>
  );
};
