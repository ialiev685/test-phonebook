import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./contacts-action";
import {
  fetchContacts,
  fetchCreateContact,
  fetchDeleteContact,
  fetchUpdateContact,
} from "./contacts-operations";

const items = createReducer([], {
  [fetchContacts.fulfilled]: (_, action) => [...action.payload],
  [fetchCreateContact.fulfilled]: (state, action) => [action.payload, ...state],
  [fetchDeleteContact.fulfilled]: (state, action) =>
    state.filter(({ id }) => id !== action.payload),
  [fetchUpdateContact.fulfilled]: (state, action) => [
    action.payload,
    ...state.filter(({ id }) => id !== action.payload.id),
  ],
});

const isLoader = createReducer(false, {
  [fetchUpdateContact.pending]: () => true,
  [fetchDeleteContact.pending]: () => true,
  [fetchContacts.pending]: () => true,
  [fetchCreateContact.pending]: () => true,
  [fetchUpdateContact.fulfilled]: () => false,
  [fetchDeleteContact.fulfilled]: () => false,
  [fetchContacts.fulfilled]: () => false,
  [fetchCreateContact.fulfilled]: () => false,
  [fetchDeleteContact.rejected]: () => false,
  [fetchContacts.rejected]: () => false,
  [fetchCreateContact.rejected]: () => false,
  [fetchUpdateContact.rejected]: () => false,
});

const error = createReducer(null, {
  [fetchDeleteContact.rejected]: (_, action) => action.payload,
  [fetchDeleteContact.pending]: () => null,
  [fetchContacts.rejected]: (_, action) => action.payload,
  [fetchContacts.pending]: () => null,
  [fetchCreateContact.rejected]: (_, action) => action.payload,
  [fetchCreateContact.pending]: () => null,
  [fetchUpdateContact.rejected]: (_, action) => action.payload,
  [fetchUpdateContact.pending]: () => null,
});

const filter = createReducer("", {
  [actions.getFilterItems]: (_, action) => action.payload,
});

export default combineReducers({
  items,
  filter,
  isLoader,
  error,
});
