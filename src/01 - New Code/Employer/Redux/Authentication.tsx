import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryInterface } from "./EmployerSlice";

interface EmployerPostJobType {
  modal: {
    state: boolean;
    text: string;
  };
  authRegister: {
    institute_name: string;
    first_name: string;
    last_name: string;
    email_id: string;
    mobile_number: string;
    hash: string;
    otp: string;
    nt_id: string;
    categoryName:string;
    fcm_token: string;
    password: string;
  };

  categoryData: CategoryInterface[];
}

// Define the initial state
const initialState: EmployerPostJobType = {
  authRegister: {
    institute_name: "",
    first_name: "",
    last_name: "",
    email_id: "",
    mobile_number: "",
    hash: "",
    otp: "",
    nt_id: "",
    categoryName:"",
    fcm_token: "",
    password: "",
  },

  categoryData: [],

  modal: {
    state: false,
    text: "",
  },
};

// Create the slice
export const autheticationSlice = createSlice({
  name: "autheticationSlice",
  initialState,
  reducers: {
    postAuthRegister: (
      state,
      action: PayloadAction<Partial<EmployerPostJobType["authRegister"]>>
    ) => {
      return {
        ...state,
        authRegister: {
          ...state.authRegister,
          ...action.payload,
        },
      };
    },

    setAuthCategoryData: (
      state,
      action: PayloadAction<CategoryInterface[]>
    ) => {
      state.categoryData = action.payload;
    },

    openAdminModal: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      return {
        ...state,
        modal: {
          text: action.payload,
          state: true,
        },
      };
    },

    closeAdminModal: (state) => {
      return {
        ...state,
        modal: {
          ...state.modal,
          state: false,
        },
      };
    },
  },
});

// Export the actions and reducer
export const {
  postAuthRegister,
  setAuthCategoryData,
  openAdminModal,
  closeAdminModal,
} = autheticationSlice.actions;

export default autheticationSlice.reducer;
