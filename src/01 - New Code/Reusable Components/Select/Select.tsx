import * as React from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
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
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));
interface ISelect {
  label: string;
  data: any;
  handleChange:any
}
export default function CustomizedSelects({ label, data }: ISelect) {
  const [value, setValue] = React.useState("");
  const handleChange = (event: { target: { value: string } }) => {
    setValue(event.target.value);
  };
  return (
    <FormControl fullWidth sx={{ my: 1 }} variant="standard">
      <InputLabel id="demo-customized-select-label">{label}</InputLabel>
      <Select
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        value={value}
        onChange={handleChange}
        input={<BootstrapInput />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {data &&
          data?.length > 0 &&
          data?.map((item: any) => {
            return <MenuItem value={item?.id}>{item?.title}</MenuItem>;
          })}
      </Select>
    </FormControl>
  );
}
