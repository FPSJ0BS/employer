// ReusableSelect.tsx

import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectProps,
} from "@mui/material";

// Define the type for the component props
interface ReusableSelectProps extends SelectProps {
  label: string;
  options: Array<{ value: string | number; label: string }>;
}

const ReusableSelect: React.FC<ReusableSelectProps> = ({
  label,
  options,
  ...selectProps
}) => {
  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select label={label} {...selectProps}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ReusableSelect;
