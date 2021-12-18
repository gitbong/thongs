import { configureStore } from "@reduxjs/toolkit";
import { routesSlice, RoutesState } from "./routesSlice";

export const store = configureStore<RoutesState>({
  reducer: routesSlice.reducer,
  // @ts-ignore: Unreachable code error
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const { dispatch, getState } = store;
