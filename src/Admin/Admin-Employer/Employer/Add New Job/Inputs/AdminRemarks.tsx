import React from "react";
import { useDispatch } from "react-redux";
import { TextInputValid } from "../../../../functions/adminFunctions";
import { updateAdminAddJob } from "../../../../Redux/AdminSlice";
import { useSelector } from "react-redux";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";

export const AdminRemarks = () => {
  const { adminEditJob } = useSelector((state: any) => state.adminSlice);

  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    const inputValue = e.target.value;

    if (inputValue ?? false) {
      dispatch(
        updateAdminAddJob({
          remarks: inputValue,
        })
      );
    } else {
      dispatch(
        updateAdminAddJob({
          remarks: "",
        })
      );
    }
  };

  return (
    <>
      <textarea onChange={(e) => handleChange(e)} value={adminEditJob.remarks} className="w-[90%] bg-inputBg rounded-[4px] pl-2 pt-6 pr-2 border-[1px] border-solid border-gray-400" placeholder="Remarks"></textarea>
    </>
  );
};
