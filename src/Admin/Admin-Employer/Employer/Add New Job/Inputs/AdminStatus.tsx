import React from "react";
import { useDispatch } from "react-redux";
import { TextInputValid } from "../../../../functions/adminFunctions";
import { updateAdminAddJob } from "../../../../Redux/AdminSlice";
import { useSelector } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export const AdminStatus = () => {
  const { adminEditJob } = useSelector((state: any) => state.adminSlice);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    dispatch(updateAdminAddJob({ status: checked }));
  };

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Job Status</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={adminEditJob.status} // Use checked prop for controlled component
                onChange={handleChange}
              />
            }
            label={`Status ${adminEditJob.status ? 'Active' : 'Inactive'}`}
            labelPlacement="start"
          />
        </FormGroup>
      </FormControl>
    </>
  );
};
