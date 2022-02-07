import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "services";

export const fetchRegisterUser = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue }) => {
    try {
      const data = await API.fetchRegisterUser(user);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLogInUser = createAsyncThunk(
  "user/login",
  async (user, { rejectWithValue }) => {
    try {
      const data = await API.fetchLogInUser(user);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLogOut = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await API.fetchLogOut();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "user/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const localStorage = state.authorization.token;

    if (localStorage === null) {
      return thunkAPI.rejectWithValue();
    }

    try {
      const data = await API.fetchCurrentUser(localStorage);
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
