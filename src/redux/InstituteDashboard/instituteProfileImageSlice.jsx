import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileImage: '',
};

const instituteProfileImage = createSlice({
  name: "instituteProfileImage",
  initialState,
  reducers: {
    setProfileImageSliceFunc: (state, action) => {
      
        state.profileImage = action.payload;
    
    },

  },
});

export const { setProfileImageSliceFunc } = instituteProfileImage.actions;
export default instituteProfileImage.reducer;
