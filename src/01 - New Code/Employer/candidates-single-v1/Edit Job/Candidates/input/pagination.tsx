import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import { editEmployerCandidateData } from "../../../../Redux/EmployerCandidate";

export const PaginationCandidate = () => {
  const dispatch = useDispatch();
  const { employerCandidateData } = useSelector(
    (state: any) => state.employerCandidate
  );
  const [dataValue, setDataValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setDataValue(value);
    dispatch(
      editEmployerCandidateData({
        pageNumber: value,
      })
    );
  };
console.log(employerCandidateData?.totalData,"totalData");
  return (
    <Stack spacing={2}>
      <Pagination
        count={employerCandidateData?.totalData}
        variant="outlined"
        shape="rounded"
        color="secondary"
        onChange={handleChange}
      />
    </Stack>
  );
};
