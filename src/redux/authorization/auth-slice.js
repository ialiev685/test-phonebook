import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRegisterUser,
  fetchLogInUser,
  fetchLogOut,
  fetchCurrentUser,
} from "./auth-operations";

const initialState = {
  user: { name: null, email: null },
  token: null,
  islogged: false,
  isfetchingCurrentUser: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [fetchRegisterUser.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [fetchRegisterUser.rejected](state, action) {
      state.error = action.payload;
    },

    [fetchLogInUser.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.islogged = true;
    },
    [fetchLogInUser.rejected](state, action) {
      state.error = action.payload;
    },
    [fetchLogOut.fulfilled](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.islogged = false;
    },
    [fetchLogOut.rejected](state, action) {
      state.error = action.payload;
    },
    [fetchCurrentUser.pending](state) {
      state.isfetchingCurrentUser = true;
    },

    [fetchCurrentUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isfetchingCurrentUser = false;
      state.islogged = true;
    },
    [fetchCurrentUser.rejected](state, action) {
      state.isfetchingCurrentUser = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
