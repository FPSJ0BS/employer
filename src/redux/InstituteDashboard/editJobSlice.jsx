import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    editJobTitleSEJStatus:false,
    editWorkPlacceTypeSEJStatus:false,
    editSalaryTypeSEJStatus:false,


    
};

const editJob = createSlice({
    name: "editJob",
    initialState,
    reducers: {
        setEditJobTitleSEJStatus: (state, action) => {
            return {
                ...state,
                editJobTitleSEJStatus: action.payload,
            };
        },
        setEditWorkPlacceTypeSEJStatus: (state, action) => {
            return {
                ...state,
                editWorkPlacceTypeSEJStatus: action.payload,
            };
        },

        setEditSalaryTypeSEJStatus: (state, action) => {
            return {
                ...state,
                editSalaryTypeSEJStatus: action.payload,
            };
        },
       
    },
});

export const {
    setEditJobTitleSEJStatus,
    setEditWorkPlacceTypeSEJStatus,
    setEditSalaryTypeSEJStatus,


} = editJob.actions;
export default editJob.reducer;
