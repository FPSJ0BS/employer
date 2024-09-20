import React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useSnackbar } from "notistack";

const variables = [
  "##CURRENT_DATE##",
  "##EMPLOYEE_ID##",
  "##EMPLOYEE_NAME##",
  "##EMPLOYEE_ADDRESS##",
  "##EMPLOYEE_JOINING_DATE##",
  "##EMPLOYEE_EXIT_DATE##",
  "##EMPLOYEE_PROBATION_END_DATE##",
  "##EMPLOYEE_NOTICE_PERIOD_START_DATE##",
  "##EMPLOYEE_NOTICE_PERIOD_END_DATE##",
  "##EMPLOYEE_DOB##",
  "##EMPLOYEE_DEPARTMENT##",
  "##EMPLOYEE_DESIGNATION##",
  "##SIGNATORY##",
  "##SIGNATORY_DESIGNATION##",
  "##SIGNATORY_DEPARTMENT##",
  "##COMPANY_NAME##",
];

const AvailableVariables = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleCopy = (text:any) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        enqueueSnackbar(`${text} copied to clipboard!`, { variant: "success" });
      })
      .catch(() => {
        enqueueSnackbar(`Failed to copy ${text}`, { variant: "error" });
      });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx ={{my:1}}>
        Available Variables:
      </Typography>
      <Box display="flex" flexWrap="wrap">
        {variables.map((variable, index) => (
          <Box key={index} display="flex" alignItems="center" mx={1}>
            <Typography variant="body1" mr={1} sx ={{fontSize:"12px"}}>
              {variable}
            </Typography>
            <Tooltip title="Click to copy">
              <IconButton onClick={() => handleCopy(variable)}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AvailableVariables;
