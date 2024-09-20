import React from "react";
import { useDispatch } from "react-redux";
import { TextInputValid } from "../../../../functions/adminFunctions";
import { updateAdminAddJob } from "../../../../Redux/AdminSlice";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";

export const AdminNoOfRequirement = () => {
  const { adminEditJob } = useSelector((state: any) => state.adminSlice);

  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    const inputValue = e.target.value;

    if (inputValue ?? false) {
      dispatch(
        updateAdminAddJob({
          noOfRequirement: inputValue,
        })
      );
    } else {
      dispatch(
        updateAdminAddJob({
          noOfRequirement: null,
        })
      );
    }
  };

  return (
    <>
      <TextField
        aria-required
        type="number"
        autoComplete="off"
        value={adminEditJob?.noOfRequirement}
        onChange={(e) => handleChange(e)}
        required
        id="AdminNoOfRequirement"
        label="No of Requirement"
        variant="outlined"
        color="primary"
        className=" bg-inputBg w-[90%]"
      />
    </>
  );
};
