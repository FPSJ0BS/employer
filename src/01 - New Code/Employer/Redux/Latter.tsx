import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface TemplateDataInterface {
  id: number;
  title: string;
  description: string;
  created_by: number;
  type: string;
  status: number;
  created_at: string;
  updated_at: string;
}
export interface LetterDataInterface {
  id: number;
  templateID: number;
  faculityID: any;
  faculity_name: string;
  employerID: number;
  description: string;
  status: number;
  created_at: string;
  updated_at: string;
}

interface EmployerEditJobType {
  templateData: TemplateDataInterface[];
  letterData: LetterDataInterface[];
  letterHtml:string;
}

// Define the initial state
const initialState: EmployerEditJobType = {
  templateData: [],
  letterData: [],
  letterHtml: "",
};

// Create the slice
export const letter = createSlice({
  name: "letter",
  initialState,
  reducers: {
    setTemplateData: (
      state,
      action: PayloadAction<TemplateDataInterface[]> // Action to set states data
    ) => {
      state.templateData = action.payload;
    },
    setLetterData: (
      state,
      action: PayloadAction<LetterDataInterface[]> // Action to set states data
    ) => {
      state.letterData = action.payload;
    },
    setLetterHtml: (
      state,
      action: PayloadAction<string> // Action to set states data
    ) => {
      state.letterHtml = action.payload;
    },
  },
});

// Export the actions and reducer
export const { setTemplateData, setLetterData, setLetterHtml } = letter.actions;

export default letter.reducer;
