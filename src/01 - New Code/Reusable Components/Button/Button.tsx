import * as React from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";

interface IButtonProps extends ButtonProps {
  loading?: boolean;
}
export default function CustomizedButtons({ loading, ...props }: IButtonProps) {
  return (
    <Stack spacing={2} direction="row">
      <LoadingButton loading={loading} {...props} />
    </Stack>
  );
}
