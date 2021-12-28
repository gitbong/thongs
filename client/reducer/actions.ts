import { Route } from "../shared/types";

export const SEARCH = "SEARCH";
export const SAVE_ROUTES = "SAVE_ROUTES";
export const UPDATE_ROUTES = "UPDATE_ROUTES";

export const searchAction = (searchString: string) => ({
  type: SEARCH,
  payload: searchString,
});

export const saveRoutesAction = (routes: Route[]) => ({
  type: SAVE_ROUTES,
  payload: routes,
});
