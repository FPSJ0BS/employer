import React from "react";
import { useDispatch } from "react-redux";
import { TextInputValid } from "../../../../functions/adminFunctions";
import { updateAdminAddJob } from "../../../../Redux/AdminSlice";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";

export const AdminProcessAddress = () => {
  const { adminEditJob } = useSelector((state: any) => state.adminSlice);

  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    const inputValue = e.target.value;

    if (inputValue ?? false) {
      dispatch(
        updateAdminAddJob({
          processAddress: inputValue,
        })
      );
    } else {
      dispatch(
        updateAdminAddJob({
          processAddress: "",
        })
      );
    }
  };

  return (
    <>
      <TextField
        value={adminEditJob?.processAddress}
        onChange={(e) => handleChange(e)}
        required
        id="AdminProcessAddress"
        label="Process Address"
        variant="outlined"
        color="primary"
        className=" bg-inputBg w-[90%]"
      />
    </>
  );
};
