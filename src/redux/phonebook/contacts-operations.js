import * as API from "services/ApiPhoneBook";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const localStorage = state.authorization.token;

    try {
      const contacts = await API.fetchContacts(localStorage);

      return contacts.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchCreateContact = createAsyncThunk(
  "contacts/fetchCreateContact",
  async (item, { rejectWithValue }) => {
    try {
      const contacts = await API.fetchCreateContact(item);

      return contacts.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchDeleteContact = createAsyncThunk(
  "contacts/fetchDeleteContact",
  async (id, { rejectWithValue }) => {
    try {
      const requestDelete = await API.fetchDeleteContact(id);

      if (requestDelete.status === 200) {
        console.log(requestDelete);
        return id;
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchUpdateContact = createAsyncThunk(
  "contacts/fetchUpdateContact",
  async (item, { rejectWithValue }) => {
    try {
      const contacts = await API.fetchUpdateContact(item);
      console.log("update", contacts);
      return contacts.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
