import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EmployerManageJobsType {
  employerManageJobsFields: {
    totalCount: number | null;
    pageNumber: number | null;
    sortData: number | null;
    search: string;
  };
}

// Define the initial state
const initialState: EmployerManageJobsType = {
  employerManageJobsFields: {
    totalCount: null,
    pageNumber: 1,
    sortData: 10,
    search: "",
  },
};

// Create the slice
export const employerManageJobs = createSlice({
  name: "employerManageJobs",
  initialState,
  reducers: {
    editEmployerManageJobsFields: (
      state,
      action: PayloadAction<
        Partial<EmployerManageJobsType["employerManageJobsFields"]>
      >
    ) => {
      return {
        ...state,
        employerManageJobsFields: {
          ...state.employerManageJobsFields,
          ...action.payload,
        },
      };
    },
  },
});

// Export the actions and reducer
export const { editEmployerManageJobsFields } = employerManageJobs.actions;

export default employerManageJobs.reducer;
