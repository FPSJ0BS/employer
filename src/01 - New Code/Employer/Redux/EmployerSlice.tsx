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

export interface JobType {
  allJobTypes: string[];
}

export interface BoardLevelType {
  id: number;
  level: string;
  status: number;
  created_at: string;
}

export interface QualificationInterface {
  ID: number;
  qualification: string;
  sort_order: number;
}

export interface SelectionProcessInterface {
  selectionProcessData: string[];
}

export interface CategoryInterface {
  ID: number;
  category: string;
  color: string;
  image: string;
  status: number;
  meta_title: string;
  meta_description: string;
  description: string;
  meta_keywords: string;
  og_title: string;
  og_keywords: string;
  og_description: string;
  type: string;
  updated_at: string;
  created_at: string;
}

export interface SubCategoryInterface {
  ID: number;
  CID: number;
  function: string;
  topic_name: string;
  color: string;
  image: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_title: string;
  og_description: string;
  og_keywords: string;
  status: number;
  updated_at: string;
  created_at: string;
}

interface DashboardPopupItems {
  heading: string;
  buttonTextOne: string;
  buttonTextTwo: string;
  iconOnePercentage: string;
  iconTwoPercentage: string;
  btnOneTextPl: string;
  btnOneTextPr: string;
  btnTwoTextPl: string;
  btnTwoTextPr: string;
  hitApi: boolean;
}

interface EmployerPostJobType {
  employerPostJob: {
    job_title: string;
    catID: number | null;
    functionID: number | null;
    no_of_requirement: number | null;
    state: string;
    city: string;
    job_type: string;
    job_level: string;
    min_experience: number | null;
    max_experience: number | null;
    experience_unit: string;
    qualification: number | null;
    job_description: string;
    doc_required: string;
    job_designation: string;
    min_salary: number | null;
    max_salary: number | null;
    salary_type: string;
    selection_process: string;
    process_location: string;
    process_state: string;
    process_city: string;
    remarks: string;
  };

  PostJobPreFillDataState: StateInterface[];
  PostJobPreFillDataCity: CityInterface[];
  PostJobPreFillDataProcessCity: CityInterface[];
  isHeaderShow: boolean;
  allJobTypes: JobType[];

  boardLevel: BoardLevelType[];

  qualificationData: QualificationInterface[];

  selectionProcessData: SelectionProcessInterface[];

  categoryData: CategoryInterface[];

  subCategoryData: SubCategoryInterface[];
  dashboardPopup: boolean;
  dashboardPopupFields: DashboardPopupItems;
}

// Define the initial state
const initialState: EmployerPostJobType = {
  PostJobPreFillDataState: [],

  PostJobPreFillDataCity: [],

  PostJobPreFillDataProcessCity: [],

  allJobTypes: [],

  boardLevel: [],

  qualificationData: [],

  selectionProcessData: [],

  categoryData: [],

  subCategoryData: [],
  isHeaderShow: true,
  employerPostJob: {
    job_title: "",
    catID: null,
    functionID: null,
    no_of_requirement: null,
    state: "",
    city: "",
    job_type: "",
    job_level: "",
    min_experience: null,
    max_experience: null,
    experience_unit: "",
    qualification: null,
    job_description: "",
    doc_required: "",
    job_designation: "",
    min_salary: null,
    max_salary: null,
    salary_type: "",
    selection_process: "",
    process_location: "",
    process_state: "",
    process_city: "",
    remarks: "",
  },

  dashboardPopup: false,
  dashboardPopupFields: {
    heading: "",
    buttonTextOne: "",
    buttonTextTwo: "",
    iconOnePercentage: "",
    iconTwoPercentage: "",
    btnOneTextPl: "",
    btnOneTextPr: "",
    btnTwoTextPl: "",
    btnTwoTextPr: "",
    hitApi: false,
  },
};

// Create the slice
export const employerSliceNew = createSlice({
  name: "employerSliceNew",
  initialState,
  reducers: {
    postEmployerPostJob: (
      state,
      action: PayloadAction<Partial<EmployerPostJobType["employerPostJob"]>>
    ) => {
      return {
        ...state,
        employerPostJob: {
          ...state.employerPostJob,
          ...action.payload,
        },
      };
    },

    setStatesData: (
      state,
      action: PayloadAction<StateInterface[]> // Action to set states data
    ) => {
      state.PostJobPreFillDataState = action.payload;
    },

    setCitiesData: (
      state,
      action: PayloadAction<CityInterface[]> // Action to set states data
    ) => {
      state.PostJobPreFillDataCity = action.payload;
    },

    setProcessCitiesData: (
      state,
      action: PayloadAction<CityInterface[]> // Action to set states data
    ) => {
      state.PostJobPreFillDataProcessCity = action.payload;
    },

    setAllJobTypes: (
      state,
      action: PayloadAction<JobType[]> // Action to set states data
    ) => {
      state.allJobTypes = action.payload;
    },
    setHeaderShow: (
      state,
      action: PayloadAction<any> // Action to set states data
    ) => {
      state.isHeaderShow = action.payload;
    },
    setBoardLevel: (
      state,
      action: PayloadAction<BoardLevelType[]> // Action to set states data
    ) => {
      state.boardLevel = action.payload;
    },

    setQualification: (
      state,
      action: PayloadAction<QualificationInterface[]> // Action to set states data
    ) => {
      state.qualificationData = action.payload;
    },

    setSelectionProcess: (
      state,
      action: PayloadAction<SelectionProcessInterface[]> // Action to set states data
    ) => {
      state.selectionProcessData = action.payload;
    },

    setCategoryData: (
      state,
      action: PayloadAction<CategoryInterface[]> // Action to set states data
    ) => {
      state.categoryData = action.payload;
    },

    setSubCategoryData: (
      state,
      action: PayloadAction<SubCategoryInterface[]> // Action to set states data
    ) => {
      state.subCategoryData = action.payload;
    },

    setToggleDashboardPopup: (state) => {
      state.dashboardPopup = !state.dashboardPopup;
    },
    setDashboardPopupFields: (state, action) => {
      // Merge the existing fields with the new ones from action.payload
      state.dashboardPopupFields = {
        ...state.dashboardPopupFields,
        ...action.payload,
      };
    },
  },
});

// Export the actions and reducer
export const {
  postEmployerPostJob,
  setStatesData,
  setCitiesData,
  setProcessCitiesData,
  setAllJobTypes,
  setBoardLevel,
  setQualification,
  setSelectionProcess,
  setCategoryData,
  setSubCategoryData,
  setHeaderShow,
  setToggleDashboardPopup,
  setDashboardPopupFields,
} = employerSliceNew.actions;

export default employerSliceNew.reducer;
