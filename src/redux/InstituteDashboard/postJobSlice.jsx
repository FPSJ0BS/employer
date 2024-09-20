import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobTitleSPJ: null,
    workPlaceTypeSPJ: null,
    addressSPJ: null,
    stateSPJ: null,
    citySPJ: null,
    areaSPJ: null,
    jobTypeSPJ: null,
    minSalarySPJ: null,
    maxSalarySPJ: null,
    minExperienceSPJ: null,
    maxExperienceSPJ: null,
    salarytypeSPJ: null,
    interviewtypeSPJ: null,
    deadlineSPJ: null,
    jobDescriptionSPJ: null,
    jobGenderSPJ: null,
    boardLevelSPJ: null,

    apiFetchState: {
        workPlaceTypeStatus: false,
        stateStatus: false,
        cityPlaceTypeStatus: false,
        jobTypeStatus: false,
        minSalaryStatus: false,
        minExperienceStatus: false,
        salaryTypeStatus: false,
        interviewTypeStatus: false,
        boardLevelTypeStatus: false,
    }
};

const postJob = createSlice({
    name: "postJob",
    initialState,
    reducers: {
        setjobTitleSPJ: (state, action) => {
            state.jobTitleSPJ = action.payload;
        },
        setWorkPlaceTypeSPJ: (state, action) => {
            state.workPlaceTypeSPJ = action.payload;
        },
        setAddressSPJ: (state, action) => {
            state.addressSPJ = action.payload;
        },
        setStateSPJ: (state, action) => {
            state.stateSPJ = action.payload;
        },
        setCitySPJ: (state, action) => {
            state.citySPJ = action.payload;
        },
        setAreaSPJ: (state, action) => {
            state.areaSPJ = action.payload;
        },
        setjobTypeSPJ: (state, action) => {
            state.jobTypeSPJ = action.payload;
        },
        setMinSalarySPJ: (state, action) => {
            state.minSalarySPJ = action.payload;
        },
        setMaxSalarySPJ: (state, action) => {
            state.maxSalarySPJ = action.payload;
        },
        setMinExperienceSPJ: (state, action) => {
            state.minExperienceSPJ = action.payload;
        },
        setMaxExperienceSPJ: (state, action) => {
            state.maxExperienceSPJ = action.payload;
        },
        setSalaryTypeSPJ: (state, action) => {
            state.salarytypeSPJ = action.payload;
        },
        setInterviewTypeSPJ: (state, action) => {
            state.interviewtypeSPJ = action.payload;
        },
        setDeadlineSPJ: (state, action) => {
            state.deadlineSPJ = action.payload;
        },
        setJobDescriptionSPJ: (state, action) => {
            state.jobDescriptionSPJ = action.payload;
        },
        setGenderSPJ: (state, action) => {
            state.jobGenderSPJ = action.payload;
        },
        setBoardLevelSPJ: (state, action) => {
            state.boardLevelSPJ = action.payload;
        },

        // Fetch Status

        setWorkPlaceTypeStatus: (state, action) => {
            return {
                ...state,
                apiFetchState: {
                    ...state.apiFetchState,
                    workPlaceTypeStatus: action.payload,
                },
            };
        },
        setStateStatus: (state, action) => {
            return {
                ...state,
                apiFetchState: {
                    ...state.apiFetchState,
                    stateStatus: action.payload,
                },
            };
        },
        setCityPlaceTypeStatus: (state, action) => {
            return {
                ...state,
                apiFetchState: {
                    ...state.apiFetchState,
                    cityPlaceTypeStatus: action.payload,
                },
            };
        },
        setJobTypeStatus: (state, action) => {
            state.apiFetchState.jobTypeStatus = action.payload;
        }, 
        setMinSalaryStatus: (state, action) => {
            state.apiFetchState.minSalaryStatus = action.payload;
        }, 
        setMinExperienceStatus: (state, action) => {
            state.apiFetchState.minExperienceStatus = action.payload;
        }, 
        setSalaryTypeStatus: (state, action) => {
            state.apiFetchState.salaryTypeStatus = action.payload;
        }, 
        setInterviewTypeStatus: (state, action) => {
            state.apiFetchState.interviewTypeStatus = action.payload;
        }, 
        setBoardLevelTypeStatus: (state, action) => {
            state.apiFetchState.boardLevelTypeStatus = action.payload;
        }, 
    },
});

export const {
    setjobTitleSPJ,
    setWorkPlaceTypeSPJ,
    setAddressSPJ,
    setStateSPJ,
    setCitySPJ,
    setAreaSPJ,
    setjobTypeSPJ,
    setMinSalarySPJ,
    setMaxSalarySPJ,
    setMinExperienceSPJ,
    setMaxExperienceSPJ,
    setSalaryTypeSPJ,
    setInterviewTypeSPJ,
    setDeadlineSPJ,
    setJobDescriptionSPJ,
    setGenderSPJ,
    setBoardLevelSPJ,



    setWorkPlaceTypeStatus,
    setStateStatus,
    setCityPlaceTypeStatus,
    setJobTypeStatus,
    setMinSalaryStatus,
    setMinExperienceStatus,
    setSalaryTypeStatus,
    setInterviewTypeStatus,
    setBoardLevelTypeStatus



    

} = postJob.actions;
export default postJob.reducer;
