import { createSelector } from "@reduxjs/toolkit";

const getItems = (state) => state.contacts.items;
export const getFilter = (state) => state.contacts.filter;
export const getIsLoader = (state) => state.contacts.isLoader;
export const getError = (state) => state.contacts.error;

export const getFilterContacts = createSelector(
  [getItems, getFilter],
  (items, filter) => {
    const normalizedFilter = filter.toLowerCase();

    return items.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }
);
