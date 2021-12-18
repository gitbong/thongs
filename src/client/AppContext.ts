import React, { useContext } from "react";
import { initialState, RootState } from "./reducer/store";

export type Dispatch = React.Dispatch<{ type: string; payload: any }>;
const AppContext = React.createContext<{
  state: RootState;
  dispatch: Dispatch | null;
}>({ state: initialState, dispatch: null });

export const AppProvider = AppContext.Provider;

export function useAppContext() {
  return useContext(AppContext);
}
