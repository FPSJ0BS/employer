import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the initial state
interface EditJobState {
    sidebarOpenClose: boolean;
    modal: {
        text: string;
        state: boolean;
    };
    adminEditJob:{
        jobTitle: string,
        employer: string,
        category: string,
        subject: string,
        minimumQualification: string,
        jobType: string,
        jobLevel: string,
        noOfRequirement: number | null,
        experienceMinimum: number | null,
        experienceMaximum: number | null,
        salaryType: string,
        salaryPerYearMinimum: number | null,
        salaryPerYearMaximum: number | null,
        state : string,
        city : string,
        selectionProcess: string,
        processAddress: string,
        processState: string,
        processCity: string,
        metaTitle: string,
        metaDescription: string,
        metaKeywords : string,
        ogTitle: string,
        ogDescription: string,
        jobDescription: string,
        documentRequired: string,
        status: boolean,
        premiumStatus: boolean,
        remarks: string,
    }
}

// Define the initial state
const initialState: EditJobState = {
    sidebarOpenClose: true,
    modal: {
        text: '',
        state: false
    },
    adminEditJob:{
        jobTitle: '',
        employer: '',
        category: '',
        subject: '',
        minimumQualification:'',
        jobType: '',
        jobLevel: '',
        noOfRequirement: null,
        experienceMinimum: null,
        experienceMaximum: null,
        salaryType: '',
        salaryPerYearMinimum: null,
        salaryPerYearMaximum: null,
        state : '',
        city : '',
        selectionProcess: '',
        processAddress: '',
        processState: '',
        processCity: '',
        metaTitle: '',
        metaDescription: '',
        metaKeywords : '',
        ogTitle: '',
        ogDescription: '',
        jobDescription: '',
        documentRequired: '',
        status: false,
        premiumStatus: false,
        remarks: '',
    }
};

// Create the slice
export const adminSlice = createSlice({
    name: "adminSlice",
    initialState,
    reducers: {

        setSidebarOpenClose: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                sidebarOpenClose: action.payload,
            };
        },

        openAdminModal: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                modal: {
                    text: action.payload,
                    state: true
                }
            };
        },

        closeAdminModal: (state) => {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    state: false
                }
            };
        },

        updateAdminAddJob: (state, action: PayloadAction<Partial<EditJobState['adminEditJob']>>) => {
            return {
                ...state,
                adminEditJob: {
                    ...state.adminEditJob,
                    ...action.payload,
                },
            };
        },

    },
});

// Export the actions and reducer

export const { setSidebarOpenClose, openAdminModal, closeAdminModal, updateAdminAddJob } = adminSlice.actions;

export default adminSlice.reducer;
