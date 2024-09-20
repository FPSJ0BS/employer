import {
  FormControl,
  InputBase,
  InputLabel,
  InputProps,
  alpha,
  styled,
} from "@mui/material";
import React from "react";
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
    fontSize: 16,
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));
interface IInput extends InputProps {
  labelName: string;
}

const AppInput = ({ labelName, ...props }: IInput) => {
  return (
    <FormControl fullWidth sx={{ my: 1 }} variant="standard">
      <InputLabel
        shrink
        htmlFor="bootstrap-input"
        style={{ fontSize: 16 }}
        required
      >
        {labelName}
      </InputLabel>
      <BootstrapInput {...props} />
    </FormControl>
  );
};

export default AppInput;
