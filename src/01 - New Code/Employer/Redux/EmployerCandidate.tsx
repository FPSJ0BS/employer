import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EmployerManageProfile {
  employerCandidateData: {
    sortDataLength: number | null;
    pageNumber: number | null;
    status: string;
    totalData: number | null;
    statusChangeApi: string;
    date: string;
    time: string;
    interviewType: string;
    interviewer: string;
    note: string;
    minimumSalary: number | null;
    maximumSalary: number | null;
    minimumExperience: number | null;
    maximumExperience: number | null;
    minimumAge: number | null;
    maximumAge: number | null;
    noticePeriod: string;
    applicationWithinDays: number | null;
    filterTrueOrNot: boolean;
  };
  employerCandidateSearchBox: {
    search: string;
  };
  filterModal: boolean;
  filterSuggestedModal: boolean;
  allCityData: any[];
  preferedAllCityData: any[];
  allQualificationData: any[];
  allStatusData: any[];
  allTeachingData: any[];
  applyFiler: Boolean;
  cityDataToFilter: any[];
  PreferedCityDataToFilter: any[];
  allSalaryData: any[];
  allQualificationDataToFilter: any[];
  allTeachingDataToFilter: any[];
  isApplyData:boolean;
}

export interface ModalState {
  modal: boolean;
}

const initialState: EmployerManageProfile & ModalState = {
  employerCandidateData: {
    sortDataLength: 10,
    pageNumber: 1,
    status: "",
    totalData: null,
    statusChangeApi: "",
    date: "",
    time: "",
    interviewType: "",
    interviewer: "",
    note: "",
    minimumSalary: null,
    maximumSalary: null,

    minimumExperience: null,
    maximumExperience: null,

    minimumAge: null,
    maximumAge: null,

    noticePeriod: "",

    applicationWithinDays: null,

    filterTrueOrNot: false,
  },
  employerCandidateSearchBox: {
    search: "",
  },
  filterModal: false,
  isApplyData:false,
  modal: false,
  allCityData: [],
  preferedAllCityData: [],
  allSalaryData: [],
  allQualificationData: [],
  allStatusData: [],
  allTeachingData: [],
  filterSuggestedModal: false,

  applyFiler: false,

  cityDataToFilter: [],
  PreferedCityDataToFilter: [],
  allQualificationDataToFilter: [],
  allTeachingDataToFilter: [],
};

// Create the slice
export const employerCandidate = createSlice({
  name: "employerCandidate",
  initialState,
  reducers: {
    editEmployerCandidateData: (
      state,
      action: PayloadAction<
        Partial<EmployerManageProfile["employerCandidateData"]>
      >
    ) => {
      return {
        ...state,
        employerCandidateData: {
          ...state.employerCandidateData,
          ...action.payload,
        },
      };
    },

    editEmployerCandidateSearchBox: (
      state,
      action: PayloadAction<
        Partial<EmployerManageProfile["employerCandidateSearchBox"]>
      >
    ) => {
      return {
        ...state,
        employerCandidateSearchBox: {
          ...state.employerCandidateSearchBox,
          ...action.payload,
        },
      };
    },

    openResumeModal: (state) => {
      return {
        ...state,
        modal: true,
      };
    },

    closeResumeModal: (state) => {
      return {
        ...state,
        modal: false,
      };
    },

    openFilterModal: (state) => {
      return {
        ...state,
        filterModal: true,
      };
    },

    closeFilterModal: (state) => {
      return {
        ...state,
        filterModal: false,
      };
    },
    openFilterSuggestedModal: (state) => {
      return {
        ...state,
        filterSuggestedModal: true,
      };
    },

    closeFilterSuggestedModal: (state) => {
      return {
        ...state,
        filterSuggestedModal: false,
      };
    },
    setApplyData: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        isApplyData: action.payload,
      };
    },

    setAllCityData: (state, action: PayloadAction<any[]>) => {
      return {
        ...state,
        allCityData: action.payload,
      };
    },

    setPreferedAllCityData: (state, action: PayloadAction<any[]>) => {
      return {
        ...state,
        preferedAllCityData: action.payload,
      };
    },

    setAllSalaryData: (state, action: PayloadAction<any[]>) => {
      return {
        ...state,
        allSalaryData: action.payload,
      };
    },

    setAllStatusData: (state, action: PayloadAction<any[]>) => {
      return {
        ...state,
        allStatusData: action.payload,
      };
    },

    setAllTeachingData: (state, action: PayloadAction<any[]>) => {
      return {
        ...state,
        allTeachingData: action.payload,
      };
    },

    toggleApplyFilter: (state) => {
      state.applyFiler = !state.applyFiler;
    },

    addCityToFilter: (state, action: PayloadAction<string>) => {
      if (!state.cityDataToFilter.includes(action.payload)) {
        state.cityDataToFilter.push(action.payload);
      }
    },
    removeCityFromFilter: (state, action: PayloadAction<string>) => {
      state.cityDataToFilter = state.cityDataToFilter.filter(
        (city) => city !== action.payload
      );
    },

    addPreferedCityToFilter: (state, action: PayloadAction<string>) => {
      if (!state.PreferedCityDataToFilter.includes(action.payload)) {
        state.PreferedCityDataToFilter.push(action.payload);
      }
    },
    removePreferedCityFromFilter: (state, action: PayloadAction<string>) => {
      state.PreferedCityDataToFilter = state.PreferedCityDataToFilter.filter(
        (city) => city !== action.payload
      );
    },

    setAllQualificationData: (state, action: PayloadAction<any[]>) => {
      return {
        ...state,
        allQualificationData: action.payload,
      };
    },

    addQualificationToFilter: (state, action: PayloadAction<string>) => {
      if (!state.allQualificationDataToFilter.includes(action.payload)) {
        state.allQualificationDataToFilter.push(action.payload);
      }
    },
    removeQualificationFromFilter: (state, action: PayloadAction<string>) => {
      state.allQualificationDataToFilter =
        state.allQualificationDataToFilter.filter(
          (city) => city !== action.payload
        );
    },

    addTeachingToFilter: (state, action: PayloadAction<string>) => {
      if (!state.allTeachingDataToFilter.includes(action.payload)) {
        state.allTeachingDataToFilter.push(action.payload);
      }
    },
    removeTeachingFromFilter: (state, action: PayloadAction<string>) => {
      state.allTeachingDataToFilter = state.allTeachingDataToFilter.filter(
        (city) => city !== action.payload
      );
    },

    clearAllFilters: (state) => {
      state.cityDataToFilter = [];
      state.allQualificationDataToFilter = [];
      state.PreferedCityDataToFilter = [];
      state.allQualificationDataToFilter = [];
      state.allTeachingDataToFilter = [];
    },
  },
});

export const {
  editEmployerCandidateData,
  openResumeModal,
  closeResumeModal,
  editEmployerCandidateSearchBox,
  openFilterModal,
  closeFilterModal,
  setAllCityData,
  setPreferedAllCityData,
  setAllSalaryData,
  setAllStatusData,
  setAllTeachingData,

  toggleApplyFilter,
  addCityToFilter,
  removeCityFromFilter,

  addPreferedCityToFilter,
  removePreferedCityFromFilter,

  setAllQualificationData,
  addQualificationToFilter,
  removeQualificationFromFilter,
  setApplyData,
  addTeachingToFilter,
  removeTeachingFromFilter,
  closeFilterSuggestedModal,
  openFilterSuggestedModal,
  clearAllFilters,
} = employerCandidate.actions;

export default employerCandidate.reducer;
