import React from "react";
import { useDispatch } from "react-redux";
import { TextInputValid } from "../../../../functions/adminFunctions";
import { updateAdminAddJob } from "../../../../Redux/AdminSlice";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";

export const AdminAddJobTitle = () => {
  const { adminEditJob } = useSelector((state: any) => state.adminSlice);

  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    const inputValue = e.target.value;

    if (TextInputValid(inputValue)) {
      if (inputValue ?? false) {
        dispatch(
          updateAdminAddJob({
            jobTitle: inputValue,
          })
        );
      } else {
        dispatch(
          updateAdminAddJob({
            jobTitle: "",
          })
        );
      }
    }
  };

  return (
    <>
       <TextField autoComplete='off' value={adminEditJob?.jobTitle} onChange={(e) => handleChange(e)} required id="AdminJobTitle" label="Job Title" variant="outlined" color="primary" className=" bg-inputBg w-[90%]" />
    </>
  );
};
