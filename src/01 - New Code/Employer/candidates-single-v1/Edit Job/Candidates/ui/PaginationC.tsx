import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import { editEmployerCandidateData } from "../../../../Redux/EmployerCandidate";

export const PaginationC = () => {
  const dispatch = useDispatch();

  const { employerCandidateData } = useSelector(
    (state: any) => state.employerCandidate
  );

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(
      editEmployerCandidateData({
        pageNumber: value,
      })
    );
  };
console.log(employerCandidateData?.totalCount);
  return (
    <Stack spacing={2}>
      <Pagination
        count={employerCandidateData?.totalCount}
        variant="outlined"
        shape="rounded"
        color="secondary"
        onChange={handleChange}
      />
    </Stack>
  );
};
