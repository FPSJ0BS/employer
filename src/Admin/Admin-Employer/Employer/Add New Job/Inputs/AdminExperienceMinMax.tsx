import React from "react";
import { useDispatch } from "react-redux";
import { TextInputValid } from "../../../../functions/adminFunctions";
import { updateAdminAddJob } from "../../../../Redux/AdminSlice";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";

export const AdminExperienceMinMax = () => {
  const { adminEditJob } = useSelector((state: any) => state.adminSlice);

  const dispatch = useDispatch();

  const handleChangeMin = (e: any) => {
    const inputValue = e.target.value;

    if (inputValue ?? false) {
      dispatch(
        updateAdminAddJob({
          experienceMinimum: inputValue,
        })
      );
    } else {
      dispatch(
        updateAdminAddJob({
          experienceMinimum: null,
        })
      );
    }
  };

  const handleChangeMax = (e: any) => {
    const inputValue = e.target.value;

    if (inputValue ?? false) {
      dispatch(
        updateAdminAddJob({
          experienceMaximum: inputValue,
        })
      );
    } else {
      dispatch(
        updateAdminAddJob({
          experienceMaximum: null,
        })
      );
    }
  };

  return (
    <div className=" flex gap-1 w-[90%]">
      <TextField
        aria-required
        type="number"
        autoComplete="off"
        value={adminEditJob?.experienceMinimum}
        onChange={(e) => handleChangeMin(e)}
        required
        id="AdminExperienceMin"
        label="Min Experience"
        variant="outlined"
        color="primary"
        className=" bg-inputBg w-[50%]"
      />
      <TextField
        aria-required
        type="number"
        autoComplete="off"
        value={adminEditJob?.experienceMaximum}
        onChange={(e) => handleChangeMax(e)}
        required
        id="AdminExperienceMax"
        label="Max Experience"
        variant="outlined"
        color="primary"
        className=" bg-inputBg w-[50%]"
      />
    </div>
  );
};
