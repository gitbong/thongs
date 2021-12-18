import { Route } from "../../shared/types";

export interface RootState {
  searchValue: string;
  routes: Route[];
}

export const initialState: RootState = {
  searchValue: "",
  routes: [],
};
