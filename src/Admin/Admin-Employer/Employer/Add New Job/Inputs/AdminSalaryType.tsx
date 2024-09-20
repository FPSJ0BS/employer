import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { updateAdminAddJob } from "../../../../Redux/AdminSlice";

export const AdminSalaryType = () => {
  const { adminEditJob } = useSelector((state: any) => state.adminSlice);

  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    const inputValue = e.target.innerText;
   

    if (inputValue ?? false) {
      dispatch(
        updateAdminAddJob({
          salaryType: inputValue,
        })
      );
    } else {
      dispatch(
        updateAdminAddJob({
          salaryType: "",
        })
      );
    }
  };
  return (
    <Autocomplete
      disablePortal
      id="AdminSalaryType"
      options={top100Films}
      className="w-[90%] bg-inputBg"
      renderInput={(params) => <TextField {...params} label="Salary Type *" />}
      onChange={(e) => handleChange(e)}
      aria-required
      
    />
  );
};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: "Hourly" },
  { label: "Weekly" },
  { label: "Monthly" },
  { label: "Annualy" },
  
];
