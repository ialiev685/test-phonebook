import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./authorization";
import contacts from "redux/phonebook";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "authorization",
  storage,
  whitelist: ["token"],
};

const persistedAuthorization = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    authorization: persistedAuthorization,
    contacts,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

  devTools: process.env.NODE_ENV === "development",
});

export let persistor = persistStore(store);
