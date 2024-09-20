import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EmployerPackagesTypes {
  modal: boolean;
  modalCheckout: boolean;
  singlePlanData: Array<Array<any>>;

  employerPackageFields: {
    price: number | null;
    id: number | null;
    optionId: number | null;
    mainPrice: number | null;
    mainJobs: number | null;
  };
}

const initialState: EmployerPackagesTypes = {
  modal: false,
  modalCheckout: false,
  singlePlanData: [],

  employerPackageFields: {
    price: null,
    id: null,
    optionId: null,
    mainPrice: null,
    mainJobs: null,
  },
};

// Create the slice
export const employerPackages = createSlice({
  name: "employerPackages",
  initialState,
  reducers: {
    openBuyPackageModal: (state) => {
      return {
        ...state,
        modal: true,
      };
    },

    closeBuyPackageModal: (state) => {
      return {
        ...state,
        modal: false,
      };
    },

    openCheckoutModal: (state) => {
      return {
        ...state,
        modalCheckout: true,
      };
    },

    closeCheckoutModal: (state) => {
      return {
        ...state,
        modalCheckout: false,
      };
    },

    updateSinglePlanData: (state, action: PayloadAction<Array<any>>) => {
      return {
        ...state,
        singlePlanData: action.payload,
      };
    },

    editPackageFields: (
      state,
      action: PayloadAction<
        Partial<EmployerPackagesTypes["employerPackageFields"]>
      >
    ) => {
      return {
        ...state,
        employerPackageFields: {
          ...state.employerPackageFields,
          ...action.payload,
        },
      };
    },
  },
});

export const {
  openBuyPackageModal,
  closeBuyPackageModal,
  updateSinglePlanData,
  openCheckoutModal,
  closeCheckoutModal,
  editPackageFields,
} = employerPackages.actions;

export default employerPackages.reducer;
