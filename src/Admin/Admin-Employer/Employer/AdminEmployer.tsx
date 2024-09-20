import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Divider } from "@chakra-ui/react";
import { EmployerTable } from "./Components/EmployerTable";
import { AdminModal } from "../../UI/Modal/Modal";

import { AdminLoader } from "../../../../public/Loaders/AdminLoader/adminLoader";
interface AdminEmployerProps {}

export const AdminEmployer: FC<AdminEmployerProps> = () => {
  const [loader, setLoader] = useState(false);
  return (
    <div
      className={` w-[100%] h-[100%] flex  flex-col py-[3vh] pr-[5vw] relative`}
    >
      <div className=" h-[7%] w-[100%] flex justify-end items-center border-b-[2px] border-t-0 border-r-0 border-l-0 border-solid border-gray-300"></div>

      {loader ? (
        <div className=" h-[93%] w-[100%] flex justify-center items-center">
          <AdminLoader />
        </div>
      ) : (
        <div className="h-[93%] p-4 ">
          <EmployerTable />
        </div>
      )}
    </div>
  );
};
