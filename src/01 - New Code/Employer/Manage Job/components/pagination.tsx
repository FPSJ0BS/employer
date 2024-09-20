import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import { editEmployerManageJobsFields } from "../../Redux/EmployerManageJobs";

export const PaginationCandidate = () => {

  const dispatch = useDispatch();

  const { employerManageJobsFields } = useSelector(
    (state: any) => state.employerManageJobs
  );

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(
      editEmployerManageJobsFields({
        pageNumber: value,
      })
    );
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={employerManageJobsFields?.totalData}
        variant="outlined"
        shape="rounded"
        color="secondary"
        onChange={handleChange}
      />
    </Stack>
  );
};
