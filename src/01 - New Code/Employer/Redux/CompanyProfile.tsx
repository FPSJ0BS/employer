import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StateInterface {
  country_id: number;
  id: number;
  name: string;
}

export interface CityInterface {
  id: number;
  name: string;
  state_id: number;
}
export interface EmployerManageProfile {
  employerManageProfileFields: {
    firstName: string;
    lastName: string;
    designation: string;
    phoneNumber: number | null;
    email: string;
    otp: string;
    organizationDescription: string;
    organizationName: string;
    state: string;
    city: string;
    organizationAddress: string;
    contactPersonEmail: string;
    contactPersonNumber: string;
    contactPersonDesignation: string;
    phoneNumberVerified: number | null;
    emailVerified: number | null;
    totalJobs: number | null;
    jobsAvailable: number | null;
  };

  manageProfilePreFillDataState: StateInterface[];
  manageProfilePreFillDataCity: CityInterface[];
}

export interface ModalState {
  modal: boolean;
}

// Define the initial state
const initialState: EmployerManageProfile & ModalState = {
  employerManageProfileFields: {
    firstName: "",
    lastName: "",
    designation: "",
    phoneNumber: null,
    email: "",
    otp: "",
    organizationDescription: "",
    organizationName: "",
    state: "",
    city: "",
    organizationAddress: "",
    contactPersonEmail: "",
    contactPersonNumber: "",
    contactPersonDesignation: "",
    phoneNumberVerified: null,
    emailVerified: null,
    totalJobs: null,
    jobsAvailable: null,

  },

  manageProfilePreFillDataState: [],
  manageProfilePreFillDataCity: [],

  modal: false,
};

// Create the slice
export const employerManageProfile = createSlice({
  name: "employerManageProfile",
  initialState,
  reducers: {
    editEmployerManageProfileFields: (
      state,
      action: PayloadAction<
        Partial<EmployerManageProfile["employerManageProfileFields"]>
      >
    ) => {
      return {
        ...state,
        employerManageProfileFields: {
          ...state.employerManageProfileFields,
          ...action.payload,
        },
      };
    },

    openPhoneNumberManageProfileModal: (state) => {
      return {
        ...state,
        modal: true,
      };
    },

    closePhoneNumberManageProfileModal: (state) => {
      return {
        ...state,
        modal: false,
      };
    },

    setManageProfileStatesData: (
      state,
      action: PayloadAction<StateInterface[]> // Action to set states data
    ) => {
      state.manageProfilePreFillDataState = action.payload;
    },

    setManageProfileCitiesData: (
      state,
      action: PayloadAction<CityInterface[]> // Action to set states data
    ) => {
      state.manageProfilePreFillDataCity = action.payload;
    },
  },
});

// Export the actions and reducer
export const {
  editEmployerManageProfileFields,
  openPhoneNumberManageProfileModal,
  closePhoneNumberManageProfileModal,
  setManageProfileStatesData,
  setManageProfileCitiesData,
} = employerManageProfile.actions;

export default employerManageProfile.reducer;
