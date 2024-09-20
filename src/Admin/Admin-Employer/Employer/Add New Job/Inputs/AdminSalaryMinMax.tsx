import React from "react";
import { useDispatch } from "react-redux";
import { TextInputValid } from "../../../../functions/adminFunctions";
import { updateAdminAddJob } from "../../../../Redux/AdminSlice";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";

export const AdminSalaryMinMax = () => {
  const { adminEditJob } = useSelector((state: any) => state.adminSlice);

  const dispatch = useDispatch();

  const handleChangeMin = (e: any) => {
    const inputValue = e.target.value;

    if (inputValue ?? false) {
      dispatch(
        updateAdminAddJob({
          salaryPerYearMinimum: inputValue,
        })
      );
    } else {
      dispatch(
        updateAdminAddJob({
          salaryPerYearMinimum: null,
        })
      );
    }
  };

  const handleChangeMax = (e: any) => {
    const inputValue = e.target.value;

    if (inputValue ?? false) {
      dispatch(
        updateAdminAddJob({
          salaryPerYearMaximum: inputValue,
        })
      );
    } else {
      dispatch(
        updateAdminAddJob({
          salaryPerYearMaximum: null,
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
        value={adminEditJob?.salaryPerYearMinimum}
        onChange={(e) => handleChangeMin(e)}
        required
        id="AdminSalaryMin"
        label="Salary Min"
        variant="outlined"
        color={`${adminEditJob?.salaryPerYearMinimum === null ? 'primary' : 'success'}`}
        className=" bg-inputBg w-[50%]"
      />
      <TextField
        aria-required
        type="number"
        autoComplete="off"
        value={adminEditJob?.salaryPerYearMaximum}
        onChange={(e) => handleChangeMax(e)}
        required
        id="AdminSalaryMax"
        label="Salary Max"
        variant="outlined"
        color={`${adminEditJob?.salaryPerYearMaximum === null ? 'primary' : 'success'}`}

        className=" bg-inputBg w-[50%]"
      />
    </div>
  );
};
