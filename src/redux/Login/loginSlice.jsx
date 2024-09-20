import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  authorizationToken: null,
  instituteId: null,
  imageUrl: 'https://empapi.fpsjob.com/',

  errorMessages:{
    changePasswordNotMatch : 'Password Do not Match, please check!'
  }
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      if (action.payload) {
        state.login = action.payload;
      }

      const authorizationToken = localStorage.getItem('header');

      try {
        // Attempt to parse the token
        const storedDataObject = authorizationToken ? JSON.parse(authorizationToken) : null;

        // Check if parsing is successful
        state.authorizationToken = storedDataObject;
      } catch (error) {
        // Handle the case where parsing throws an error
        console.error('Error parsing authorization token:', error);
        state.authorizationToken = null;
      }
    },

    setLogout: (state) => {
      localStorage.removeItem('header');
      state.login = false;
      state.authorizationToken = null;
    },

    setInstituteId: (state, action) => {
      state.instituteId = action.payload;
    }
  },
});

export const { setLogin, setLogout, setInstituteId } = loginSlice.actions;
export default loginSlice.reducer;
